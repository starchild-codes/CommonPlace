import type { CSSProperties } from 'react'
import type { Journal } from '../types'

export function CoverPreview({ journal, large = false }: { journal: Journal; large?: boolean }) {
  return (
    <div
      className={`journal-cover pattern-${journal.cover.pattern} ${large ? 'large' : ''}`}
      style={{
        '--cover': journal.cover.background,
        '--accent': journal.cover.accent,
        '--ink': journal.cover.titleColor,
      } as CSSProperties}
    >
      <div className="cover-spine" />
      <div className="cover-sparkles">· ✦ ·</div>
      <div className="cover-label">
        <span className="cover-motif">{journal.cover.motif}</span>
        <strong>{journal.title || 'Untitled journal'}</strong>
        <small>{journal.subtitle}</small>
      </div>
      <div className="cover-corner">♡</div>
    </div>
  )
}
