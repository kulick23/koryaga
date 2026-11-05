import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const index = JSON.parse(readFileSync(resolve(root, "public/data/catalog/index.json"), "utf8"))
const categories = index.categories.filter((name) => name !== "Все")
const quote = (value) => `'${String(value).replaceAll("'", "''")}'`
const nullable = (value) => (value === undefined || value === null || value === "" ? "null" : quote(value))
const array = (values) =>
  Array.isArray(values) && values.length > 0 ? `array[${values.map(quote).join(", ")}]::text[]` : "'{}'::text[]"
const resolveImage = (value) => {
  if (!value) return value
  const match = value.match(/^\/items\/(?:optimized\/)?bouquet-(\d+)\.[a-z0-9]+$/i)
  if (!match) return value

  for (const extension of ["jpg", "png"]) {
    const candidate = `/items/optimized/bouquet-${match[1]}.${extension}`
    if (existsSync(resolve(root, "public", candidate.replace(/^\//, "")))) return candidate
  }

  return value
}

const lines = [
  "begin;",
  "delete from public.products;",
  "delete from public.categories;",
  "",
]

categories.forEach((name, index) => {
  lines.push(
    `insert into public.categories (name, sort_order, is_active) values (${quote(name)}, ${index}, true);`
  )
})

lines.push("")
let sortOrder = 0
for (const category of categories) {
  const file = index.files[category]
  if (!file) continue
  const payload = JSON.parse(readFileSync(resolve(root, "public", file.replace(/^\//, "")), "utf8"))
  for (const product of payload.products ?? []) {
    const numericPrice = typeof product.price === "number" ? product.price : null
    const priceLabel = typeof product.price === "string" ? product.price : null
    const images = (product.images?.length ? product.images : product.image ? [product.image] : []).map(resolveImage)
    const image = resolveImage(product.image ?? images[0])
    lines.push(`insert into public.products (
  id, category_id, name, description, price_value, price_label, image_url, images, size, composition, badge, sort_order, is_active
) values (
  ${Number(product.id)},
  (select id from public.categories where name = ${quote(category)}),
  ${quote(product.name)},
  ${nullable(product.description)},
  ${numericPrice ?? "null"},
  ${nullable(priceLabel)},
  ${nullable(image)},
  ${array(images)},
  ${nullable(product.size)},
  ${array(product.composition)},
  ${nullable(product.badge)},
  ${sortOrder++},
  true
);`)
  }
}

lines.push(
  "",
  "select setval(pg_get_serial_sequence('public.categories', 'id'), coalesce(max(id), 1)) from public.categories;",
  "select setval(pg_get_serial_sequence('public.products', 'id'), coalesce(max(id), 1)) from public.products;",
  "commit;",
  ""
)

const output = resolve(root, "supabase/seed.sql")
mkdirSync(dirname(output), { recursive: true })
writeFileSync(output, lines.join("\n"))
console.log(`Generated ${output}`)
