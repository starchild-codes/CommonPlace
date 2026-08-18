import { describe, expect, it } from 'vitest'
import { assets } from '../data/assets'

describe('craft library', () => {
  it('contains a broad original craft set', () => {
    expect(assets.length).toBeGreaterThanOrEqual(220)
  })

  it('uses unique ids', () => {
    const ids = assets.map((asset) => asset.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('covers each craft category, including wax seals', () => {
    expect(new Set(assets.map((asset) => asset.category))).toEqual(
      new Set(['stickers', 'washi', 'papers', 'ephemera', 'stamps', 'wax']),
    )
  })

  it('ships plenty of wax seals', () => {
    expect(assets.filter((asset) => asset.category === 'wax').length).toBeGreaterThanOrEqual(18)
  })

  it('keeps every built-in visual as an embedded data svg', () => {
    expect(assets.every((asset) => asset.svg.startsWith('data:image/svg+xml'))).toBe(true)
  })
})
