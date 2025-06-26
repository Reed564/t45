"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserPlus, Mail, Shield, Trash2, Users } from "lucide-react"
import { useTenant } from "@/hooks/use-tenant"
import { EnhancedStatusBadge } from "@/components/ui/enhanced-status-badge"
import { StatCard } from "@/components/ui/stat-card"
import { darkColors } from "@/lib/dark-design-system"

export function UserManagement() {
  const { currentTenant, users, inviteUser, updateUserRole, removeUser, hasPermission } = useTenant()
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("user")
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)

  const handleInviteUser = () => {
    if (inviteEmail && currentTenant) {
      inviteUser(inviteEmail, inviteRole, currentTenant.id)
      setInviteEmail("")
      setInviteRole("user")
      setIsInviteDialogOpen(false)
    }
  }

  if (!hasPermission("user-management")) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Shield className="h-12 w-12 mx-auto mb-4" style={{ color: darkColors.text.quaternary }} />
          <h2 className="text-xl font-semibold mb-2" style={{ color: darkColors.text.primary }}>
            Acceso Denegado
          </h2>
          <p style={{ color: darkColors.text.tertiary }}>No tienes permisos para acceder a la gestión de usuarios.</p>
        </div>
      </div>
    )
  }

  const userCounts = {
    active: users.filter((u) => u.status === "active").length,
    pending: users.filter((u) => u.status === "pending").length,
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: darkColors.text.primary }}>
            Gestión de Usuarios
          </h1>
          <p className="text-lg" style={{ color: darkColors.text.secondary }}>
            Gestiona usuarios y permisos para {currentTenant?.name}
          </p>
        </div>
        <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="transition-all duration-300"
              style={{
                backgroundColor: darkColors.brand.primary,
                color: "#000000",
              }}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Invitar Usuario
            </Button>
          </DialogTrigger>
          <DialogContent
            className="max-w-md"
            style={{
              backgroundColor: darkColors.background.overlay,
              borderColor: darkColors.border.secondary,
            }}
          >
            <DialogHeader>
              <DialogTitle style={{ color: darkColors.text.primary }}>Invitar Nuevo Usuario</DialogTitle>
              <DialogDescription style={{ color: darkColors.text.tertiary }}>
                Envía una invitación para unirse a {currentTenant?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block" style={{ color: darkColors.text.secondary }}>
                  Correo Electrónico
                </label>
                <Input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="usuario@ejemplo.com"
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
                  Rol
                </label>
                <Select value={inviteRole} onValueChange={setInviteRole}>
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
                    <SelectItem value="user" style={{ color: darkColors.text.primary }}>
                      Usuario - Acceso básico
                    </SelectItem>
                    <SelectItem value="manager" style={{ color: darkColors.text.primary }}>
                      Gerente - Funciones avanzadas
                    </SelectItem>
                    <SelectItem value="admin" style={{ color: darkColors.text.primary }}>
                      Administrador - Acceso completo
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleInviteUser}
                  className="flex-1"
                  style={{
                    backgroundColor: darkColors.brand.primary,
                    color: "#000000",
                  }}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Enviar Invitación
                </Button>
                <Button
                  onClick={() => setIsInviteDialogOpen(false)}
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
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Total de Usuarios"
          value={users.length.toString()}
          description={`de ${currentTenant?.settings.maxUsers} permitidos`}
          icon={Users}
          color={darkColors.brand.primary}
          bgColor={darkColors.status.info[50]}
        />
        <StatCard
          title="Usuarios Activos"
          value={userCounts.active.toString()}
          description="Actualmente activos"
          icon={Users}
          color={darkColors.status.success[500]}
          bgColor={darkColors.status.success[50]}
        />
        <StatCard
          title="Invitaciones Pendientes"
          value={userCounts.pending.toString()}
          description="Esperando aceptación"
          icon={Mail}
          color={darkColors.status.warning[500]}
          bgColor={darkColors.status.warning[50]}
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
          <CardTitle style={{ color: darkColors.text.primary }}>Miembros del Equipo</CardTitle>
          <CardDescription style={{ color: darkColors.text.tertiary }}>
            Gestiona roles y permisos de usuarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 rounded-lg border transition-all duration-300 hover:scale-[1.01]"
                style={{
                  backgroundColor: darkColors.surface.secondary,
                  borderColor: darkColors.border.primary,
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-black font-bold shadow-lg"
                    style={{
                      background: darkColors.gradient.primary,
                      boxShadow: darkColors.shadow.glow,
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold" style={{ color: darkColors.text.primary }}>
                      {user.name}
                    </h3>
                    <p className="text-sm" style={{ color: darkColors.text.tertiary }}>
                      {user.email}
                    </p>
                    <p className="text-xs" style={{ color: darkColors.text.quaternary }}>
                      Última actividad: {user.lastActive}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <EnhancedStatusBadge status={user.role} type="role" />
                  <EnhancedStatusBadge status={user.status} type="status" />
                  <div className="flex gap-2">
                    <Select value={user.role} onValueChange={(role) => updateUserRole(user.id, role)}>
                      <SelectTrigger
                        className="w-24"
                        style={{
                          backgroundColor: darkColors.surface.tertiary,
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
                        <SelectItem value="user" style={{ color: darkColors.text.primary }}>
                          Usuario
                        </SelectItem>
                        <SelectItem value="manager" style={{ color: darkColors.text.primary }}>
                          Gerente
                        </SelectItem>
                        <SelectItem value="admin" style={{ color: darkColors.text.primary }}>
                          Admin
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeUser(user.id)}
                      className="transition-all duration-200"
                      style={{
                        borderColor: darkColors.border.secondary,
                        color: darkColors.text.secondary,
                        backgroundColor: "transparent",
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
