const ITEM_IMAGE_PATH_PREFIX = "/items/"
const OPTIMIZED_ITEM_IMAGE_PATH_PREFIX = "/items/optimized/"

export const getOptimizedItemImagePath = (imagePath: string) => {
  if (!imagePath.startsWith(ITEM_IMAGE_PATH_PREFIX)) {
    return imagePath
  }

  const cleanPath = imagePath.split(/[?#]/, 1)[0]
  const fileName = cleanPath.slice(ITEM_IMAGE_PATH_PREFIX.length)
  const dotIndex = fileName.lastIndexOf(".")
  const baseName = dotIndex >= 0 ? fileName.slice(0, dotIndex) : fileName

  if (!baseName) {
    return imagePath
  }

  return `${OPTIMIZED_ITEM_IMAGE_PATH_PREFIX}${baseName}.jpg`
}

