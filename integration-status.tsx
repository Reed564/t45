"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EnhancedStatusBadge } from "@/components/ui/enhanced-status-badge"
import { Settings, RefreshCw, AlertCircle, CheckCircle, XCircle } from "lucide-react"
import { darkColors, darkColorUtils } from "@/lib/dark-design-system"

interface Integration {
  id: string
  name: string
  type: "accounting" | "spreadsheet" | "erp" | "bank"
  status: "connected" | "error" | "syncing" | "disconnected"
  lastSync: string
  recordsProcessed: number
  aiAccuracy: number
  logo: string
}

const integrations: Integration[] = [
  {
    id: "qb",
    name: "QuickBooks Online",
    type: "accounting",
    status: "connected",
    lastSync: "hace 2 minutos",
    recordsProcessed: 1247,
    aiAccuracy: 96,
    logo: "QB",
  },
  {
    id: "excel",
    name: "Libros de Excel",
    type: "spreadsheet",
    status: "syncing",
    lastSync: "Sincronizando ahora",
    recordsProcessed: 892,
    aiAccuracy: 94,
    logo: "XL",
  },
  {
    id: "xero",
    name: "Xero",
    type: "accounting",
    status: "error",
    lastSync: "hace 3 horas",
    recordsProcessed: 0,
    aiAccuracy: 0,
    logo: "XR",
  },
  {
    id: "chase",
    name: "Chase Business",
    type: "bank",
    status: "connected",
    lastSync: "hace 15 minutos",
    recordsProcessed: 456,
    aiAccuracy: 98,
    logo: "CB",
  },
]

const statusConfig = {
  connected: { color: darkColors.status.success[500], icon: CheckCircle, text: "Conectado" },
  syncing: { color: darkColors.brand.primary, icon: RefreshCw, text: "Sincronizando" },
  error: { color: darkColors.status.error[500], icon: XCircle, text: "Error" },
  disconnected: { color: darkColors.text.quaternary, icon: AlertCircle, text: "Desconectado" },
}

const integrationColors = {
  qb: darkColors.brand.secondary,
  excel: darkColors.status.success[500],
  xero: darkColors.accent.purple,
  chase: darkColors.brand.primary,
}

export function IntegrationStatus() {
  return (
    <Card
      className="border shadow-lg"
      style={{
        backgroundColor: darkColors.surface.primary,
        borderColor: darkColors.border.primary,
        boxShadow: darkColors.shadow.md,
      }}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold" style={{ color: darkColors.text.primary }}>
            Integraciones del Sistema
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="border transition-all duration-200"
            style={{
              borderColor: darkColors.border.secondary,
              color: darkColors.text.secondary,
              backgroundColor: "transparent",
            }}
          >
            <Settings className="w-4 h-4 mr-2" />
            Gestionar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {integrations.map((integration) => {
            const config = statusConfig[integration.status]
            const StatusIcon = config.icon
            const logoColor =
              integrationColors[integration.id as keyof typeof integrationColors] || darkColors.text.quaternary

            return (
              <div
                key={integration.id}
                className="p-4 border rounded-lg transition-all duration-300 hover:scale-[1.02] group"
                style={{
                  borderColor: darkColors.border.primary,
                  backgroundColor: darkColors.surface.secondary,
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-black font-bold text-sm shadow-lg transition-all duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: logoColor,
                        boxShadow: `0 0 15px ${darkColorUtils.withOpacity(logoColor, 0.3)}`,
                      }}
                    >
                      {integration.logo}
                    </div>
                    <div>
                      <h3 className="font-medium" style={{ color: darkColors.text.primary }}>
                        {integration.name}
                      </h3>
                      <p className="text-sm capitalize" style={{ color: darkColors.text.tertiary }}>
                        Sistema{" "}
                        {integration.type === "accounting"
                          ? "contable"
                          : integration.type === "spreadsheet"
                            ? "de hojas de cálculo"
                            : integration.type === "bank"
                              ? "bancario"
                              : "ERP"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusIcon
                      className={`w-4 h-4 ${integration.status === "syncing" ? "animate-spin" : ""}`}
                      style={{ color: config.color }}
                    />
                    <EnhancedStatusBadge status={integration.status} type="status" size="sm" />
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span style={{ color: darkColors.text.tertiary }}>Última sincronización:</span>
                    <span style={{ color: darkColors.text.secondary }}>{integration.lastSync}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: darkColors.text.tertiary }}>Registros procesados:</span>
                    <span style={{ color: darkColors.text.secondary }}>
                      {integration.recordsProcessed.toLocaleString()}
                    </span>
                  </div>
                  {integration.aiAccuracy > 0 && (
                    <div className="flex justify-between">
                      <span style={{ color: darkColors.text.tertiary }}>Precisión IA:</span>
                      <span className="font-medium" style={{ color: darkColors.brand.primary }}>
                        {integration.aiAccuracy}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
