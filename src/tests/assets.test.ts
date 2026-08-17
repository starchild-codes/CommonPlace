import { describe, expect, it } from 'vitest'
import { assets } from '../data/assets'

describe('starter craft library', () => {
  it('contains a broad original starter set', () => {
    expect(assets.length).toBeGreaterThanOrEqual(40)
  })

  it('uses unique ids', () => {
    const ids = assets.map((asset) => asset.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('covers each core craft category', () => {
    expect(new Set(assets.map((asset) => asset.category))).toEqual(
      new Set(['stickers', 'washi', 'papers', 'stamps']),
    )
  })

  it('keeps every visual as an embedded data svg', () => {
    expect(assets.every((asset) => asset.svg.startsWith('data:image/svg+xml'))).toBe(true)
  })
})
