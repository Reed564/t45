"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  role: "system-admin" | "client-admin" | "manager" | "user"
  clientId: string | null
  permissions: string[]
  lastActive: string
  status: "active" | "inactive" | "pending" | "suspended"
  createdAt: string
  metadata: {
    department?: string
    jobTitle?: string
    phone?: string
  }
}

interface Client {
  id: string
  name: string
  domain: string
  plan: "starter" | "professional" | "enterprise" | "custom"
  status: "active" | "suspended" | "trial" | "inactive"
  createdAt: string
  settings: {
    maxUsers: number
    maxStorage: number // in GB
    maxProcessingHours: number // per month
    features: string[]
    dataRetention: number // in days
    backupFrequency: "daily" | "weekly" | "monthly"
    apiAccess: boolean
    ssoEnabled: boolean
  }
  usage: {
    currentUsers: number
    storageUsed: number // in GB
    processingHoursUsed: number
    apiCallsUsed: number
    lastUpdated: string
  }
  billing: {
    subscriptionId: string
    billingCycle: "monthly" | "yearly"
    nextBillingDate: string
    amount: number
    currency: string
  }
  security: {
    encryptionKey: string
    dataLocation: string
    complianceLevel: "basic" | "hipaa" | "sox" | "gdpr"
    auditLogRetention: number
  }
}

interface ClientContextType {
  currentClient: Client | null
  currentUser: User | null
  userRole: string
  clients: Client[]
  users: User[]
  switchClient: (clientId: string) => void
  createClient: (client: Omit<Client, "id" | "createdAt" | "usage">) => void
  updateClient: (clientId: string, updates: Partial<Client>) => void
  suspendClient: (clientId: string) => void
  deleteClient: (clientId: string) => void
  inviteUser: (email: string, role: string, clientId: string, metadata?: any) => void
  updateUser: (userId: string, updates: Partial<User>) => void
  suspendUser: (userId: string) => void
  deleteUser: (userId: string) => void
  hasPermission: (permission: string) => boolean
  getClientUsage: (clientId: string) => any
  updateResourceLimits: (clientId: string, limits: any) => void
}

const ClientContext = createContext<ClientContextType | undefined>(undefined)

export function ClientProvider({ children }: { children: ReactNode }) {
  const [currentClient, setCurrentClient] = useState<Client | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [clients, setClients] = useState<Client[]>([])
  const [users, setUsers] = useState<User[]>([])

  // Mock data initialization
  useEffect(() => {
    const mockClients: Client[] = [
      {
        id: "client-1",
        name: "Acme Corporation",
        domain: "acme.contaia.com",
        plan: "professional",
        status: "active",
        createdAt: "2024-01-15",
        settings: {
          maxUsers: 25,
          maxStorage: 100,
          maxProcessingHours: 500,
          features: ["ai-insights", "advanced-workflows", "custom-reports", "api-access"],
          dataRetention: 2555, // 7 years
          backupFrequency: "daily",
          apiAccess: true,
          ssoEnabled: true,
        },
        usage: {
          currentUsers: 12,
          storageUsed: 45.2,
          processingHoursUsed: 234,
          apiCallsUsed: 1250,
          lastUpdated: "2024-06-24",
        },
        billing: {
          subscriptionId: "sub_acme_001",
          billingCycle: "monthly",
          nextBillingDate: "2024-07-15",
          amount: 299,
          currency: "USD",
        },
        security: {
          encryptionKey: "enc_acme_key_001",
          dataLocation: "us-east-1",
          complianceLevel: "sox",
          auditLogRetention: 2555,
        },
      },
      {
        id: "client-2",
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
          dataRetention: 365,
          backupFrequency: "weekly",
          apiAccess: false,
          ssoEnabled: false,
        },
        usage: {
          currentUsers: 3,
          storageUsed: 8.7,
          processingHoursUsed: 45,
          apiCallsUsed: 0,
          lastUpdated: "2024-06-24",
        },
        billing: {
          subscriptionId: "sub_techstart_001",
          billingCycle: "monthly",
          nextBillingDate: "2024-07-01",
          amount: 0,
          currency: "USD",
        },
        security: {
          encryptionKey: "enc_techstart_key_001",
          dataLocation: "us-west-2",
          complianceLevel: "basic",
          auditLogRetention: 365,
        },
      },
    ]

    const mockUsers: User[] = [
      {
        id: "user-system-1",
        email: "admin@contaia.com",
        name: "System Administrator",
        role: "system-admin",
        clientId: null,
        permissions: ["all"],
        lastActive: "2024-06-24 14:30",
        status: "active",
        createdAt: "2024-01-01",
        metadata: {
          department: "IT",
          jobTitle: "System Administrator",
          phone: "+1-555-0001",
        },
      },
      {
        id: "user-1",
        email: "admin@acme.com",
        name: "John Admin",
        role: "client-admin",
        clientId: "client-1",
        permissions: ["client-admin"],
        lastActive: "2024-06-24 14:30",
        status: "active",
        createdAt: "2024-01-15",
        metadata: {
          department: "Finance",
          jobTitle: "CFO",
          phone: "+1-555-0101",
        },
      },
      {
        id: "user-2",
        email: "manager@acme.com",
        name: "Sarah Manager",
        role: "manager",
        clientId: "client-1",
        permissions: ["workflows", "ai-review", "reports"],
        lastActive: "2024-06-24 12:15",
        status: "active",
        createdAt: "2024-01-20",
        metadata: {
          department: "Accounting",
          jobTitle: "Accounting Manager",
          phone: "+1-555-0102",
        },
      },
      {
        id: "user-3",
        email: "user@acme.com",
        name: "Mike User",
        role: "user",
        clientId: "client-1",
        permissions: ["workflows", "reports"],
        lastActive: "2024-06-23 16:45",
        status: "active",
        createdAt: "2024-02-01",
        metadata: {
          department: "Accounting",
          jobTitle: "Staff Accountant",
          phone: "+1-555-0103",
        },
      },
    ]

    setClients(mockClients)
    setUsers(mockUsers)
    // Set system admin as default user
    setCurrentUser(mockUsers[0])

    // If not system admin, set first client
    if (mockUsers[0].role !== "system-admin") {
      setCurrentClient(mockClients[0])
    }
  }, [])

  const switchClient = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId)
    if (client) {
      setCurrentClient(client)
      // Switch to a user from this client if current user is system admin
      if (currentUser?.role === "system-admin") {
        const clientUser = users.find((u) => u.clientId === clientId && u.role === "client-admin")
        if (clientUser) {
          setCurrentUser(clientUser)
        }
      }
    }
  }

  const createClient = (clientData: Omit<Client, "id" | "createdAt" | "usage">) => {
    const newClient: Client = {
      ...clientData,
      id: `client-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      usage: {
        currentUsers: 0,
        storageUsed: 0,
        processingHoursUsed: 0,
        apiCallsUsed: 0,
        lastUpdated: new Date().toISOString().split("T")[0],
      },
    }
    setClients([...clients, newClient])
    return newClient.id
  }

  const updateClient = (clientId: string, updates: Partial<Client>) => {
    setClients(clients.map((c) => (c.id === clientId ? { ...c, ...updates } : c)))
    if (currentClient?.id === clientId) {
      setCurrentClient({ ...currentClient, ...updates })
    }
  }

  const suspendClient = (clientId: string) => {
    updateClient(clientId, { status: "suspended" })
    // Suspend all users in this client
    setUsers(users.map((u) => (u.clientId === clientId ? { ...u, status: "suspended" } : u)))
  }

  const deleteClient = (clientId: string) => {
    setClients(clients.filter((c) => c.id !== clientId))
    setUsers(users.filter((u) => u.clientId !== clientId))
    if (currentClient?.id === clientId) {
      setCurrentClient(null)
    }
  }

  const inviteUser = (email: string, role: string, clientId: string, metadata: any = {}) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name: email.split("@")[0],
      role: role as "client-admin" | "manager" | "user",
      clientId,
      permissions: getPermissionsByRole(role),
      lastActive: "Never",
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
      metadata,
    }
    setUsers([...users, newUser])
  }

  const updateUser = (userId: string, updates: Partial<User>) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, ...updates } : u)))
  }

  const suspendUser = (userId: string) => {
    updateUser(userId, { status: "suspended" })
  }

  const deleteUser = (userId: string) => {
    setUsers(users.filter((u) => u.id !== userId))
  }

  const getPermissionsByRole = (role: string): string[] => {
    switch (role) {
      case "system-admin":
        return ["all"]
      case "client-admin":
        return ["client-admin", "user-management", "workflows", "ai-review", "reports", "settings"]
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

  const getClientUsage = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId)
    return client?.usage || null
  }

  const updateResourceLimits = (clientId: string, limits: any) => {
    updateClient(clientId, { settings: { ...clients.find((c) => c.id === clientId)?.settings, ...limits } })
  }

  return (
    <ClientContext.Provider
      value={{
        currentClient,
        currentUser,
        userRole: currentUser?.role || "user",
        clients,
        users: currentUser?.role === "system-admin" ? users : users.filter((u) => u.clientId === currentClient?.id),
        switchClient,
        createClient,
        updateClient,
        suspendClient,
        deleteClient,
        inviteUser,
        updateUser,
        suspendUser,
        deleteUser,
        hasPermission,
        getClientUsage,
        updateResourceLimits,
      }}
    >
      {children}
    </ClientContext.Provider>
  )
}

export function useClient() {
  const context = useContext(ClientContext)
  if (context === undefined) {
    throw new Error("useClient must be used within a ClientProvider")
  }
  return context
}
