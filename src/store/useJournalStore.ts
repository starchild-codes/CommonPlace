import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  CoverStyle,
  ElementPatch,
  Journal,
  JournalElement,
  JournalPage,
  PageKind,
  PaperTone,
  WorkspaceState,
} from '../types'
import {
  createJournal,
  createPage,
  duplicatePage,
  moveElementToBack,
  moveElementToFront,
  normalizeZ,
  nowIso,
  uid,
} from '../utils/model'

type Snapshot = Pick<WorkspaceState, 'journals' | 'activeJournalId' | 'activePageId' | 'selectedElementId'>

interface JournalActions {
  history: Snapshot[]
  future: Snapshot[]
  createJournal: (title: string, cover: CoverStyle) => string
  deleteJournal: (id: string) => void
  updateJournal: (id: string, patch: Partial<Pick<Journal, 'title' | 'subtitle' | 'cover'>>) => void
  openJournal: (id: string) => void
  closeJournal: () => void
  addPage: (kind?: PageKind, tone?: PaperTone) => string | null
  duplicatePage: (pageId: string) => void
  deletePage: (pageId: string) => void
  selectPage: (pageId: string) => void
  updatePage: (pageId: string, patch: Partial<Pick<JournalPage, 'title' | 'kind' | 'tone'>>) => void
  addElement: (element: JournalElement) => void
  updateElement: (id: string, patch: ElementPatch) => void
  deleteElement: (id: string) => void
  duplicateElement: (id: string) => void
  bringToFront: (id: string) => void
  sendToBack: (id: string) => void
  toggleLock: (id: string) => void
  selectElement: (id: string | null) => void
  setSidebarTab: (tab: WorkspaceState['sidebarTab']) => void
  toggleFocusMode: () => void
  toggleCalmMode: () => void
  undo: () => void
  redo: () => void
  exportWorkspace: () => string
  importWorkspace: (raw: string) => void
}

type JournalStore = WorkspaceState & JournalActions

const initialState: WorkspaceState = {
  journals: [],
  activeJournalId: null,
  activePageId: null,
  selectedElementId: null,
  sidebarTab: 'write',
  focusMode: false,
  calmMode: true,
}

const snapshot = (state: JournalStore): Snapshot => ({
  journals: structuredClone(state.journals),
  activeJournalId: state.activeJournalId,
  activePageId: state.activePageId,
  selectedElementId: state.selectedElementId,
})

const withHistory = (state: JournalStore) => ({
  history: [...state.history.slice(-39), snapshot(state)],
  future: [],
})

const touchJournal = (journal: Journal): Journal => ({ ...journal, updatedAt: nowIso() })

export const useJournalStore = create<JournalStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      history: [],
      future: [],

      createJournal: (title, cover) => {
        const journal = createJournal(title, cover)
        set((state) => ({
          ...withHistory(state),
          journals: [journal, ...state.journals],
          activeJournalId: journal.id,
          activePageId: journal.pages[0].id,
          selectedElementId: null,
        }))
        return journal.id
      },

      deleteJournal: (id) =>
        set((state) => ({
          ...withHistory(state),
          journals: state.journals.filter((journal) => journal.id !== id),
          activeJournalId: state.activeJournalId === id ? null : state.activeJournalId,
          activePageId: state.activeJournalId === id ? null : state.activePageId,
          selectedElementId: null,
        })),

      updateJournal: (id, patch) =>
        set((state) => ({
          ...withHistory(state),
          journals: state.journals.map((journal) =>
            journal.id === id ? touchJournal({ ...journal, ...patch }) : journal,
          ),
        })),

      openJournal: (id) => {
        const journal = get().journals.find((item) => item.id === id)
        if (!journal) return
        set({
          activeJournalId: id,
          activePageId: journal.pages[0]?.id ?? null,
          selectedElementId: null,
        })
      },

      closeJournal: () =>
        set({
          activeJournalId: null,
          activePageId: null,
          selectedElementId: null,
          focusMode: false,
        }),

      addPage: (kind = 'dotted', tone = 'ivory') => {
        const journalId = get().activeJournalId
        if (!journalId) return null
        const page = createPage(`Page ${get().journals.find(j => j.id === journalId)!.pages.length + 1}`, kind, tone)
        set((state) => ({
          ...withHistory(state),
          journals: state.journals.map((journal) =>
            journal.id === journalId
              ? touchJournal({ ...journal, pages: [...journal.pages, page] })
              : journal,
          ),
          activePageId: page.id,
          selectedElementId: null,
        }))
        return page.id
      },

      duplicatePage: (pageId) =>
        set((state) => {
          const journalId = state.activeJournalId
          if (!journalId) return state
          return {
            ...withHistory(state),
            journals: state.journals.map((journal) => {
              if (journal.id !== journalId) return journal
              const page = journal.pages.find((item) => item.id === pageId)
              if (!page) return journal
              const copy = duplicatePage(page)
              return touchJournal({ ...journal, pages: [...journal.pages, copy] })
            }),
          }
        }),

      deletePage: (pageId) =>
        set((state) => {
          const journalId = state.activeJournalId
          const journal = state.journals.find((item) => item.id === journalId)
          if (!journal || journal.pages.length <= 1) return state
          const pages = journal.pages.filter((page) => page.id !== pageId)
          return {
            ...withHistory(state),
            journals: state.journals.map((item) =>
              item.id === journalId ? touchJournal({ ...item, pages }) : item,
            ),
            activePageId: state.activePageId === pageId ? pages[0].id : state.activePageId,
            selectedElementId: null,
          }
        }),

      selectPage: (pageId) => set({ activePageId: pageId, selectedElementId: null }),

      updatePage: (pageId, patch) =>
        set((state) => ({
          ...withHistory(state),
          journals: state.journals.map((journal) =>
            journal.id !== state.activeJournalId
              ? journal
              : touchJournal({
                  ...journal,
                  pages: journal.pages.map((page) =>
                    page.id === pageId ? { ...page, ...patch, updatedAt: nowIso() } : page,
                  ),
                }),
          ),
        })),

      addElement: (element) =>
        set((state) => ({
          ...withHistory(state),
          journals: state.journals.map((journal) =>
            journal.id !== state.activeJournalId
              ? journal
              : touchJournal({
                  ...journal,
                  pages: journal.pages.map((page) =>
                    page.id !== state.activePageId
                      ? page
                      : {
                          ...page,
                          elements: normalizeZ([...page.elements, element]),
                          updatedAt: nowIso(),
                        },
                  ),
                }),
          ),
          selectedElementId: element.id,
        })),

      updateElement: (id, patch) =>
        set((state) => ({
          journals: state.journals.map((journal) =>
            journal.id !== state.activeJournalId
              ? journal
              : touchJournal({
                  ...journal,
                  pages: journal.pages.map((page) =>
                    page.id !== state.activePageId
                      ? page
                      : {
                          ...page,
                          elements: page.elements.map((element) =>
                            element.id === id
                              ? ({ ...element, ...patch } as JournalElement)
                              : element,
                          ),
                          updatedAt: nowIso(),
                        },
                  ),
                }),
          ),
        })),

      deleteElement: (id) =>
        set((state) => ({
          ...withHistory(state),
          journals: state.journals.map((journal) =>
            journal.id !== state.activeJournalId
              ? journal
              : touchJournal({
                  ...journal,
                  pages: journal.pages.map((page) =>
                    page.id !== state.activePageId
                      ? page
                      : {
                          ...page,
                          elements: page.elements.filter((element) => element.id !== id),
                          updatedAt: nowIso(),
                        },
                  ),
                }),
          ),
          selectedElementId: state.selectedElementId === id ? null : state.selectedElementId,
        })),

      duplicateElement: (id) =>
        set((state) => {
          const journal = state.journals.find((item) => item.id === state.activeJournalId)
          const page = journal?.pages.find((item) => item.id === state.activePageId)
          const source = page?.elements.find((item) => item.id === id)
          if (!source) return state
          const copy = {
            ...structuredClone(source),
            id: uid(source.kind),
            x: source.x + 18,
            y: source.y + 18,
            z: page!.elements.length + 1,
          } as JournalElement
          return {
            ...withHistory(state),
            journals: state.journals.map((item) =>
              item.id !== state.activeJournalId
                ? item
                : touchJournal({
                    ...item,
                    pages: item.pages.map((p) =>
                      p.id !== state.activePageId
                        ? p
                        : { ...p, elements: normalizeZ([...p.elements, copy]), updatedAt: nowIso() },
                    ),
                  }),
            ),
            selectedElementId: copy.id,
          }
        }),

      bringToFront: (id) =>
        set((state) => ({
          ...withHistory(state),
          journals: state.journals.map((journal) =>
            journal.id !== state.activeJournalId
              ? journal
              : touchJournal({
                  ...journal,
                  pages: journal.pages.map((page) =>
                    page.id !== state.activePageId
                      ? page
                      : { ...page, elements: normalizeZ(moveElementToFront(page.elements, id)), updatedAt: nowIso() },
                  ),
                }),
          ),
        })),

      sendToBack: (id) =>
        set((state) => ({
          ...withHistory(state),
          journals: state.journals.map((journal) =>
            journal.id !== state.activeJournalId
              ? journal
              : touchJournal({
                  ...journal,
                  pages: journal.pages.map((page) =>
                    page.id !== state.activePageId
                      ? page
                      : { ...page, elements: normalizeZ(moveElementToBack(page.elements, id)), updatedAt: nowIso() },
                  ),
                }),
          ),
        })),

      toggleLock: (id) => {
        const journal = get().journals.find((item) => item.id === get().activeJournalId)
        const page = journal?.pages.find((item) => item.id === get().activePageId)
        const element = page?.elements.find((item) => item.id === id)
        if (element) get().updateElement(id, { locked: !element.locked })
      },

      selectElement: (id) => set({ selectedElementId: id }),
      setSidebarTab: (sidebarTab) => set({ sidebarTab }),
      toggleFocusMode: () => set((state) => ({ focusMode: !state.focusMode })),
      toggleCalmMode: () => set((state) => ({ calmMode: !state.calmMode })),

      undo: () =>
        set((state) => {
          const previous = state.history.at(-1)
          if (!previous) return state
          return {
            ...state,
            ...previous,
            history: state.history.slice(0, -1),
            future: [snapshot(state), ...state.future].slice(0, 40),
          }
        }),

      redo: () =>
        set((state) => {
          const next = state.future[0]
          if (!next) return state
          return {
            ...state,
            ...next,
            history: [...state.history, snapshot(state)].slice(-40),
            future: state.future.slice(1),
          }
        }),

      exportWorkspace: () =>
        JSON.stringify(
          { version: 1, exportedAt: nowIso(), journals: get().journals },
          null,
          2,
        ),

      importWorkspace: (raw) => {
        const parsed = JSON.parse(raw) as { journals?: Journal[] }
        if (!Array.isArray(parsed.journals)) throw new Error('That file does not contain a Commonplace journal library.')
        set((state) => ({
          ...withHistory(state),
          journals: parsed.journals,
          activeJournalId: null,
          activePageId: null,
          selectedElementId: null,
        }))
      },
    }),
    {
      name: 'commonplace-workspace-v1',
      partialize: (state) => ({
        journals: state.journals,
        activeJournalId: state.activeJournalId,
        activePageId: state.activePageId,
        sidebarTab: state.sidebarTab,
        calmMode: state.calmMode,
      }),
    },
  ),
)
