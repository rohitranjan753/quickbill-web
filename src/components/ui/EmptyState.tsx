import type { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: React.ReactNode
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className="w-16 h-16 rounded-2xl bg-surface-low flex items-center justify-center mb-4">
        <Icon size={28} className="text-outline" />
      </div>
      <h3 className="font-semibold text-on-surface text-base mb-2">{title}</h3>
      <p className="text-on-surface-variant text-sm max-w-xs mb-6">{description}</p>
      {action}
    </div>
  )
}
