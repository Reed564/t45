"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Play, Settings, Zap, WifiOff, AlertCircle, Plus, Crown } from "lucide-react"
import { useTenant } from "@/hooks/use-tenant"
import { StatCard } from "@/components/ui/stat-card"
import { darkColors } from "@/lib/dark-design-system"

interface WorkflowIntegration {
  id: string
  name: string
  logo: string
  connected: boolean
  type: "primary" | "support"
}

interface Workflow {
  id: number
  name: string
  category: string
  description: string
  active: boolean
  lastRun: string
  accuracy: number
  requiredIntegrations: WorkflowIntegration[]
  complianceLevel: "high" | "medium" | "low"
  auditRequired: boolean
}

// Simulamos el estado de las integraciones (esto vendría del contexto de integraciones)
const integrationStatus = {
  quickbooks: { connected: false, isPrimary: false },
  xero: { connected: false, isPrimary: false },
  sage: { connected: false, isPrimary: false },
  excel: { connected: false, isPrimary: false },
  "google-sheets": { connected: false, isPrimary: false },
}

const availableIntegrations: WorkflowIntegration[] = [
  {
    id: "quickbooks",
    name: "QuickBooks Online",
    logo: "QB",
    connected: integrationStatus.quickbooks.connected,
    type: "primary",
  },
  { id: "xero", name: "Xero", logo: "XR", connected: integrationStatus.xero.connected, type: "primary" },
  { id: "sage", name: "Sage 50", logo: "SG", connected: integrationStatus.sage.connected, type: "primary" },
  { id: "excel", name: "Microsoft Excel", logo: "XL", connected: integrationStatus.excel.connected, type: "support" },
  {
    id: "google-sheets",
    name: "Google Sheets",
    logo: "GS",
    connected: integrationStatus["google-sheets"].connected,
    type: "support",
  },
]

const mockWorkflows: Workflow[] = [
  {
    id: 1,
    name: "Procesamiento Automático de Facturas",
    category: "quickbooks",
    description: "Extrae y procesa automáticamente datos de facturas desde QuickBooks Online",
    active: false,
    lastRun: "Sin ejecutar",
    accuracy: 0,
    requiredIntegrations: [availableIntegrations.find((i) => i.id === "quickbooks")!],
    complianceLevel: "high",
    auditRequired: true,
  },
  {
    id: 2,
    name: "Conciliación Bancaria Automática",
    category: "quickbooks",
    description: "Concilia automáticamente transacciones bancarias con registros de QuickBooks",
    active: false,
    lastRun: "Sin ejecutar",
    accuracy: 0,
    requiredIntegrations: [availableIntegrations.find((i) => i.id === "quickbooks")!],
    complianceLevel: "high",
    auditRequired: true,
  },
  {
    id: 3,
    name: "Análisis Avanzado con Excel",
    category: "mixed",
    description: "Combina datos de QuickBooks con análisis personalizado en Excel",
    active: false,
    lastRun: "Sin ejecutar",
    accuracy: 0,
    requiredIntegrations: [
      availableIntegrations.find((i) => i.id === "quickbooks")!,
      availableIntegrations.find((i) => i.id === "excel")!,
    ],
    complianceLevel: "medium",
    auditRequired: false,
  },
  {
    id: 4,
    name: "Reportes Colaborativos",
    category: "mixed",
    description: "Genera reportes automáticos en Google Sheets desde tu sistema contable principal",
    active: false,
    lastRun: "Sin ejecutar",
    accuracy: 0,
    requiredIntegrations: [
      availableIntegrations.find((i) => i.id === "quickbooks")!, // Requiere sistema principal
      availableIntegrations.find((i) => i.id === "google-sheets")!,
    ],
    complianceLevel: "medium",
    auditRequired: false,
  },
  {
    id: 5,
    name: "Validación de Asientos Contables",
    category: "xero",
    description: "Valida automáticamente la precisión de asientos contables en Xero",
    active: false,
    lastRun: "Sin ejecutar",
    accuracy: 0,
    requiredIntegrations: [availableIntegrations.find((i) => i.id === "xero")!],
    complianceLevel: "high",
    auditRequired: true,
  },
]

export function WorkflowsView() {
  const { currentTenant, hasPermission } = useTenant()
  const [selectedSystem, setSelectedSystem] = useState("all")
  const [workflows] = useState(mockWorkflows)

  const filteredWorkflows =
    selectedSystem === "all"
      ? workflows
      : workflows.filter((workflow) => workflow.category.toLowerCase() === selectedSystem.toLowerCase())

  const primarySystem = availableIntegrations.find((i) => i.type === "primary" && i.connected)
  const connectedSupport = availableIntegrations.filter((i) => i.type === "support" && i.connected)
  const hasAnyConnections = primarySystem || connectedSupport.length > 0

  // Verificar qué flujos pueden ejecutarse
  const availableWorkflows = workflows.filter((workflow) => {
    return workflow.requiredIntegrations.every((req) => req.connected)
  })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: darkColors.text.primary }}>
            Flujos de Trabajo - {currentTenant?.name}
          </h1>
          <p className="text-lg" style={{ color: darkColors.text.secondary }}>
            Automatiza procesos basados en tu sistema contable principal y herramientas de soporte
          </p>
        </div>
        <Button
          className="transition-all duration-300"
          disabled={!hasAnyConnections}
          style={{
            backgroundColor: hasAnyConnections ? darkColors.brand.primary : darkColors.surface.tertiary,
            color: hasAnyConnections ? "#000000" : darkColors.text.quaternary,
          }}
        >
          <Settings className="h-4 w-4 mr-2" />
          Configurar
        </Button>
      </div>

      {/* Connection Status Alert */}
      {!primarySystem && (
        <Alert className="border-amber-500/30 bg-amber-500/10">
          <Crown className="h-4 w-4 text-amber-400" />
          <AlertDescription className="text-amber-200">
            Necesitas conectar un sistema contable principal (QuickBooks, Xero, o Sage) para activar los flujos de
            trabajo.
            <Button variant="link" className="p-0 h-auto ml-2 text-amber-300 underline">
              Conectar sistema principal
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <StatCard
          title="Total de Flujos"
          value={workflows.length.toString()}
          description="Flujos disponibles"
          icon={Zap}
          color={darkColors.brand.primary}
          bgColor={darkColors.status.info[50]}
        />
        <StatCard
          title="Disponibles"
          value={availableWorkflows.length.toString()}
          description="Listos para ejecutar"
          icon={Zap}
          color={availableWorkflows.length > 0 ? darkColors.status.success[500] : darkColors.text.quaternary}
          bgColor={availableWorkflows.length > 0 ? darkColors.status.success[50] : darkColors.surface.tertiary}
        />
        <StatCard
          title="Sistema Principal"
          value={primarySystem ? "1" : "0"}
          description={primarySystem ? primarySystem.name : "No conectado"}
          icon={Crown}
          color={primarySystem ? darkColors.brand.primary : darkColors.text.quaternary}
          bgColor={primarySystem ? darkColors.brand.light : darkColors.surface.tertiary}
        />
        <StatCard
          title="Herramientas Soporte"
          value={connectedSupport.length.toString()}
          description="Conectadas"
          icon={Settings}
          color={connectedSupport.length > 0 ? darkColors.status.info[500] : darkColors.text.quaternary}
          bgColor={connectedSupport.length > 0 ? darkColors.status.info[50] : darkColors.surface.tertiary}
        />
      </div>

      {/* Filter */}
      <Card
        className="border"
        style={{
          backgroundColor: darkColors.surface.primary,
          borderColor: darkColors.border.primary,
        }}
      >
        <CardHeader>
          <CardTitle style={{ color: darkColors.text.primary }}>Filtrar por Sistema</CardTitle>
          <CardDescription style={{ color: darkColors.text.tertiary }}>
            Filtra flujos por sistema contable o tipo de integración
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedSystem} onValueChange={setSelectedSystem}>
            <SelectTrigger
              className="w-[300px]"
              style={{
                backgroundColor: darkColors.surface.secondary,
                borderColor: darkColors.border.secondary,
                color: darkColors.text.primary,
              }}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent
              style={{
                backgroundColor: darkColors.background.overlay,
                borderColor: darkColors.border.secondary,
              }}
            >
              {["all", "quickbooks", "xero", "sage", "mixed"].map((system) => (
                <SelectItem key={system} value={system} style={{ color: darkColors.text.primary }}>
                  {system === "all"
                    ? "Todos los Flujos"
                    : system === "quickbooks"
                      ? "QuickBooks Online"
                      : system === "xero"
                        ? "Xero"
                        : system === "sage"
                          ? "Sage 50"
                          : "Flujos Combinados"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Workflows */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold" style={{ color: darkColors.text.primary }}>
          Flujos de Trabajo Disponibles
        </h2>
        {filteredWorkflows.map((workflow) => {
          const allIntegrationsConnected = workflow.requiredIntegrations.every((req) => req.connected)
          const missingIntegrations = workflow.requiredIntegrations.filter((req) => !req.connected)

          return (
            <Card
              key={workflow.id}
              className="border transition-all duration-300"
              style={{
                backgroundColor: darkColors.surface.primary,
                borderColor: darkColors.border.primary,
                opacity: allIntegrationsConnected ? 1 : 0.6,
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold" style={{ color: darkColors.text.primary }}>
                        {workflow.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        {workflow.requiredIntegrations.map((integration, index) => (
                          <div key={integration.id} className="flex items-center gap-1">
                            <div
                              className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-black"
                              style={{
                                backgroundColor: integration.connected
                                  ? darkColors.brand.primary
                                  : darkColors.surface.tertiary,
                                opacity: integration.connected ? 1 : 0.5,
                              }}
                            >
                              {integration.logo}
                            </div>
                            {integration.type === "primary" && (
                              <Crown className="w-3 h-3" style={{ color: darkColors.brand.primary }} />
                            )}
                            {index < workflow.requiredIntegrations.length - 1 && (
                              <span style={{ color: darkColors.text.quaternary }}>+</span>
                            )}
                          </div>
                        ))}
                      </div>
                      {!allIntegrationsConnected && (
                        <div className="flex items-center gap-1">
                          <WifiOff className="w-4 h-4" style={{ color: darkColors.text.quaternary }} />
                          <span className="text-xs" style={{ color: darkColors.text.quaternary }}>
                            Integraciones requeridas
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="mb-3" style={{ color: darkColors.text.secondary }}>
                      {workflow.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span style={{ color: darkColors.text.tertiary }}>Última ejecución: {workflow.lastRun}</span>
                      <span style={{ color: darkColors.text.tertiary }}>•</span>
                      <span style={{ color: darkColors.text.tertiary }}>
                        Precisión: {allIntegrationsConnected ? `${workflow.accuracy}%` : "Sin datos"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {allIntegrationsConnected ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={!hasPermission("workflows")}
                          style={{
                            borderColor: darkColors.border.secondary,
                            color: darkColors.text.secondary,
                            backgroundColor: "transparent",
                          }}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Ejecutar
                        </Button>
                        <div className="flex items-center gap-3">
                          <span
                            className="text-sm"
                            style={{
                              color: workflow.active ? darkColors.status.success[500] : darkColors.text.quaternary,
                            }}
                          >
                            {workflow.active ? "Activo" : "Inactivo"}
                          </span>
                          <Switch
                            checked={workflow.active}
                            onCheckedChange={() => {}}
                            style={{
                              backgroundColor: workflow.active ? darkColors.brand.primary : darkColors.surface.tertiary,
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          style={{
                            borderColor: darkColors.brand.primary,
                            color: darkColors.brand.primary,
                            backgroundColor: "transparent",
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Conectar Integraciones
                        </Button>
                        <div className="flex items-center gap-3">
                          <span className="text-sm" style={{ color: darkColors.text.quaternary }}>
                            Deshabilitado
                          </span>
                          <Switch
                            checked={false}
                            disabled={true}
                            style={{ backgroundColor: darkColors.surface.tertiary }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {!allIntegrationsConnected && (
                  <div className="mt-4 pt-4 border-t" style={{ borderColor: darkColors.border.secondary }}>
                    <div className="flex items-start gap-2 text-sm">
                      <AlertCircle className="w-4 h-4 mt-0.5" style={{ color: darkColors.status.warning[500] }} />
                      <div>
                        <span style={{ color: darkColors.text.tertiary }}>Integraciones requeridas:</span>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {missingIntegrations.map((integration) => (
                            <span
                              key={integration.id}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs"
                              style={{
                                backgroundColor: darkColors.surface.secondary,
                                color: darkColors.text.secondary,
                              }}
                            >
                              {integration.type === "primary" && (
                                <Crown className="w-3 h-3" style={{ color: darkColors.brand.primary }} />
                              )}
                              {integration.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {!primarySystem && (
        <Card className="text-center py-12" style={{ backgroundColor: darkColors.surface.primary }}>
          <CardContent>
            <div
              className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: darkColors.surface.secondary }}
            >
              <Crown className="w-8 h-8" style={{ color: darkColors.text.quaternary }} />
            </div>
            <h3 className="font-semibold mb-2" style={{ color: darkColors.text.primary }}>
              Conecta tu sistema contable principal
            </h3>
            <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: darkColors.text.tertiary }}>
              Para activar los flujos de trabajo automáticos, primero selecciona y conecta tu sistema contable
              principal: QuickBooks, Xero, o Sage.
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Seleccionar Sistema Principal
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
