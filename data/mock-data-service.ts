// Mock data service to replace inline data
export class MockDataService {
  private static instance: MockDataService

  static getInstance(): MockDataService {
    if (!MockDataService.instance) {
      MockDataService.instance = new MockDataService()
    }
    return MockDataService.instance
  }

  getOrganizations() {
    return [
      {
        id: "org-1",
        name: "Acme Accounting",
        type: "accounting_firm" as const,
        status: "active" as const,
        createdAt: "2024-01-15",
        usage: {
          documentsProcessed: 1250,
          storageUsed: 2.5,
          apiCalls: 15000,
        },
      },
      {
        id: "org-2",
        name: "TechCorp Inc",
        type: "client" as const,
        status: "active" as const,
        createdAt: "2024-02-01",
        usage: {
          documentsProcessed: 850,
          storageUsed: 1.8,
          apiCalls: 8500,
        },
      },
    ]
  }

  getUsers() {
    return [
      {
        id: "user-1",
        name: "John Smith",
        email: "john@acmeaccounting.com",
        role: "Admin",
        organizationId: "org-1",
        permissions: ["all"],
        status: "active" as const,
      },
      {
        id: "user-2",
        name: "Sarah Johnson",
        email: "sarah@techcorp.com",
        role: "User",
        organizationId: "org-2",
        permissions: ["read", "write"],
        status: "active" as const,
      },
    ]
  }

  getTenants() {
    return [
      {
        id: "tenant-1",
        name: "Platform Admin",
        type: "platform",
        organizationCount: 25,
        userCount: 150,
      },
      {
        id: "tenant-2",
        name: "Acme Accounting",
        type: "accounting_firm",
        organizationCount: 12,
        userCount: 45,
      },
    ]
  }
}

export const mockDataService = MockDataService.getInstance()
