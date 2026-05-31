import { cn } from '@/lib/utils'

type Props = {
  eyebrow?: string
  heading: string
  subheading?: string
  align?: 'left' | 'center'
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}

export function SectionHeader({
  eyebrow,
  heading,
  subheading,
  align = 'left',
  className,
  as = 'h2',
}: Props) {
  const Heading = as
  return (
    <header
      className={cn(
        'flex flex-col gap-4 max-w-3xl',
        align === 'center' && 'mx-auto items-center text-center',
        className
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Heading
        className={cn(
          'font-display text-balance tracking-tightest',
          as === 'h1' ? 'text-display-xl' : 'text-display-lg'
        )}
      >
        {heading}
      </Heading>
      {subheading && (
        <p className="text-pretty text-base leading-relaxed text-titanium-600 dark:text-titanium-400 md:text-lg">
          {subheading}
        </p>
      )}
    </header>
  )
}
