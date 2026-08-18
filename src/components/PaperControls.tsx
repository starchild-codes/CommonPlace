import type { PageKind, PaperTone } from '../types'
import { useJournalStore } from '../store/useJournalStore'

const kinds: { id: PageKind; label: string; hint: string }[] = [
  { id: 'plain', label: 'Plain', hint: 'nothing in your way' },
  { id: 'ruled', label: 'Ruled', hint: 'for actual sentences' },
  { id: 'dotted', label: 'Dotted', hint: 'quiet little guide' },
  { id: 'grid', label: 'Grid', hint: 'excellent for collage brain' },
]

const tones: { id: PaperTone; label: string; color: string }[] = [
  { id: 'ivory', label: 'Ivory', color: '#fbf6eb' },
  { id: 'white', label: 'White', color: '#fffefb' },
  { id: 'blush', label: 'Blush', color: '#f9eeee' },
  { id: 'sage', label: 'Sage', color: '#eef3ea' },
  { id: 'lavender', label: 'Lavender', color: '#f2eef7' },
  { id: 'sky', label: 'Sky', color: '#edf4f8' },
]

export function PaperControls() {
  const journals = useJournalStore((state) => state.journals)
  const activeJournalId = useJournalStore((state) => state.activeJournalId)
  const activePageId = useJournalStore((state) => state.activePageId)
  const updatePage = useJournalStore((state) => state.updatePage)

  const page = journals.find((journal) => journal.id === activeJournalId)?.pages.find((item) => item.id === activePageId)
  if (!page) return null

  return (
    <section className="tool-section">
      <span className="eyebrow">pick your paper mood</span>
      <h3>Paper</h3>
      <p className="tool-hint">Change it whenever. Your collage stays exactly where you left it.</p>
      <label>
        Page name
        <input value={page.title} onChange={(event) => updatePage(page.id, { title: event.target.value })} />
      </label>
      <span className="field-label">Lines or no lines?</span>
      <div className="paper-kind-grid">
        {kinds.map((kind) => (
          <button key={kind.id} className={`paper-kind-option ${page.kind === kind.id ? 'active' : ''}`} onClick={() => updatePage(page.id, { kind: kind.id })}>
            <div className={`mini-paper paper-${kind.id}`} />
            <strong>{kind.label}</strong>
            <small>{kind.hint}</small>
          </button>
        ))}
      </div>
      <span className="field-label">Paper color</span>
      <div className="tone-row">
        {tones.map((tone) => (
          <button key={tone.id} className={`tone-chip ${page.tone === tone.id ? 'active' : ''}`} style={{ background: tone.color }} onClick={() => updatePage(page.id, { tone: tone.id })} title={tone.label} />
        ))}
      </div>
      <div className="gentle-prompt">
        <span>tiny opinion</span>
        <p>Dotted paper is elite for pages that are half writing, half “I found this ticket and refuse to throw it away.”</p>
      </div>
    </section>
  )
}
