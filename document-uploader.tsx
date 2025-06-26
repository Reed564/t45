"use client"

import { useState } from "react"
import { Upload, FileText, Receipt, CreditCard, Building, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { darkColors } from "@/lib/dark-design-system"

interface DocumentType {
  id: string
  name: string
  icon: any
  description: string
  cost: number
}

interface UploadedDocument {
  id: string
  name: string
  type: string
  size: string
  status: "uploading" | "processing" | "completed" | "error"
  progress: number
  confidence?: number
  extractedData?: any
  cost: number
}

const documentTypes: DocumentType[] = [
  { id: "receipt", name: "Recibos", icon: Receipt, description: "Recibos de gastos y compras", cost: 0.25 },
  { id: "invoice", name: "Facturas", icon: FileText, description: "Facturas de proveedores", cost: 0.35 },
  {
    id: "bank_statement",
    name: "Estados Bancarios",
    icon: CreditCard,
    description: "Estados de cuenta bancarios",
    cost: 0.5,
  },
  {
    id: "tax_document",
    name: "Documentos Fiscales",
    icon: Building,
    description: "Documentos fiscales y tributarios",
    cost: 0.45,
  },
]

export function DocumentUploader() {
  const [selectedType, setSelectedType] = useState<string>("receipt")
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDocument[]>([])
  const [isDragOver, setIsDragOver] = useState(false)

  const handleFileUpload = () => {
    // Mock file upload simulation
    const mockDoc: UploadedDocument = {
      id: Date.now().toString(),
      name: `documento-${Date.now()}.pdf`,
      type: selectedType,
      size: "2.4 MB",
      status: "uploading",
      progress: 0,
      cost: documentTypes.find((t) => t.id === selectedType)?.cost || 0.25,
    }

    setUploadedDocs((prev) => [...prev, mockDoc])

    // Simulate upload progress
    let progress = 0
    const uploadInterval = setInterval(() => {
      progress += Math.random() * 20
      if (progress >= 100) {
        progress = 100
        clearInterval(uploadInterval)

        // Start processing simulation
        setUploadedDocs((prev) =>
          prev.map((doc) => (doc.id === mockDoc.id ? { ...doc, status: "processing", progress: 0 } : doc)),
        )

        // Simulate processing stages
        setTimeout(() => {
          setUploadedDocs((prev) =>
            prev.map((doc) =>
              doc.id === mockDoc.id
                ? {
                    ...doc,
                    status: "completed",
                    progress: 100,
                    confidence: Math.floor(Math.random() * 20) + 80,
                    extractedData: {
                      amount: "$" + (Math.random() * 500 + 50).toFixed(2),
                      vendor: "Proveedor Ejemplo S.A.",
                      date: new Date().toLocaleDateString(),
                      category: "Gastos de Oficina",
                    },
                  }
                : doc,
            ),
          )
        }, 3000)
      } else {
        setUploadedDocs((prev) => prev.map((doc) => (doc.id === mockDoc.id ? { ...doc, progress } : doc)))
      }
    }, 200)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "processing":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Upload className="h-4 w-4 text-gray-500" />
    }
  }

  const totalCost = uploadedDocs.reduce((sum, doc) => sum + doc.cost, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: darkColors.text.primary }}>
            Subir Documentos
          </h1>
          <p className="text-lg" style={{ color: darkColors.text.secondary }}>
            Procesa documentos con IA para extraer datos automáticamente
          </p>
        </div>
      </div>

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Subir Documentos</TabsTrigger>
          <TabsTrigger value="queue">Cola de Procesamiento</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          {/* Document Type Selection */}
          <Card style={{ backgroundColor: darkColors.background.secondary, borderColor: darkColors.border.primary }}>
            <CardHeader>
              <CardTitle style={{ color: darkColors.text.primary }}>Tipo de Documento</CardTitle>
              <CardDescription style={{ color: darkColors.text.secondary }}>
                Selecciona el tipo de documento para optimizar el procesamiento IA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {documentTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      selectedType === type.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                    style={{
                      backgroundColor:
                        selectedType === type.id ? darkColors.brand.primary + "20" : darkColors.background.tertiary,
                      borderColor: selectedType === type.id ? darkColors.brand.primary : darkColors.border.secondary,
                    }}
                    onClick={() => setSelectedType(type.id)}
                  >
                    <type.icon
                      className={`h-8 w-8 mb-2 ${selectedType === type.id ? "text-blue-600" : "text-gray-600"}`}
                    />
                    <h3 className="font-semibold mb-1" style={{ color: darkColors.text.primary }}>
                      {type.name}
                    </h3>
                    <p className="text-xs mb-2" style={{ color: darkColors.text.tertiary }}>
                      {type.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upload Area */}
          <Card style={{ backgroundColor: darkColors.background.secondary, borderColor: darkColors.border.primary }}>
            <CardContent className="p-8">
              <div
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
                  isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                }`}
                style={{
                  borderColor: isDragOver ? darkColors.brand.primary : darkColors.border.secondary,
                  backgroundColor: isDragOver ? darkColors.brand.primary + "10" : darkColors.background.tertiary,
                }}
                onDragOver={(e) => {
                  e.preventDefault()
                  setIsDragOver(true)
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault()
                  setIsDragOver(false)
                  handleFileUpload()
                }}
              >
                <Upload className="h-16 w-16 mx-auto mb-4" style={{ color: darkColors.text.tertiary }} />
                <h3 className="text-xl font-semibold mb-2" style={{ color: darkColors.text.primary }}>
                  Arrastra documentos aquí
                </h3>
                <p className="mb-4" style={{ color: darkColors.text.secondary }}>
                  o haz clic para seleccionar archivos
                </p>
                <Button
                  onClick={handleFileUpload}
                  className="mb-4"
                  style={{
                    backgroundColor: darkColors.brand.primary,
                    color: "#000000",
                  }}
                >
                  Seleccionar Archivos
                </Button>
                <p className="text-sm" style={{ color: darkColors.text.tertiary }}>
                  Formatos soportados: PDF, JPG, PNG, TIFF (máx. 10MB)
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="queue" className="space-y-6">
          {/* Processing Queue */}
          <Card style={{ backgroundColor: darkColors.background.secondary, borderColor: darkColors.border.primary }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle style={{ color: darkColors.text.primary }}>Cola de Procesamiento</CardTitle>
                  <CardDescription style={{ color: darkColors.text.secondary }}>
                    {uploadedDocs.length} documentos en cola
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {uploadedDocs.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto mb-4" style={{ color: darkColors.text.quaternary }} />
                    <p style={{ color: darkColors.text.tertiary }}>No hay documentos en cola</p>
                  </div>
                ) : (
                  uploadedDocs.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center gap-4 p-4 rounded-lg"
                      style={{ backgroundColor: darkColors.background.tertiary }}
                    >
                      <div className="flex-shrink-0">{getStatusIcon(doc.status)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium truncate" style={{ color: darkColors.text.primary }}>
                            {doc.name}
                          </p>
                          <div className="flex items-center gap-2">
                            {doc.confidence && (
                              <Badge
                                variant={
                                  doc.confidence > 90 ? "default" : doc.confidence > 70 ? "secondary" : "destructive"
                                }
                                className="text-xs"
                              >
                                {doc.confidence}% confianza
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm" style={{ color: darkColors.text.secondary }}>
                          <span>{doc.size}</span>
                          <span>{documentTypes.find((t) => t.id === doc.type)?.name}</span>
                          <span className="capitalize">{doc.status}</span>
                        </div>
                        {doc.status !== "completed" && <Progress value={doc.progress} className="mt-2" />}
                        {doc.extractedData && (
                          <div
                            className="mt-3 p-3 rounded-md"
                            style={{ backgroundColor: darkColors.background.primary }}
                          >
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
                              <div>
                                <span style={{ color: darkColors.text.tertiary }}>Monto:</span>
                                <p className="font-medium" style={{ color: darkColors.text.primary }}>
                                  {doc.extractedData.amount}
                                </p>
                              </div>
                              <div>
                                <span style={{ color: darkColors.text.tertiary }}>Proveedor:</span>
                                <p className="font-medium" style={{ color: darkColors.text.primary }}>
                                  {doc.extractedData.vendor}
                                </p>
                              </div>
                              <div>
                                <span style={{ color: darkColors.text.tertiary }}>Fecha:</span>
                                <p className="font-medium" style={{ color: darkColors.text.primary }}>
                                  {doc.extractedData.date}
                                </p>
                              </div>
                              <div>
                                <span style={{ color: darkColors.text.tertiary }}>Categoría:</span>
                                <p className="font-medium" style={{ color: darkColors.text.primary }}>
                                  {doc.extractedData.category}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
