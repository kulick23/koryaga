const pngProductIds = new Set([32, 35, 36, 37, 45, 54, 56, 60, 61, 62])

export const resolveCatalogImage = (url?: string | null) => {
  if (!url) return undefined

  const match = url.match(/^\/items\/(?:optimized\/)?bouquet-(\d+)\.[a-z0-9]+$/i)
  if (!match) return url

  const id = Number(match[1])
  const extension = pngProductIds.has(id) ? "png" : "jpg"
  return `/items/optimized/bouquet-${id}.${extension}`
}
