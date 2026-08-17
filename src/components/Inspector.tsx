import { BringToFront, Copy, Lock, SendToBack, Trash2, Unlock } from 'lucide-react'
import type { ElementPatch, TextElement } from '../types'
import { useJournalStore } from '../store/useJournalStore'
import { fontOptions } from './WriteTool'

export function Inspector() {
  const journals = useJournalStore((state) => state.journals)
  const activeJournalId = useJournalStore((state) => state.activeJournalId)
  const activePageId = useJournalStore((state) => state.activePageId)
  const selectedElementId = useJournalStore((state) => state.selectedElementId)
  const updateElement = useJournalStore((state) => state.updateElement)
  const deleteElement = useJournalStore((state) => state.deleteElement)
  const duplicateElement = useJournalStore((state) => state.duplicateElement)
  const bringToFront = useJournalStore((state) => state.bringToFront)
  const sendToBack = useJournalStore((state) => state.sendToBack)
  const toggleLock = useJournalStore((state) => state.toggleLock)

  const page = journals.find((journal) => journal.id === activeJournalId)?.pages.find((item) => item.id === activePageId)
  const element = page?.elements.find((item) => item.id === selectedElementId)

  if (!element) {
    return (
      <aside className="inspector">
        <div className="inspector-empty">
          <span>✦</span>
          <strong>Nothing selected</strong>
          <p>Tap a scrap, sticker, photo or text box to adjust it. The controls stay out of your way until you need them.</p>
        </div>
      </aside>
    )
  }

  const patch = (value: ElementPatch) => updateElement(element.id, value)

  return (
    <aside className="inspector">
      <div className="panel-heading">
        <span>{element.kind}</span>
        <small>selected</small>
      </div>

      {element.kind === 'text' && (
        <TextInspector element={element} update={(next) => updateElement(element.id, next)} />
      )}

      <label>
        Opacity
        <div className="range-row">
          <input type="range" min="0.15" max="1" step="0.05" value={element.opacity} onChange={(event) => patch({ opacity: Number(event.target.value) })} />
          <span>{Math.round(element.opacity * 100)}%</span>
        </div>
      </label>

      <label>
        Rotation
        <div className="range-row">
          <input type="range" min="-30" max="30" step="1" value={element.rotation} onChange={(event) => patch({ rotation: Number(event.target.value) })} />
          <span>{Math.round(element.rotation)}°</span>
        </div>
      </label>

      <div className="inspector-actions-grid">
        <button className="soft-button" onClick={() => bringToFront(element.id)}><BringToFront size={15} /> Front</button>
        <button className="soft-button" onClick={() => sendToBack(element.id)}><SendToBack size={15} /> Back</button>
        <button className="soft-button" onClick={() => duplicateElement(element.id)}><Copy size={15} /> Copy</button>
        <button className="soft-button" onClick={() => toggleLock(element.id)}>
          {element.locked ? <Unlock size={15} /> : <Lock size={15} />} {element.locked ? 'Unlock' : 'Lock'}
        </button>
      </div>

      <button className="danger-button" onClick={() => deleteElement(element.id)}><Trash2 size={15} /> Remove from page</button>

      {element.locked && <p className="lock-note">Locked elements cannot be dragged or transformed. This is useful once a background collage feels settled.</p>}
    </aside>
  )
}

function TextInspector({
  element,
  update,
}: {
  element: TextElement
  update: (patch: Partial<TextElement>) => void
}) {
  const style = element.style
  return (
    <div className="text-inspector">
      <label>
        Words
        <textarea rows={5} value={element.text} onChange={(event) => update({ text: event.target.value })} />
      </label>
      <label>
        Font
        <select value={style.fontFamily} onChange={(event) => update({ style: { ...style, fontFamily: event.target.value } })}>
          {fontOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </label>
      <div className="two-col">
        <label>
          Size
          <input type="number" min="10" max="96" value={style.fontSize} onChange={(event) => update({ style: { ...style, fontSize: Number(event.target.value) } })} />
        </label>
        <label>
          Ink
          <input className="ink-input" type="color" value={style.fill} onChange={(event) => update({ style: { ...style, fill: event.target.value } })} />
        </label>
      </div>
      <div className="text-style-row">
        <button className={style.fontStyle === 'bold' ? 'active' : ''} onClick={() => update({ style: { ...style, fontStyle: style.fontStyle === 'bold' ? 'normal' : 'bold' } })}><strong>B</strong></button>
        <button className={style.fontStyle === 'italic' ? 'active' : ''} onClick={() => update({ style: { ...style, fontStyle: style.fontStyle === 'italic' ? 'normal' : 'italic' } })}><em>I</em></button>
        {(['left','center','right'] as const).map((align) => (
          <button key={align} className={style.align === align ? 'active' : ''} onClick={() => update({ style: { ...style, align } })}>{align[0].toUpperCase()}</button>
        ))}
      </div>
    </div>
  )
}
