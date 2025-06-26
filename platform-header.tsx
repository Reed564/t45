"use client"

import type React from "react"

import { Bot, Settings, Bell, HelpCircle, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTenant } from "@/hooks/use-tenant"
import { EnhancedStatusBadge } from "@/components/ui/enhanced-status-badge"
import { darkColors, darkColorUtils } from "@/lib/dark-design-system"

export function PlatformHeader() {
  const { currentTenant, currentUser } = useTenant()

  return (
    <header
      className="border-b shadow-lg sticky top-0 z-50 backdrop-blur-sm"
      style={{
        backgroundColor: darkColorUtils.withOpacity(darkColors.background.secondary, 0.95),
        borderColor: darkColors.border.primary,
        boxShadow: darkColors.shadow.md,
      }}
    >
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-xl shadow-lg"
              style={{
                background: darkColors.gradient.primary,
                boxShadow: darkColors.shadow.glow,
              }}
            >
              <Bot className="w-5 h-5 text-black font-bold" />
            </div>
            <div>
              <h1 className="text-xl font-bold" style={{ color: darkColors.text.primary }}>
                ContaIA
              </h1>
              <p className="text-sm" style={{ color: darkColors.text.tertiary }}>
                Automatización Contable con IA
              </p>
            </div>
          </div>

          {currentTenant && (
            <div
              className="flex items-center gap-3 ml-6 pl-6 border-l"
              style={{ borderColor: darkColors.border.primary }}
            >
              <span className="text-sm font-medium" style={{ color: darkColors.text.secondary }}>
                {currentTenant.name}
              </span>
              <EnhancedStatusBadge status={currentTenant.status} type="status" />
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="transition-all duration-200"
            style={
              {
                color: darkColors.text.tertiary,
                "--hover-bg": darkColors.surface.hover,
              } as React.CSSProperties
            }
          >
            <HelpCircle className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="relative transition-all duration-200"
            style={
              {
                color: darkColors.text.tertiary,
                "--hover-bg": darkColors.surface.hover,
              } as React.CSSProperties
            }
          >
            <Bell className="w-4 h-4" />
            <Badge
              className="absolute -top-1 -right-1 w-2 h-2 p-0 border-0 animate-pulse"
              style={{ backgroundColor: darkColors.status.error[500] }}
            />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 transition-all duration-200"
                style={
                  {
                    "--hover-bg": darkColors.surface.hover,
                  } as React.CSSProperties
                }
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-black text-sm font-bold shadow-md"
                  style={{
                    background: darkColors.gradient.primary,
                  }}
                >
                  {currentUser?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium" style={{ color: darkColors.text.secondary }}>
                  {currentUser?.name}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 border shadow-xl backdrop-blur-sm"
              style={{
                backgroundColor: darkColors.background.overlay,
                borderColor: darkColors.border.secondary,
                boxShadow: darkColors.shadow.lg,
              }}
            >
              <DropdownMenuItem
                className="transition-colors duration-200"
                style={{
                  color: darkColors.text.secondary,
                  "--hover-bg": darkColors.surface.hover,
                }}
              >
                <User className="w-4 h-4 mr-2" />
                Configuración de Perfil
              </DropdownMenuItem>
              <DropdownMenuItem
                className="transition-colors duration-200"
                style={{
                  color: darkColors.text.secondary,
                  "--hover-bg": darkColors.surface.hover,
                }}
              >
                <Settings className="w-4 h-4 mr-2" />
                Configuración de Cuenta
              </DropdownMenuItem>
              <DropdownMenuSeparator style={{ backgroundColor: darkColors.border.primary }} />
              <DropdownMenuItem
                className="transition-colors duration-200"
                style={{
                  color: darkColors.status.error[500],
                  "--hover-bg": darkColors.status.error[50],
                }}
              >
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
