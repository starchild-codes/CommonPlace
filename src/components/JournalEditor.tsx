import { useMemo, useRef } from 'react'
import {
  ArrowLeft,
  Download,
  Eye,
  EyeOff,
  Feather,
  Redo2,
  Undo2,
} from 'lucide-react'
import { useJournalStore } from '../store/useJournalStore'
import { PageStrip } from './PageStrip'
import { ToolSidebar } from './ToolSidebar'
import { JournalCanvas, type CanvasHandle } from './JournalCanvas'
import { Inspector } from './Inspector'

export function JournalEditor() {
  const journals = useJournalStore((state) => state.journals)
  const activeJournalId = useJournalStore((state) => state.activeJournalId)
  const activePageId = useJournalStore((state) => state.activePageId)
  const closeJournal = useJournalStore((state) => state.closeJournal)
  const undo = useJournalStore((state) => state.undo)
  const redo = useJournalStore((state) => state.redo)
  const history = useJournalStore((state) => state.history)
  const future = useJournalStore((state) => state.future)
  const focusMode = useJournalStore((state) => state.focusMode)
  const calmMode = useJournalStore((state) => state.calmMode)
  const toggleFocusMode = useJournalStore((state) => state.toggleFocusMode)
  const toggleCalmMode = useJournalStore((state) => state.toggleCalmMode)
  const canvasRef = useRef<CanvasHandle>(null)

  const journal = useMemo(
    () => journals.find((item) => item.id === activeJournalId),
    [activeJournalId, journals],
  )
  const page = journal?.pages.find((item) => item.id === activePageId)

  if (!journal || !page) return null

  return (
    <div className={`editor-shell ${focusMode ? 'focus-mode' : ''}`}>
      <header className="editor-topbar">
        <div className="topbar-left">
          <button className="icon-button" onClick={closeJournal} aria-label="Back to journal shelf">
            <ArrowLeft size={18} />
          </button>
          <div className="journal-crumb">
            <span>{journal.cover.motif}</span>
            <div>
              <strong>{journal.title}</strong>
              <small>{page.title}</small>
            </div>
          </div>
        </div>

        <div className="topbar-center">
          <button className="icon-button" onClick={undo} disabled={history.length === 0} aria-label="Undo"><Undo2 size={18} /></button>
          <button className="icon-button" onClick={redo} disabled={future.length === 0} aria-label="Redo"><Redo2 size={18} /></button>
          <span className="autosave-pill"><span className="save-dot" /> saved on this device</span>
        </div>

        <div className="topbar-right">
          <button className={`soft-button ${calmMode ? 'active' : ''}`} onClick={toggleCalmMode} title="Calm mode hides performance-like feedback">
            <Feather size={16} /> Calm
          </button>
          <button className="soft-button" onClick={toggleFocusMode}>
            {focusMode ? <Eye size={16} /> : <EyeOff size={16} />} {focusMode ? 'Show tools' : 'Focus'}
          </button>
          <button className="primary-button small" onClick={() => canvasRef.current?.downloadPng()}>
            <Download size={16} /> Save page
          </button>
        </div>
      </header>

      <div className="editor-body">
        {!focusMode && <PageStrip journal={journal} />}
        {!focusMode && <ToolSidebar />}
        <main className="canvas-workspace">
          <JournalCanvas ref={canvasRef} page={page} />
        </main>
        {!focusMode && <Inspector />}
      </div>
    </div>
  )
}
