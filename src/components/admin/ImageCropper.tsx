'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Crop, RotateCcw, Check, X, ZoomIn, ZoomOut } from 'lucide-react'

interface ImageCropperProps {
  imageUrl: string
  onCrop: (croppedUrl: string) => void
  onCancel: () => void
}

interface CropArea {
  x: number
  y: number
  width: number
  height: number
}

export default function ImageCropper({
  imageUrl,
  onCrop,
  onCancel,
}: ImageCropperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [cropArea, setCropArea] = useState<CropArea>({
    x: 50,
    y: 50,
    width: 200,
    height: 200,
  })
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [imageLoaded, setImageLoaded] = useState(false)
  const [scale, setScale] = useState(1)
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 })

  // Load image
  useEffect(() => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      imageRef.current = img

      // Calculate display size to fit container (max 500x400)
      const maxW = 500
      const maxH = 400
      const ratio = Math.min(maxW / img.width, maxH / img.height, 1)
      const dw = Math.round(img.width * ratio)
      const dh = Math.round(img.height * ratio)
      setDisplaySize({ width: dw, height: dh })

      // Center initial crop (60% of image)
      const cropW = Math.round(dw * 0.6)
      const cropH = Math.round(dh * 0.6)
      setCropArea({
        x: Math.round((dw - cropW) / 2),
        y: Math.round((dh - cropH) / 2),
        width: cropW,
        height: cropH,
      })

      setImageLoaded(true)
    }
    img.src = imageUrl
  }, [imageUrl])

  // Draw canvas
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const img = imageRef.current
    if (!canvas || !img || !imageLoaded) return

    canvas.width = displaySize.width
    canvas.height = displaySize.height
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Draw image
    ctx.drawImage(img, 0, 0, displaySize.width, displaySize.height)

    // Darken outside crop
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'

    // Top
    ctx.fillRect(0, 0, displaySize.width, cropArea.y)
    // Bottom
    ctx.fillRect(
      0,
      cropArea.y + cropArea.height,
      displaySize.width,
      displaySize.height - cropArea.y - cropArea.height,
    )
    // Left
    ctx.fillRect(0, cropArea.y, cropArea.x, cropArea.height)
    // Right
    ctx.fillRect(
      cropArea.x + cropArea.width,
      cropArea.y,
      displaySize.width - cropArea.x - cropArea.width,
      cropArea.height,
    )

    // Crop border
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 2
    ctx.strokeRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height)

    // Grid lines (rule of thirds)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
    ctx.lineWidth = 1
    const thirdW = cropArea.width / 3
    const thirdH = cropArea.height / 3
    for (let i = 1; i <= 2; i++) {
      ctx.beginPath()
      ctx.moveTo(cropArea.x + thirdW * i, cropArea.y)
      ctx.lineTo(cropArea.x + thirdW * i, cropArea.y + cropArea.height)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(cropArea.x, cropArea.y + thirdH * i)
      ctx.lineTo(cropArea.x + cropArea.width, cropArea.y + thirdH * i)
      ctx.stroke()
    }

    // Corner handles
    const handleSize = 10
    ctx.fillStyle = '#ffffff'
    const corners = [
      { x: cropArea.x, y: cropArea.y },
      { x: cropArea.x + cropArea.width, y: cropArea.y },
      { x: cropArea.x, y: cropArea.y + cropArea.height },
      { x: cropArea.x + cropArea.width, y: cropArea.y + cropArea.height },
    ]
    corners.forEach((corner) => {
      ctx.fillRect(
        corner.x - handleSize / 2,
        corner.y - handleSize / 2,
        handleSize,
        handleSize,
      )
    })
  }, [cropArea, displaySize, imageLoaded])

  useEffect(() => {
    drawCanvas()
  }, [drawCanvas])

  const getMousePos = (e: React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const isNearCorner = (mx: number, my: number): boolean => {
    const corners = [
      {
        x: cropArea.x + cropArea.width,
        y: cropArea.y + cropArea.height,
      },
    ]
    return corners.some(
      (c) => Math.abs(mx - c.x) < 15 && Math.abs(my - c.y) < 15,
    )
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    const pos = getMousePos(e)

    if (isNearCorner(pos.x, pos.y)) {
      setIsResizing(true)
      setDragStart(pos)
    } else if (
      pos.x >= cropArea.x &&
      pos.x <= cropArea.x + cropArea.width &&
      pos.y >= cropArea.y &&
      pos.y <= cropArea.y + cropArea.height
    ) {
      setIsDragging(true)
      setDragStart({ x: pos.x - cropArea.x, y: pos.y - cropArea.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const pos = getMousePos(e)

    if (isDragging) {
      const newX = Math.max(
        0,
        Math.min(pos.x - dragStart.x, displaySize.width - cropArea.width),
      )
      const newY = Math.max(
        0,
        Math.min(pos.y - dragStart.y, displaySize.height - cropArea.height),
      )
      setCropArea((prev) => ({ ...prev, x: newX, y: newY }))
    } else if (isResizing) {
      const newW = Math.max(
        50,
        Math.min(pos.x - cropArea.x, displaySize.width - cropArea.x),
      )
      const newH = Math.max(
        50,
        Math.min(pos.y - cropArea.y, displaySize.height - cropArea.y),
      )
      setCropArea((prev) => ({ ...prev, width: newW, height: newH }))
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setIsResizing(false)
  }

  const handleCrop = () => {
    const img = imageRef.current
    if (!img) return

    // Map display coords back to original image coords
    const scaleX = img.width / displaySize.width
    const scaleY = img.height / displaySize.height

    const cropCanvas = document.createElement('canvas')
    const realW = Math.round(cropArea.width * scaleX * scale)
    const realH = Math.round(cropArea.height * scaleY * scale)
    cropCanvas.width = realW
    cropCanvas.height = realH

    const ctx = cropCanvas.getContext('2d')
    if (!ctx) return

    ctx.drawImage(
      img,
      cropArea.x * scaleX,
      cropArea.y * scaleY,
      cropArea.width * scaleX,
      cropArea.height * scaleY,
      0,
      0,
      realW,
      realH,
    )

    const croppedUrl = cropCanvas.toDataURL('image/jpeg', 0.9)
    onCrop(croppedUrl)
  }

  const handleReset = () => {
    if (!displaySize.width) return
    const cropW = Math.round(displaySize.width * 0.6)
    const cropH = Math.round(displaySize.height * 0.6)
    setCropArea({
      x: Math.round((displaySize.width - cropW) / 2),
      y: Math.round((displaySize.height - cropH) / 2),
      width: cropW,
      height: cropH,
    })
    setScale(1)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-[580px] rounded-2xl border border-stone-200/60 bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <Crop size={16} className="text-stone-400" />
            <h2 className="text-[14px] font-bold text-stone-800">
              Recortar Imagem
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-400 hover:bg-stone-100 hover:text-stone-600"
          >
            <X size={16} />
          </button>
        </div>

        {/* Canvas */}
        <div
          ref={containerRef}
          className="flex items-center justify-center bg-stone-950 p-4"
        >
          {imageLoaded ? (
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="cursor-crosshair rounded"
              style={{
                width: displaySize.width,
                height: displaySize.height,
              }}
            />
          ) : (
            <div className="flex h-[300px] items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-stone-600 border-t-white" />
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between border-t border-stone-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200/60 text-stone-500 hover:bg-stone-50"
            >
              <ZoomOut size={14} />
            </button>
            <span className="text-[11px] font-bold text-stone-400">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => setScale((s) => Math.min(2, s + 0.1))}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200/60 text-stone-500 hover:bg-stone-50"
            >
              <ZoomIn size={14} />
            </button>
            <button
              onClick={handleReset}
              className="flex h-8 items-center gap-1.5 rounded-lg border border-stone-200/60 px-3 text-[11px] font-semibold text-stone-500 hover:bg-stone-50"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onCancel}
              className="rounded-xl border border-stone-200/60 px-4 py-2 text-[12px] font-semibold text-stone-600 hover:bg-stone-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleCrop}
              className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-[12px] font-semibold text-white hover:bg-primary-dark"
            >
              <Check size={14} />
              Aplicar Corte
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
