"use client"

import { useState } from "react"
import {
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  FileText,
  Receipt,
  CreditCard,
  Building,
  CheckCircle,
  AlertTriangle,
  Clock,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { darkColors } from "@/lib/dark-design-system"

interface Document {
  id: string
  name: string
  type: "receipt" | "invoice" | "bank_statement" | "tax_document"
  status: "processed" | "needs_review" | "approved" | "rejected"
  confidence: number
  amount: number
  vendor: string
  date: string
  category: string
  processedDate: string
  size: string
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "recibo-oficina-001.pdf",
    type: "receipt",
    status: "processed",
    confidence: 96,
    amount: 245.5,
    vendor: "Office Depot",
    date: "2024-01-15",
    category: "Suministros de Oficina",
    processedDate: "2024-01-15 14:30",
    size: "2.1 MB",
  },
  {
    id: "2",
    name: "factura-proveedor-abc.pdf",
    type: "invoice",
    status: "needs_review",
    confidence: 73,
    amount: 1250.0,
    vendor: "Proveedor ABC S.A.",
    date: "2024-01-14",
    category: "Servicios Profesionales",
    processedDate: "2024-01-14 16:45",
    size: "1.8 MB",
  },
  {
    id: "3",
    name: "estado-cuenta-enero.pdf",
    type: "bank_statement",
    status: "approved",
    confidence: 98,
    amount: 15750.25,
    vendor: "Banco Nacional",
    date: "2024-01-31",
    category: "Estados Bancarios",
    processedDate: "2024-01-31 09:15",
    size: "3.2 MB",
  },
  {
    id: "4",
    name: "recibo-combustible.jpg",
    type: "receipt",
    status: "rejected",
    confidence: 45,
    amount: 85.3,
    vendor: "Gasolinera XYZ",
    date: "2024-01-13",
    category: "Combustible",
    processedDate: "2024-01-13 11:20",
    size: "1.2 MB",
  },
]

const documentTypeIcons = {
  receipt: Receipt,
  invoice: FileText,
  bank_statement: CreditCard,
  tax_document: Building,
}

const statusIcons = {
  processed: CheckCircle,
  needs_review: AlertTriangle,
  approved: CheckCircle,
  rejected: AlertTriangle,
}

const statusColors = {
  processed: "text-blue-500",
  needs_review: "text-yellow-500",
  approved: "text-green-500",
  rejected: "text-red-500",
}

export function DocumentLibrary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedDocs, setSelectedDocs] = useState<string[]>([])
  const [documents] = useState(mockDocuments)

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || doc.type === selectedType
    const matchesStatus = selectedStatus === "all" || doc.status === selectedStatus

    return matchesSearch && matchesType && matchesStatus
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedDocs(filteredDocuments.map((doc) => doc.id))
    } else {
      setSelectedDocs([])
    }
  }

  const handleSelectDoc = (docId: string, checked: boolean) => {
    if (checked) {
      setSelectedDocs((prev) => [...prev, docId])
    } else {
      setSelectedDocs((prev) => prev.filter((id) => id !== docId))
    }
  }

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 90) return { variant: "default" as const, text: "Alta" }
    if (confidence >= 70) return { variant: "secondary" as const, text: "Media" }
    return { variant: "destructive" as const, text: "Baja" }
  }

  const stats = {
    total: documents.length,
    processed: documents.filter((d) => d.status === "processed").length,
    needsReview: documents.filter((d) => d.status === "needs_review").length,
    approved: documents.filter((d) => d.status === "approved").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: darkColors.text.primary }}>
            Biblioteca de Documentos
          </h1>
          <p className="text-lg" style={{ color: darkColors.text.secondary }}>
            Gestiona y revisa todos los documentos procesados
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card style={{ backgroundColor: darkColors.background.secondary, borderColor: darkColors.border.primary }}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" style={{ color: darkColors.text.tertiary }} />
              <div>
                <p className="text-2xl font-bold" style={{ color: darkColors.text.primary }}>
                  {stats.total}
                </p>
                <p className="text-sm" style={{ color: darkColors.text.secondary }}>
                  Total Documentos
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: darkColors.background.secondary, borderColor: darkColors.border.primary }}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold" style={{ color: darkColors.text.primary }}>
                  {stats.approved}
                </p>
                <p className="text-sm" style={{ color: darkColors.text.secondary }}>
                  Aprobados
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: darkColors.background.secondary, borderColor: darkColors.border.primary }}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold" style={{ color: darkColors.text.primary }}>
                  {stats.needsReview}
                </p>
                <p className="text-sm" style={{ color: darkColors.text.secondary }}>
                  Requieren Revisión
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: darkColors.background.secondary, borderColor: darkColors.border.primary }}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold" style={{ color: darkColors.text.primary }}>
                  {stats.processed}
                </p>
                <p className="text-sm" style={{ color: darkColors.text.secondary }}>
                  Procesados
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card style={{ backgroundColor: darkColors.background.secondary, borderColor: darkColors.border.primary }}>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                  style={{ color: darkColors.text.tertiary }}
                />
                <Input
                  placeholder="Buscar documentos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Tipo de documento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="receipt">Recibos</SelectItem>
                  <SelectItem value="invoice">Facturas</SelectItem>
                  <SelectItem value="bank_statement">Estados Bancarios</SelectItem>
                  <SelectItem value="tax_document">Documentos Fiscales</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="processed">Procesados</SelectItem>
                  <SelectItem value="needs_review">Requieren Revisión</SelectItem>
                  <SelectItem value="approved">Aprobados</SelectItem>
                  <SelectItem value="rejected">Rechazados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedDocs.length > 0 && (
            <div
              className="flex items-center gap-2 mt-4 p-3 rounded-lg"
              style={{ backgroundColor: darkColors.background.tertiary }}
            >
              <span style={{ color: darkColors.text.secondary }}>{selectedDocs.length} documentos seleccionados</span>
              <div className="flex gap-2 ml-auto">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
                <Button variant="outline" size="sm">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Aprobar
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Eliminar
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documents Grid */}
      <Card style={{ backgroundColor: darkColors.background.secondary, borderColor: darkColors.border.primary }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle style={{ color: darkColors.text.primary }}>Documentos ({filteredDocuments.length})</CardTitle>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedDocs.length === filteredDocuments.length && filteredDocuments.length > 0}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm" style={{ color: darkColors.text.secondary }}>
                Seleccionar todos
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto mb-4" style={{ color: darkColors.text.quaternary }} />
                <p style={{ color: darkColors.text.tertiary }}>No se encontraron documentos</p>
              </div>
            ) : (
              filteredDocuments.map((doc) => {
                const TypeIcon = documentTypeIcons[doc.type]
                const StatusIcon = statusIcons[doc.status]
                const confidenceBadge = getConfidenceBadge(doc.confidence)

                return (
                  <div
                    key={doc.id}
                    className="flex items-center gap-4 p-4 rounded-lg border"
                    style={{
                      backgroundColor: darkColors.background.tertiary,
                      borderColor: darkColors.border.secondary,
                    }}
                  >
                    <Checkbox
                      checked={selectedDocs.includes(doc.id)}
                      onCheckedChange={(checked) => handleSelectDoc(doc.id, checked as boolean)}
                    />

                    <div className="flex-shrink-0">
                      <TypeIcon className="h-8 w-8" style={{ color: darkColors.text.tertiary }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium truncate" style={{ color: darkColors.text.primary }}>
                          {doc.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <StatusIcon className={`h-4 w-4 ${statusColors[doc.status]}`} />
                          <Badge variant={confidenceBadge.variant} className="text-xs">
                            {doc.confidence}% {confidenceBadge.text}
                          </Badge>
                        </div>
                      </div>

                      <div
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm"
                        style={{ color: darkColors.text.secondary }}
                      >
                        <div>
                          <span style={{ color: darkColors.text.tertiary }}>Monto:</span>
                          <p className="font-medium" style={{ color: darkColors.text.primary }}>
                            ${doc.amount.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span style={{ color: darkColors.text.tertiary }}>Proveedor:</span>
                          <p className="font-medium truncate" style={{ color: darkColors.text.primary }}>
                            {doc.vendor}
                          </p>
                        </div>
                        <div>
                          <span style={{ color: darkColors.text.tertiary }}>Fecha:</span>
                          <p className="font-medium" style={{ color: darkColors.text.primary }}>
                            {new Date(doc.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span style={{ color: darkColors.text.tertiary }}>Categoría:</span>
                          <p className="font-medium truncate" style={{ color: darkColors.text.primary }}>
                            {doc.category}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
