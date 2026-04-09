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

type HandleType =
  | 'tl' | 'tr' | 'bl' | 'br'
  | 'tm' | 'bm' | 'ml' | 'mr'
  | null

const MIN_SIZE = 30

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
  const [activeHandle, setActiveHandle] = useState<HandleType>(null)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [imageLoaded, setImageLoaded] = useState(false)
  const [scale, setScale] = useState(1)
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      imageRef.current = img

      const maxW = 600
      const maxH = 450
      const ratio = Math.min(maxW / img.width, maxH / img.height, 1)
      const dw = Math.round(img.width * ratio)
      const dh = Math.round(img.height * ratio)
      setDisplaySize({ width: dw, height: dh })

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

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const img = imageRef.current
    if (!canvas || !img || !imageLoaded) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = displaySize.width * dpr
    canvas.height = displaySize.height * dpr
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.scale(dpr, dpr)

    ctx.drawImage(img, 0, 0, displaySize.width, displaySize.height)

    // Darken outside crop
    ctx.fillStyle = 'rgba(0, 0, 0, 0.55)'
    ctx.fillRect(0, 0, displaySize.width, cropArea.y)
    ctx.fillRect(
      0,
      cropArea.y + cropArea.height,
      displaySize.width,
      displaySize.height - cropArea.y - cropArea.height,
    )
    ctx.fillRect(0, cropArea.y, cropArea.x, cropArea.height)
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
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'
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

    // Draw handles - Corners (L-shaped brackets) + Edge midpoints
    const handleLen = 16
    const handleThickness = 3
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = handleThickness
    ctx.lineCap = 'round'

    const cx = cropArea.x
    const cy = cropArea.y
    const cw = cropArea.width
    const ch = cropArea.height

    // Top-left corner
    ctx.beginPath()
    ctx.moveTo(cx, cy + handleLen)
    ctx.lineTo(cx, cy)
    ctx.lineTo(cx + handleLen, cy)
    ctx.stroke()

    // Top-right corner
    ctx.beginPath()
    ctx.moveTo(cx + cw - handleLen, cy)
    ctx.lineTo(cx + cw, cy)
    ctx.lineTo(cx + cw, cy + handleLen)
    ctx.stroke()

    // Bottom-left corner
    ctx.beginPath()
    ctx.moveTo(cx, cy + ch - handleLen)
    ctx.lineTo(cx, cy + ch)
    ctx.lineTo(cx + handleLen, cy + ch)
    ctx.stroke()

    // Bottom-right corner
    ctx.beginPath()
    ctx.moveTo(cx + cw - handleLen, cy + ch)
    ctx.lineTo(cx + cw, cy + ch)
    ctx.lineTo(cx + cw, cy + ch - handleLen)
    ctx.stroke()

    // Edge midpoints (small lines)
    const midLen = 10
    ctx.lineWidth = 2

    // Top mid
    ctx.beginPath()
    ctx.moveTo(cx + cw / 2 - midLen, cy)
    ctx.lineTo(cx + cw / 2 + midLen, cy)
    ctx.stroke()

    // Bottom mid
    ctx.beginPath()
    ctx.moveTo(cx + cw / 2 - midLen, cy + ch)
    ctx.lineTo(cx + cw / 2 + midLen, cy + ch)
    ctx.stroke()

    // Left mid
    ctx.beginPath()
    ctx.moveTo(cx, cy + ch / 2 - midLen)
    ctx.lineTo(cx, cy + ch / 2 + midLen)
    ctx.stroke()

    // Right mid
    ctx.beginPath()
    ctx.moveTo(cx + cw, cy + ch / 2 - midLen)
    ctx.lineTo(cx + cw, cy + ch / 2 + midLen)
    ctx.stroke()

    // Size info inside crop
    if (img && cropArea.width > 100 && cropArea.height > 40) {
      const scaleX = img.width / displaySize.width
      const scaleY = img.height / displaySize.height
      const realW = Math.round(cropArea.width * scaleX * scale)
      const realH = Math.round(cropArea.height * scaleY * scale)
      ctx.fillStyle = 'rgba(0,0,0,0.5)'
      ctx.font = '11px Inter, sans-serif'
      const text = `${realW} × ${realH}`
      const tm = ctx.measureText(text)
      const px = cropArea.x + cropArea.width / 2 - tm.width / 2
      const py = cropArea.y + cropArea.height - 8
      ctx.fillRect(px - 4, py - 12, tm.width + 8, 16)
      ctx.fillStyle = '#ffffff'
      ctx.fillText(text, px, py)
    }
  }, [cropArea, displaySize, imageLoaded, scale])

  useEffect(() => {
    drawCanvas()
  }, [drawCanvas])

  const getMousePos = (e: React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    const scaleX = displaySize.width / rect.width
    const scaleY = displaySize.height / rect.height
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    }
  }

  const HANDLE_HIT = 20

  const getHandle = (mx: number, my: number): HandleType => {
    const cx = cropArea.x
    const cy = cropArea.y
    const cw = cropArea.width
    const ch = cropArea.height

    // Corners
    if (Math.abs(mx - cx) < HANDLE_HIT && Math.abs(my - cy) < HANDLE_HIT) return 'tl'
    if (Math.abs(mx - (cx + cw)) < HANDLE_HIT && Math.abs(my - cy) < HANDLE_HIT) return 'tr'
    if (Math.abs(mx - cx) < HANDLE_HIT && Math.abs(my - (cy + ch)) < HANDLE_HIT) return 'bl'
    if (Math.abs(mx - (cx + cw)) < HANDLE_HIT && Math.abs(my - (cy + ch)) < HANDLE_HIT) return 'br'

    // Edge midpoints
    if (Math.abs(mx - (cx + cw / 2)) < HANDLE_HIT && Math.abs(my - cy) < HANDLE_HIT) return 'tm'
    if (Math.abs(mx - (cx + cw / 2)) < HANDLE_HIT && Math.abs(my - (cy + ch)) < HANDLE_HIT) return 'bm'
    if (Math.abs(mx - cx) < HANDLE_HIT && Math.abs(my - (cy + ch / 2)) < HANDLE_HIT) return 'ml'
    if (Math.abs(mx - (cx + cw)) < HANDLE_HIT && Math.abs(my - (cy + ch / 2)) < HANDLE_HIT) return 'mr'

    return null
  }

  const getCursorForHandle = (handle: HandleType): string => {
    switch (handle) {
      case 'tl': case 'br': return 'nwse-resize'
      case 'tr': case 'bl': return 'nesw-resize'
      case 'tm': case 'bm': return 'ns-resize'
      case 'ml': case 'mr': return 'ew-resize'
      default: return 'crosshair'
    }
  }

  const isInsideCrop = (mx: number, my: number): boolean => {
    return (
      mx >= cropArea.x &&
      mx <= cropArea.x + cropArea.width &&
      my >= cropArea.y &&
      my <= cropArea.y + cropArea.height
    )
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    const pos = getMousePos(e)
    const handle = getHandle(pos.x, pos.y)

    if (handle) {
      setActiveHandle(handle)
      setDragStart(pos)
    } else if (isInsideCrop(pos.x, pos.y)) {
      setIsDragging(true)
      setDragStart({ x: pos.x - cropArea.x, y: pos.y - cropArea.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const pos = getMousePos(e)

    // Update cursor
    const canvas = canvasRef.current
    if (canvas) {
      const handle = getHandle(pos.x, pos.y)
      if (handle) {
        canvas.style.cursor = getCursorForHandle(handle)
      } else if (isInsideCrop(pos.x, pos.y)) {
        canvas.style.cursor = 'move'
      } else {
        canvas.style.cursor = 'crosshair'
      }
    }

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
    } else if (activeHandle) {
      const dx = pos.x - dragStart.x
      const dy = pos.y - dragStart.y

      setCropArea((prev) => {
        let { x, y, width, height } = prev

        switch (activeHandle) {
          case 'br':
            width = Math.max(MIN_SIZE, Math.min(pos.x - x, displaySize.width - x))
            height = Math.max(MIN_SIZE, Math.min(pos.y - y, displaySize.height - y))
            break
          case 'bl':
            width = Math.max(MIN_SIZE, width - dx)
            height = Math.max(MIN_SIZE, Math.min(pos.y - y, displaySize.height - y))
            x = Math.max(0, Math.min(pos.x, x + prev.width - MIN_SIZE))
            break
          case 'tr':
            width = Math.max(MIN_SIZE, Math.min(pos.x - x, displaySize.width - x))
            height = Math.max(MIN_SIZE, height - dy)
            y = Math.max(0, Math.min(pos.y, y + prev.height - MIN_SIZE))
            break
          case 'tl':
            width = Math.max(MIN_SIZE, width - dx)
            height = Math.max(MIN_SIZE, height - dy)
            x = Math.max(0, Math.min(pos.x, x + prev.width - MIN_SIZE))
            y = Math.max(0, Math.min(pos.y, y + prev.height - MIN_SIZE))
            break
          case 'tm':
            height = Math.max(MIN_SIZE, height - dy)
            y = Math.max(0, Math.min(pos.y, y + prev.height - MIN_SIZE))
            break
          case 'bm':
            height = Math.max(MIN_SIZE, Math.min(pos.y - y, displaySize.height - y))
            break
          case 'ml':
            width = Math.max(MIN_SIZE, width - dx)
            x = Math.max(0, Math.min(pos.x, x + prev.width - MIN_SIZE))
            break
          case 'mr':
            width = Math.max(MIN_SIZE, Math.min(pos.x - x, displaySize.width - x))
            break
        }

        return { x, y, width, height }
      })

      setDragStart(pos)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setActiveHandle(null)
  }

  const handleCrop = () => {
    const img = imageRef.current
    if (!img) return

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
      <div className="w-full max-w-[680px] rounded-2xl border border-stone-200/60 bg-white shadow-xl">
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

        {/* Instructions */}
        <div className="border-b border-stone-100 bg-stone-50/50 px-5 py-2">
          <p className="text-[11px] text-stone-400">
            Arraste o interior para mover • Arraste os cantos/bordas para redimensionar
          </p>
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
              className="rounded"
              style={{
                width: displaySize.width,
                height: displaySize.height,
              }}
            />
          ) : (
            <div className="flex h-[350px] items-center justify-center">
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
