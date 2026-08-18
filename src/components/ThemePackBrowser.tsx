import { useMemo, useRef, useState, type CSSProperties } from 'react'
import { Check, ChevronLeft, ImagePlus, PackagePlus, Plus, Search, Trash2 } from 'lucide-react'
import { assetById, assets, type JournalAsset } from '../data/assets'
import {
  assetsForThemePack,
  customPackAssets,
  themePackCategories,
  themePacks,
  type CustomPackImage,
  type CustomThemePack,
  type ThemePack,
  type ThemePackCategory,
} from '../data/themePacks'
import type { ImageElement, VisualElement } from '../types'
import { useJournalStore } from '../store/useJournalStore'
import { uid } from '../utils/model'

const CUSTOM_PACK_KEY = 'commonplace-custom-theme-packs-v1'

function loadCustomPacks(): CustomThemePack[] {
  try {
    const raw = localStorage.getItem(CUSTOM_PACK_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CustomThemePack[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveCustomPacks(packs: CustomThemePack[]) {
  localStorage.setItem(CUSTOM_PACK_KEY, JSON.stringify(packs))
}

const kindForAsset = (asset: JournalAsset): VisualElement['kind'] =>
  asset.category === 'papers' || asset.category === 'ephemera'
    ? 'paper'
    : asset.category === 'stamps'
      ? 'stamp'
      : asset.category === 'washi'
        ? 'washi'
        : 'sticker'

export function ThemePackBrowser() {
  const addElement = useJournalStore((state) => state.addElement)
  const journals = useJournalStore((state) => state.journals)
  const activeJournalId = useJournalStore((state) => state.activeJournalId)
  const activePageId = useJournalStore((state) => state.activePageId)
  const updatePage = useJournalStore((state) => state.updatePage)

  const [category, setCategory] = useState<ThemePackCategory | 'all'>('all')
  const [query, setQuery] = useState('')
  const [openPack, setOpenPack] = useState<ThemePack | null>(null)
  const [customPacks, setCustomPacks] = useState<CustomThemePack[]>(loadCustomPacks)
  const [openCustom, setOpenCustom] = useState<CustomThemePack | null>(null)
  const [making, setMaking] = useState(false)

  const page = journals.find((journal) => journal.id === activeJournalId)?.pages.find((item) => item.id === activePageId)

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return themePacks.filter((pack) => {
      if (category !== 'all' && pack.category !== category) return false
      if (!needle) return true
      return [pack.name, pack.blurb, ...pack.tags].some((value) => value.toLowerCase().includes(needle))
    })
  }, [category, query])

  const addAsset = (asset: JournalAsset, index = 0) => {
    const element: VisualElement = {
      id: uid(asset.category),
      kind: kindForAsset(asset),
      assetId: asset.id,
      x: 100 + (index % 3) * 88 + Math.random() * 18,
      y: 90 + Math.floor(index / 3) * 88 + Math.random() * 18,
      width: asset.defaultSize.width,
      height: asset.defaultSize.height,
      rotation: asset.category === 'washi' ? (Math.random() - 0.5) * 6 : (Math.random() - 0.5) * 10,
      opacity: 1,
      z: Date.now() + index,
      locked: false,
    }
    addElement(element)
  }

  const addImage = (image: CustomPackImage, index = 0) => {
    const element: ImageElement = {
      id: uid('photo'),
      kind: 'image',
      src: image.src,
      x: 120 + (index % 2) * 150,
      y: 120 + Math.floor(index / 2) * 165,
      width: 210,
      height: 160,
      rotation: (Math.random() - 0.5) * 7,
      opacity: 1,
      z: Date.now() + index,
      locked: false,
      cornerRadius: 4,
    }
    addElement(element)
  }

  const sprinklePack = (pack: ThemePack) => {
    const packAssets = assetsForThemePack(pack, 18)
    const picks = ['washi', 'papers', 'ephemera', 'stickers', 'wax', 'stamps']
      .map((kind) => packAssets.find((asset) => asset.category === kind))
      .filter((asset): asset is JournalAsset => Boolean(asset))
      .slice(0, 6)
    picks.forEach((asset, index) => addAsset(asset, index))
    if (page) updatePage(page.id, { tone: pack.paperTone })
  }

  const removeCustom = (id: string) => {
    const next = customPacks.filter((pack) => pack.id !== id)
    setCustomPacks(next)
    saveCustomPacks(next)
    if (openCustom?.id === id) setOpenCustom(null)
  }

  if (making) {
    return (
      <CustomPackMaker
        onBack={() => setMaking(false)}
        onSave={(pack) => {
          const next = [pack, ...customPacks]
          setCustomPacks(next)
          saveCustomPacks(next)
          setMaking(false)
          setOpenCustom(pack)
        }}
      />
    )
  }

  if (openPack) {
    const packAssets = assetsForThemePack(openPack)
    return (
      <section className="tool-section theme-pack-detail">
        <button className="tiny-back" onClick={() => setOpenPack(null)}><ChevronLeft size={15} /> all packs</button>
        <div className="theme-pack-hero" style={{ '--pack-a': openPack.palette[0], '--pack-b': openPack.palette[2] } as CSSProperties}>
          <span className="theme-pack-emoji">{openPack.emoji}</span>
          <div><span className="eyebrow">theme pack</span><h3>{openPack.name}</h3></div>
        </div>
        <p className="theme-blurb">{openPack.blurb}</p>
        <div className="pack-palette" aria-label="Pack colors">{openPack.palette.map((color) => <span key={color} style={{ background: color }} />)}</div>
        <button className="primary-button full" onClick={() => sprinklePack(openPack)}>Put a little starter pile on my page</button>
        <div className="pack-item-grid">
          {packAssets.map((asset) => (
            <button key={asset.id} className={`asset-tile asset-${asset.category}`} onClick={() => addAsset(asset)} title={`Add ${asset.name}`}>
              <img src={asset.svg} alt="" draggable={false} />
              <span>{asset.name}</span>
            </button>
          ))}
        </div>
        <p className="asset-note">Nothing is locked to the pack. Mix it with literally anything else. Chaos is allowed.</p>
      </section>
    )
  }

  if (openCustom) {
    const packAssets = customPackAssets(openCustom)
    return (
      <section className="tool-section theme-pack-detail">
        <button className="tiny-back" onClick={() => setOpenCustom(null)}><ChevronLeft size={15} /> my packs</button>
        <div className="theme-pack-hero" style={{ '--pack-a': openCustom.color, '--pack-b': '#fff3e8' } as CSSProperties}>
          <span className="theme-pack-emoji">{openCustom.emoji}</span>
          <div><span className="eyebrow">your pack</span><h3>{openCustom.name}</h3></div>
        </div>
        <div className="pack-item-grid">
          {packAssets.map((asset) => (
            <button key={asset.id} className={`asset-tile asset-${asset.category}`} onClick={() => addAsset(asset)}>
              <img src={asset.svg} alt="" draggable={false} /><span>{asset.name}</span>
            </button>
          ))}
          {openCustom.images.map((image, index) => (
            <button key={image.id} className="asset-tile custom-image-tile" onClick={() => addImage(image, index)}>
              <img src={image.src} alt="" /><span>{image.name}</span>
            </button>
          ))}
        </div>
        <button className="soft-button full danger-on-hover" onClick={() => { if (confirm(`Delete the “${openCustom.name}” pack?`)) removeCustom(openCustom.id) }}><Trash2 size={14} /> Delete this pack</button>
      </section>
    )
  }

  return (
    <section className="tool-section theme-browser">
      <span className="eyebrow">open a whole little universe</span>
      <h3>Theme packs</h3>
      <p className="tool-hint">Pick a vibe and the drawer does the matching for you. You can still mix everything together afterwards.</p>
      <div className="asset-search"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="space, pink, cricket, books…" /></div>
      {!query && <div className="theme-category-row">{themePackCategories.map((item) => <button key={item.id} className={category === item.id ? 'active' : ''} onClick={() => setCategory(item.id)}>{item.label}</button>)}</div>}

      {customPacks.length > 0 && !query && category === 'all' && (
        <div className="my-packs-block">
          <div className="mini-section-title"><strong>Yours</strong><span>name them whatever you want</span></div>
          <div className="theme-card-grid compact">
            {customPacks.map((pack) => (
              <button key={pack.id} className="theme-card" style={{ '--pack': pack.color } as CSSProperties} onClick={() => setOpenCustom(pack)}>
                <span className="theme-card-emoji">{pack.emoji}</span><strong>{pack.name}</strong><small>{pack.assetIds.length + pack.images.length} things</small>
              </button>
            ))}
          </div>
        </div>
      )}

      <button className="make-pack-button" onClick={() => setMaking(true)}><PackagePlus size={18} /><div><strong>Make your own pack</strong><span>Use our pieces + a few personal images. Call it anything.</span></div></button>

      <div className="theme-card-grid">
        {visible.map((pack) => {
          const preview = assetsForThemePack(pack, 4)
          return (
            <button key={pack.id} className="theme-card big" style={{ '--pack': pack.palette[0] } as CSSProperties} onClick={() => setOpenPack(pack)}>
              <div className="theme-preview-stack">{preview.slice(0, 3).map((asset) => <img key={asset.id} src={asset.svg} alt="" />)}</div>
              <span className="theme-card-emoji">{pack.emoji}</span>
              <strong>{pack.name}</strong>
              <small>{pack.blurb}</small>
            </button>
          )
        })}
      </div>
    </section>
  )
}

function CustomPackMaker({ onBack, onSave }: { onBack: () => void; onSave: (pack: CustomThemePack) => void }) {
  const [name, setName] = useState('My ridiculously specific pack')
  const [emoji, setEmoji] = useState('✦')
  const [color, setColor] = useState('#8d78a5')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const [images, setImages] = useState<CustomPackImage[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const visibleAssets = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const pool = needle ? assets.filter((asset) => [asset.name, ...asset.tags].some((value) => value.toLowerCase().includes(needle))) : assets
    return pool.slice(0, needle ? 80 : 48)
  }, [query])

  const toggle = (id: string) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id].slice(-40))

  const addFiles = async (files?: FileList | null) => {
    if (!files) return
    const room = Math.max(0, 8 - images.length)
    const chosen = Array.from(files).slice(0, room)
    const next: CustomPackImage[] = []
    for (const file of chosen) {
      if (!file.type.startsWith('image/')) continue
      if (file.size > 700_000) {
        alert(`${file.name} is a bit huge for a local theme pack. Pick an image under 700 KB.`)
        continue
      }
      const src = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(String(reader.result))
        reader.onerror = () => reject(reader.error)
        reader.readAsDataURL(file)
      })
      next.push({ id: uid('pack-image'), name: file.name.replace(/\.[^.]+$/, ''), src })
    }
    setImages((current) => [...current, ...next].slice(0, 8))
  }

  const canSave = name.trim().length > 0 && (selected.length > 0 || images.length > 0)

  return (
    <section className="tool-section custom-pack-maker">
      <button className="tiny-back" onClick={onBack}><ChevronLeft size={15} /> never mind</button>
      <span className="eyebrow">for your oddly specific obsessions</span>
      <h3>Make a pack</h3>
      <p className="tool-hint">Want a pack for a character, show, player, city, inside joke or one extremely specific shade of green? This is where you do it.</p>
      <div className="pack-name-row">
        <input className="emoji-input" value={emoji} maxLength={3} onChange={(event) => setEmoji(event.target.value)} aria-label="Pack emoji" />
        <input value={name} maxLength={44} onChange={(event) => setName(event.target.value)} aria-label="Pack name" />
        <input className="pack-color-input" type="color" value={color} onChange={(event) => setColor(event.target.value)} aria-label="Pack color" />
      </div>
      <button className="photo-drop mini" onClick={() => inputRef.current?.click()}><ImagePlus size={22} /><strong>Add your own little images</strong><span>up to 8 · keep each under 700 KB</span></button>
      <input ref={inputRef} hidden type="file" accept="image/*" multiple onChange={(event) => void addFiles(event.target.files)} />
      {images.length > 0 && <div className="custom-image-strip">{images.map((image) => <div key={image.id}><img src={image.src} alt="" /><button onClick={() => setImages((current) => current.filter((item) => item.id !== image.id))}>×</button></div>)}</div>}
      <div className="asset-search"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="find pieces to add…" /></div>
      <div className="pack-picker-grid">
        {visibleAssets.map((asset) => {
          const picked = selected.includes(asset.id)
          return <button key={asset.id} className={`pack-picker ${picked ? 'picked' : ''}`} onClick={() => toggle(asset.id)}><img src={asset.svg} alt="" />{picked && <span className="picked-check"><Check size={13} /></span>}</button>
        })}
      </div>
      <p className="asset-note">{selected.length} journal pieces + {images.length} personal images. Personal packs stay in this browser.</p>
      <button className="primary-button full" disabled={!canSave} onClick={() => onSave({ id: uid('custom-pack'), name: name.trim(), emoji: emoji || '✦', color, assetIds: selected, images, createdAt: new Date().toISOString() })}><Plus size={15} /> Save this pack</button>
    </section>
  )
}
