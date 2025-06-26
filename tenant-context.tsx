"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  role: "admin" | "manager" | "user"
  tenantId: string
  permissions: string[]
  lastActive: string
  status: "active" | "inactive" | "pending"
}

interface Tenant {
  id: string
  name: string
  domain: string
  plan: "starter" | "professional" | "enterprise"
  status: "active" | "suspended" | "trial"
  createdAt: string
  settings: {
    maxUsers: number
    maxStorage: number // in GB
    maxProcessingHours: number // per month
    features: string[]
  }
  usage: {
    currentUsers: number
    storageUsed: number // in GB
    processingHoursUsed: number
    lastUpdated: string
  }
}

interface TenantContextType {
  currentTenant: Tenant | null
  currentUser: User | null
  userRole: string
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

export function TenantProvider({ children }: { children: ReactNode }) {
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [users, setUsers] = useState<User[]>([])

  // Mock data initialization
  useEffect(() => {
    const mockTenants: Tenant[] = [
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

    const mockUsers: User[] = [
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
        permissions: ["workflows", "ai-review", "reports"],
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

    setTenants(mockTenants)
    setUsers(mockUsers)
    setCurrentTenant(mockTenants[0])
    setCurrentUser(mockUsers[0])
  }, [])

  const switchTenant = (tenantId: string) => {
    const tenant = tenants.find((t) => t.id === tenantId)
    if (tenant) {
      setCurrentTenant(tenant)
      // In a real app, this would also switch the user context
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

  const getPermissionsByRole = (role: string): string[] => {
    switch (role) {
      case "admin":
        return ["all"]
      case "manager":
        return ["workflows", "ai-review", "reports", "user-management"]
      case "user":
        return ["workflows", "reports"]
      default:
        return []
    }
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
        userRole: currentUser?.role || "user",
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
