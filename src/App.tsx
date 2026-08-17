import { useEffect } from 'react'
import { JournalShelf } from './components/JournalShelf'
import { JournalEditor } from './components/JournalEditor'
import { useJournalStore } from './store/useJournalStore'

export default function App() {
  const activeJournalId = useJournalStore((state) => state.activeJournalId)
  const undo = useJournalStore((state) => state.undo)
  const redo = useJournalStore((state) => state.redo)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const mod = event.metaKey || event.ctrlKey
      if (!mod) return
      if (event.key.toLowerCase() === 'z') {
        event.preventDefault()
        if (event.shiftKey) redo()
        else undo()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [redo, undo])

  return activeJournalId ? <JournalEditor /> : <JournalShelf />
}
