import * as LucideIcons from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/ui/Reveal'

type Props = {
  heading?: string
  subheading?: string
  values?: Array<{ title: string; description?: string; icon?: string }>
}

export function ValuesSection({ heading, subheading, values }: Props) {
  if (!values || values.length === 0) return null
  return (
    <section className="container-premium py-32">
      <SectionHeader
        eyebrow="Değerlerimiz"
        heading={heading ?? 'Premiumu tanımlayan ilkeler'}
        subheading={subheading}
      />

      <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-titanium-200/60 bg-titanium-200/60 sm:grid-cols-2 lg:grid-cols-3 dark:border-ink-700 dark:bg-ink-700">
        {values.map((v, i) => {
          const Icon =
            (v.icon && (LucideIcons as any)[v.icon]) ||
            (LucideIcons as any).Sparkles
          return (
            <Reveal
              key={i}
              delay={i * 0.06}
              className="group relative flex flex-col gap-4 bg-titanium-50 p-10 transition-colors hover:bg-titanium-50/60 dark:bg-ink-900 dark:hover:bg-ink-800"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl border border-gold/40 bg-gold/5 text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
                <Icon size={22} />
              </span>
              <h3 className="font-display text-2xl tracking-tightest">{v.title}</h3>
              {v.description && (
                <p className="text-pretty leading-relaxed text-titanium-600 dark:text-titanium-400">
                  {v.description}
                </p>
              )}
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
