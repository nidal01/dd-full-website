import type { StructureResolver } from 'sanity/structure'
import { Cog, Globe, Home, Newspaper, Package, Leaf, Building2, Mail, Languages } from 'lucide-react'

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('İçerik Yönetimi')
    .items([
      // Singletons — Site-wide
      S.listItem()
        .title('Site Ayarları')
        .icon(Cog)
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings')
        ),
      S.listItem()
        .title('Ana Sayfa')
        .icon(Home)
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem()
        .title('Kurumsal')
        .icon(Building2)
        .child(S.document().schemaType('corporatePage').documentId('corporatePage')),
      S.listItem()
        .title('Sürdürülebilirlik')
        .icon(Leaf)
        .child(
          S.document().schemaType('sustainabilityPage').documentId('sustainabilityPage')
        ),
      S.listItem()
        .title('İletişim')
        .icon(Mail)
        .child(S.document().schemaType('contactPage').documentId('contactPage')),
      S.divider(),

      // Collections
      S.documentTypeListItem('product').title('Ürünler').icon(Package),
      S.documentTypeListItem('productCategory').title('Ürün Kategorileri'),
      S.documentTypeListItem('news').title('Haberler & Basın').icon(Newspaper),
      S.documentTypeListItem('newsCategory').title('Haber Kategorileri'),
      S.divider(),

      // Taxonomy / Shared
      S.documentTypeListItem('author').title('Yazarlar'),
      S.documentTypeListItem('tag').title('Etiketler'),
      S.documentTypeListItem('redirect').title('Yönlendirmeler (301/302)').icon(Globe),
      S.documentTypeListItem('locale').title('Diller').icon(Languages),
    ])
