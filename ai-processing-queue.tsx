interface Job {
  id: number
  description: string
  source: string
  status: "pending" | "processing" | "completed" | "failed"
  progress: number
  priority: "high" | "medium" | "low"
  estimatedTime: string
  type: "ai_task" | "document_processing"
}

const mockJobs: Job[] = [
  {
    id: 1,
    description: "Analizando sentimiento de reseña de cliente",
    source: "Formulario web",
    status: "completed" as const,
    progress: 100,
    priority: "high" as const,
    estimatedTime: "N/A",
    type: "ai_task",
  },
  {
    id: 2,
    description: "Generando resumen de reporte financiero",
    source: "Subida de archivo",
    status: "processing" as const,
    progress: 35,
    priority: "medium" as const,
    estimatedTime: "5 min restantes",
    type: "ai_task",
  },
  {
    id: 3,
    description: "Traduciendo documento a inglés",
    source: "API",
    status: "pending" as const,
    progress: 0,
    priority: "low" as const,
    estimatedTime: "10 min restantes",
    type: "ai_task",
  },
  {
    id: 4,
    description: "Clasificando tickets de soporte",
    source: "Integración email",
    status: "failed" as const,
    progress: 0,
    priority: "high" as const,
    estimatedTime: "N/A",
    type: "ai_task",
  },
  {
    id: 5,
    description: "Extrayendo entidades de texto",
    source: "API",
    status: "completed" as const,
    progress: 100,
    priority: "medium" as const,
    estimatedTime: "N/A",
    type: "ai_task",
  },
  {
    id: 6,
    description: "Analizando sentimiento de reseña de cliente",
    source: "Formulario web",
    status: "completed" as const,
    progress: 100,
    priority: "high" as const,
    estimatedTime: "N/A",
    type: "ai_task",
  },
  {
    id: 7,
    description: "Generando resumen de reporte financiero",
    source: "Subida de archivo",
    status: "processing" as const,
    progress: 35,
    priority: "medium" as const,
    estimatedTime: "5 min restantes",
    type: "ai_task",
  },
  {
    id: 8,
    description: "Procesando 15 recibos de gastos",
    source: "Subida masiva",
    status: "processing" as const,
    progress: 67,
    priority: "medium" as const,
    estimatedTime: "3 min restantes",
    type: "document_processing",
  },
  {
    id: 9,
    description: "Extrayendo datos de facturas Q1",
    source: "Integración email",
    status: "processing" as const,
    progress: 23,
    priority: "high" as const,
    estimatedTime: "8 min restantes",
    type: "document_processing",
  },
]

import type React from "react" // Import React to declare JSX.Element

export function AIProcessingQueue(): React.JSX.Element {
  return <></>
}
