import { urlFor } from '@/sanity/lib/image'

type ProductImageInput = {
  coverImage?: any
  externalImageUrl?: string | null
}

/**
 * Ürün kapak görseli için URL döner.
 * Öncelik: Sanity coverImage asset → externalImageUrl (WP/CDN) → null
 */
export function resolveProductImageUrl(
  product: ProductImageInput | null | undefined,
  opts: { width?: number; height?: number } = {}
): { url: string; isExternal: boolean } | null {
  if (!product) return null
  const { width, height } = opts

  if (product.coverImage?.asset) {
    let b = urlFor(product.coverImage)
    if (width) b = b.width(width)
    if (height) b = b.height(height)
    return { url: b.url(), isExternal: false }
  }

  if (product.externalImageUrl) {
    return { url: product.externalImageUrl, isExternal: true }
  }

  return null
}
