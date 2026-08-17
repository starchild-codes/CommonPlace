import { ImagePlus, Layers3, NotebookPen, Palette } from 'lucide-react'
import { useJournalStore } from '../store/useJournalStore'
import { AssetLibrary } from './AssetLibrary'
import { PaperControls } from './PaperControls'
import { PhotoTool } from './PhotoTool'
import { WriteTool } from './WriteTool'

const tabs = [
  { id: 'write' as const, label: 'Write', icon: NotebookPen },
  { id: 'decorate' as const, label: 'Decorate', icon: Layers3 },
  { id: 'paper' as const, label: 'Paper', icon: Palette },
  { id: 'photos' as const, label: 'Photos', icon: ImagePlus },
]

export function ToolSidebar() {
  const tab = useJournalStore((state) => state.sidebarTab)
  const setTab = useJournalStore((state) => state.setSidebarTab)

  return (
    <aside className="tool-sidebar">
      <nav className="tool-tabs" aria-label="Journal tools">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} className={tab === id ? 'active' : ''} onClick={() => setTab(id)}>
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="tool-content">
        {tab === 'write' && <WriteTool />}
        {tab === 'decorate' && <AssetLibrary />}
        {tab === 'paper' && <PaperControls />}
        {tab === 'photos' && <PhotoTool />}
      </div>
    </aside>
  )
}
