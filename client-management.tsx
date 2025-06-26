"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Building2, Plus, Settings, Trash2, Users } from "lucide-react"
import { useAccountingFirm } from "@/components/accounting-firm-context"

export function ClientManagement() {
  const { currentFirm, firmClients, createFirmClient, updateFirmClient, deleteFirmClient, hasPermission } =
    useAccountingFirm()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newClientData, setNewClientData] = useState({
    name: "",
    businessType: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
  })

  const handleCreateClient = () => {
    if (newClientData.name && currentFirm) {
      createFirmClient({
        ...newClientData,
        firmId: currentFirm.id,
        status: "onboarding",
        settings: {
          aiProcessingEnabled: true,
          dataRetentionDays: 1825,
          backupFrequency: "weekly",
          complianceLevel: "basic",
        },
      })
      setIsCreateDialogOpen(false)
      setNewClientData({
        name: "",
        businessType: "",
        contactEmail: "",
        contactPhone: "",
        address: "",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "onboarding":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "inactive":
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  if (!hasPermission("client-management")) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Access Denied</h2>
          <p className="text-gray-400">You don't have permission to access client management.</p>
        </div>
      </div>
    )
  }

  const activeClients = firmClients.filter((c) => c.status === "active").length
  const onboardingClients = firmClients.filter((c) => c.status === "onboarding").length
  const inactiveClients = firmClients.filter((c) => c.status === "inactive").length

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Client Management</h1>
          <p className="text-gray-400 text-lg">Manage your accounting firm's clients</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Client</DialogTitle>
              <DialogDescription className="text-gray-400">
                Onboard a new client to your accounting firm
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300">Client Name</Label>
                <Input
                  value={newClientData.name}
                  onChange={(e) => setNewClientData({ ...newClientData, name: e.target.value })}
                  placeholder="Enter client name"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Business Type</Label>
                <Select
                  value={newClientData.businessType}
                  onValueChange={(value) => setNewClientData({ ...newClientData, businessType: value })}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="Manufacturing" className="text-white">
                      Manufacturing
                    </SelectItem>
                    <SelectItem value="Technology" className="text-white">
                      Technology
                    </SelectItem>
                    <SelectItem value="Retail" className="text-white">
                      Retail
                    </SelectItem>
                    <SelectItem value="Food Service" className="text-white">
                      Food Service
                    </SelectItem>
                    <SelectItem value="Professional Services" className="text-white">
                      Professional Services
                    </SelectItem>
                    <SelectItem value="Healthcare" className="text-white">
                      Healthcare
                    </SelectItem>
                    <SelectItem value="Other" className="text-white">
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300">Contact Email</Label>
                <Input
                  type="email"
                  value={newClientData.contactEmail}
                  onChange={(e) => setNewClientData({ ...newClientData, contactEmail: e.target.value })}
                  placeholder="contact@client.com"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Contact Phone</Label>
                <Input
                  value={newClientData.contactPhone}
                  onChange={(e) => setNewClientData({ ...newClientData, contactPhone: e.target.value })}
                  placeholder="+1-555-0000"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Address</Label>
                <Input
                  value={newClientData.address}
                  onChange={(e) => setNewClientData({ ...newClientData, address: e.target.value })}
                  placeholder="123 Business St, City, ST 12345"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreateClient} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                  Add Client
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
            <div className="text-3xl font-bold text-white">{firmClients.length}</div>
            <p className="text-xs text-gray-400">of {currentFirm?.settings.maxClients} allowed</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-300">Active Clients</CardTitle>
            <div className="p-2 rounded-lg bg-green-500/10">
              <Users className="h-5 w-5 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{activeClients}</div>
            <p className="text-xs text-gray-400">Fully onboarded</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-300">Onboarding</CardTitle>
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Settings className="h-5 w-5 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{onboardingClients}</div>
            <p className="text-xs text-gray-400">In progress</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-300">Inactive</CardTitle>
            <div className="p-2 rounded-lg bg-gray-500/10">
              <Building2 className="h-5 w-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{inactiveClients}</div>
            <p className="text-xs text-gray-400">Not active</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Client List</CardTitle>
          <CardDescription className="text-gray-400">Manage your accounting firm's clients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {firmClients.map((client) => (
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
                    <p className="text-sm text-gray-400">{client.businessType}</p>
                    <p className="text-xs text-gray-500">{client.contactEmail}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                      {client.settings.aiProcessingEnabled && (
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">AI Enabled</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right text-sm">
                    <p className="text-gray-400">Storage: {client.usage.storageUsed}MB</p>
                    <p className="text-gray-400">Processing: {client.usage.processingHoursUsed}hrs</p>
                    <p className="text-gray-400">Last processed: {client.usage.lastProcessed}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-700">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteFirmClient(client.id)}
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
