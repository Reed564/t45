"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Calculator,
  BookOpen,
  DollarSign,
  Settings,
  Users,
  Database,
  AlertCircle,
  WifiOff,
} from "lucide-react"

interface DashboardOverviewProps {
  className?: string
}

export function DashboardOverview({ className }: DashboardOverviewProps) {
  return (
    <div className={`min-h-screen bg-[#0A0A0A] text-white ${className}`}>
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Panel Contable</h1>
              <p className="text-gray-400">Sistema de gestión contable</p>
            </div>
            <div className="flex items-center gap-2">
              <WifiOff className="h-4 w-4 text-red-400" />
              <Badge variant="outline" className="text-red-400 border-red-400/30">
                Sin conexión
              </Badge>
            </div>
          </div>
        </div>

        {/* Connection Status */}
        <div className="mb-8">
          <Card className="bg-[#1A1A1A] border-[#2E2E2E] border-orange-500/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-orange-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Sistema no conectado</h3>
                  <p className="text-gray-400">
                    Configure las integraciones con sus herramientas contables para comenzar
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-[#1A1A1A] border-[#2E2E2E]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Asientos</h3>
                <p className="text-sm font-medium text-gray-300">Contables</p>
                <p className="text-xs text-gray-500">Registro de transacciones</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A1A] border-[#2E2E2E]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-green-500/10">
                  <Calculator className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Cálculos</h3>
                <p className="text-sm font-medium text-gray-300">Automáticos</p>
                <p className="text-xs text-gray-500">Procesamiento IA</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A1A] border-[#2E2E2E]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-purple-500/10">
                  <FileText className="h-5 w-5 text-purple-500" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Reportes</h3>
                <p className="text-sm font-medium text-gray-300">Financieros</p>
                <p className="text-xs text-gray-500">Estados contables</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A1A] border-[#2E2E2E]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-orange-500/10">
                  <DollarSign className="h-5 w-5 text-orange-500" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Sincronización</h3>
                <p className="text-sm font-medium text-gray-300">Automática</p>
                <p className="text-xs text-gray-500">Con QuickBooks</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Setup Instructions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Getting Started */}
          <Card className="bg-[#1A1A1A] border-[#2E2E2E]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Settings className="h-5 w-5 text-[#00D9FF]" />
                Primeros Pasos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[#242424]">
                  <div className="w-6 h-6 rounded-full bg-[#00D9FF] flex items-center justify-center text-xs font-bold text-black">
                    1
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Conectar QuickBooks</p>
                    <p className="text-xs text-gray-400">Integre su sistema contable existente</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-[#242424]">
                  <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center text-xs font-bold text-white">
                    2
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-300">Sincronizar Datos</p>
                    <p className="text-xs text-gray-400">Importe su plan de cuentas y transacciones</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-[#242424]">
                  <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center text-xs font-bold text-white">
                    3
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-300">Configurar Usuarios</p>
                    <p className="text-xs text-gray-400">Asigne roles y permisos al equipo contable</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-[#242424]">
                  <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center text-xs font-bold text-white">
                    4
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-300">Activar IA</p>
                    <p className="text-xs text-gray-400">Inicie el procesamiento automático</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Actions */}
          <Card className="bg-[#1A1A1A] border-[#2E2E2E]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-xl">
                <Database className="h-5 w-5 text-[#00D9FF]" />
                Integraciones Disponibles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start border-[#2E2E2E] hover:border-[#00D9FF] hover:bg-[#00D9FF]/10"
                  disabled
                >
                  <div className="w-4 h-4 mr-2 bg-blue-500 rounded"></div>
                  Conectar QuickBooks
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start border-[#2E2E2E] hover:border-[#00D9FF] hover:bg-[#00D9FF]/10"
                  disabled
                >
                  <div className="w-4 h-4 mr-2 bg-green-500 rounded"></div>
                  Conectar Xero
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start border-[#2E2E2E] hover:border-[#00D9FF] hover:bg-[#00D9FF]/10"
                  disabled
                >
                  <div className="w-4 h-4 mr-2 bg-purple-500 rounded"></div>
                  Conectar SAP
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start border-[#2E2E2E] hover:border-[#00D9FF] hover:bg-[#00D9FF]/10"
                  disabled
                >
                  <div className="w-4 h-4 mr-2 bg-orange-500 rounded"></div>
                  Conectar NetSuite
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start border-[#2E2E2E] hover:border-[#00D9FF] hover:bg-[#00D9FF]/10"
                  disabled
                >
                  <Users className="h-4 w-4 mr-2" />
                  Gestionar Usuarios
                </Button>

                <div className="pt-4 border-t border-[#2E2E2E]">
                  <p className="text-xs text-gray-500 text-center">Configure una integración para comenzar</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Info */}
        <div className="mt-8">
          <Card className="bg-[#1A1A1A] border-[#2E2E2E]">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2">Sistema de Contabilidad IA</h3>
                <p className="text-gray-400 mb-4">
                  Automatice su contabilidad con inteligencia artificial y sincronice con sus herramientas existentes
                </p>
                <div className="flex justify-center gap-4 text-xs text-gray-500">
                  <span>• Integración con QuickBooks, Xero, SAP</span>
                  <span>• Procesamiento automático IA</span>
                  <span>• Cumplimiento NIIF/GAAP</span>
                  <span>• Sincronización en tiempo real</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
