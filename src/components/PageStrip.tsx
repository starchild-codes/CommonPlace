import { Copy, Plus, Trash2 } from 'lucide-react'
import type { Journal } from '../types'
import { useJournalStore } from '../store/useJournalStore'

export function PageStrip({ journal }: { journal: Journal }) {
  const activePageId = useJournalStore((state) => state.activePageId)
  const addPage = useJournalStore((state) => state.addPage)
  const selectPage = useJournalStore((state) => state.selectPage)
  const duplicatePage = useJournalStore((state) => state.duplicatePage)
  const deletePage = useJournalStore((state) => state.deletePage)

  return (
    <aside className="page-strip">
      <div className="panel-heading">
        <span>Pages</span>
        <button className="tiny-icon-button" onClick={() => addPage()} aria-label="Add page"><Plus size={16} /></button>
      </div>
      <div className="page-thumb-list">
        {journal.pages.map((page, index) => (
          <div className={`page-thumb-wrap ${page.id === activePageId ? 'active' : ''}`} key={page.id}>
            <button className={`page-thumb tone-${page.tone} paper-${page.kind}`} onClick={() => selectPage(page.id)}>
              <span className="page-number">{index + 1}</span>
              <div className="thumb-scribble">♡</div>
              <small>{page.title}</small>
            </button>
            {page.id === activePageId && (
              <div className="page-thumb-actions">
                <button className="tiny-icon-button" onClick={() => duplicatePage(page.id)} aria-label="Duplicate page"><Copy size={13} /></button>
                <button className="tiny-icon-button" disabled={journal.pages.length === 1} onClick={() => deletePage(page.id)} aria-label="Delete page"><Trash2 size={13} /></button>
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="add-page-button" onClick={() => addPage()}><Plus size={15} /> new page</button>
    </aside>
  )
}
