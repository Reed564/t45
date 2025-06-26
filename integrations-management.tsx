"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Plus, Search, Zap, WifiOff, Crown, Settings } from "lucide-react"
import { darkColors, darkColorUtils } from "@/lib/dark-design-system"

interface Integration {
  id: string
  name: string
  description: string
  category: "primary-accounting" | "support-tool" | "payment" | "storage"
  status: "connected" | "disconnected"
  isPopular: boolean
  logo: string
  provider: string
  features: string[]
  pricing: "free" | "paid" | "freemium"
  setupComplexity: "easy" | "medium" | "advanced"
  isPrimary?: boolean
}

const availableIntegrations: Integration[] = [
  // Sistemas Contables Principales (solo uno puede estar conectado)
  {
    id: "quickbooks",
    name: "QuickBooks Online",
    description: "Sistema contable principal para gestión financiera completa",
    category: "primary-accounting",
    status: "disconnected",
    isPopular: true,
    logo: "QB",
    provider: "Intuit",
    features: ["Contabilidad completa", "Facturación", "Reportes financieros", "Conciliación bancaria"],
    pricing: "paid",
    setupComplexity: "easy",
  },
  {
    id: "xero",
    name: "Xero",
    description: "Sistema contable principal con funcionalidades avanzadas",
    category: "primary-accounting",
    status: "disconnected",
    isPopular: true,
    logo: "XR",
    provider: "Xero Limited",
    features: ["Contabilidad en tiempo real", "Facturación", "Inventario", "Nómina"],
    pricing: "paid",
    setupComplexity: "medium",
  },
  {
    id: "sage",
    name: "Sage 50",
    description: "Sistema contable robusto para empresas medianas",
    category: "primary-accounting",
    status: "disconnected",
    isPopular: false,
    logo: "SG",
    provider: "Sage Group",
    features: ["Gestión financiera", "Control de inventario", "Reportes avanzados"],
    pricing: "paid",
    setupComplexity: "advanced",
  },
  // Herramientas de Soporte (múltiples pueden estar conectadas)
  {
    id: "excel",
    name: "Microsoft Excel",
    description: "Herramienta de soporte para análisis y reportes personalizados",
    category: "support-tool",
    status: "disconnected",
    isPopular: true,
    logo: "XL",
    provider: "Microsoft",
    features: ["Importación automática", "Procesamiento IA", "Análisis avanzado", "Reportes personalizados"],
    pricing: "freemium",
    setupComplexity: "easy",
  },
  {
    id: "google-sheets",
    name: "Google Sheets",
    description: "Herramienta colaborativa para análisis y reportes en la nube",
    category: "support-tool",
    status: "disconnected",
    isPopular: true,
    logo: "GS",
    provider: "Google",
    features: ["Colaboración en tiempo real", "Importación automática", "Dashboards", "Análisis de datos"],
    pricing: "freemium",
    setupComplexity: "easy",
  },
  // Otras herramientas
  {
    id: "stripe",
    name: "Stripe",
    description: "Procesamiento de pagos y conciliación automática",
    category: "payment",
    status: "disconnected",
    isPopular: true,
    logo: "ST",
    provider: "Stripe Inc.",
    features: ["Procesamiento de pagos", "Conciliación automática", "Reportes de ingresos"],
    pricing: "freemium",
    setupComplexity: "easy",
  },
]

const statusConfig = {
  connected: {
    color: darkColors.status.success[500],
    icon: CheckCircle,
    text: "Conectado",
    bgColor: darkColors.status.success[50],
  },
  disconnected: {
    color: darkColors.text.quaternary,
    icon: WifiOff,
    text: "No conectado",
    bgColor: darkColors.surface.tertiary,
  },
}

const categoryConfig = {
  "primary-accounting": { name: "Sistema Contable Principal", color: darkColors.brand.primary, icon: Crown },
  "support-tool": { name: "Herramienta de Soporte", color: darkColors.status.info[500], icon: Settings },
  payment: { name: "Pagos", color: darkColors.status.warning[500], icon: Zap },
  storage: { name: "Almacenamiento", color: darkColors.text.secondary, icon: Settings },
}

export function IntegrationsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)
  const [integrations, setIntegrations] = useState(availableIntegrations)

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesSearch =
      integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || integration.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const primaryAccountingSystem = integrations.find(
    (i) => i.category === "primary-accounting" && i.status === "connected",
  )
  const connectedSupport = integrations.filter((i) => i.category === "support-tool" && i.status === "connected").length
  const connectedTotal = integrations.filter((i) => i.status === "connected").length

  const handleConnect = (integrationId: string) => {
    setIntegrations((prev) =>
      prev.map((integration) => {
        if (integration.id === integrationId) {
          // Si es un sistema contable principal, desconectar otros sistemas principales
          if (integration.category === "primary-accounting") {
            const updatedIntegrations = prev.map((i) =>
              i.category === "primary-accounting" && i.id !== integrationId
                ? { ...i, status: "disconnected" as const }
                : i,
            )
            return { ...integration, status: "connected" as const }
          }
          return { ...integration, status: "connected" as const }
        }
        return integration
      }),
    )
  }

  const handleDisconnect = (integrationId: string) => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === integrationId ? { ...integration, status: "disconnected" as const } : integration,
      ),
    )
  }

  // Agrupar integraciones por categoría
  const primaryAccounting = filteredIntegrations.filter((i) => i.category === "primary-accounting")
  const supportTools = filteredIntegrations.filter((i) => i.category === "support-tool")
  const otherIntegrations = filteredIntegrations.filter(
    (i) => i.category !== "primary-accounting" && i.category !== "support-tool",
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: darkColors.text.primary }}>
            Integraciones
          </h1>
          <p className="text-sm" style={{ color: darkColors.text.tertiary }}>
            Configura tu sistema contable principal y herramientas de soporte
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-3 py-1">
            {connectedTotal} Conectadas
          </Badge>
          {primaryAccountingSystem && (
            <Badge className="px-3 py-1 bg-amber-500/20 text-amber-400 border-amber-500/30">
              <Crown className="w-3 h-3 mr-1" />
              {primaryAccountingSystem.name}
            </Badge>
          )}
        </div>
      </div>

      {/* Status Overview */}
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
                  {primaryAccountingSystem ? primaryAccountingSystem.name : "No seleccionado"}
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
                  Herramientas de Soporte
                </p>
                <p className="text-sm" style={{ color: darkColors.text.tertiary }}>
                  {connectedSupport} conectadas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: darkColors.surface.primary, borderColor: darkColors.border.primary }}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8" style={{ color: darkColors.status.success[500] }} />
              <div>
                <p className="font-medium" style={{ color: darkColors.text.primary }}>
                  Total Conectadas
                </p>
                <p className="text-sm" style={{ color: darkColors.text.tertiary }}>
                  {connectedTotal} de {integrations.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Primary System Alert */}
      {!primaryAccountingSystem && (
        <Alert className="border-amber-500/30 bg-amber-500/10">
          <Crown className="h-4 w-4 text-amber-400" />
          <AlertDescription className="text-amber-200">
            Selecciona tu sistema contable principal para comenzar. Solo puedes tener uno activo a la vez.
          </AlertDescription>
        </Alert>
      )}

      {/* Search */}
      <Card style={{ backgroundColor: darkColors.surface.primary, borderColor: darkColors.border.primary }}>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                style={{ color: darkColors.text.quaternary }}
              />
              <Input
                placeholder="Buscar integraciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList>
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="primary-accounting">Principales</TabsTrigger>
                <TabsTrigger value="support-tool">Soporte</TabsTrigger>
                <TabsTrigger value="payment">Pagos</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Primary Accounting Systems */}
      {(selectedCategory === "all" || selectedCategory === "primary-accounting") && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5" style={{ color: darkColors.brand.primary }} />
            <h2 className="text-xl font-semibold" style={{ color: darkColors.text.primary }}>
              Sistema Contable Principal
            </h2>
            <Badge variant="outline" className="text-xs">
              Solo uno permitido
            </Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {primaryAccounting.map((integration) => (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                onConnect={handleConnect}
                onDisconnect={handleDisconnect}
                onSelect={setSelectedIntegration}
                isPrimarySystem={true}
                isOnlyPrimaryConnected={!!primaryAccountingSystem && primaryAccountingSystem.id !== integration.id}
              />
            ))}
          </div>
        </div>
      )}

      {/* Support Tools */}
      {(selectedCategory === "all" || selectedCategory === "support-tool") && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5" style={{ color: darkColors.status.info[500] }} />
            <h2 className="text-xl font-semibold" style={{ color: darkColors.text.primary }}>
              Herramientas de Soporte
            </h2>
            <Badge variant="outline" className="text-xs">
              Múltiples permitidas
            </Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {supportTools.map((integration) => (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                onConnect={handleConnect}
                onDisconnect={handleDisconnect}
                onSelect={setSelectedIntegration}
                isPrimarySystem={false}
              />
            ))}
          </div>
        </div>
      )}

      {/* Other Integrations */}
      {otherIntegrations.length > 0 && (selectedCategory === "all" || selectedCategory === "payment") && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold" style={{ color: darkColors.text.primary }}>
            Otras Integraciones
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {otherIntegrations.map((integration) => (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                onConnect={handleConnect}
                onDisconnect={handleDisconnect}
                onSelect={setSelectedIntegration}
                isPrimarySystem={false}
              />
            ))}
          </div>
        </div>
      )}

      {/* Integration Detail Dialog */}
      {selectedIntegration && (
        <IntegrationDialog
          integration={selectedIntegration}
          onClose={() => setSelectedIntegration(null)}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
          isPrimarySystem={selectedIntegration.category === "primary-accounting"}
          isOnlyPrimaryConnected={!!primaryAccountingSystem && primaryAccountingSystem.id !== selectedIntegration.id}
        />
      )}
    </div>
  )
}

// Componente para cada tarjeta de integración
function IntegrationCard({
  integration,
  onConnect,
  onDisconnect,
  onSelect,
  isPrimarySystem,
  isOnlyPrimaryConnected = false,
}: {
  integration: Integration
  onConnect: (id: string) => void
  onDisconnect: (id: string) => void
  onSelect: (integration: Integration) => void
  isPrimarySystem: boolean
  isOnlyPrimaryConnected?: boolean
}) {
  const config = statusConfig[integration.status]
  const StatusIcon = config.icon
  const categoryInfo = categoryConfig[integration.category]
  const CategoryIcon = categoryInfo.icon

  const isDisabled = isPrimarySystem && isOnlyPrimaryConnected

  return (
    <Card
      className={`border transition-all duration-300 hover:scale-[1.02] cursor-pointer group ${
        isDisabled ? "opacity-50" : ""
      }`}
      style={{
        backgroundColor: darkColors.surface.primary,
        borderColor: integration.status === "connected" ? categoryInfo.color : darkColors.border.primary,
      }}
      onClick={() => onSelect(integration)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-black font-bold text-sm shadow-lg transition-all duration-300 group-hover:scale-110"
              style={{
                backgroundColor: categoryInfo.color,
                boxShadow: `0 0 15px ${darkColorUtils.withOpacity(categoryInfo.color, 0.3)}`,
              }}
            >
              {integration.logo}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold truncate" style={{ color: darkColors.text.primary }}>
                  {integration.name}
                </h3>
                {isPrimarySystem && integration.status === "connected" && (
                  <Crown className="w-4 h-4" style={{ color: darkColors.brand.primary }} />
                )}
                {integration.isPopular && (
                  <Badge variant="secondary" className="text-xs">
                    <Zap className="w-3 h-3 mr-1" />
                    Popular
                  </Badge>
                )}
              </div>
              <p className="text-xs" style={{ color: darkColors.text.tertiary }}>
                {integration.provider}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <CategoryIcon className="w-4 h-4" style={{ color: categoryInfo.color }} />
            <StatusIcon className="w-4 h-4" style={{ color: config.color }} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm mb-4 line-clamp-2" style={{ color: darkColors.text.secondary }}>
          {integration.description}
        </p>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge
              variant="outline"
              className="text-xs"
              style={{
                borderColor: categoryInfo.color,
                color: categoryInfo.color,
              }}
            >
              <CategoryIcon className="w-3 h-3 mr-1" />
              {categoryInfo.name}
            </Badge>
            <Badge
              variant="outline"
              className="text-xs"
              style={{
                backgroundColor: config.bgColor,
                borderColor: config.color,
                color: config.color,
              }}
            >
              {config.text}
            </Badge>
          </div>

          <div className="flex gap-2">
            {integration.status === "connected" ? (
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation()
                  onDisconnect(integration.id)
                }}
              >
                Desconectar
              </Button>
            ) : (
              <Button
                size="sm"
                className="flex-1"
                disabled={isDisabled}
                onClick={(e) => {
                  e.stopPropagation()
                  onConnect(integration.id)
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Conectar
              </Button>
            )}
          </div>

          {isDisabled && (
            <p className="text-xs text-center" style={{ color: darkColors.text.quaternary }}>
              Desconecta el sistema actual primero
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Componente del diálogo de detalles
function IntegrationDialog({
  integration,
  onClose,
  onConnect,
  onDisconnect,
  isPrimarySystem,
  isOnlyPrimaryConnected,
}: {
  integration: Integration
  onClose: () => void
  onConnect: (id: string) => void
  onDisconnect: (id: string) => void
  isPrimarySystem: boolean
  isOnlyPrimaryConnected: boolean
}) {
  const categoryInfo = categoryConfig[integration.category]
  const isDisabled = isPrimarySystem && isOnlyPrimaryConnected

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-black font-bold text-sm shadow-lg"
              style={{
                backgroundColor: categoryInfo.color,
              }}
            >
              {integration.logo}
            </div>
            <div>
              <DialogTitle className="text-xl flex items-center gap-2">
                {integration.name}
                {isPrimarySystem && integration.status === "connected" && (
                  <Crown className="w-5 h-5" style={{ color: darkColors.brand.primary }} />
                )}
              </DialogTitle>
              <DialogDescription>{integration.provider}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Actions */}
          <div
            className="flex items-center justify-between p-4 rounded-lg"
            style={{ backgroundColor: darkColors.surface.secondary }}
          >
            <div className="flex items-center gap-3">
              <categoryInfo.icon className="w-5 h-5" style={{ color: categoryInfo.color }} />
              <div>
                <p className="font-medium" style={{ color: darkColors.text.primary }}>
                  {categoryInfo.name}
                </p>
                <p className="text-sm" style={{ color: darkColors.text.tertiary }}>
                  {integration.status === "connected" ? "Conectado y funcionando" : "Listo para conectar"}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {integration.status === "connected" ? (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    onDisconnect(integration.id)
                    onClose()
                  }}
                >
                  Desconectar
                </Button>
              ) : (
                <Button
                  size="sm"
                  disabled={isDisabled}
                  onClick={() => {
                    onConnect(integration.id)
                    onClose()
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Conectar
                </Button>
              )}
            </div>
          </div>

          {/* Primary System Warning */}
          {isPrimarySystem && isDisabled && (
            <Alert className="border-amber-500/30 bg-amber-500/10">
              <Crown className="h-4 w-4 text-amber-400" />
              <AlertDescription className="text-amber-200">
                Solo puedes tener un sistema contable principal conectado. Desconecta el sistema actual para cambiar.
              </AlertDescription>
            </Alert>
          )}

          {/* Description and Features */}
          <div>
            <h4 className="font-semibold mb-2" style={{ color: darkColors.text.primary }}>
              Descripción
            </h4>
            <p style={{ color: darkColors.text.secondary }}>{integration.description}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3" style={{ color: darkColors.text.primary }}>
              Características
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {integration.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" style={{ color: darkColors.status.success[500] }} />
                  <span className="text-sm" style={{ color: darkColors.text.secondary }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
