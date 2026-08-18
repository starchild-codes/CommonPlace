import { Flame, ImagePlus, Layers3, NotebookPen, PackageOpen, Palette, Sparkles } from 'lucide-react'
import { useJournalStore } from '../store/useJournalStore'
import { AssetLibrary } from './AssetLibrary'
import { CandleTool } from './CandleTool'
import { PaperControls } from './PaperControls'
import { PhotoTool } from './PhotoTool'
import { ReflectionTool } from './ReflectionTool'
import { ThemePackBrowser } from './ThemePackBrowser'
import { WriteTool } from './WriteTool'

const tabs = [
  { id: 'write' as const, label: 'Write', icon: NotebookPen },
  { id: 'decorate' as const, label: 'Bits', icon: Layers3 },
  { id: 'themes' as const, label: 'Themes', icon: PackageOpen },
  { id: 'paper' as const, label: 'Paper', icon: Palette },
  { id: 'photos' as const, label: 'Photos', icon: ImagePlus },
  { id: 'reflect' as const, label: 'Prompts', icon: Sparkles },
  { id: 'cozy' as const, label: 'Candle', icon: Flame },
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
        {tab === 'themes' && <ThemePackBrowser />}
        {tab === 'paper' && <PaperControls />}
        {tab === 'photos' && <PhotoTool />}
        {tab === 'reflect' && <ReflectionTool />}
        {tab === 'cozy' && <CandleTool />}
      </div>
    </aside>
  )
}
