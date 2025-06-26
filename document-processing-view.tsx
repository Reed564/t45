"use client"

import { useState } from "react"
import { Bot, FileText, Eye, CheckCircle, Zap, TrendingUp, Activity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { darkColors } from "@/lib/dark-design-system"

interface ProcessingStage {
  id: string
  name: string
  description: string
  status: "pending" | "processing" | "completed" | "error"
  progress: number
  duration?: string
}

interface ProcessingJob {
  id: string
  documentName: string
  documentType: string
  stages: ProcessingStage[]
  overallProgress: number
  confidence: number
  startTime: string
  estimatedCompletion: string
  extractedData?: any
}

const mockProcessingJobs: ProcessingJob[] = [
  {
    id: "1",
    documentName: "factura-proveedor-xyz.pdf",
    documentType: "Factura",
    overallProgress: 75,
    confidence: 0,
    startTime: "14:32:15",
    estimatedCompletion: "14:34:20",
    stages: [
      {
        id: "ocr",
        name: "OCR",
        description: "Extracción de texto",
        status: "completed",
        progress: 100,
        duration: "0.8s",
      },
      {
        id: "extraction",
        name: "Extracción",
        description: "Identificación de campos",
        status: "completed",
        progress: 100,
        duration: "1.2s",
      },
      {
        id: "categorization",
        name: "Categorización",
        description: "Clasificación automática",
        status: "processing",
        progress: 75,
      },
      { id: "validation", name: "Validación", description: "Verificación de datos", status: "pending", progress: 0 },
    ],
  },
  {
    id: "2",
    documentName: "recibo-gastos-001.jpg",
    documentType: "Recibo",
    overallProgress: 100,
    confidence: 94,
    startTime: "14:30:45",
    estimatedCompletion: "14:32:10",
    extractedData: {
      amount: "$156.75",
      vendor: "Suministros ABC",
      date: "2024-01-15",
      category: "Suministros de Oficina",
    },
    stages: [
      {
        id: "ocr",
        name: "OCR",
        description: "Extracción de texto",
        status: "completed",
        progress: 100,
        duration: "0.6s",
      },
      {
        id: "extraction",
        name: "Extracción",
        description: "Identificación de campos",
        status: "completed",
        progress: 100,
        duration: "0.9s",
      },
      {
        id: "categorization",
        name: "Categorización",
        description: "Clasificación automática",
        status: "completed",
        progress: 100,
        duration: "0.4s",
      },
      {
        id: "validation",
        name: "Validación",
        description: "Verificación de datos",
        status: "completed",
        progress: 100,
        duration: "0.3s",
      },
    ],
  },
]

const stageIcons = {
  ocr: FileText,
  extraction: Bot,
  categorization: TrendingUp,
  validation: CheckCircle,
}

const statusColors = {
  pending: "text-gray-400",
  processing: "text-blue-500",
  completed: "text-green-500",
  error: "text-red-500",
}

export function DocumentProcessingView() {
  const [processingJobs] = useState(mockProcessingJobs)
  const [selectedJob, setSelectedJob] = useState<string | null>(null)

  const activeJobs = processingJobs.filter((job) => job.overallProgress < 100)
  const completedJobs = processingJobs.filter((job) => job.overallProgress === 100)

  const stats = {
    totalProcessed: 247,
    averageTime: "2.3s",
    accuracyRate: 94.2,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: darkColors.text.primary }}>
            Procesamiento IA
          </h1>
          <p className="text-lg" style={{ color: darkColors.text.secondary }}>
            Monitorea el procesamiento de documentos en tiempo real
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <Card style={{ backgroundColor: darkColors.background.secondary, borderColor: darkColors.border.primary }}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5" style={{ color: darkColors.brand.primary }} />
              <div>
                <p className="text-2xl font-bold" style={{ color: darkColors.text.primary }}>
                  {stats.totalProcessed}
                </p>
                <p className="text-sm" style={{ color: darkColors.text.secondary }}>
                  Docs Procesados Hoy
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: darkColors.background.secondary, borderColor: darkColors.border.primary }}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold" style={{ color: darkColors.text.primary }}>
                  {stats.averageTime}
                </p>
                <p className="text-sm" style={{ color: darkColors.text.secondary }}>
                  Tiempo Promedio
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: darkColors.background.secondary, borderColor: darkColors.border.primary }}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold" style={{ color: darkColors.text.primary }}>
                  {stats.accuracyRate}%
                </p>
                <p className="text-sm" style={{ color: darkColors.text.secondary }}>
                  Precisión IA
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Procesando ({activeJobs.length})</TabsTrigger>
          <TabsTrigger value="completed">Completados ({completedJobs.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeJobs.length === 0 ? (
            <Card style={{ backgroundColor: darkColors.background.secondary, borderColor: darkColors.border.primary }}>
              <CardContent className="p-8 text-center">
                <Bot className="h-12 w-12 mx-auto mb-4" style={{ color: darkColors.text.quaternary }} />
                <p style={{ color: darkColors.text.tertiary }}>No hay documentos procesándose</p>
              </CardContent>
            </Card>
          ) : (
            activeJobs.map((job) => (
              <Card
                key={job.id}
                style={{ backgroundColor: darkColors.background.secondary, borderColor: darkColors.border.primary }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg" style={{ color: darkColors.text.primary }}>
                        {job.documentName}
                      </CardTitle>
                      <CardDescription style={{ color: darkColors.text.secondary }}>
                        {job.documentType} • Iniciado a las {job.startTime}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-sm" style={{ color: darkColors.text.tertiary }}>
                        ETA: {job.estimatedCompletion}
                      </p>
                    </div>
                  </div>
                  <Progress value={job.overallProgress} className="mt-4" />
                  <p className="text-sm text-center mt-2" style={{ color: darkColors.text.secondary }}>
                    {job.overallProgress}% completado
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {job.stages.map((stage, index) => {
                      const StageIcon = stageIcons[stage.id as keyof typeof stageIcons]
                      return (
                        <div
                          key={stage.id}
                          className="flex items-center gap-3 p-3 rounded-lg"
                          style={{ backgroundColor: darkColors.background.tertiary }}
                        >
                          <div className="flex-shrink-0">
                            <StageIcon className={`h-5 w-5 ${statusColors[stage.status]}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm" style={{ color: darkColors.text.primary }}>
                              {stage.name}
                            </p>
                            <p className="text-xs truncate" style={{ color: darkColors.text.tertiary }}>
                              {stage.description}
                            </p>
                            {stage.status === "processing" && <Progress value={stage.progress} className="mt-1 h-1" />}
                            {stage.duration && (
                              <p className="text-xs mt-1" style={{ color: darkColors.text.quaternary }}>
                                {stage.duration}
                              </p>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedJobs.map((job) => (
            <Card
              key={job.id}
              style={{ backgroundColor: darkColors.background.secondary, borderColor: darkColors.border.primary }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg" style={{ color: darkColors.text.primary }}>
                      {job.documentName}
                    </CardTitle>
                    <CardDescription style={{ color: darkColors.text.secondary }}>
                      {job.documentType} • Completado a las {job.estimatedCompletion}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="bg-green-500">
                      {job.confidence}% confianza
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {job.extractedData && (
                <CardContent>
                  <div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-lg"
                    style={{ backgroundColor: darkColors.background.tertiary }}
                  >
                    <div>
                      <span className="text-xs" style={{ color: darkColors.text.tertiary }}>
                        Monto:
                      </span>
                      <p className="font-medium" style={{ color: darkColors.text.primary }}>
                        {job.extractedData.amount}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs" style={{ color: darkColors.text.tertiary }}>
                        Proveedor:
                      </span>
                      <p className="font-medium" style={{ color: darkColors.text.primary }}>
                        {job.extractedData.vendor}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs" style={{ color: darkColors.text.tertiary }}>
                        Fecha:
                      </span>
                      <p className="font-medium" style={{ color: darkColors.text.primary }}>
                        {job.extractedData.date}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs" style={{ color: darkColors.text.tertiary }}>
                        Categoría:
                      </span>
                      <p className="font-medium" style={{ color: darkColors.text.primary }}>
                        {job.extractedData.category}
                      </p>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
