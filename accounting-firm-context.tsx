"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  role: "platform-admin" | "firm-admin" | "firm-manager" | "firm-user"
  firmId: string | null
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

interface FirmClient {
  id: string
  name: string
  businessType: string
  contactEmail: string
  contactPhone: string
  address: string
  firmId: string
  status: "active" | "inactive" | "onboarding"
  createdAt: string
  settings: {
    aiProcessingEnabled: boolean
    dataRetentionDays: number
    backupFrequency: "daily" | "weekly" | "monthly"
    complianceLevel: "basic" | "enhanced" | "enterprise"
  }
  usage: {
    storageUsed: number // in MB
    processingHoursUsed: number
    lastProcessed: string
  }
}

interface AccountingFirm {
  id: string
  name: string
  domain: string
  plan: "starter" | "professional" | "enterprise" | "custom"
  status: "active" | "suspended" | "trial" | "inactive"
  createdAt: string
  settings: {
    maxClients: number
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
    currentClients: number
    currentUsers: number
    storageUsed: number // in GB
    processingHoursUsed: number
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

interface AccountingFirmContextType {
  currentFirm: AccountingFirm | null
  currentUser: User | null
  userRole: string
  firms: AccountingFirm[]
  users: User[]
  firmClients: FirmClient[]
  switchFirm: (firmId: string) => void
  createFirm: (firm: Omit<AccountingFirm, "id" | "createdAt" | "usage">) => void
  updateFirm: (firmId: string, updates: Partial<AccountingFirm>) => void
  suspendFirm: (firmId: string) => void
  deleteFirm: (firmId: string) => void
  inviteUser: (email: string, role: string, firmId: string, metadata?: any) => void
  updateUser: (userId: string, updates: Partial<User>) => void
  suspendUser: (userId: string) => void
  deleteUser: (userId: string) => void
  createFirmClient: (client: Omit<FirmClient, "id" | "createdAt" | "usage">) => void
  updateFirmClient: (clientId: string, updates: Partial<FirmClient>) => void
  deleteFirmClient: (clientId: string) => void
  hasPermission: (permission: string) => boolean
  getFirmUsage: (firmId: string) => any
  updateResourceLimits: (firmId: string, limits: any) => void
}

const AccountingFirmContext = createContext<AccountingFirmContextType | undefined>(undefined)

export function AccountingFirmProvider({ children }: { children: ReactNode }) {
  const [currentFirm, setCurrentFirm] = useState<AccountingFirm | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [firms, setFirms] = useState<AccountingFirm[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [firmClients, setFirmClients] = useState<FirmClient[]>([])

  // Mock data initialization
  useEffect(() => {
    const mockFirms: AccountingFirm[] = [
      {
        id: "firm-1",
        name: "Smith & Associates CPA",
        domain: "smith-cpa.contaia.com",
        plan: "professional",
        status: "active",
        createdAt: "2024-01-15",
        settings: {
          maxClients: 50,
          maxUsers: 15,
          maxStorage: 200,
          maxProcessingHours: 1000,
          features: ["ai-insights", "advanced-workflows", "custom-reports", "api-access"],
          dataRetention: 2555, // 7 years
          backupFrequency: "daily",
          apiAccess: true,
          ssoEnabled: true,
        },
        usage: {
          currentClients: 23,
          currentUsers: 8,
          storageUsed: 89.2,
          processingHoursUsed: 456,
          lastUpdated: "2024-06-24",
        },
        billing: {
          subscriptionId: "sub_smith_001",
          billingCycle: "monthly",
          nextBillingDate: "2024-07-15",
          amount: 599,
          currency: "USD",
        },
        security: {
          encryptionKey: "enc_smith_key_001",
          dataLocation: "us-east-1",
          complianceLevel: "sox",
          auditLogRetention: 2555,
        },
      },
      {
        id: "firm-2",
        name: "Johnson Tax Services",
        domain: "johnson-tax.contaia.com",
        plan: "starter",
        status: "trial",
        createdAt: "2024-06-01",
        settings: {
          maxClients: 15,
          maxUsers: 5,
          maxStorage: 50,
          maxProcessingHours: 200,
          features: ["basic-workflows"],
          dataRetention: 365,
          backupFrequency: "weekly",
          apiAccess: false,
          ssoEnabled: false,
        },
        usage: {
          currentClients: 7,
          currentUsers: 3,
          storageUsed: 12.4,
          processingHoursUsed: 67,
          lastUpdated: "2024-06-24",
        },
        billing: {
          subscriptionId: "sub_johnson_001",
          billingCycle: "monthly",
          nextBillingDate: "2024-07-01",
          amount: 0,
          currency: "USD",
        },
        security: {
          encryptionKey: "enc_johnson_key_001",
          dataLocation: "us-west-2",
          complianceLevel: "basic",
          auditLogRetention: 365,
        },
      },
    ]

    const mockUsers: User[] = [
      {
        id: "user-platform-1",
        email: "admin@contaia.com",
        name: "Platform Administrator",
        role: "platform-admin",
        firmId: null,
        permissions: ["all"],
        lastActive: "2024-06-24 14:30",
        status: "active",
        createdAt: "2024-01-01",
        metadata: {
          department: "IT",
          jobTitle: "Platform Administrator",
          phone: "+1-555-0001",
        },
      },
      {
        id: "user-1",
        email: "admin@smith-cpa.com",
        name: "John Smith",
        role: "firm-admin",
        firmId: "firm-1",
        permissions: ["firm-admin"],
        lastActive: "2024-06-24 14:30",
        status: "active",
        createdAt: "2024-01-15",
        metadata: {
          department: "Management",
          jobTitle: "Managing Partner",
          phone: "+1-555-0101",
        },
      },
      {
        id: "user-2",
        email: "manager@smith-cpa.com",
        name: "Sarah Johnson",
        role: "firm-manager",
        firmId: "firm-1",
        permissions: ["client-management", "user-management", "workflows", "ai-review", "reports"],
        lastActive: "2024-06-24 12:15",
        status: "active",
        createdAt: "2024-01-20",
        metadata: {
          department: "Operations",
          jobTitle: "Operations Manager",
          phone: "+1-555-0102",
        },
      },
      {
        id: "user-3",
        email: "accountant@smith-cpa.com",
        name: "Mike Davis",
        role: "firm-user",
        firmId: "firm-1",
        permissions: ["workflows", "reports", "client-data"],
        lastActive: "2024-06-23 16:45",
        status: "active",
        createdAt: "2024-02-01",
        metadata: {
          department: "Accounting",
          jobTitle: "Senior Accountant",
          phone: "+1-555-0103",
        },
      },
    ]

    const mockFirmClients: FirmClient[] = [
      {
        id: "client-1",
        name: "Acme Corporation",
        businessType: "Manufacturing",
        contactEmail: "finance@acme.com",
        contactPhone: "+1-555-1001",
        address: "123 Business Ave, City, ST 12345",
        firmId: "firm-1",
        status: "active",
        createdAt: "2024-02-01",
        settings: {
          aiProcessingEnabled: true,
          dataRetentionDays: 2555,
          backupFrequency: "daily",
          complianceLevel: "enhanced",
        },
        usage: {
          storageUsed: 1250, // MB
          processingHoursUsed: 45,
          lastProcessed: "2024-06-24 10:30",
        },
      },
      {
        id: "client-2",
        name: "TechStart Inc",
        businessType: "Technology",
        contactEmail: "cfo@techstart.com",
        contactPhone: "+1-555-1002",
        address: "456 Innovation Dr, Tech City, ST 54321",
        firmId: "firm-1",
        status: "active",
        createdAt: "2024-03-15",
        settings: {
          aiProcessingEnabled: true,
          dataRetentionDays: 1825,
          backupFrequency: "weekly",
          complianceLevel: "basic",
        },
        usage: {
          storageUsed: 890,
          processingHoursUsed: 23,
          lastProcessed: "2024-06-23 15:45",
        },
      },
      {
        id: "client-3",
        name: "Local Restaurant Group",
        businessType: "Food Service",
        contactEmail: "accounting@localrestaurants.com",
        contactPhone: "+1-555-1003",
        address: "789 Main St, Downtown, ST 67890",
        firmId: "firm-1",
        status: "onboarding",
        createdAt: "2024-06-20",
        settings: {
          aiProcessingEnabled: false,
          dataRetentionDays: 1095,
          backupFrequency: "weekly",
          complianceLevel: "basic",
        },
        usage: {
          storageUsed: 45,
          processingHoursUsed: 2,
          lastProcessed: "2024-06-22 09:15",
        },
      },
    ]

    setFirms(mockFirms)
    setUsers(mockUsers)
    setFirmClients(mockFirmClients)
    // Set platform admin as default user
    setCurrentUser(mockUsers[0])

    // If not platform admin, set first firm
    if (mockUsers[0].role !== "platform-admin") {
      setCurrentFirm(mockFirms[0])
    }
  }, [])

  const switchFirm = (firmId: string) => {
    const firm = firms.find((f) => f.id === firmId)
    if (firm) {
      setCurrentFirm(firm)
      // Switch to a user from this firm if current user is platform admin
      if (currentUser?.role === "platform-admin") {
        const firmUser = users.find((u) => u.firmId === firmId && u.role === "firm-admin")
        if (firmUser) {
          setCurrentUser(firmUser)
        }
      }
    }
  }

  const createFirm = (firmData: Omit<AccountingFirm, "id" | "createdAt" | "usage">) => {
    const newFirm: AccountingFirm = {
      ...firmData,
      id: `firm-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      usage: {
        currentClients: 0,
        currentUsers: 0,
        storageUsed: 0,
        processingHoursUsed: 0,
        lastUpdated: new Date().toISOString().split("T")[0],
      },
    }
    setFirms([...firms, newFirm])
    return newFirm.id
  }

  const updateFirm = (firmId: string, updates: Partial<AccountingFirm>) => {
    setFirms(firms.map((f) => (f.id === firmId ? { ...f, ...updates } : f)))
    if (currentFirm?.id === firmId) {
      setCurrentFirm({ ...currentFirm, ...updates })
    }
  }

  const suspendFirm = (firmId: string) => {
    updateFirm(firmId, { status: "suspended" })
    // Suspend all users in this firm
    setUsers(users.map((u) => (u.firmId === firmId ? { ...u, status: "suspended" } : u)))
  }

  const deleteFirm = (firmId: string) => {
    setFirms(firms.filter((f) => f.id !== firmId))
    setUsers(users.filter((u) => u.firmId !== firmId))
    setFirmClients(firmClients.filter((c) => c.firmId !== firmId))
    if (currentFirm?.id === firmId) {
      setCurrentFirm(null)
    }
  }

  const inviteUser = (email: string, role: string, firmId: string, metadata: any = {}) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name: email.split("@")[0],
      role: role as "firm-admin" | "firm-manager" | "firm-user",
      firmId,
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

  const createFirmClient = (clientData: Omit<FirmClient, "id" | "createdAt" | "usage">) => {
    const newClient: FirmClient = {
      ...clientData,
      id: `client-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      usage: {
        storageUsed: 0,
        processingHoursUsed: 0,
        lastProcessed: "Never",
      },
    }
    setFirmClients([...firmClients, newClient])
  }

  const updateFirmClient = (clientId: string, updates: Partial<FirmClient>) => {
    setFirmClients(firmClients.map((c) => (c.id === clientId ? { ...c, ...updates } : c)))
  }

  const deleteFirmClient = (clientId: string) => {
    setFirmClients(firmClients.filter((c) => c.id !== clientId))
  }

  const getPermissionsByRole = (role: string): string[] => {
    switch (role) {
      case "platform-admin":
        return ["all"]
      case "firm-admin":
        return ["firm-admin", "user-management", "client-management", "workflows", "ai-review", "reports", "settings"]
      case "firm-manager":
        return ["client-management", "workflows", "ai-review", "reports", "user-management"]
      case "firm-user":
        return ["workflows", "reports", "client-data"]
      default:
        return []
    }
  }

  const hasPermission = (permission: string): boolean => {
    if (!currentUser) return false
    return currentUser.permissions.includes("all") || currentUser.permissions.includes(permission)
  }

  const getFirmUsage = (firmId: string) => {
    const firm = firms.find((f) => f.id === firmId)
    return firm?.usage || null
  }

  const updateResourceLimits = (firmId: string, limits: any) => {
    updateFirm(firmId, { settings: { ...firms.find((f) => f.id === firmId)?.settings, ...limits } })
  }

  return (
    <AccountingFirmContext.Provider
      value={{
        currentFirm,
        currentUser,
        userRole: currentUser?.role || "firm-user",
        firms,
        users: currentUser?.role === "platform-admin" ? users : users.filter((u) => u.firmId === currentFirm?.id),
        firmClients: firmClients.filter((c) => c.firmId === currentFirm?.id),
        switchFirm,
        createFirm,
        updateFirm,
        suspendFirm,
        deleteFirm,
        inviteUser,
        updateUser,
        suspendUser,
        deleteUser,
        createFirmClient,
        updateFirmClient,
        deleteFirmClient,
        hasPermission,
        getFirmUsage,
        updateResourceLimits,
      }}
    >
      {children}
    </AccountingFirmContext.Provider>
  )
}

export function useAccountingFirm() {
  const context = useContext(AccountingFirmContext)
  if (context === undefined) {
    throw new Error("useAccountingFirm must be used within an AccountingFirmProvider")
  }
  return context
}
