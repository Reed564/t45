"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { Building2, Users, Server, Activity, AlertTriangle, Plus, Settings, Trash2, Pause } from "lucide-react"
import { useClient } from "@/components/client-context"

export function SystemAdmin() {
  const { clients, users, createClient, updateClient, suspendClient, deleteClient } = useClient()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newClientData, setNewClientData] = useState({
    name: "",
    domain: "",
    plan: "starter" as "starter" | "professional" | "enterprise" | "custom",
  })

  const handleCreateClient = () => {
    if (newClientData.name && newClientData.domain) {
      const clientId = createClient({
        ...newClientData,
        status: "trial",
        settings: getPlanSettings(newClientData.plan),
        billing: {
          subscriptionId: `sub_${newClientData.name.toLowerCase().replace(/\s+/g, "_")}_001`,
          billingCycle: "monthly",
          nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          amount: getPlanAmount(newClientData.plan),
          currency: "USD",
        },
        security: {
          encryptionKey: `enc_${newClientData.name.toLowerCase().replace(/\s+/g, "_")}_key_001`,
          dataLocation: "us-east-1",
          complianceLevel: "basic",
          auditLogRetention: 365,
        },
      })
      setIsCreateDialogOpen(false)
      setNewClientData({ name: "", domain: "", plan: "starter" })
    }
  }

  const getPlanSettings = (plan: string) => {
    switch (plan) {
      case "professional":
        return {
          maxUsers: 25,
          maxStorage: 100,
          maxProcessingHours: 500,
          features: ["ai-insights", "advanced-workflows", "custom-reports", "api-access"],
          dataRetention: 1825,
          backupFrequency: "daily" as const,
          apiAccess: true,
          ssoEnabled: true,
        }
      case "enterprise":
        return {
          maxUsers: 100,
          maxStorage: 500,
          maxProcessingHours: 2000,
          features: ["ai-insights", "advanced-workflows", "custom-reports", "api-access", "sso", "white-label"],
          dataRetention: 2555,
          backupFrequency: "daily" as const,
          apiAccess: true,
          ssoEnabled: true,
        }
      case "custom":
        return {
          maxUsers: 500,
          maxStorage: 2000,
          maxProcessingHours: 10000,
          features: ["all"],
          dataRetention: 3650,
          backupFrequency: "daily" as const,
          apiAccess: true,
          ssoEnabled: true,
        }
      default:
        return {
          maxUsers: 5,
          maxStorage: 25,
          maxProcessingHours: 100,
          features: ["basic-workflows"],
          dataRetention: 365,
          backupFrequency: "weekly" as const,
          apiAccess: false,
          ssoEnabled: false,
        }
    }
  }

  const getPlanAmount = (plan: string) => {
    switch (plan) {
      case "professional":
        return 299
      case "enterprise":
        return 999
      case "custom":
        return 2999
      default:
        return 99
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "trial":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "suspended":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "professional":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      case "enterprise":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30"
      case "custom":
        return "bg-pink-500/20 text-pink-300 border-pink-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const totalUsers = users.length
  const activeClients = clients.filter((c) => c.status === "active").length
  const trialClients = clients.filter((c) => c.status === "trial").length
  const suspendedClients = clients.filter((c) => c.status === "suspended").length

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">System Administration</h1>
          <p className="text-gray-400 text-lg">Manage all clients, users, and system resources</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Client
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-white">Create New Client</DialogTitle>
              <DialogDescription className="text-gray-400">
                Set up a new client organization with initial configuration
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Organization Name</label>
                <Input
                  value={newClientData.name}
                  onChange={(e) => setNewClientData({ ...newClientData, name: e.target.value })}
                  placeholder="Enter organization name"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Domain</label>
                <Input
                  value={newClientData.domain}
                  onChange={(e) => setNewClientData({ ...newClientData, domain: e.target.value })}
                  placeholder="yourorg.contaia.com"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Plan</label>
                <Select
                  value={newClientData.plan}
                  onValueChange={(value) =>
                    setNewClientData({
                      ...newClientData,
                      plan: value as "starter" | "professional" | "enterprise" | "custom",
                    })
                  }
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="starter" className="text-white">
                      Starter ($99/mo - 5 users, 25GB)
                    </SelectItem>
                    <SelectItem value="professional" className="text-white">
                      Professional ($299/mo - 25 users, 100GB)
                    </SelectItem>
                    <SelectItem value="enterprise" className="text-white">
                      Enterprise ($999/mo - 100 users, 500GB)
                    </SelectItem>
                    <SelectItem value="custom" className="text-white">
                      Custom ($2999/mo - 500 users, 2TB)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreateClient} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                  Create Client
                </Button>
                <Button
                  onClick={() => setIsCreateDialogOpen(false)}
                  variant="outline"
                  className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-300">Total Clients</CardTitle>
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Building2 className="h-5 w-5 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{clients.length}</div>
            <p className="text-xs text-gray-400">Organizations</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-300">Active Clients</CardTitle>
            <div className="p-2 rounded-lg bg-green-500/10">
              <Activity className="h-5 w-5 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{activeClients}</div>
            <p className="text-xs text-gray-400">Paying customers</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-300">Total Users</CardTitle>
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Users className="h-5 w-5 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{totalUsers}</div>
            <p className="text-xs text-gray-400">Across all clients</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-300">System Health</CardTitle>
            <div className="p-2 rounded-lg bg-green-500/10">
              <Server className="h-5 w-5 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">99.9%</div>
            <p className="text-xs text-gray-400">Uptime</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Client Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Active</span>
                <span className="text-green-400 font-medium">{activeClients}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Trial</span>
                <span className="text-blue-400 font-medium">{trialClients}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Suspended</span>
                <span className="text-red-400 font-medium">{suspendedClients}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Resource Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-400 text-sm">Storage</span>
                  <span className="text-white text-sm">2.1TB / 5TB</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "42%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-400 text-sm">Processing</span>
                  <span className="text-white text-sm">1.2K / 3K hrs</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: "40%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">System Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-400" />
                <span className="text-sm text-gray-300">2 clients near storage limit</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <span className="text-sm text-gray-300">1 client payment failed</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-400" />
                <span className="text-sm text-gray-300">All systems operational</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Client Management</CardTitle>
          <CardDescription className="text-gray-400">Manage all client organizations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clients.map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
                    {client.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{client.name}</h3>
                    <p className="text-sm text-gray-400">{client.domain}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                      <Badge className={getPlanColor(client.plan)}>{client.plan}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right text-sm">
                    <p className="text-gray-400">
                      Users: {client.usage.currentUsers}/{client.settings.maxUsers}
                    </p>
                    <p className="text-gray-400">
                      Storage: {client.usage.storageUsed}GB/{client.settings.maxStorage}GB
                    </p>
                    <p className="text-gray-400">Revenue: ${client.billing.amount}/mo</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-700">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => suspendClient(client.id)}
                      className="border-gray-700 text-gray-300 hover:bg-orange-600 hover:border-orange-600"
                    >
                      <Pause className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteClient(client.id)}
                      className="border-gray-700 text-gray-300 hover:bg-red-600 hover:border-red-600"
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
