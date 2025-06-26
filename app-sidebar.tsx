"use client"

import {
  BarChart3,
  Bot,
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Upload,
  FileText,
  Activity,
  Plug,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { useTenant } from "@/hooks/use-tenant"
import { EnhancedStatusBadge } from "@/components/ui/enhanced-status-badge"
import { darkColors } from "@/lib/dark-design-system"

interface AppSidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const menuItems = [
  { id: "dashboard", title: "Panel de Control", icon: LayoutDashboard, permission: "dashboard" },
  { id: "documents-upload", title: "Subir Documentos", icon: Upload, permission: "workflows" },
  { id: "documents-library", title: "Biblioteca", icon: FileText, permission: "workflows" },
  { id: "documents-processing", title: "Procesamiento IA", icon: Activity, permission: "ai-review" },
  { id: "workflows", title: "Flujos de Trabajo", icon: BarChart3, permission: "workflows" },
  { id: "ai-review", title: "Revisión IA", icon: Bot, permission: "ai-review" },
  { id: "ai-chat", title: "Asistente IA", icon: Bot, permission: "ai-review" },
  { id: "integrations", title: "Integraciones", icon: Plug, permission: "workflows" },
  { id: "user-management", title: "Gestión de Usuarios", icon: Users, permission: "user-management" },
]

export function AppSidebar({ activeSection, setActiveSection }: AppSidebarProps) {
  const { currentTenant, currentUser, hasPermission } = useTenant()

  return (
    <Sidebar
      className="border-r backdrop-blur-sm"
      style={{
        backgroundColor: darkColors.background.secondary,
        borderColor: darkColors.border.primary,
      }}
    >
      <SidebarHeader className="p-6 border-b" style={{ borderColor: darkColors.border.primary }}>
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl shadow-lg"
            style={{
              background: darkColors.gradient.primary,
              boxShadow: darkColors.shadow.glow,
            }}
          >
            <Bot className="h-5 w-5 text-black font-bold" />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="font-bold text-lg truncate" style={{ color: darkColors.text.primary }}>
              {currentTenant?.name}
            </span>
            <div className="flex items-center gap-2">
              {currentTenant && (
                <>
                  <EnhancedStatusBadge status={currentTenant.status} type="status" size="sm" />
                  <span className="text-xs" style={{ color: darkColors.text.quaternary }}>
                    {currentTenant.plan}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent style={{ backgroundColor: darkColors.background.secondary }}>
        <SidebarGroup className="px-3 py-4">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => {
                const hasAccess = hasPermission(item.permission) || item.permission === "dashboard"
                const isActive = activeSection === item.id
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => hasAccess && setActiveSection(item.id)}
                      disabled={!hasAccess}
                      className={`w-full justify-start px-4 py-3 rounded-xl transition-all duration-300 group ${
                        !hasAccess ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                      }`}
                      style={{
                        backgroundColor: isActive ? darkColors.brand.primary : "transparent",
                        color: isActive
                          ? "#000000"
                          : hasAccess
                            ? darkColors.text.secondary
                            : darkColors.text.quaternary,
                        boxShadow: isActive ? darkColors.shadow.glow : "none",
                        ...(hasAccess && !isActive
                          ? {
                              ":hover": {
                                backgroundColor: darkColors.surface.hover,
                                color: darkColors.text.primary,
                              },
                            }
                          : {}),
                      }}
                    >
                      <item.icon className={`h-5 w-5 ${isActive ? "text-black" : ""} transition-colors duration-300`} />
                      <span className={`font-semibold ${isActive ? "text-black" : ""} transition-colors duration-300`}>
                        {item.title}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t" style={{ borderColor: darkColors.border.primary }}>
        <div className="space-y-3">
          <div className="text-xs">
            <p style={{ color: darkColors.text.quaternary }}>Conectado como</p>
            <p className="font-semibold truncate" style={{ color: darkColors.text.primary }}>
              {currentUser?.name}
            </p>
            <p className="truncate" style={{ color: darkColors.text.tertiary }}>
              {currentUser?.email}
            </p>
            <div className="mt-2">
              <EnhancedStatusBadge status={currentUser?.role || ""} type="role" size="sm" />
            </div>
          </div>
          <div className="flex gap-2">
            <SidebarMenuButton
              className="flex-1 transition-all duration-200"
              style={{
                color: darkColors.text.tertiary,
                ":hover": {
                  backgroundColor: darkColors.surface.hover,
                  color: darkColors.text.primary,
                },
              }}
            >
              <Settings className="h-4 w-4" />
            </SidebarMenuButton>
            <SidebarMenuButton
              className="flex-1 transition-all duration-200"
              style={{
                color: darkColors.text.tertiary,
                ":hover": {
                  backgroundColor: darkColors.status.error[50],
                  color: darkColors.status.error[500],
                },
              }}
            >
              <LogOut className="h-4 w-4" />
            </SidebarMenuButton>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
