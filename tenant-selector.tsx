"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, Plus, ArrowRight } from "lucide-react"
import { useTenant, getPlanSettings } from "@/hooks/use-tenant"
import { EnhancedStatusBadge } from "@/components/ui/enhanced-status-badge"
import { darkColors } from "@/lib/dark-design-system"

export function TenantSelector() {
  const { tenants, switchTenant, createTenant } = useTenant()
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newTenantData, setNewTenantData] = useState({
    name: "",
    domain: "",
    plan: "starter" as "starter" | "professional" | "enterprise",
  })

  const handleCreateTenant = () => {
    if (newTenantData.name && newTenantData.domain) {
      createTenant({
        ...newTenantData,
        status: "trial",
        settings: getPlanSettings(newTenantData.plan),
      })
      setShowCreateForm(false)
      setNewTenantData({ name: "", domain: "", plan: "starter" })
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl shadow-lg"
            style={{
              background: darkColors.gradient.primary,
              boxShadow: darkColors.shadow.glow,
            }}
          >
            <Building2 className="h-6 w-6 text-black font-bold" />
          </div>
          <div>
            <h1 className="text-3xl font-bold" style={{ color: darkColors.text.primary }}>
              ContaIA Pro
            </h1>
            <p className="text-sm" style={{ color: darkColors.text.tertiary }}>
              Plataforma Multi-Inquilino
            </p>
          </div>
        </div>
        <p className="text-lg" style={{ color: darkColors.text.secondary }}>
          Selecciona tu organización para continuar
        </p>
      </div>

      {!showCreateForm ? (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {tenants.map((tenant) => (
              <Card
                key={tenant.id}
                className="border transition-all duration-300 cursor-pointer hover:scale-105 group"
                onClick={() => switchTenant(tenant.id)}
                style={{
                  backgroundColor: darkColors.surface.primary,
                  borderColor: darkColors.border.primary,
                  boxShadow: darkColors.shadow.md,
                }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle style={{ color: darkColors.text.primary }}>{tenant.name}</CardTitle>
                    <ArrowRight
                      className="h-5 w-5 transition-all duration-300 group-hover:translate-x-1"
                      style={{ color: darkColors.brand.primary }}
                    />
                  </div>
                  <CardDescription style={{ color: darkColors.text.tertiary }}>{tenant.domain}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-3">
                    <EnhancedStatusBadge status={tenant.status} type="status" />
                    <EnhancedStatusBadge status={tenant.plan} type="plan" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p style={{ color: darkColors.text.quaternary }}>Usuarios</p>
                      <p className="font-medium" style={{ color: darkColors.text.primary }}>
                        {tenant.usage.currentUsers}/{tenant.settings.maxUsers}
                      </p>
                    </div>
                    <div>
                      <p style={{ color: darkColors.text.quaternary }}>Almacenamiento</p>
                      <p className="font-medium" style={{ color: darkColors.text.primary }}>
                        {tenant.usage.storageUsed}GB/{tenant.settings.maxStorage}GB
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => setShowCreateForm(true)}
              className="transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: darkColors.brand.primary,
                color: "#000000",
                boxShadow: darkColors.shadow.glow,
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Crear Nueva Organización
            </Button>
          </div>
        </div>
      ) : (
        <Card
          className="border max-w-md mx-auto"
          style={{
            backgroundColor: darkColors.surface.primary,
            borderColor: darkColors.border.primary,
            boxShadow: darkColors.shadow.lg,
          }}
        >
          <CardHeader>
            <CardTitle style={{ color: darkColors.text.primary }}>Crear Nueva Organización</CardTitle>
            <CardDescription style={{ color: darkColors.text.tertiary }}>
              Configura una nueva organización inquilino
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block" style={{ color: darkColors.text.secondary }}>
                Nombre de la Organización
              </label>
              <Input
                value={newTenantData.name}
                onChange={(e) => setNewTenantData({ ...newTenantData, name: e.target.value })}
                placeholder="Ingresa el nombre de la organización"
                style={{
                  backgroundColor: darkColors.surface.secondary,
                  borderColor: darkColors.border.secondary,
                  color: darkColors.text.primary,
                }}
                className="placeholder:text-gray-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block" style={{ color: darkColors.text.secondary }}>
                Dominio
              </label>
              <Input
                value={newTenantData.domain}
                onChange={(e) => setNewTenantData({ ...newTenantData, domain: e.target.value })}
                placeholder="tuorg.contaia.com"
                style={{
                  backgroundColor: darkColors.surface.secondary,
                  borderColor: darkColors.border.secondary,
                  color: darkColors.text.primary,
                }}
                className="placeholder:text-gray-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block" style={{ color: darkColors.text.secondary }}>
                Plan
              </label>
              <Select
                value={newTenantData.plan}
                onValueChange={(value) =>
                  setNewTenantData({ ...newTenantData, plan: value as "starter" | "professional" | "enterprise" })
                }
              >
                <SelectTrigger
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
                  <SelectItem value="starter" style={{ color: darkColors.text.primary }}>
                    Inicial (5 usuarios, 25GB)
                  </SelectItem>
                  <SelectItem value="professional" style={{ color: darkColors.text.primary }}>
                    Profesional (25 usuarios, 100GB)
                  </SelectItem>
                  <SelectItem value="enterprise" style={{ color: darkColors.text.primary }}>
                    Empresarial (100 usuarios, 500GB)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleCreateTenant}
                className="flex-1"
                style={{
                  backgroundColor: darkColors.brand.primary,
                  color: "#000000",
                }}
              >
                Crear Organización
              </Button>
              <Button
                onClick={() => setShowCreateForm(false)}
                variant="outline"
                className="flex-1"
                style={{
                  borderColor: darkColors.border.secondary,
                  color: darkColors.text.secondary,
                  backgroundColor: "transparent",
                }}
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
