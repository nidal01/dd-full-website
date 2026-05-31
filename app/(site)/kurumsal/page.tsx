import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/fetch'
import { corporatePageQuery } from '@/sanity/lib/queries'
import { PageSections } from '@/components/sections/PageSections'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const data = await sanityFetch<any>(corporatePageQuery, {}, { tags: ['corporatePage'] })
  return buildMetadata(data?.seo, {
    title: 'Kurumsal',
    description: 'Duran Doğan: vizyonumuz, tarihçemiz ve değerlerimiz.',
  })
}

export default async function CorporatePage() {
  const data = await sanityFetch<any>(corporatePageQuery, {}, { tags: ['corporatePage'] })
  return <PageSections sections={data?.sections} />
}
