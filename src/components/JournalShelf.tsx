import { useRef, useState } from 'react'
import { BookHeart, Download, Import, Plus, Sparkles, Trash2 } from 'lucide-react'
import type { CoverPattern, CoverStyle } from '../types'
import { useJournalStore } from '../store/useJournalStore'
import { CoverPreview } from './CoverPreview'

const patterns: { id: CoverPattern; label: string }[] = [
  { id: 'linen', label: 'Linen' },
  { id: 'gingham', label: 'Gingham' },
  { id: 'ditsy', label: 'Ditsy floral' },
  { id: 'celestial', label: 'Celestial' },
  { id: 'pressed-flowers', label: 'Pressed flowers' },
  { id: 'library-card', label: 'Library card' },
  { id: 'minimal', label: 'Minimal' },
]

const palettes = [
  ['#b8c9b3', '#f1cad4'],
  ['#cbbadd', '#f4dfb7'],
  ['#a9bdd8', '#f2c8c8'],
  ['#d6b894', '#c4d0b3'],
  ['#d9aeb7', '#c9c1df'],
  ['#95a78f', '#eed7a7'],
  ['#ceb8a7', '#9fb4c8'],
]

const motifs = ['✿', '☾', '✦', '♡', '❀', '☕', '✎', '♬', '🕯']

export function JournalShelf() {
  const journals = useJournalStore((state) => state.journals)
  const createJournal = useJournalStore((state) => state.createJournal)
  const openJournal = useJournalStore((state) => state.openJournal)
  const deleteJournal = useJournalStore((state) => state.deleteJournal)
  const exportWorkspace = useJournalStore((state) => state.exportWorkspace)
  const importWorkspace = useJournalStore((state) => state.importWorkspace)

  const [creating, setCreating] = useState(false)
  const [title, setTitle] = useState('My commonplace')
  const [cover, setCover] = useState<CoverStyle>({
    background: '#b8c9b3',
    accent: '#f1cad4',
    pattern: 'ditsy',
    titleColor: '#3d3935',
    motif: '✿',
  })
  const importRef = useRef<HTMLInputElement>(null)

  const onCreate = () => {
    createJournal(title, cover)
    setCreating(false)
  }

  const downloadLibrary = () => {
    const blob = new Blob([exportWorkspace()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `commonplace-library-${new Date().toISOString().slice(0, 10)}.json`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const onImport = async (file?: File) => {
    if (!file) return
    try {
      importWorkspace(await file.text())
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Could not import that library.')
    }
  }

  return (
    <main className="shelf-shell">
      <header className="shelf-header">
        <div>
          <div className="eyebrow"><Sparkles size={15} /> for receipts you refuse to throw away</div>
          <h1>Commonplace</h1>
          <p className="shelf-subtitle">A digital junk journal for words, photos, tape, tiny scraps and whatever else belongs on the page.</p>
        </div>
        <div className="shelf-actions">
          <button className="ghost-button" onClick={downloadLibrary}><Download size={17} /> Backup</button>
          <button className="ghost-button" onClick={() => importRef.current?.click()}><Import size={17} /> Restore</button>
          <input ref={importRef} hidden type="file" accept="application/json" onChange={(event) => void onImport(event.target.files?.[0])} />
          <button className="primary-button" onClick={() => setCreating(true)}><Plus size={17} /> New journal</button>
        </div>
      </header>

      <section className="shelf-intro-card">
        <BookHeart size={22} />
        <div>
          <strong>No streaks. No guilt. No gold stars for journaling every day.</strong>
          <span>Open it when you have something to keep. Ignore it for three weeks if you do not. It will still be here.</span>
        </div>
      </section>

      {journals.length === 0 ? (
        <section className="empty-shelf">
          <div className="empty-stack" aria-hidden>
            <div />
            <div />
            <div />
          </div>
          <h2>Okay, your shelf is extremely empty.</h2>
          <p>Make one journal. The first page is allowed to be ugly. That is basically the point.</p>
          <button className="primary-button" onClick={() => setCreating(true)}><Plus size={17} /> Make a journal</button>
        </section>
      ) : (
        <section className="journal-grid">
          {journals.map((journal) => (
            <article className="journal-card" key={journal.id}>
              <button className="cover-button" onClick={() => openJournal(journal.id)} aria-label={`Open ${journal.title}`}>
                <CoverPreview journal={journal} />
              </button>
              <div className="journal-card-meta">
                <div>
                  <strong>{journal.title}</strong>
                  <span>{journal.pages.length} {journal.pages.length === 1 ? 'page' : 'pages'} · edited {new Date(journal.updatedAt).toLocaleDateString()}</span>
                </div>
                <button className="icon-button danger-on-hover" onClick={() => {
                  if (confirm(`Move "${journal.title}" off this shelf?`)) deleteJournal(journal.id)
                }} aria-label={`Delete ${journal.title}`}><Trash2 size={17} /></button>
              </div>
            </article>
          ))}
          <button className="new-journal-card" onClick={() => setCreating(true)}>
            <Plus size={28} />
            <span>New journal</span>
          </button>
        </section>
      )}

      {creating && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setCreating(false)}>
          <section className="cover-modal" onMouseDown={(event) => event.stopPropagation()}>
            <div className="cover-modal-preview">
              <CoverPreview journal={{
                id: 'preview', title, subtitle: 'bits worth keeping', cover, pages: [],
                createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
              }} large />
            </div>
            <div className="cover-controls">
              <span className="eyebrow">the cover matters too, obviously</span>
              <h2>Make the cover cute</h2>
              <label>
                Journal title
                <input value={title} maxLength={42} onChange={(event) => setTitle(event.target.value)} />
              </label>
              <div>
                <span className="field-label">Palette</span>
                <div className="palette-row">
                  {palettes.map(([background, accent]) => (
                    <button
                      key={background}
                      className={`palette-chip ${cover.background === background ? 'active' : ''}`}
                      onClick={() => setCover({ ...cover, background, accent })}
                      style={{ background: `linear-gradient(135deg, ${background} 55%, ${accent} 55%)` }}
                      aria-label={`Use ${background} palette`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <span className="field-label">Texture</span>
                <div className="chip-wrap">
                  {patterns.map((pattern) => (
                    <button key={pattern.id} className={`choice-chip ${cover.pattern === pattern.id ? 'active' : ''}`} onClick={() => setCover({ ...cover, pattern: pattern.id })}>
                      {pattern.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="field-label">Tiny emblem</span>
                <div className="motif-row">
                  {motifs.map((motif) => (
                    <button key={motif} className={`motif-chip ${cover.motif === motif ? 'active' : ''}`} onClick={() => setCover({ ...cover, motif })}>{motif}</button>
                  ))}
                </div>
              </div>
              <div className="modal-actions">
                <button className="ghost-button" onClick={() => setCreating(false)}>Not yet</button>
                <button className="primary-button" onClick={onCreate}>Yep, keep this one</button>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}
