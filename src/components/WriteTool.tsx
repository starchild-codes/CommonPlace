import { useState } from 'react'
import { Plus } from 'lucide-react'
import type { TextElement } from '../types'
import { useJournalStore } from '../store/useJournalStore'
import { uid } from '../utils/model'

export const fontOptions = [
  { value: '"Caveat", cursive', label: 'Handwritten' },
  { value: '"Source Serif 4", serif', label: 'Diary serif' },
  { value: '"Playfair Display", serif', label: 'Bookish' },
  { value: '"Nunito", sans-serif', label: 'Soft round' },
  { value: '"DM Sans", sans-serif', label: 'Clean' },
  { value: '"Space Mono", monospace', label: 'Typewriter' },
]

export function WriteTool() {
  const addElement = useJournalStore((state) => state.addElement)
  const [text, setText] = useState('Write something small…')
  const [font, setFont] = useState(fontOptions[0].value)
  const [color, setColor] = useState('#4c4641')

  const addText = () => {
    const element: TextElement = {
      id: uid('text'),
      kind: 'text',
      x: 110 + Math.random() * 60,
      y: 95 + Math.random() * 60,
      width: 300,
      height: 90,
      rotation: 0,
      opacity: 1,
      z: Date.now(),
      locked: false,
      text: text || ' ',
      style: {
        fontFamily: font,
        fontSize: 30,
        fill: color,
        fontStyle: 'normal',
        align: 'left',
        lineHeight: 1.25,
        letterSpacing: 0,
      },
    }
    addElement(element)
  }

  return (
    <section className="tool-section">
      <span className="eyebrow">write two words or two pages. nobody is counting.</span>
      <h3>Words</h3>
      <p className="tool-hint">Type it here, toss it onto the page, then move it around until it looks right.</p>
      <textarea value={text} onChange={(event) => setText(event.target.value)} rows={5} placeholder="Okay so today…" />
      <label>
        Font
        <select value={font} onChange={(event) => setFont(event.target.value)}>
          {fontOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </label>
      <label>
        Ink
        <div className="color-field">
          <input type="color" value={color} onChange={(event) => setColor(event.target.value)} />
          <span>{color}</span>
        </div>
      </label>
      <button className="primary-button full" onClick={addText}><Plus size={16} /> Put it on the page</button>

      <div className="gentle-prompt">
        <span>stuck?</span>
        <p>Write one tiny thing from today that would be annoying to forget.</p>
      </div>
    </section>
  )
}
