import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type EdgeFrameOverlayProps = {
  className?: string
  inset?: string
  tone?: 'light' | 'primary'
  showCrosshair?: boolean
  showTicks?: boolean
  children?: ReactNode
}

export function EdgeFrameOverlay({
  className,
  inset = '1rem',
  tone = 'light',
  showCrosshair = true,
  showTicks = true,
  children,
}: EdgeFrameOverlayProps) {
  const line = tone === 'light' ? 'border-white/45' : 'border-primary/45'
  const softLine = tone === 'light' ? 'bg-white/20' : 'bg-primary/20'
  const brightLine = tone === 'light' ? 'border-white/75 bg-white/75' : 'border-primary/75 bg-primary/75'

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute z-10', className)}
      style={{ inset }}
    >
      <div className={cn('absolute inset-0 border', line)} />

      <span className={cn('absolute -left-px -top-px size-6 border-l-2 border-t-2', brightLine)} />
      <span className={cn('absolute -right-px -top-px size-6 border-r-2 border-t-2', brightLine)} />
      <span className={cn('absolute -bottom-px -left-px size-6 border-b-2 border-l-2', brightLine)} />
      <span className={cn('absolute -bottom-px -right-px size-6 border-b-2 border-r-2', brightLine)} />

      {showTicks && (
        <>
          <span className={cn('absolute left-1/2 top-0 h-2 w-px -translate-x-1/2', softLine)} />
          <span className={cn('absolute bottom-0 left-1/2 h-2 w-px -translate-x-1/2', softLine)} />
          <span className={cn('absolute left-0 top-1/2 h-px w-2 -translate-y-1/2', softLine)} />
          <span className={cn('absolute right-0 top-1/2 h-px w-2 -translate-y-1/2', softLine)} />
        </>
      )}

      {showCrosshair && (
        <span className="absolute left-1/2 top-1/2 size-7 -translate-x-1/2 -translate-y-1/2">
          <span className={cn('absolute left-1/2 top-0 h-full w-px -translate-x-1/2', softLine)} />
          <span className={cn('absolute left-0 top-1/2 h-px w-full -translate-y-1/2', softLine)} />
          <span className={cn('absolute left-1/2 top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full', brightLine)} />
        </span>
      )}

      {children}
    </div>
  )
}
