"use client"

import type React from "react"

import { useCallback, useState } from "react"
import { Upload, ImageIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void
}

export function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleFileUpload = useCallback(
    (file: File) => {
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          onImageUpload(result)
        }
        reader.readAsDataURL(file)
      }
    },
    [onImageUpload],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        handleFileUpload(files[0])
      }
    },
    [handleFileUpload],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        handleFileUpload(files[0])
      }
    },
    [handleFileUpload],
  )

  return (
    <Card className="w-full max-w-2xl">
      <div
        className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-all duration-200 ${
          isDragOver ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="space-y-4">
          <div className="flex justify-center">
            <div className={`p-4 rounded-full transition-colors ${isDragOver ? "bg-blue-100" : "bg-gray-100"}`}>
              {isDragOver ? (
                <Upload className="w-8 h-8 text-blue-500" />
              ) : (
                <ImageIcon className="w-8 h-8 text-gray-400" />
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {isDragOver ? "Drop your image here" : "Upload an image"}
            </h3>
            <p className="text-gray-500 mb-4">Drag and drop your image here, or click to browse</p>
            <p className="text-sm text-gray-400">Supports JPG, PNG, GIF up to 10MB</p>
          </div>

          <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            <Upload className="w-4 h-4 mr-2" />
            Choose File
          </button>
        </div>
      </div>
    </Card>
  )
}
