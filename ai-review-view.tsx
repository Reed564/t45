"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Check,
  Edit,
  X,
  Clock,
  CheckCircle,
  XCircle,
  Brain,
  AlertCircle,
  Crown,
  Settings,
  WifiOff,
  Plus,
} from "lucide-react"
import { useTenant } from "@/hooks/use-tenant"
import { EnhancedStatusBadge } from "@/components/ui/enhanced-status-badge"
import { StatCard } from "@/components/ui/stat-card"
import { darkColors } from "@/lib/dark-design-system"

// Mock integration status - in real app this would come from context/state
const mockIntegrationStatus = {
  primarySystem: null, // No primary system connected
  supportTools: [],
  hasConnections: false,
}

// Mock tasks that would come from integrations
const INTEGRATION_TASKS = [
  {
    id: 1,
    description: "Procesamiento de facturas de QuickBooks",
    category: "invoice_processing",
    status: "pending",
    date: "2024-01-15",
    priority: "high",
    confidence: 94,
    result:
      "Se procesaron 15 facturas automáticamente. Se detectaron 2 facturas con posibles errores de clasificación que requieren revisión manual.",
    reasoning:
      "El algoritmo identificó patrones inconsistentes en las cuentas contables asignadas para dos proveedores recurrentes. Se recomienda verificar la configuración del plan de cuentas.",
    integrationSource: "QuickBooks Online",
    integrationLogo: "QB",
  },
  {
    id: 2,
    description: "Conciliación bancaria automática",
    category: "bank_reconciliation",
    status: "approved",
    date: "2024-01-14",
    priority: "medium",
    confidence: 98,
    result: "Conciliación completada exitosamente. 127 transacciones coincidieron automáticamente.",
    reasoning:
      "Todas las transacciones bancarias fueron emparejadas correctamente con los registros contables. No se encontraron discrepancias.",
    integrationSource: "QuickBooks Online",
    integrationLogo: "QB",
  },
]

const statusIcons = {
  approved: CheckCircle,
  rejected: XCircle,
  pending: Clock,
}

const priorityColors = {
  high: darkColors.status.error[500],
  medium: darkColors.status.warning[500],
  low: darkColors.status.success[500],
}

export function AIReviewView() {
  const { currentTenant, hasPermission } = useTenant()
  const [tasks, setTasks] = useState(mockIntegrationStatus.hasConnections ? INTEGRATION_TASKS : [])

  const updateTaskStatus = (id: number, status: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status } : task)))
  }

  const taskCounts = {
    pending: tasks.filter((task) => task.status === "pending").length,
    approved: tasks.filter((task) => task.status === "approved").length,
    rejected: tasks.filter((task) => task.status === "rejected").length,
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2" style={{ color: darkColors.text.primary }}>
          Revisión IA - {currentTenant?.name}
        </h1>
        <p className="text-lg" style={{ color: darkColors.text.secondary }}>
          Revisa y aprueba las tareas ejecutadas por IA desde tus integraciones
        </p>
      </div>

      {/* Integration Status Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card style={{ backgroundColor: darkColors.surface.primary, borderColor: darkColors.border.primary }}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Crown className="w-8 h-8" style={{ color: darkColors.brand.primary }} />
              <div>
                <p className="font-medium" style={{ color: darkColors.text.primary }}>
                  Sistema Principal
                </p>
                <p className="text-sm" style={{ color: darkColors.text.tertiary }}>
                  {mockIntegrationStatus.primarySystem || "No conectado"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: darkColors.surface.primary, borderColor: darkColors.border.primary }}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Settings className="w-8 h-8" style={{ color: darkColors.status.info[500] }} />
              <div>
                <p className="font-medium" style={{ color: darkColors.text.primary }}>
                  Herramientas Soporte
                </p>
                <p className="text-sm" style={{ color: darkColors.text.tertiary }}>
                  {mockIntegrationStatus.supportTools.length} conectadas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: darkColors.surface.primary, borderColor: darkColors.border.primary }}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8" style={{ color: darkColors.accent.purple }} />
              <div>
                <p className="font-medium" style={{ color: darkColors.text.primary }}>
                  Tareas IA Procesadas
                </p>
                <p className="text-sm" style={{ color: darkColors.text.tertiary }}>
                  {tasks.length} este mes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* No Integration Alert */}
      {!mockIntegrationStatus.hasConnections && (
        <Alert className="border-amber-500/30 bg-amber-500/10">
          <WifiOff className="h-4 w-4 text-amber-400" />
          <AlertDescription className="text-amber-200 flex items-center justify-between">
            <span>
              No hay integraciones conectadas. La IA necesita datos de tu sistema contable para generar tareas de
              revisión.
            </span>
            <Button variant="outline" size="sm" className="ml-4">
              <Plus className="w-4 h-4 mr-2" />
              Conectar Integración
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Pendientes de Revisión",
            count: taskCounts.pending,
            icon: Clock,
            color: darkColors.status.warning[500],
            bgColor: darkColors.status.warning[50],
          },
          {
            title: "Aprobadas",
            count: taskCounts.approved,
            icon: CheckCircle,
            color: darkColors.status.success[500],
            bgColor: darkColors.status.success[50],
          },
          {
            title: "Rechazadas",
            count: taskCounts.rejected,
            icon: XCircle,
            color: darkColors.status.error[500],
            bgColor: darkColors.status.error[50],
          },
        ].map(({ title, count, icon, color, bgColor }) => (
          <StatCard
            key={title}
            title={title}
            value={count.toString()}
            description={
              title === "Pendientes de Revisión"
                ? "Requieren atención"
                : title === "Aprobadas"
                  ? "Tareas completadas"
                  : "Necesitan corrección"
            }
            icon={icon}
            color={color}
            bgColor={bgColor}
          />
        ))}
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold" style={{ color: darkColors.text.primary }}>
            Tareas Ejecutadas por IA
          </h2>
          {mockIntegrationStatus.hasConnections && (
            <Badge variant="outline" className="px-3 py-1">
              Datos desde {mockIntegrationStatus.primarySystem || "integraciones"}
            </Badge>
          )}
        </div>

        {/* No Data State */}
        {!mockIntegrationStatus.hasConnections ? (
          <Card
            className="text-center py-16"
            style={{ backgroundColor: darkColors.surface.primary, borderColor: darkColors.border.primary }}
          >
            <CardContent>
              <div
                className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: darkColors.surface.secondary }}
              >
                <Brain className="w-8 h-8" style={{ color: darkColors.text.quaternary }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: darkColors.text.primary }}>
                Sin Datos para Procesar
              </h3>
              <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: darkColors.text.tertiary }}>
                La IA necesita datos de tu sistema contable para generar tareas de revisión. Conecta QuickBooks, Xero u
                otro sistema para comenzar.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button>
                  <Crown className="w-4 h-4 mr-2" />
                  Conectar Sistema Principal
                </Button>
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Ver Integraciones
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Tasks List */
          tasks.map((task) => {
            const StatusIcon = statusIcons[task.status as keyof typeof statusIcons]
            return (
              <Card
                key={task.id}
                className="border transition-all duration-300 hover:scale-[1.01]"
                style={{
                  backgroundColor: darkColors.surface.primary,
                  borderColor: darkColors.border.primary,
                  boxShadow: darkColors.shadow.md,
                }}
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <StatusIcon
                            className="h-5 w-5"
                            style={{
                              color:
                                task.status === "approved"
                                  ? darkColors.status.success[500]
                                  : task.status === "rejected"
                                    ? darkColors.status.error[500]
                                    : darkColors.status.warning[500],
                            }}
                          />
                          <h3 className="text-xl font-semibold" style={{ color: darkColors.text.primary }}>
                            {task.description}
                          </h3>
                          <EnhancedStatusBadge status={task.category} type="category" />
                          <EnhancedStatusBadge status={task.status} type="status" />
                          <div className="flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" style={{ color: priorityColors[task.priority] }} />
                            <span
                              className="text-xs capitalize font-medium"
                              style={{ color: priorityColors[task.priority] }}
                            >
                              {task.priority === "high" ? "Alta" : task.priority === "medium" ? "Media" : "Baja"}
                            </span>
                          </div>
                          {/* Integration Source Badge */}
                          <Badge variant="outline" className="text-xs bg-blue-500/10 border-blue-500/30 text-blue-400">
                            <div
                              className="w-3 h-3 rounded flex items-center justify-center text-[8px] font-bold mr-1"
                              style={{ backgroundColor: darkColors.brand.primary, color: "#000" }}
                            >
                              {task.integrationLogo}
                            </div>
                            {task.integrationSource}
                          </Badge>
                        </div>
                        <p className="text-sm mb-3" style={{ color: darkColors.text.tertiary }}>
                          Ejecutada el {task.date} • Procesado desde {task.integrationSource}
                        </p>

                        <div
                          className="p-4 rounded-lg mb-4 border"
                          style={{
                            backgroundColor: darkColors.surface.secondary,
                            borderColor: darkColors.border.primary,
                          }}
                        >
                          <div className="flex items-start gap-2">
                            <Brain
                              className="h-4 w-4 mt-0.5 flex-shrink-0"
                              style={{ color: darkColors.brand.primary }}
                            />
                            <p className="text-sm" style={{ color: darkColors.text.secondary }}>
                              {task.result}
                            </p>
                          </div>
                        </div>

                        <div
                          className="p-4 rounded-lg mb-4 border"
                          style={{
                            backgroundColor: darkColors.surface.secondary,
                            borderColor: darkColors.border.primary,
                          }}
                        >
                          <div className="flex items-start gap-2">
                            <Brain
                              className="h-4 w-4 mt-0.5 flex-shrink-0"
                              style={{ color: darkColors.accent.purple }}
                            />
                            <div>
                              <p className="text-sm font-medium mb-1" style={{ color: darkColors.text.primary }}>
                                Razonamiento de IA
                              </p>
                              <p className="text-sm" style={{ color: darkColors.text.secondary }}>
                                {task.reasoning}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm" style={{ color: darkColors.text.tertiary }}>
                            Confianza:
                          </span>
                          <span className="text-sm font-medium" style={{ color: darkColors.text.primary }}>
                            {task.confidence}%
                          </span>
                          <div
                            className="w-24 h-2 rounded-full overflow-hidden"
                            style={{ backgroundColor: darkColors.surface.tertiary }}
                          >
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${task.confidence}%`,
                                background: darkColors.gradient.primary,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {task.status === "pending" && hasPermission("ai-review") && (
                      <div className="flex gap-3 pt-4 border-t" style={{ borderColor: darkColors.border.primary }}>
                        <Button
                          size="sm"
                          onClick={() => updateTaskStatus(task.id, "approved")}
                          style={{
                            backgroundColor: darkColors.status.success[500],
                            color: "#000000",
                          }}
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Aprobar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          style={{
                            borderColor: darkColors.border.secondary,
                            color: darkColors.text.secondary,
                            backgroundColor: "transparent",
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => updateTaskStatus(task.id, "rejected")}
                          style={{
                            backgroundColor: darkColors.status.error[500],
                            color: "#FFFFFF",
                          }}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Rechazar
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
