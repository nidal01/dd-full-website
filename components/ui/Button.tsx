import * as React from 'react'
import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    'group relative inline-flex items-center justify-center gap-2',
    'rounded-full font-medium will-change-transform cursor-pointer',
    'transition-all duration-300 ease-premium',
    'disabled:opacity-50 disabled:pointer-events-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2',
    'focus-visible:ring-offset-titanium-50 dark:focus-visible:ring-offset-ink',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-gold text-ink hover:bg-gold-300 hover:shadow-gold-glow active:scale-[0.98]',
        secondary:
          'border border-titanium-300 dark:border-ink-700 text-ink dark:text-titanium-100 hover:border-gold hover:text-gold',
        ghost:
          'text-ink dark:text-titanium-100 hover:text-gold',
        outline:
          'border border-gold/50 text-gold hover:border-gold hover:bg-gold/10',
        ink:
          'bg-ink text-titanium-50 hover:bg-ink-800',
      },
      size: {
        sm: 'h-9 px-4 text-xs tracking-wide',
        md: 'h-11 px-6 text-sm',
        lg: 'h-14 px-8 text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  withArrow?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, withArrow, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props}>
        <span className="inline-flex items-center gap-2">
          {children}
          {withArrow && (
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          )}
        </span>
      </Comp>
    )
  }
)
Button.displayName = 'Button'

type CtaLinkProps = {
  href: string
  variant?: VariantProps<typeof buttonVariants>['variant']
  size?: VariantProps<typeof buttonVariants>['size']
  withArrow?: boolean
  external?: boolean
  className?: string
  children: React.ReactNode
}

export function CtaLink({
  href,
  variant = 'primary',
  size = 'md',
  withArrow,
  external,
  className,
  children,
}: CtaLinkProps) {
  const cls = cn(buttonVariants({ variant, size }), className)
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        <span className="inline-flex items-center gap-2">
          {children}
          {withArrow && (
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </span>
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      <span className="inline-flex items-center gap-2">
        {children}
        {withArrow && (
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
    </Link>
  )
}

export { buttonVariants }
