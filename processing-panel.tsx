"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Palette, Brush, Contrast, Sun, Zap, ImageIcon, Wand2 } from "lucide-react"

interface ProcessingPanelProps {
  onProcess: (type: string) => void
  isProcessing: boolean
  hasImage: boolean
}

export function ProcessingPanel({ onProcess, isProcessing, hasImage }: ProcessingPanelProps) {
  const processingOptions = [
    {
      id: "enhance",
      name: "AI Enhance",
      description: "Improve overall image quality",
      icon: Sparkles,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      id: "color-correction",
      name: "Color Correction",
      description: "Automatic color balance",
      icon: Palette,
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      id: "style-transfer",
      name: "Style Transfer",
      description: "Apply artistic styles",
      icon: Brush,
      color: "bg-pink-500 hover:bg-pink-600",
    },
    {
      id: "contrast",
      name: "Smart Contrast",
      description: "Optimize contrast levels",
      icon: Contrast,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      id: "brightness",
      name: "Brightness Fix",
      description: "Adjust lighting automatically",
      icon: Sun,
      color: "bg-yellow-500 hover:bg-yellow-600",
    },
    {
      id: "upscale",
      name: "AI Upscale",
      description: "Increase resolution",
      icon: Zap,
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Wand2 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">AI Processing</h2>
            <p className="text-sm text-gray-500">Choose an enhancement option</p>
          </div>
        </div>

        <div className="space-y-3">
          {processingOptions.map((option) => (
            <Button
              key={option.id}
              onClick={() => onProcess(option.name)}
              disabled={!hasImage || isProcessing}
              className={`w-full justify-start p-4 h-auto ${option.color} text-white disabled:opacity-50 disabled:cursor-not-allowed`}
              variant="default"
            >
              <div className="flex items-center gap-3">
                <option.icon className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">{option.name}</div>
                  <div className="text-xs opacity-90">{option.description}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gray-100 rounded-lg">
            <ImageIcon className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Image Info</h3>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Status:</span>
            <span className="font-medium text-gray-900">
              {!hasImage ? "No image" : isProcessing ? "Processing" : "Ready"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Format:</span>
            <span className="font-medium text-gray-900">{hasImage ? "JPEG/PNG" : "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">AI Model:</span>
            <span className="font-medium text-gray-900">Enhanced v2.1</span>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <div className="text-center">
          <Sparkles className="w-8 h-8 text-blue-500 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Pro Tip</h3>
          <p className="text-sm text-gray-600">
            For best results, use high-quality images with good lighting. Try different processing options to see which
            works best for your image.
          </p>
        </div>
      </Card>
    </div>
  )
}
