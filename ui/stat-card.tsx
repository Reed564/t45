import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, type LucideIcon } from "lucide-react"
import { darkColors, darkColorUtils } from "@/lib/dark-design-system"

interface StatCardProps {
  title: string
  value: string
  description: string
  icon: LucideIcon
  color: string
  bgColor: string
  trend?: string
}

export function StatCard({ title, value, description, icon: Icon, color, bgColor, trend }: StatCardProps) {
  return (
    <Card
      className="border transition-all duration-300 hover:scale-105 group"
      style={{
        backgroundColor: darkColors.surface.primary,
        borderColor: darkColors.border.primary,
        boxShadow: darkColors.shadow.md,
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium" style={{ color: darkColors.text.tertiary }}>
          {title}
        </CardTitle>
        <div
          className="p-2 rounded-lg shadow-lg transition-all duration-300 group-hover:scale-110"
          style={{
            backgroundColor: bgColor,
            boxShadow: `0 0 15px ${darkColorUtils.withOpacity(color, 0.2)}`,
          }}
        >
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-1" style={{ color: darkColors.text.primary }}>
          {value}
        </div>
        <p className="text-xs mb-2" style={{ color: darkColors.text.quaternary }}>
          {description}
        </p>
        {trend && (
          <div className="flex items-center text-xs">
            <TrendingUp className="h-3 w-3 mr-1" style={{ color: darkColors.status.success[500] }} />
            <span style={{ color: darkColors.status.success[500] }}>{trend}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
