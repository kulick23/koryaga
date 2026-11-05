import { type FormEvent, useEffect, useMemo, useState } from "react"
import { ArrowLeft, ImagePlus, Loader2, Pencil, Plus, RefreshCw, Save, Trash2, X } from "lucide-react"

import { loadAdminCatalog, runAdminAction, uploadProductImage } from "@/admin/api"
import type { AdminCategory, AdminProduct, ProductDraft } from "@/admin/types"
import { resolveCatalogImage } from "@/lib/catalog-image"

const emptyDraft = (categoryId: number): ProductDraft => ({
  category_id: categoryId,
  name: "",
  description: null,
  price_value: null,
  price_label: null,
  image_url: null,
  images: [],
  size: null,
  composition: [],
  badge: null,
  is_active: true,
  sort_order: 0,
})

const formatPrice = (product: AdminProduct) =>
  product.price_label || (product.price_value !== null ? `${product.price_value} Br` : "Цена не указана")

export default function AdminPage() {
  const [categories, setCategories] = useState<AdminCategory[]>([])
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState(0)
  const [draft, setDraft] = useState<ProductDraft | null>(null)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [categoryName, setCategoryName] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")

  const hasTelegramAuth = Boolean(window.Telegram?.WebApp.initData || import.meta.env.VITE_ADMIN_DEV_KEY)
  const selectedCategory = categories.find((category) => category.id === selectedCategoryId)
  const visibleProducts = useMemo(
    () => products.filter((product) => product.category_id === selectedCategoryId),
    [products, selectedCategoryId]
  )

  const load = async () => {
    setLoading(true)
    setError("")
    try {
      const result = await loadAdminCatalog()
      setCategories(result.categories)
      setProducts(result.products)
      setSelectedCategoryId((current) =>
        result.categories.some((category) => category.id === current)
          ? current
          : result.categories[0]?.id || 0
      )
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Не удалось загрузить каталог")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const webApp = window.Telegram?.WebApp
    webApp?.ready()
    webApp?.expand()
    webApp?.disableVerticalSwipes?.()
    if (!webApp?.isFullscreen) {
      try {
        webApp?.requestFullscreen?.()
      } catch {
        // Older Telegram clients support expand(), but not fullscreen mode.
      }
    }
    webApp?.setHeaderColor("#0b0b0b")
    webApp?.setBackgroundColor("#0b0b0b")
    if (hasTelegramAuth) void load()
    else setLoading(false)
  }, [hasTelegramAuth])

  useEffect(() => {
    setCategoryName(selectedCategory?.name ?? "")
  }, [selectedCategory?.name])

  const mutate = async (action: string, payload: unknown) => {
    setSaving(true)
    setError("")
    try {
      await runAdminAction(action, payload)
      await load()
      return true
    } catch (mutationError) {
      setError(mutationError instanceof Error ? mutationError.message : "Не удалось сохранить изменения")
      return false
    } finally {
      setSaving(false)
    }
  }

  const createCategory = async (event: FormEvent) => {
    event.preventDefault()
    if (!newCategoryName.trim()) return
    if (await mutate("category.create", { name: newCategoryName })) setNewCategoryName("")
  }

  const saveProduct = async (event: FormEvent) => {
    event.preventDefault()
    if (!draft) return
    const action = draft.id ? "product.update" : "product.create"
    if (await mutate(action, draft)) setDraft(null)
  }

  const handleImage = async (file?: File) => {
    if (!file || !draft) return
    setUploading(true)
    setError("")
    try {
      const url = await uploadProductImage(file)
      setDraft((current) => (current ? { ...current, image_url: url, images: [url] } : current))
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Не удалось загрузить изображение")
    } finally {
      setUploading(false)
    }
  }

  if (!hasTelegramAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b0b0b] p-6 text-white">
        <div className="max-w-sm text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#d7ff00] text-2xl text-black">K</div>
          <h1 className="font-serif text-3xl font-bold">Админка KORYAGA</h1>
          <p className="mt-3 text-sm leading-6 text-white/60">
            Откройте эту страницу кнопкой из Telegram-бота. Обычный браузер не передаёт данные для безопасного входа.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="telegram-admin min-h-[100dvh] w-full max-w-full overflow-x-hidden bg-[#0b0b0b] text-white">
      <header className="telegram-admin-header sticky top-0 z-30 w-full max-w-full border-b border-white/10 bg-[#0b0b0b]/95 py-3 backdrop-blur">
        <div className="mx-auto flex w-full min-w-0 max-w-5xl items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d7ff00]">Telegram Mini App</p>
            <h1 className="truncate font-serif text-2xl font-bold">Каталог KORYAGA</h1>
          </div>
          <button type="button" onClick={() => void load()} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 hover:border-[#d7ff00] hover:text-[#d7ff00]" aria-label="Обновить каталог">
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="telegram-admin-content mx-auto w-full min-w-0 max-w-5xl space-y-6 py-5">
        {error && <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}

        <section aria-labelledby="categories-title">
          <div className="mb-3 flex items-center justify-between">
            <h2 id="categories-title" className="text-sm font-semibold uppercase tracking-wider text-white/60">Категории</h2>
            <span className="text-xs text-white/35">{categories.length}</span>
          </div>
          <div className="flex max-w-full gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((category) => (
              <button key={category.id} type="button" onClick={() => { setSelectedCategoryId(category.id); setDraft(null) }} className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${selectedCategoryId === category.id ? "bg-[#d7ff00] text-black" : "bg-white/8 text-white/65"}`}>
                {category.name}
              </button>
            ))}
          </div>

          <form onSubmit={createCategory} className="mt-3 flex gap-2">
            <label className="sr-only" htmlFor="new-category">Новая категория</label>
            <input id="new-category" value={newCategoryName} onChange={(event) => setNewCategoryName(event.target.value)} placeholder="Название новой категории" className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-[#d7ff00]" />
            <button disabled={saving || !newCategoryName.trim()} className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d7ff00] text-black disabled:opacity-40" aria-label="Добавить категорию"><Plus className="h-5 w-5" /></button>
          </form>
        </section>

        {selectedCategory && (
          <section className="min-w-0 max-w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="mb-3 text-xs uppercase tracking-wider text-white/40">Настройки категории</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input value={categoryName} onChange={(event) => setCategoryName(event.target.value)} className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-[#d7ff00]" />
              <button type="button" disabled={saving || !categoryName.trim()} onClick={() => void mutate("category.update", { ...selectedCategory, name: categoryName })} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black disabled:opacity-40"><Save className="h-4 w-4" />Сохранить</button>
              <button type="button" disabled={saving || visibleProducts.length > 0} onClick={() => { if (confirm("Удалить пустую категорию?")) void mutate("category.delete", { id: selectedCategory.id }) }} className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/30 px-4 py-3 text-sm text-red-300 disabled:opacity-30"><Trash2 className="h-4 w-4" />Удалить</button>
            </div>
            {visibleProducts.length > 0 && <p className="mt-2 text-xs text-white/35">Чтобы удалить категорию, сначала удалите или перенесите её товары.</p>}
          </section>
        )}

        <section aria-labelledby="products-title">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <h2 id="products-title" className="text-lg font-semibold">Товары</h2>
              <p className="text-xs text-white/40">{visibleProducts.length} в выбранной категории</p>
            </div>
            <button type="button" disabled={!selectedCategoryId} onClick={() => setDraft(emptyDraft(selectedCategoryId))} className="inline-flex items-center gap-2 rounded-full bg-[#d7ff00] px-4 py-2.5 text-sm font-semibold text-black disabled:opacity-40"><Plus className="h-4 w-4" />Добавить</button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16 text-white/50"><Loader2 className="mr-2 h-5 w-5 animate-spin" />Загрузка каталога</div>
          ) : visibleProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/15 px-5 py-12 text-center text-sm text-white/45">В этой категории пока нет товаров</div>
          ) : (
            <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
              {visibleProducts.map((product) => (
                <article key={product.id} className="flex w-full min-w-0 max-w-full gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                  <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-white/5">
                    {product.image_url ? <img src={resolveCatalogImage(product.image_url)} alt={product.name} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-white/20"><ImagePlus className="h-5 w-5" /></div>}
                  </div>
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0"><h3 className="line-clamp-2 break-words font-semibold leading-tight">{product.name}</h3><p className="mt-1 text-sm font-semibold text-[#d7ff00]">{formatPrice(product)}</p></div>
                      {!product.is_active && <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] text-white/50">Скрыт</span>}
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button type="button" onClick={() => setDraft({ ...product })} className="inline-flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg bg-white/10 px-2 py-2 text-xs font-medium"><Pencil className="h-3.5 w-3.5 shrink-0" /><span className="truncate">Изменить</span></button>
                      <button type="button" onClick={() => { if (confirm(`Удалить «${product.name}»?`)) void mutate("product.delete", { id: product.id }) }} className="flex h-8 w-8 items-center justify-center rounded-lg text-red-300 hover:bg-red-500/10" aria-label={`Удалить ${product.name}`}><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      {draft && (
        <div className="telegram-admin-modal fixed inset-0 z-50 w-full max-w-full overflow-x-hidden overflow-y-auto bg-black/80 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="product-editor-title">
          <form onSubmit={saveProduct} className="mx-auto my-3 w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#131313] p-4 shadow-2xl sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <button type="button" onClick={() => setDraft(null)} className="inline-flex items-center gap-2 text-sm text-white/55"><ArrowLeft className="h-4 w-4" />Назад</button>
              <h2 id="product-editor-title" className="font-semibold">{draft.id ? "Редактирование" : "Новый товар"}</h2>
              <button type="button" onClick={() => setDraft(null)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5" aria-label="Закрыть"><X className="h-4 w-4" /></button>
            </div>

            <div className="space-y-4">
              <label className="block text-sm"><span className="mb-2 block text-white/60">Категория</span><select value={draft.category_id} onChange={(event) => setDraft({ ...draft, category_id: Number(event.target.value) })} className="w-full rounded-xl border border-white/10 bg-[#1d1d1d] px-4 py-3 outline-none focus:border-[#d7ff00]">{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label>
              <label className="block text-sm"><span className="mb-2 block text-white/60">Название *</span><input required value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-[#d7ff00]" /></label>

              <div className="grid grid-cols-1 gap-3 min-[390px]:grid-cols-2">
                <label className="block text-sm"><span className="mb-2 block text-white/60">Цена, Br</span><input type="number" min="0" step="0.01" value={draft.price_value ?? ""} onChange={(event) => setDraft({ ...draft, price_value: event.target.value ? Number(event.target.value) : null })} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-[#d7ff00]" /></label>
                <label className="block text-sm"><span className="mb-2 block text-white/60">Цена текстом</span><input value={draft.price_label ?? ""} onChange={(event) => setDraft({ ...draft, price_label: event.target.value || null })} placeholder="от 300 Br" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-[#d7ff00]" /></label>
              </div>

              <label className="block text-sm"><span className="mb-2 block text-white/60">Описание</span><textarea rows={4} value={draft.description ?? ""} onChange={(event) => setDraft({ ...draft, description: event.target.value || null })} className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-[#d7ff00]" /></label>

              <div className="grid grid-cols-1 gap-3 min-[390px]:grid-cols-2">
                <label className="block text-sm"><span className="mb-2 block text-white/60">Плашка</span><input value={draft.badge ?? ""} onChange={(event) => setDraft({ ...draft, badge: event.target.value || null })} placeholder="Хит / Новинка" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-[#d7ff00]" /></label>
                <label className="block text-sm"><span className="mb-2 block text-white/60">Размер</span><input value={draft.size ?? ""} onChange={(event) => setDraft({ ...draft, size: event.target.value || null })} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-[#d7ff00]" /></label>
              </div>

              <label className="block text-sm"><span className="mb-2 block text-white/60">Состав, каждый пункт с новой строки</span><textarea rows={3} value={draft.composition.join("\n")} onChange={(event) => setDraft({ ...draft, composition: event.target.value.split("\n").map((item) => item.trim()).filter(Boolean) })} className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-[#d7ff00]" /></label>

              <div>
                <span className="mb-2 block text-sm text-white/60">Изображение</span>
                {draft.image_url && <img src={resolveCatalogImage(draft.image_url)} alt="Превью товара" className="mb-3 h-44 w-full rounded-xl object-cover" />}
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 px-4 py-4 text-sm text-white/65 hover:border-[#d7ff00] hover:text-[#d7ff00]">
                  {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
                  {uploading ? "Загрузка..." : "Выбрать фотографию"}
                  <input type="file" accept="image/*" className="sr-only" disabled={uploading} onChange={(event) => void handleImage(event.target.files?.[0])} />
                </label>
              </div>

              <label className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm"><span>Показывать на сайте</span><input type="checkbox" checked={draft.is_active} onChange={(event) => setDraft({ ...draft, is_active: event.target.checked })} className="h-5 w-5 accent-[#d7ff00]" /></label>
            </div>

            <button disabled={saving || uploading || !draft.name.trim()} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#d7ff00] px-5 py-3.5 font-semibold text-black disabled:opacity-40">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}Сохранить товар</button>
          </form>
        </div>
      )}
    </main>
  )
}
