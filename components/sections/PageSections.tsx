import { HeroSection } from './HeroSection'
import { FeaturedProductsSection } from './FeaturedProductsSection'
import { StatsSection } from './StatsSection'
import { LogoCloudSection } from './LogoCloudSection'
import { TestimonialsSection } from './TestimonialsSection'
import { CtaSection } from './CtaSection'
import { TimelineSection } from './TimelineSection'
import { ValuesSection } from './ValuesSection'
import { ContentImageSection } from './ContentImageSection'
import { FaqSection } from './FaqSection'

type Section = { _type: string; _key?: string; [k: string]: any }

export function PageSections({ sections }: { sections?: Section[] }) {
  if (!sections || sections.length === 0) return null
  return (
    <>
      {sections.map((s) => {
        const key = s._key ?? s._type
        switch (s._type) {
          case 'heroSection':
            return <HeroSection key={key} {...(s as any)} />
          case 'featuredProductsSection':
            return <FeaturedProductsSection key={key} {...(s as any)} />
          case 'statsSection':
            return <StatsSection key={key} {...(s as any)} />
          case 'logoCloudSection':
            return <LogoCloudSection key={key} {...(s as any)} />
          case 'testimonialsSection':
            return <TestimonialsSection key={key} {...(s as any)} />
          case 'ctaSection':
            return <CtaSection key={key} {...(s as any)} />
          case 'timelineSection':
            return <TimelineSection key={key} {...(s as any)} />
          case 'valuesSection':
            return <ValuesSection key={key} {...(s as any)} />
          case 'contentImageSection':
            return <ContentImageSection key={key} {...(s as any)} />
          case 'faqSection':
            return <FaqSection key={key} {...(s as any)} />
          default:
            return null
        }
      })}
    </>
  )
}
