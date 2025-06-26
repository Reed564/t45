"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, ArrowRight, Shield } from "lucide-react"
import { useClient } from "@/components/client-context"

export function ClientSelector() {
  const { clients, switchClient, currentUser } = useClient()

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

  // Filter clients based on user role
  const availableClients =
    currentUser?.role === "system-admin"
      ? clients
      : clients.filter((client) => currentUser?.clientId === client.id || currentUser?.permissions.includes("all"))

  if (currentUser?.role === "system-admin") {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-lg">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">System Administration</h1>
              <p className="text-sm text-gray-400">Multi-Tenant Management Portal</p>
            </div>
          </div>
          <p className="text-gray-400 text-lg">Select a client to manage or access system administration</p>
        </div>

        <div className="space-y-6">
          <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-lg">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">System Administration</h3>
                    <p className="text-gray-400">Manage all clients, users, and system settings</p>
                  </div>
                </div>
                <Button onClick={() => switchClient("system-admin")} className="bg-red-600 hover:bg-red-700 text-white">
                  Access Admin Panel
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            {availableClients.map((client) => (
              <Card
                key={client.id}
                className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors cursor-pointer"
                onClick={() => switchClient(client.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{client.name}</CardTitle>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </div>
                  <CardDescription className="text-gray-400">{client.domain}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                    <Badge className={getPlanColor(client.plan)}>{client.plan}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Users</p>
                      <p className="text-white font-medium">
                        {client.usage.currentUsers}/{client.settings.maxUsers}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Storage</p>
                      <p className="text-white font-medium">
                        {client.usage.storageUsed}GB/{client.settings.maxStorage}GB
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">ContaIA Pro</h1>
            <p className="text-sm text-gray-400">Client Portal</p>
          </div>
        </div>
        <p className="text-gray-400 text-lg">Select your organization to continue</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {availableClients.map((client) => (
          <Card
            key={client.id}
            className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors cursor-pointer"
            onClick={() => switchClient(client.id)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">{client.name}</CardTitle>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </div>
              <CardDescription className="text-gray-400">{client.domain}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-3">
                <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                <Badge className={getPlanColor(client.plan)}>{client.plan}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Users</p>
                  <p className="text-white font-medium">
                    {client.usage.currentUsers}/{client.settings.maxUsers}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Storage</p>
                  <p className="text-white font-medium">
                    {client.usage.storageUsed}GB/{client.settings.maxStorage}GB
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
