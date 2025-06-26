import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, CheckCircle, Clock, Users } from "lucide-react"
import { useTenant } from "@/hooks/use-tenant"
import { StatCard } from "@/components/ui/stat-card"

const stats = [
  {
    title: "Active Users",
    description: "Team members",
    icon: Users,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    trend: "+2 this month",
  },
  {
    title: "Pending AI Tasks",
    value: "8",
    description: "Awaiting review",
    icon: Clock,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    trend: "-3 from yesterday",
  },
  {
    title: "Processed Today",
    value: "24",
    description: "AI tasks completed",
    icon: CheckCircle,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    trend: "+18% vs yesterday",
  },
  {
    title: "AI Accuracy",
    value: "94%",
    description: "Last 30 days",
    icon: Bot,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    trend: "+2% improvement",
  },
]

const recentActivity = [
  { message: "Expense categorization completed", time: "2 minutes ago", color: "bg-green-500" },
  { message: "Cash flow analysis initiated", time: "15 minutes ago", color: "bg-blue-500" },
  { message: "Review required for anomaly detection", time: "1 hour ago", color: "bg-orange-500" },
  { message: "Bank reconciliation completed", time: "2 hours ago", color: "bg-green-500" },
]

const connectedSystems = [
  { name: "QuickBooks", status: "connected", color: "bg-blue-500", initial: "QB" },
  { name: "Excel", status: "connected", color: "bg-green-500", initial: "XL" },
  { name: "Xero", status: "disconnected", color: "bg-gray-500", initial: "XR" },
  { name: "SAP", status: "connected", color: "bg-purple-500", initial: "SP" },
]

export function DashboardView() {
  const { currentTenant } = useTenant()

  const statsWithValues = stats.map((stat) => ({
    ...stat,
    value: stat.title === "Active Users" ? currentTenant?.usage.currentUsers.toString() || "0" : stat.value,
  }))

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400 text-lg">AI-powered accounting platform overview for {currentTenant?.name}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsWithValues.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Resource Usage - {currentTenant?.name}</CardTitle>
          <CardDescription className="text-gray-400">Current usage vs plan limits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                label: "Users",
                used: currentTenant?.usage.currentUsers,
                max: currentTenant?.settings.maxUsers,
                color: "bg-blue-500",
              },
              {
                label: "Storage",
                used: currentTenant?.usage.storageUsed,
                max: currentTenant?.settings.maxStorage,
                color: "bg-green-500",
                unit: "GB",
              },
              {
                label: "Processing Hours",
                used: currentTenant?.usage.processingHoursUsed,
                max: currentTenant?.settings.maxProcessingHours,
                color: "bg-purple-500",
              },
            ].map(({ label, used, max, color, unit = "" }) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">{label}</span>
                  <span className="text-sm text-white">
                    {used}
                    {unit}/{max}
                    {unit}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`${color} h-2 rounded-full`}
                    style={{ width: `${((used || 0) / (max || 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription className="text-gray-400">Latest AI-powered actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-3 h-3 ${activity.color} rounded-full flex-shrink-0`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{activity.message}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Connected Systems</CardTitle>
            <CardDescription className="text-gray-400">Active integrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {connectedSystems.map((system, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${system.color} rounded-lg flex items-center justify-center`}>
                      <span className="text-xs font-bold text-white">{system.initial}</span>
                    </div>
                    <span className="text-sm font-medium text-white">{system.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        system.status === "connected" ? "bg-green-500" : "bg-gray-500"
                      }`}
                    ></div>
                    <span className={`text-xs ${system.status === "connected" ? "text-green-400" : "text-gray-400"}`}>
                      {system.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
