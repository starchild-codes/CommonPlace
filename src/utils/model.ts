import type {
  CoverStyle,
  Journal,
  JournalElement,
  JournalPage,
  PageKind,
  PaperTone,
} from '../types'

export const uid = (prefix = 'id') =>
  `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`

export const nowIso = () => new Date().toISOString()

export const defaultCover = (): CoverStyle => ({
  background: '#b7c9b5',
  accent: '#f4d8df',
  pattern: 'ditsy',
  titleColor: '#3f3a35',
  motif: '✿',
})

export const createPage = (
  title = 'Untitled page',
  kind: PageKind = 'dotted',
  tone: PaperTone = 'ivory',
): JournalPage => {
  const now = nowIso()
  return {
    id: uid('page'),
    title,
    kind,
    tone,
    elements: [],
    createdAt: now,
    updatedAt: now,
  }
}

export const createJournal = (
  title: string,
  cover: CoverStyle = defaultCover(),
): Journal => {
  const now = nowIso()
  return {
    id: uid('journal'),
    title: title.trim() || 'My commonplace',
    subtitle: 'bits worth keeping',
    cover,
    pages: [createPage('First page')],
    createdAt: now,
    updatedAt: now,
  }
}

export const duplicatePage = (page: JournalPage): JournalPage => {
  const now = nowIso()
  return {
    ...page,
    id: uid('page'),
    title: `${page.title} copy`,
    elements: page.elements.map((element) => ({
      ...structuredClone(element),
      id: uid(element.kind),
    })) as JournalElement[],
    createdAt: now,
    updatedAt: now,
  }
}

export const moveElementToFront = (
  elements: JournalElement[],
  id: string,
): JournalElement[] => {
  const maxZ = elements.reduce((max, item) => Math.max(max, item.z), 0)
  return elements.map((element) =>
    element.id === id ? { ...element, z: maxZ + 1 } : element,
  )
}

export const moveElementToBack = (
  elements: JournalElement[],
  id: string,
): JournalElement[] => {
  const minZ = elements.reduce((min, item) => Math.min(min, item.z), 0)
  return elements.map((element) =>
    element.id === id ? { ...element, z: minZ - 1 } : element,
  )
}

export const normalizeZ = (elements: JournalElement[]): JournalElement[] =>
  [...elements]
    .sort((a, b) => a.z - b.z)
    .map((element, index) => ({ ...element, z: index }))
