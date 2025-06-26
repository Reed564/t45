import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: string
  type?: "status" | "role" | "plan" | "category" | "impact" | "insight"
}

const colorMaps = {
  status: {
    active: "bg-green-500/20 text-green-300 border-green-500/30",
    trial: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    suspended: "bg-red-500/20 text-red-300 border-red-500/30",
    pending: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    inactive: "bg-gray-500/20 text-gray-300 border-gray-500/30",
  },
  role: {
    admin: "bg-red-500/20 text-red-300 border-red-500/30",
    manager: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    user: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  },
  plan: {
    professional: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    enterprise: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    starter: "bg-gray-500/20 text-gray-300 border-gray-500/30",
  },
  category: {
    QuickBooks: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    Excel: "bg-green-500/20 text-green-300 border-green-500/30",
    General: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    Categorization: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    Analysis: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    Detection: "bg-red-500/20 text-red-300 border-red-500/30",
    Reconciliation: "bg-green-500/20 text-green-300 border-green-500/30",
    Reports: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  },
  impact: {
    high: "bg-red-500/20 text-red-300 border-red-500/30",
    medium: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    positive: "bg-green-500/20 text-green-300 border-green-500/30",
  },
  insight: {
    anomaly: "bg-red-500/20 text-red-300 border-red-500/30",
    trend: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    prediction: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  },
}

export function StatusBadge({ status, type = "status" }: StatusBadgeProps) {
  const colorMap = colorMaps[type]
  const className = colorMap[status as keyof typeof colorMap] || "bg-gray-500/20 text-gray-300 border-gray-500/30"

  return <Badge className={className}>{status}</Badge>
}
