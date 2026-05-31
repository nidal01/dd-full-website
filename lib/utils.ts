import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function resolveHref(link: any): string {
  if (!link) return '#'
  if (link.type === 'external' && link.href) return link.href
  if (link.type === 'internal' && link.internal) {
    const { _type, slug } = link.internal
    switch (_type) {
      case 'homePage':
        return '/'
      case 'corporatePage':
        return '/kurumsal'
      case 'sustainabilityPage':
        return '/surdurulebilirlik'
      case 'contactPage':
        return '/iletisim'
      case 'product':
        return `/urunler/${slug}`
      case 'productCategory':
        return `/urunler?kategori=${slug}`
      case 'news':
        return `/haberler/${slug}`
      default:
        return '/'
    }
  }
  return '#'
}
