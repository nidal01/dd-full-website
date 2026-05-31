import { groq } from 'next-sanity'

export const linkFragment = groq`
  type,
  href,
  label,
  openInNewTab,
  "internal": internal->{ _type, "slug": slug.current, title }
`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    siteName,
    tagline,
    logoLight,
    logoDark,
    favicon,
    announcement,
    primaryNav[]{
      label,
      hasMegaMenu,
      "link": link{${linkFragment}},
      megaMenuColumns[]{
        heading,
        links[]{${linkFragment}}
      },
      featuredImage,
      featuredCaption
    },
    topbarCta{ label, variant, "link": link{${linkFragment}} },
    footerColumns[]{ heading, links[]{${linkFragment}} },
    footerNote,
    legalLinks[]{${linkFragment}},
    addresses,
    socials,
    contactEmail,
    contactPhone,
    defaultSeo,
    analytics
  }
`

export const homePageQuery = groq`
  *[_type == "homePage"][0]{
    sections[]{
      _type,
      _key,
      ...,
      _type == "featuredProductsSection" => {
        ...,
        products[]->{
          _id, title, "slug": slug.current, tagline, coverImage,
          "category": category->{title, "slug": slug.current}
        }
      }
    },
    seo
  }
`

export const productListQuery = groq`
  *[_type == "product"] | order(order asc, _createdAt desc){
    _id, title, "slug": slug.current, tagline, coverImage, externalImageUrl,
    sustainabilityTags, materials, finishOptions,
    "category": category->{title, "slug": slug.current}
  }
`

export const productsByCategoryQuery = groq`
  *[_type == "product" && category->slug.current == $slug] | order(order asc, _createdAt desc){
    _id, title, "slug": slug.current, tagline, coverImage, externalImageUrl,
    sustainabilityTags, materials, finishOptions,
    "category": category->{title, "slug": slug.current}
  }
`

export const productFacetsQuery = groq`
{
  "materials": array::unique(*[_type == "product"].materials[]) | order(@ asc),
  "finishes": array::unique(*[_type == "product"].finishOptions[]) | order(@ asc),
  "sustainability": array::unique(*[_type == "product"].sustainabilityTags[]) | order(@ asc)
}
`

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0]{
    ...,
    "slug": slug.current,
    "category": category->{title, "slug": slug.current},
    moq,
    customization,
    downloads[]{
      label, kind, sizeNote,
      "file": { "asset": file.asset->{ url, originalFilename, size } }
    },
    relatedProducts[]->{ _id, title, "slug": slug.current, coverImage, externalImageUrl, tagline },
    caseStudies[]->{ _id, title, "slug": slug.current, coverImage, publishedAt }
  }
`

export const newsListQuery = groq`
  *[_type == "news"] | order(publishedAt desc){
    _id, title, "slug": slug.current, kind, excerpt, coverImage, publishedAt,
    "category": category->{title, "slug": slug.current},
    "author": author->{name, role, avatar}
  }
`

export const searchQuery = groq`
{
  "products": *[_type == "product" && (
    title match $q + "*" ||
    tagline match $q + "*" ||
    pt::text(description) match $q + "*"
  )] | order(_score desc)[0...8]{
    _id, _type, title, "slug": slug.current, tagline, coverImage,
    "category": category->{title}
  },
  "news": *[_type == "news" && (
    title match $q + "*" ||
    excerpt match $q + "*"
  )] | order(publishedAt desc)[0...5]{
    _id, _type, title, "slug": slug.current, excerpt, publishedAt, coverImage
  },
  "categories": *[_type == "productCategory" && title match $q + "*"][0...5]{
    _id, _type, title, "slug": slug.current
  }
}
`

export const productCategoriesQuery = groq`
  *[_type == "productCategory"] | order(order asc, title asc){
    _id, title, "slug": slug.current, description, coverImage
  }
`

const sectionProjection = groq`
  _type, _key, ...,
  _type == "featuredProductsSection" => {
    ...,
    products[]->{
      _id, title, "slug": slug.current, tagline, coverImage,
      "category": category->{title, "slug": slug.current}
    }
  }
`

export const corporatePageQuery = groq`
  *[_type == "corporatePage"][0]{
    sections[]{ ${sectionProjection} },
    seo
  }
`

export const sustainabilityPageQuery = groq`
  *[_type == "sustainabilityPage"][0]{
    hero,
    metrics,
    commitmentsBody,
    reports[]{
      year, title, summary, cover,
      "file": { "asset": file.asset->{ url, originalFilename } }
    },
    sections[]{ ${sectionProjection} },
    seo
  }
`

export const contactPageQuery = groq`
  *[_type == "contactPage"][0]{
    heading,
    subheading,
    formFields,
    subjects,
    submitEmail,
    successMessage,
    addressOverride,
    mapEmbedUrl,
    seo
  }
`

export const newsBySlugQuery = groq`
  *[_type == "news" && slug.current == $slug][0]{
    ...,
    "slug": slug.current,
    "category": category->{title, "slug": slug.current},
    "author": author->{name, role, avatar, bio},
    relatedProducts[]->{ _id, title, "slug": slug.current, coverImage }
  }
`
