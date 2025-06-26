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
import { Building2, Users, Server, Activity, Plus, Settings, Trash2, Pause } from "lucide-react"
import { useAccountingFirm } from "@/components/accounting-firm-context"

export function PlatformAdmin() {
  const { firms, users, createFirm, updateFirm, suspendFirm, deleteFirm } = useAccountingFirm()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newFirmData, setNewFirmData] = useState({
    name: "",
    domain: "",
    plan: "starter" as "starter" | "professional" | "enterprise" | "custom",
  })

  const handleCreateFirm = () => {
    if (newFirmData.name && newFirmData.domain) {
      const firmId = createFirm({
        ...newFirmData,
        status: "trial",
        settings: getPlanSettings(newFirmData.plan),
        billing: {
          subscriptionId: `sub_${newFirmData.name.toLowerCase().replace(/\s+/g, "_")}_001`,
          billingCycle: "monthly",
          nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          amount: getPlanAmount(newFirmData.plan),
          currency: "USD",
        },
        security: {
          encryptionKey: `enc_${newFirmData.name.toLowerCase().replace(/\s+/g, "_")}_key_001`,
          dataLocation: "us-east-1",
          complianceLevel: "basic",
          auditLogRetention: 365,
        },
      })
      setIsCreateDialogOpen(false)
      setNewFirmData({ name: "", domain: "", plan: "starter" })
    }
  }

  const getPlanSettings = (plan: string) => {
    switch (plan) {
      case "professional":
        return {
          maxClients: 50,
          maxUsers: 15,
          maxStorage: 200,
          maxProcessingHours: 1000,
          features: ["ai-insights", "advanced-workflows", "custom-reports", "api-access"],
          dataRetention: 1825,
          backupFrequency: "daily" as const,
          apiAccess: true,
          ssoEnabled: true,
        }
      case "enterprise":
        return {
          maxClients: 200,
          maxUsers: 50,
          maxStorage: 1000,
          maxProcessingHours: 5000,
          features: ["ai-insights", "advanced-workflows", "custom-reports", "api-access", "sso", "white-label"],
          dataRetention: 2555,
          backupFrequency: "daily" as const,
          apiAccess: true,
          ssoEnabled: true,
        }
      case "custom":
        return {
          maxClients: 1000,
          maxUsers: 200,
          maxStorage: 5000,
          maxProcessingHours: 25000,
          features: ["all"],
          dataRetention: 3650,
          backupFrequency: "daily" as const,
          apiAccess: true,
          ssoEnabled: true,
        }
      default:
        return {
          maxClients: 15,
          maxUsers: 5,
          maxStorage: 50,
          maxProcessingHours: 200,
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
        return 599
      case "enterprise":
        return 1999
      case "custom":
        return 4999
      default:
        return 199
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
  const activeFirms = firms.filter((f) => f.status === "active").length
  const trialFirms = firms.filter((f) => f.status === "trial").length
  const suspendedFirms = firms.filter((f) => f.status === "suspended").length

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Platform Administration</h1>
          <p className="text-gray-400 text-lg">Manage all accounting firms, users, and platform resources</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Firm
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-white">Create New Accounting Firm</DialogTitle>
              <DialogDescription className="text-gray-400">
                Set up a new accounting firm with initial configuration
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Firm Name</label>
                <Input
                  value={newFirmData.name}
                  onChange={(e) => setNewFirmData({ ...newFirmData, name: e.target.value })}
                  placeholder="Enter firm name"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Domain</label>
                <Input
                  value={newFirmData.domain}
                  onChange={(e) => setNewFirmData({ ...newFirmData, domain: e.target.value })}
                  placeholder="yourfirm.contaia.com"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Plan</label>
                <Select
                  value={newFirmData.plan}
                  onValueChange={(value) =>
                    setNewFirmData({
                      ...newFirmData,
                      plan: value as "starter" | "professional" | "enterprise" | "custom",
                    })
                  }
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="starter" className="text-white">
                      Starter ($199/mo - 15 clients, 5 users)
                    </SelectItem>
                    <SelectItem value="professional" className="text-white">
                      Professional ($599/mo - 50 clients, 15 users)
                    </SelectItem>
                    <SelectItem value="enterprise" className="text-white">
                      Enterprise ($1999/mo - 200 clients, 50 users)
                    </SelectItem>
                    <SelectItem value="custom" className="text-white">
                      Custom ($4999/mo - 1000 clients, 200 users)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreateFirm} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                  Create Firm
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
            <CardTitle className="text-sm font-medium text-gray-300">Total Firms</CardTitle>
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Building2 className="h-5 w-5 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{firms.length}</div>
            <p className="text-xs text-gray-400">Accounting firms</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-300">Active Firms</CardTitle>
            <div className="p-2 rounded-lg bg-green-500/10">
              <Activity className="h-5 w-5 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{activeFirms}</div>
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
            <p className="text-xs text-gray-400">Across all firms</p>
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

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Accounting Firm Management</CardTitle>
          <CardDescription className="text-gray-400">Manage all accounting firm organizations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {firms.map((firm) => (
              <div
                key={firm.id}
                className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
                    {firm.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{firm.name}</h3>
                    <p className="text-sm text-gray-400">{firm.domain}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(firm.status)}>{firm.status}</Badge>
                      <Badge className={getPlanColor(firm.plan)}>{firm.plan}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right text-sm">
                    <p className="text-gray-400">
                      Clients: {firm.usage.currentClients}/{firm.settings.maxClients}
                    </p>
                    <p className="text-gray-400">
                      Users: {firm.usage.currentUsers}/{firm.settings.maxUsers}
                    </p>
                    <p className="text-gray-400">Revenue: ${firm.billing.amount}/mo</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-700">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => suspendFirm(firm.id)}
                      className="border-gray-700 text-gray-300 hover:bg-orange-600 hover:border-orange-600"
                    >
                      <Pause className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteFirm(firm.id)}
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
