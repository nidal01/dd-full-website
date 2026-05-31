import type { SchemaTypeDefinition } from 'sanity'

// Singletons
import siteSettings from './documents/siteSettings'
import homePage from './documents/homePage'
import corporatePage from './documents/corporatePage'
import sustainabilityPage from './documents/sustainabilityPage'
import contactPage from './documents/contactPage'

// Collections
import product from './documents/product'
import productCategory from './documents/productCategory'
import news from './documents/news'
import newsCategory from './documents/newsCategory'
import author from './documents/author'
import tag from './documents/tag'
import redirect from './documents/redirect'
import locale from './documents/locale'

// Objects (reusable blocks)
import seo from './objects/seo'
import openGraph from './objects/openGraph'
import link from './objects/link'
import cta from './objects/cta'
import navItem from './objects/navItem'
import megaMenuColumn from './objects/megaMenuColumn'
import socialLink from './objects/socialLink'
import address from './objects/address'
import productSpec from './objects/productSpec'
import productGalleryItem from './objects/productGalleryItem'
import sustainabilityMetric from './objects/sustainabilityMetric'
import sustainabilityReport from './objects/sustainabilityReport'
import richText from './objects/richText'

// Page sections
import heroSection from './objects/sections/heroSection'
import featuredProductsSection from './objects/sections/featuredProductsSection'
import statsSection from './objects/sections/statsSection'
import logoCloudSection from './objects/sections/logoCloudSection'
import testimonialsSection from './objects/sections/testimonialsSection'
import ctaSection from './objects/sections/ctaSection'
import timelineSection from './objects/sections/timelineSection'
import valuesSection from './objects/sections/valuesSection'
import contentImageSection from './objects/sections/contentImageSection'
import faqSection from './objects/sections/faqSection'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Singletons
  siteSettings,
  homePage,
  corporatePage,
  sustainabilityPage,
  contactPage,
  // Collections
  product,
  productCategory,
  news,
  newsCategory,
  author,
  tag,
  redirect,
  locale,
  // Objects
  seo,
  openGraph,
  link,
  cta,
  navItem,
  megaMenuColumn,
  socialLink,
  address,
  productSpec,
  productGalleryItem,
  sustainabilityMetric,
  sustainabilityReport,
  richText,
  // Sections
  heroSection,
  featuredProductsSection,
  statsSection,
  logoCloudSection,
  testimonialsSection,
  ctaSection,
  timelineSection,
  valuesSection,
  contentImageSection,
  faqSection,
]
