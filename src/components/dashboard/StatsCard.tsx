import type { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  iconColor?: string
  iconBg?: string
}

export function StatsCard({ title, value, subtitle, icon: Icon, iconColor = 'text-primary', iconBg = 'bg-primary/10' }: StatsCardProps) {
  return (
    <div className="card p-5 flex items-start gap-4">
      <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
        <Icon size={20} className={iconColor} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-on-surface-variant mb-1 font-medium">{title}</p>
        <p className="text-2xl font-bold font-numbers text-on-surface">{value}</p>
        {subtitle && <p className="text-xs text-outline mt-0.5">{subtitle}</p>}
      </div>
    </div>
  )
}
