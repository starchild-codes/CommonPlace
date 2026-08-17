export type PageKind = 'plain' | 'ruled' | 'dotted' | 'grid'
export type PaperTone = 'ivory' | 'white' | 'blush' | 'sage' | 'lavender' | 'sky'
export type ElementKind = 'text' | 'sticker' | 'washi' | 'paper' | 'image' | 'stamp'

export type CoverPattern =
  | 'linen'
  | 'gingham'
  | 'ditsy'
  | 'celestial'
  | 'pressed-flowers'
  | 'library-card'
  | 'minimal'

export interface CoverStyle {
  background: string
  accent: string
  pattern: CoverPattern
  titleColor: string
  motif: string
}

export interface TextStyle {
  fontFamily: string
  fontSize: number
  fill: string
  fontStyle: 'normal' | 'italic' | 'bold'
  align: 'left' | 'center' | 'right'
  lineHeight: number
  letterSpacing: number
}

export interface BaseElement {
  id: string
  kind: ElementKind
  x: number
  y: number
  width: number
  height: number
  rotation: number
  opacity: number
  z: number
  locked: boolean
}

export interface TextElement extends BaseElement {
  kind: 'text'
  text: string
  style: TextStyle
}

export interface VisualElement extends BaseElement {
  kind: 'sticker' | 'washi' | 'paper' | 'stamp'
  assetId: string
}

export interface ImageElement extends BaseElement {
  kind: 'image'
  src: string
  cornerRadius: number
}

export type JournalElement = TextElement | VisualElement | ImageElement
export type ElementPatch = Partial<TextElement> | Partial<VisualElement> | Partial<ImageElement>

export interface JournalPage {
  id: string
  title: string
  kind: PageKind
  tone: PaperTone
  elements: JournalElement[]
  createdAt: string
  updatedAt: string
}

export interface Journal {
  id: string
  title: string
  subtitle: string
  cover: CoverStyle
  pages: JournalPage[]
  createdAt: string
  updatedAt: string
}

export interface WorkspaceState {
  journals: Journal[]
  activeJournalId: string | null
  activePageId: string | null
  selectedElementId: string | null
  sidebarTab: 'write' | 'decorate' | 'paper' | 'photos'
  focusMode: boolean
  calmMode: boolean
}
