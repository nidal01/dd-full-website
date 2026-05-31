import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/fetch'
import { homePageQuery } from '@/sanity/lib/queries'
import { demoHomeSections } from '@/sanity/lib/demoData'
import { PageSections } from '@/components/sections/PageSections'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const data = await sanityFetch<any>(homePageQuery, {}, { tags: ['homePage'] })
  return buildMetadata(data?.seo, {
    title: 'Ana Sayfa',
    description: 'Duran Doğan — Premium ambalaj çözümleri.',
  })
}

export default async function HomePage() {
  const data = await sanityFetch<any>(homePageQuery, {}, {
    tags: ['homePage', 'product', 'siteSettings'],
  })
  const sections = data?.sections ?? demoHomeSections
  return <PageSections sections={sections} />
}
