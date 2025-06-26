"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Settings, Plus, Zap, Clock } from "lucide-react"
import { darkColors } from "@/lib/dark-design-system"

interface AutomationRule {
  id: string
  name: string
  description: string
  trigger: string
  action: string
  enabled: boolean
  lastTriggered: string
  executionCount: number
  successRate: number
}

const automationRules: AutomationRule[] = [
  {
    id: "rule-1",
    name: "Auto-categorizar Gastos de Oficina",
    description: "Categorizar automáticamente gastos que contengan 'oficina', 'suministros' o 'equipo'",
    trigger: "Nueva entrada de gasto",
    action: "Aplicar categoría + puntuación de confianza",
    enabled: true,
    lastTriggered: "hace 5 minutos",
    executionCount: 1247,
    successRate: 96,
  },
  {
    id: "rule-2",
    name: "Marcar Transacciones Grandes",
    description: "Marcar transacciones superiores a $5,000 para revisión manual",
    trigger: "Transacción > $5,000",
    action: "Crear tarea de revisión",
    enabled: true,
    lastTriggered: "hace 2 horas",
    executionCount: 23,
    successRate: 100,
  },
  {
    id: "rule-3",
    name: "Conciliación Mensual",
    description: "Conciliar automáticamente estados bancarios al final del mes",
    trigger: "Último día del mes",
    action: "Ejecutar flujo de conciliación",
    enabled: false,
    lastTriggered: "hace 30 días",
    executionCount: 3,
    successRate: 89,
  },
]

export function AutomationRules() {
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
            Reglas de Automatización
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              style={{
                borderColor: darkColors.border.secondary,
                color: darkColors.text.secondary,
                backgroundColor: "transparent",
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar Regla
            </Button>
            <Button
              variant="outline"
              size="sm"
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
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {automationRules.map((rule) => (
            <div
              key={rule.id}
              className="p-4 border rounded-lg transition-all duration-300 hover:scale-[1.01]"
              style={{
                borderColor: darkColors.border.primary,
                backgroundColor: darkColors.surface.secondary,
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium" style={{ color: darkColors.text.primary }}>
                      {rule.name}
                    </h3>
                    <Badge
                      className="text-xs"
                      style={{
                        backgroundColor: rule.enabled ? darkColors.status.success[50] : darkColors.surface.tertiary,
                        color: rule.enabled ? darkColors.status.success[500] : darkColors.text.quaternary,
                        borderColor: rule.enabled ? darkColors.status.success[200] : darkColors.border.secondary,
                      }}
                    >
                      {rule.enabled ? "Activa" : "Inactiva"}
                    </Badge>
                  </div>
                  <p className="text-sm mb-3" style={{ color: darkColors.text.secondary }}>
                    {rule.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span style={{ color: darkColors.text.tertiary }}>Disparador: </span>
                      <span style={{ color: darkColors.text.primary }}>{rule.trigger}</span>
                    </div>
                    <div>
                      <span style={{ color: darkColors.text.tertiary }}>Acción: </span>
                      <span style={{ color: darkColors.text.primary }}>{rule.action}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right text-sm">
                    <div style={{ color: darkColors.text.tertiary }}>Tasa de Éxito</div>
                    <div className="font-medium" style={{ color: darkColors.text.primary }}>
                      {rule.successRate}%
                    </div>
                  </div>
                  <Switch
                    checked={rule.enabled}
                    style={{
                      backgroundColor: rule.enabled ? darkColors.brand.primary : darkColors.surface.tertiary,
                    }}
                  />
                </div>
              </div>

              <div
                className="flex items-center justify-between text-sm border-t pt-3"
                style={{ borderColor: darkColors.border.primary }}
              >
                <div className="flex items-center gap-4">
                  <span style={{ color: darkColors.text.tertiary }}>
                    <Clock className="w-4 h-4 inline mr-1" />
                    Último disparador: {rule.lastTriggered}
                  </span>
                  <span style={{ color: darkColors.text.tertiary }}>
                    <Zap className="w-4 h-4 inline mr-1" />
                    Ejecutada {rule.executionCount} veces
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="transition-all duration-200"
                  style={{
                    color: darkColors.brand.primary,
                  }}
                >
                  Configurar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
