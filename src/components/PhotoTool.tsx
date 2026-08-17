import { useRef } from 'react'
import { ImagePlus } from 'lucide-react'
import type { ImageElement } from '../types'
import { useJournalStore } from '../store/useJournalStore'
import { uid } from '../utils/model'

export function PhotoTool() {
  const addElement = useJournalStore((state) => state.addElement)
  const inputRef = useRef<HTMLInputElement>(null)

  const onFile = (file?: File) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      alert('Choose an image file.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const src = String(reader.result)
      const image = new Image()
      image.onload = () => {
        const maxWidth = 360
        const ratio = Math.min(1, maxWidth / image.width)
        const element: ImageElement = {
          id: uid('photo'),
          kind: 'image',
          src,
          x: 120,
          y: 100,
          width: image.width * ratio,
          height: image.height * ratio,
          rotation: -2,
          opacity: 1,
          z: Date.now(),
          locked: false,
          cornerRadius: 4,
        }
        addElement(element)
      }
      image.src = src
    }
    reader.readAsDataURL(file)
  }

  return (
    <section className="tool-section">
      <span className="eyebrow">your camera roll is ephemera too</span>
      <h3>Photos</h3>
      <button className="photo-drop" onClick={() => inputRef.current?.click()}>
        <ImagePlus size={30} />
        <strong>Add a photo</strong>
        <span>PNG, JPG, WEBP or GIF</span>
      </button>
      <input ref={inputRef} hidden type="file" accept="image/*" onChange={(event) => onFile(event.target.files?.[0])} />
      <div className="polaroid-tip">
        <div className="mini-polaroid">♡</div>
        <p><strong>Tip:</strong> add one of the paper scraps behind a photo, rotate them a little differently, then send the paper to the back.</p>
      </div>
      <div className="privacy-card">
        <strong>Private by default.</strong>
        <p>Your journal and uploaded images stay in this browser's local storage. Commonplace v0.1 has no account and no analytics.</p>
      </div>
    </section>
  )
}
