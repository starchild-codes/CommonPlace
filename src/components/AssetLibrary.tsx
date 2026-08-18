import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { assetById, assets, assetsByCategory, type AssetCategory } from '../data/assets'
import type { VisualElement } from '../types'
import { useJournalStore } from '../store/useJournalStore'
import { uid } from '../utils/model'

const categories: { id: AssetCategory; label: string }[] = [
  { id: 'stickers', label: 'Stickers' },
  { id: 'washi', label: 'Washi' },
  { id: 'papers', label: 'Paper' },
  { id: 'ephemera', label: 'Ephemera' },
  { id: 'stamps', label: 'Stamps' },
  { id: 'wax', label: 'Wax seals' },
]

export function AssetLibrary() {
  const addElement = useJournalStore((state) => state.addElement)
  const [category, setCategory] = useState<AssetCategory>('stickers')
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    const pool = query.trim() ? assets : assetsByCategory(category)
    const needle = query.toLowerCase().trim()
    if (!needle) return pool
    return pool.filter((asset) =>
      [asset.name, ...asset.tags, asset.category].some((value) => value.toLowerCase().includes(needle)),
    )
  }, [category, query])

  const addAsset = (id: string) => {
    const asset = assetById.get(id)
    if (!asset) return
    const element: VisualElement = {
      id: uid(asset.category),
      kind: asset.category === 'papers' || asset.category === 'ephemera'
        ? 'paper'
        : asset.category === 'stamps'
          ? 'stamp'
          : asset.category === 'washi'
            ? 'washi'
            : 'sticker',
      assetId: asset.id,
      x: 100 + Math.random() * 90,
      y: 90 + Math.random() * 90,
      width: asset.defaultSize.width,
      height: asset.defaultSize.height,
      rotation: asset.category === 'washi' ? (Math.random() - 0.5) * 6 : (Math.random() - 0.5) * 10,
      opacity: 1,
      z: Date.now(),
      locked: false,
    }
    addElement(element)
  }

  return (
    <section className="tool-section asset-tool">
      <span className="eyebrow">the good drawer</span>
      <h3>Little things</h3>
      <p className="tool-hint">Stickers, scraps, tickets, tape, wax seals and other tiny nonsense that somehow makes the page better.</p>
      <div className="asset-search"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="flowers, tickets, stars, green…" /></div>
      {!query && (
        <div className="asset-category-row">
          {categories.map((item) => (
            <button key={item.id} className={category === item.id ? 'active' : ''} onClick={() => setCategory(item.id)}>{item.label}</button>
          ))}
        </div>
      )}
      <div className="asset-grid">
        {visible.map((asset) => (
          <button key={asset.id} className={`asset-tile asset-${asset.category}`} onClick={() => addAsset(asset.id)} title={`Add ${asset.name}`}>
            <img src={asset.svg} alt="" draggable={false} />
            <span>{asset.name}</span>
          </button>
        ))}
      </div>
      <p className="asset-note">The built-in art is original. The custom theme-pack maker is where you can add your own personal images.</p>
    </section>
  )
}
