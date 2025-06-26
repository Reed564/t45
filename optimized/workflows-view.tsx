"use client"

import React from "react"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Play, Settings, Zap } from "lucide-react"
import { useOrganization } from "@/hooks/use-organization-context"
import { EnhancedStatusBadge } from "@/components/ui/enhanced-status-badge"
import { StatCard } from "@/components/ui/stat-card"
import { MOCK_WORKFLOWS } from "@/data/mock-data"
import { darkColors } from "@/lib/dark-design-system"
import { useDebounce } from "@/lib/utils/performance"

// Memoized workflow item component
const WorkflowItem = React.memo(
  ({
    workflow,
    onToggle,
    hasPermission,
  }: {
    workflow: any
    onToggle: (id: number) => void
    hasPermission: boolean
  }) => (
    <Card
      className="border transition-all duration-300 hover:scale-[1.01]"
      style={{
        backgroundColor: darkColors.surface.primary,
        borderColor: darkColors.border.primary,
      }}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-xl font-semibold" style={{ color: darkColors.text.primary }}>
                {workflow.name}
              </h3>
              <EnhancedStatusBadge status={workflow.category} type="category" />
              {workflow.active && (
                <div className="flex items-center gap-1">
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: darkColors.status.success[500] }}
                  />
                  <span className="text-xs" style={{ color: darkColors.status.success[500] }}>
                    Ejecutándose
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
              <span style={{ color: darkColors.text.tertiary }}>Precisión: {workflow.accuracy}%</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              disabled={!hasPermission}
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
              <Switch checked={workflow.active} onCheckedChange={() => onToggle(workflow.id)} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
)

WorkflowItem.displayName = "WorkflowItem"

export function OptimizedWorkflowsView() {
  const { currentOrganization, hasPermission } = useOrganization()
  const [selectedSystem, setSelectedSystem] = useState("all")
  const [workflows, setWorkflows] = useState(MOCK_WORKFLOWS)

  // Debounced toggle function to prevent rapid state changes
  const debouncedToggle = useDebounce((id: number) => {
    setWorkflows((prev) =>
      prev.map((workflow) => (workflow.id === id ? { ...workflow, active: !workflow.active } : workflow)),
    )
  }, 300)

  // Memoized filtered workflows to prevent unnecessary recalculations
  const filteredWorkflows = useMemo(() => {
    return selectedSystem === "all"
      ? workflows
      : workflows.filter((workflow) => workflow.category.toLowerCase() === selectedSystem.toLowerCase())
  }, [workflows, selectedSystem])

  // Memoized stats calculation
  const stats = useMemo(
    () => ({
      total: workflows.length,
      active: workflows.filter((w) => w.active).length,
      inactive: workflows.filter((w) => !w.active).length,
    }),
    [workflows],
  )

  const handleSystemChange = useCallback((value: string) => {
    setSelectedSystem(value)
  }, [])

  if (!currentOrganization) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: darkColors.text.primary }}>
            Flujos de Trabajo - {currentOrganization.name}
          </h1>
          <p className="text-lg" style={{ color: darkColors.text.secondary }}>
            Configura y monitorea tus procesos automatizados
          </p>
        </div>
        <Button
          className="transition-all duration-300"
          style={{
            backgroundColor: darkColors.brand.primary,
            color: "#000000",
          }}
        >
          <Settings className="h-4 w-4 mr-2" />
          Configurar
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Total de Flujos"
          value={stats.total.toString()}
          description="Flujos disponibles"
          icon={Zap}
          color={darkColors.brand.primary}
          bgColor={darkColors.status.info[50]}
        />
        <StatCard
          title="Activos"
          value={stats.active.toString()}
          description="Ejecutándose actualmente"
          icon={Zap}
          color={darkColors.status.success[500]}
          bgColor={darkColors.status.success[50]}
        />
        <StatCard
          title="Inactivos"
          value={stats.inactive.toString()}
          description="Flujos pausados"
          icon={Zap}
          color={darkColors.text.quaternary}
          bgColor={darkColors.surface.tertiary}
        />
      </div>

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
            Selecciona el sistema contable para filtrar flujos de trabajo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedSystem} onValueChange={handleSystemChange}>
            <SelectTrigger className="w-[300px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["all", "quickbooks", "excel", "general"].map((system) => (
                <SelectItem key={system} value={system}>
                  {system === "all"
                    ? "Todos los Sistemas"
                    : system === "quickbooks"
                      ? "QuickBooks"
                      : system === "excel"
                        ? "Excel"
                        : "General"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold" style={{ color: darkColors.text.primary }}>
          Flujos de Trabajo Disponibles
        </h2>
        {filteredWorkflows.map((workflow) => (
          <WorkflowItem
            key={workflow.id}
            workflow={workflow}
            onToggle={debouncedToggle}
            hasPermission={hasPermission("workflows")}
          />
        ))}
      </div>
    </div>
  )
}
