import { Badge } from "@/components/ui/badge"

interface EnhancedStatusBadgeProps {
  status: string
  type?: "status" | "role" | "plan" | "category" | "impact" | "insight" | "integration"
  size?: "sm" | "md" | "lg"
  glow?: boolean
}

const statusTranslations = {
  // Status translations
  active: "activo",
  inactive: "inactivo",
  pending: "pendiente",
  approved: "aprobado",
  rejected: "rechazado",
  processing: "procesando",
  completed: "completado",
  failed: "fallido",
  connected: "conectado",
  disconnected: "desconectado",
  syncing: "sincronizando",
  error: "error",
  trial: "prueba",
  suspended: "suspendido",

  // Role translations
  admin: "admin",
  manager: "gerente",
  user: "usuario",

  // Plan translations
  starter: "inicial",
  professional: "profesional",
  enterprise: "empresarial",

  // Category translations
  QuickBooks: "QuickBooks",
  Excel: "Excel",
  General: "General",
  Categorization: "Categorización",
  Analysis: "Análisis",
  Detection: "Detección",
  Reconciliation: "Conciliación",
  Reports: "Reportes",

  // Impact translations
  high: "alto",
  medium: "medio",
  low: "bajo",
  positive: "positivo",

  // Insight translations
  anomaly: "anomalía",
  trend: "tendencia",
  prediction: "predicción",
}

export function EnhancedStatusBadge({ status, type = "status", size = "md", glow = false }: EnhancedStatusBadgeProps) {
  const getStatusClasses = () => {
    switch (type) {
      case "status":
        switch (status) {
          case "active":
          case "connected":
            return "bg-status-success-50 text-status-success-500 border-status-success-500/20"
          case "processing":
          case "syncing":
            return "bg-status-info-50 text-status-info-500 border-status-info-500/20"
          case "error":
          case "failed":
            return "bg-status-error-50 text-status-error-500 border-status-error-500/20"
          case "warning":
          case "pending":
            return "bg-status-warning-50 text-status-warning-500 border-status-warning-500/20"
          default:
            return "bg-muted text-muted-foreground border-border"
        }
      case "role":
        switch (status) {
          case "admin":
            return "bg-status-error-50 text-status-error-500 border-status-error-500/20"
          case "manager":
            return "bg-status-info-50 text-status-info-500 border-status-info-500/20"
          case "user":
            return "bg-status-success-50 text-status-success-500 border-status-success-500/20"
          default:
            return "bg-muted text-muted-foreground border-border"
        }
      case "plan":
        switch (status) {
          case "enterprise":
            return "bg-status-info-50 text-status-info-500 border-status-info-500/20"
          case "professional":
            return "bg-purple-950/50 text-purple-400 border-purple-500/20"
          case "starter":
            return "bg-muted text-muted-foreground border-border"
          default:
            return "bg-muted text-muted-foreground border-border"
        }
      case "impact":
        switch (status) {
          case "high":
            return "bg-status-error-50 text-status-error-500 border-status-error-500/20"
          case "medium":
            return "bg-status-warning-50 text-status-warning-500 border-status-warning-500/20"
          case "low":
          case "positive":
            return "bg-status-success-50 text-status-success-500 border-status-success-500/20"
          default:
            return "bg-muted text-muted-foreground border-border"
        }
      case "insight":
        switch (status) {
          case "anomaly":
            return "bg-status-error-50 text-status-error-500 border-status-error-500/20"
          case "trend":
            return "bg-status-info-50 text-status-info-500 border-status-info-500/20"
          case "prediction":
            return "bg-purple-950/50 text-purple-400 border-purple-500/20"
          default:
            return "bg-muted text-muted-foreground border-border"
        }
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 font-medium",
    md: "text-xs px-2.5 py-1 font-medium",
    lg: "text-sm px-3 py-1.5 font-semibold",
  }

  const statusClasses = getStatusClasses()
  const glowClass = glow ? "shadow-glow-subtle" : ""

  // Get translated text
  const translatedStatus = statusTranslations[status as keyof typeof statusTranslations] || status

  return (
    <Badge className={`border transition-all duration-200 ${sizeClasses[size]} ${statusClasses} ${glowClass}`}>
      {translatedStatus}
    </Badge>
  )
}
