"use client"

import { createContext, useContext, useReducer, useMemo, useState, type ReactNode } from "react"
import type { Organization, User, OrganizationAction, UserAction, UsageMetrics } from "@/lib/types/common"

// Generic reducer for organizations
function organizationReducer(state: Organization[], action: OrganizationAction): Organization[] {
  switch (action.type) {
    case "SET_ORGANIZATIONS":
      return action.payload
    case "ADD_ORGANIZATION":
      return [...state, action.payload]
    case "UPDATE_ORGANIZATION":
      return state.map((org) => (org.id === action.payload.id ? { ...org, ...action.payload.updates } : org))
    case "DELETE_ORGANIZATION":
      return state.filter((org) => org.id !== action.payload)
    default:
      return state
  }
}

// Generic reducer for users
function userReducer(state: User[], action: UserAction): User[] {
  switch (action.type) {
    case "SET_USERS":
      return action.payload
    case "ADD_USER":
      return [...state, action.payload]
    case "UPDATE_USER":
      return state.map((user) => (user.id === action.payload.id ? { ...user, ...action.payload.updates } : user))
    case "DELETE_USER":
      return state.filter((user) => user.id !== action.payload)
    default:
      return state
  }
}

interface OrganizationContextState {
  organizations: Organization[]
  users: User[]
  currentOrganization: Organization | null
  currentUser: User | null
}

interface OrganizationContextActions {
  // Organization actions
  setOrganizations: (orgs: Organization[]) => void
  addOrganization: (org: Organization) => void
  updateOrganization: (id: string, updates: Partial<Organization>) => void
  deleteOrganization: (id: string) => void
  switchOrganization: (id: string) => void

  // User actions
  setUsers: (users: User[]) => void
  addUser: (user: User) => void
  updateUser: (id: string, updates: Partial<User>) => void
  deleteUser: (id: string) => void

  // Utility functions
  hasPermission: (permission: string) => boolean
  getFilteredUsers: () => User[]
  getOrganizationUsage: (id: string) => UsageMetrics | null
}

type OrganizationContextType = OrganizationContextState & OrganizationContextActions

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined)

interface OrganizationProviderProps {
  children: ReactNode
  initialData?: {
    organizations: Organization[]
    users: User[]
    currentOrganization?: Organization
    currentUser?: User
  }
}

export function OrganizationProvider({ children, initialData }: OrganizationProviderProps) {
  const [organizations, dispatchOrganizations] = useReducer(organizationReducer, initialData?.organizations || [])
  const [users, dispatchUsers] = useReducer(userReducer, initialData?.users || [])
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(
    initialData?.currentOrganization || null,
  )
  const [currentUser, setCurrentUser] = useState<User | null>(initialData?.currentUser || null)

  // Memoized actions to prevent unnecessary re-renders
  const actions = {
    setOrganizations: (orgs: Organization[]) => dispatchOrganizations({ type: "SET_ORGANIZATIONS", payload: orgs }),

    addOrganization: (org: Organization) => dispatchOrganizations({ type: "ADD_ORGANIZATION", payload: org }),

    updateOrganization: (id: string, updates: Partial<Organization>) =>
      dispatchOrganizations({ type: "UPDATE_ORGANIZATION", payload: { id, updates } }),

    deleteOrganization: (id: string) => dispatchOrganizations({ type: "DELETE_ORGANIZATION", payload: id }),

    switchOrganization: (id: string) => {
      const org = organizations.find((o) => o.id === id)
      if (org) {
        setCurrentOrganization(org)
        // Switch to appropriate user for this organization
        const orgUser = users.find((u) => u.organizationId === id)
        if (orgUser) setCurrentUser(orgUser)
      }
    },

    setUsers: (users: User[]) => dispatchUsers({ type: "SET_USERS", payload: users }),

    addUser: (user: User) => dispatchUsers({ type: "ADD_USER", payload: user }),

    updateUser: (id: string, updates: Partial<User>) =>
      dispatchUsers({ type: "UPDATE_USER", payload: { id, updates } }),

    deleteUser: (id: string) => dispatchUsers({ type: "DELETE_USER", payload: id }),

    hasPermission: (permission: string): boolean => {
      if (!currentUser) return false
      return currentUser.permissions.includes("all") || currentUser.permissions.includes(permission)
    },

    getFilteredUsers: (): User[] => {
      if (!currentOrganization) return []
      return users.filter((user) => user.organizationId === currentOrganization.id)
    },

    getOrganizationUsage: (id: string): UsageMetrics | null => {
      const org = organizations.find((o) => o.id === id)
      return org?.usage || null
    },
  }

  const contextValue = useMemo(
    () => ({
      organizations,
      users,
      currentOrganization,
      currentUser,
      ...actions,
    }),
    [organizations, users, currentOrganization, currentUser],
  )

  return <OrganizationContext.Provider value={contextValue}>{children}</OrganizationContext.Provider>
}

export function useOrganization() {
  const context = useContext(OrganizationContext)
  if (context === undefined) {
    throw new Error("useOrganization must be used within an OrganizationProvider")
  }
  return context
}
