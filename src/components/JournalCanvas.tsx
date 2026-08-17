import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from 'react'
import Konva from 'konva'
import { Circle, Group, Image as KonvaImage, Layer, Line, Rect, Stage, Text, Transformer } from 'react-konva'
import useImage from 'use-image'
import type { ElementPatch, JournalElement, JournalPage, TextElement, VisualElement, ImageElement } from '../types'
import { assetById } from '../data/assets'
import { useJournalStore } from '../store/useJournalStore'

const PAGE_W = 820
const PAGE_H = 1080

const paperColors: Record<JournalPage['tone'], string> = {
  ivory: '#fbf6eb',
  white: '#fffefb',
  blush: '#f9eeee',
  sage: '#eef3ea',
  lavender: '#f2eef7',
  sky: '#edf4f8',
}

export interface CanvasHandle {
  downloadPng: () => void
}

export const JournalCanvas = forwardRef<CanvasHandle, { page: JournalPage }>(
  function JournalCanvas({ page }, ref) {
    const stageRef = useRef<Konva.Stage>(null)
    const wrapRef = useRef<HTMLDivElement>(null)
    const [scale, setScale] = useState(0.75)
    const selectedId = useJournalStore((state) => state.selectedElementId)
    const selectElement = useJournalStore((state) => state.selectElement)
    const updateElement = useJournalStore((state) => state.updateElement)

    useEffect(() => {
      const wrap = wrapRef.current
      if (!wrap) return
      const resize = () => {
        const available = Math.max(360, wrap.clientWidth - 80)
        setScale(Math.min(0.9, available / PAGE_W))
      }
      resize()
      const observer = new ResizeObserver(resize)
      observer.observe(wrap)
      return () => observer.disconnect()
    }, [])

    useImperativeHandle(ref, () => ({
      downloadPng() {
        const stage = stageRef.current
        if (!stage) return
        const previousScale = stage.scaleX()
        stage.scale({ x: 1, y: 1 })
        stage.size({ width: PAGE_W, height: PAGE_H })
        const url = stage.toDataURL({ pixelRatio: 2 })
        stage.scale({ x: previousScale, y: previousScale })
        stage.size({ width: PAGE_W * previousScale, height: PAGE_H * previousScale })
        const link = document.createElement('a')
        link.href = url
        link.download = `${page.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase() || 'commonplace-page'}.png`
        link.click()
      },
    }), [page.title])

    const sorted = useMemo(
      () => [...page.elements].sort((a, b) => a.z - b.z),
      [page.elements],
    )

    return (
      <div className="canvas-scroll" ref={wrapRef}>
        <div className="canvas-paper-shadow" style={{ width: PAGE_W * scale, height: PAGE_H * scale }}>
          <Stage
            ref={stageRef}
            width={PAGE_W * scale}
            height={PAGE_H * scale}
            scaleX={scale}
            scaleY={scale}
            onMouseDown={(event) => {
              if (event.target === event.target.getStage()) selectElement(null)
            }}
            onTouchStart={(event) => {
              if (event.target === event.target.getStage()) selectElement(null)
            }}
          >
            <Layer listening={false}>
              <Rect width={PAGE_W} height={PAGE_H} fill={paperColors[page.tone]} />
              <PaperPattern kind={page.kind} />
              <Rect x={22} y={22} width={PAGE_W - 44} height={PAGE_H - 44} stroke="#786f6624" strokeWidth={1} cornerRadius={4} />
            </Layer>

            <Layer>
              {sorted.map((element) => (
                <CanvasElement
                  key={element.id}
                  element={element}
                  selected={selectedId === element.id}
                  onSelect={() => selectElement(element.id)}
                  onChange={(patch) => updateElement(element.id, patch)}
                />
              ))}
            </Layer>
          </Stage>
        </div>
        <div className="canvas-caption">
          <span>drag · resize · rotate · layer</span>
          <small>{page.elements.length === 0 ? 'blank pages are allowed' : `${page.elements.length} pieces on this page`}</small>
        </div>
      </div>
    )
  },
)

function PaperPattern({ kind }: { kind: JournalPage['kind'] }) {
  if (kind === 'plain') return null
  if (kind === 'ruled') {
    return (
      <Group>
        {Array.from({ length: 32 }, (_, i) => (
          <Line key={i} points={[45, 76 + i * 30, PAGE_W - 45, 76 + i * 30]} stroke="#9eb3c153" strokeWidth={1} />
        ))}
        <Line points={[85, 40, 85, PAGE_H - 40]} stroke="#d5a0a855" strokeWidth={1.2} />
      </Group>
    )
  }
  if (kind === 'grid') {
    return (
      <Group opacity={0.42}>
        {Array.from({ length: 26 }, (_, i) => (
          <Line key={`v${i}`} points={[35 + i * 30, 35, 35 + i * 30, PAGE_H - 35]} stroke="#9aa9aa55" strokeWidth={1} />
        ))}
        {Array.from({ length: 34 }, (_, i) => (
          <Line key={`h${i}`} points={[35, 35 + i * 30, PAGE_W - 35, 35 + i * 30]} stroke="#9aa9aa55" strokeWidth={1} />
        ))}
      </Group>
    )
  }
  return (
    <Group opacity={0.45}>
      {Array.from({ length: 34 }, (_, row) =>
        Array.from({ length: 26 }, (_, col) => (
          <Circle
            key={`${row}-${col}`}
            x={38 + col * 29}
            y={40 + row * 29}
            radius={1.3}
            fill="#82909073"
          />
        )),
      )}
    </Group>
  )
}

function CanvasElement({
  element,
  selected,
  onSelect,
  onChange,
}: {
  element: JournalElement
  selected: boolean
  onSelect: () => void
  onChange: (patch: ElementPatch) => void
}) {
  const nodeRef = useRef<Konva.Node>(null)
  const transformerRef = useRef<Konva.Transformer>(null)

  useEffect(() => {
    if (selected && nodeRef.current && transformerRef.current) {
      transformerRef.current.nodes([nodeRef.current])
      transformerRef.current.getLayer()?.batchDraw()
    }
  }, [selected])

  const common = {
    x: element.x,
    y: element.y,
    width: element.width,
    height: element.height,
    rotation: element.rotation,
    opacity: element.opacity,
    draggable: !element.locked,
    onClick: onSelect,
    onTap: onSelect,
    onDragEnd: (event: Konva.KonvaEventObject<DragEvent>) =>
      onChange({ x: event.target.x(), y: event.target.y() }),
    onTransformEnd: () => {
      const node = nodeRef.current
      if (!node) return
      const sx = node.scaleX()
      const sy = node.scaleY()
      node.scaleX(1)
      node.scaleY(1)
      onChange({
        x: node.x(),
        y: node.y(),
        rotation: node.rotation(),
        width: Math.max(24, node.width() * sx),
        height: Math.max(24, node.height() * sy),
      })
    },
  }

  return (
    <>
      {element.kind === 'text' ? (
        <CanvasText nodeRef={nodeRef} element={element} common={common} />
      ) : element.kind === 'image' ? (
        <CanvasPhoto nodeRef={nodeRef} element={element} common={common} />
      ) : (
        <CanvasAsset nodeRef={nodeRef} element={element} common={common} />
      )}
      {selected && !element.locked && (
        <Transformer
          ref={transformerRef}
          rotateEnabled
          flipEnabled={false}
          keepRatio={element.kind !== 'text'}
          borderStroke="#8e7fa8"
          borderDash={[4, 4]}
          anchorFill="#fffaf4"
          anchorStroke="#8e7fa8"
          anchorSize={10}
          boundBoxFunc={(oldBox, newBox) =>
            newBox.width < 24 || newBox.height < 24 ? oldBox : newBox
          }
        />
      )}
    </>
  )
}

function CanvasText({
  nodeRef,
  element,
  common,
}: {
  nodeRef: RefObject<Konva.Node | null>
  element: TextElement
  common: Record<string, unknown>
}) {
  return (
    <Text
      ref={nodeRef as RefObject<Konva.Text>}
      {...common}
      text={element.text}
      fill={element.style.fill}
      fontFamily={element.style.fontFamily}
      fontSize={element.style.fontSize}
      fontStyle={element.style.fontStyle}
      align={element.style.align}
      lineHeight={element.style.lineHeight}
      letterSpacing={element.style.letterSpacing}
      verticalAlign="top"
      padding={4}
    />
  )
}

function CanvasAsset({
  nodeRef,
  element,
  common,
}: {
  nodeRef: RefObject<Konva.Node | null>
  element: VisualElement
  common: Record<string, unknown>
}) {
  const asset = assetById.get(element.assetId)
  const [image] = useImage(asset?.svg ?? '')
  return <KonvaImage ref={nodeRef as RefObject<Konva.Image>} {...common} image={image} />
}

function CanvasPhoto({
  nodeRef,
  element,
  common,
}: {
  nodeRef: RefObject<Konva.Node | null>
  element: ImageElement
  common: Record<string, unknown>
}) {
  const [image] = useImage(element.src)
  return (
    <KonvaImage
      ref={nodeRef as RefObject<Konva.Image>}
      {...common}
      image={image}
      cornerRadius={element.cornerRadius}
      shadowColor="#4e443a"
      shadowOpacity={0.16}
      shadowBlur={8}
      shadowOffsetY={4}
    />
  )
}
