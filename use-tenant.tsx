"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User, Tenant } from "@/types"

interface TenantContextType {
  currentTenant: Tenant | null
  currentUser: User | null
  tenants: Tenant[]
  users: User[]
  switchTenant: (tenantId: string) => void
  createTenant: (tenant: Omit<Tenant, "id" | "createdAt" | "usage">) => void
  updateTenant: (tenantId: string, updates: Partial<Tenant>) => void
  inviteUser: (email: string, role: string, tenantId: string) => void
  updateUserRole: (userId: string, role: string) => void
  removeUser: (userId: string) => void
  hasPermission: (permission: string) => boolean
}

const TenantContext = createContext<TenantContextType | undefined>(undefined)

const MOCK_TENANTS: Tenant[] = [
  {
    id: "tenant-1",
    name: "Acme Corporation",
    domain: "acme.contaia.com",
    plan: "professional",
    status: "active",
    createdAt: "2024-01-15",
    settings: {
      maxUsers: 25,
      maxStorage: 100,
      maxProcessingHours: 500,
      features: ["ai-insights", "advanced-workflows", "custom-reports"],
    },
    usage: {
      currentUsers: 12,
      storageUsed: 45.2,
      processingHoursUsed: 234,
      lastUpdated: "2024-06-24",
    },
  },
  {
    id: "tenant-2",
    name: "TechStart Inc",
    domain: "techstart.contaia.com",
    plan: "starter",
    status: "trial",
    createdAt: "2024-06-01",
    settings: {
      maxUsers: 5,
      maxStorage: 25,
      maxProcessingHours: 100,
      features: ["basic-workflows"],
    },
    usage: {
      currentUsers: 3,
      storageUsed: 8.7,
      processingHoursUsed: 45,
      lastUpdated: "2024-06-24",
    },
  },
]

const MOCK_USERS: User[] = [
  {
    id: "user-1",
    email: "admin@acme.com",
    name: "John Admin",
    role: "admin",
    tenantId: "tenant-1",
    permissions: ["all"],
    lastActive: "2024-06-24 14:30",
    status: "active",
  },
  {
    id: "user-2",
    email: "manager@acme.com",
    name: "Sarah Manager",
    role: "manager",
    tenantId: "tenant-1",
    permissions: ["workflows", "ai-review", "reports", "user-management"],
    lastActive: "2024-06-24 12:15",
    status: "active",
  },
  {
    id: "user-3",
    email: "user@acme.com",
    name: "Mike User",
    role: "user",
    tenantId: "tenant-1",
    permissions: ["workflows", "reports"],
    lastActive: "2024-06-23 16:45",
    status: "active",
  },
]

const getPermissionsByRole = (role: string): string[] => {
  const permissions = {
    admin: ["all"],
    manager: ["workflows", "ai-review", "reports", "user-management"],
    user: ["workflows", "reports"],
  }
  return permissions[role as keyof typeof permissions] || []
}

const getPlanSettings = (plan: string) => {
  const settings = {
    starter: {
      maxUsers: 5,
      maxStorage: 25,
      maxProcessingHours: 100,
      features: ["basic-workflows"],
    },
    professional: {
      maxUsers: 25,
      maxStorage: 100,
      maxProcessingHours: 500,
      features: ["ai-insights", "advanced-workflows", "custom-reports"],
    },
    enterprise: {
      maxUsers: 100,
      maxStorage: 500,
      maxProcessingHours: 2000,
      features: ["ai-insights", "advanced-workflows", "custom-reports", "api-access", "sso"],
    },
  }
  return settings[plan as keyof typeof settings] || settings.starter
}

export function TenantProvider({ children }: { children: ReactNode }) {
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    setTenants(MOCK_TENANTS)
    setUsers(MOCK_USERS)
    setCurrentTenant(MOCK_TENANTS[0])
    setCurrentUser(MOCK_USERS[0])
  }, [])

  const switchTenant = (tenantId: string) => {
    const tenant = tenants.find((t) => t.id === tenantId)
    if (tenant) {
      setCurrentTenant(tenant)
      const tenantUser = users.find((u) => u.tenantId === tenantId)
      setCurrentUser(tenantUser || null)
    }
  }

  const createTenant = (tenantData: Omit<Tenant, "id" | "createdAt" | "usage">) => {
    const newTenant: Tenant = {
      ...tenantData,
      id: `tenant-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      usage: {
        currentUsers: 0,
        storageUsed: 0,
        processingHoursUsed: 0,
        lastUpdated: new Date().toISOString().split("T")[0],
      },
    }
    setTenants([...tenants, newTenant])
  }

  const updateTenant = (tenantId: string, updates: Partial<Tenant>) => {
    setTenants(tenants.map((t) => (t.id === tenantId ? { ...t, ...updates } : t)))
    if (currentTenant?.id === tenantId) {
      setCurrentTenant({ ...currentTenant, ...updates })
    }
  }

  const inviteUser = (email: string, role: string, tenantId: string) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name: email.split("@")[0],
      role: role as "admin" | "manager" | "user",
      tenantId,
      permissions: getPermissionsByRole(role),
      lastActive: "Never",
      status: "pending",
    }
    setUsers([...users, newUser])
  }

  const updateUserRole = (userId: string, role: string) => {
    setUsers(
      users.map((u) =>
        u.id === userId
          ? { ...u, role: role as "admin" | "manager" | "user", permissions: getPermissionsByRole(role) }
          : u,
      ),
    )
  }

  const removeUser = (userId: string) => {
    setUsers(users.filter((u) => u.id !== userId))
  }

  const hasPermission = (permission: string): boolean => {
    if (!currentUser) return false
    return currentUser.permissions.includes("all") || currentUser.permissions.includes(permission)
  }

  return (
    <TenantContext.Provider
      value={{
        currentTenant,
        currentUser,
        tenants,
        users: users.filter((u) => u.tenantId === currentTenant?.id),
        switchTenant,
        createTenant,
        updateTenant,
        inviteUser,
        updateUserRole,
        removeUser,
        hasPermission,
      }}
    >
      {children}
    </TenantContext.Provider>
  )
}

export function useTenant() {
  const context = useContext(TenantContext)
  if (context === undefined) {
    throw new Error("useTenant must be used within a TenantProvider")
  }
  return context
}

export { getPlanSettings }
