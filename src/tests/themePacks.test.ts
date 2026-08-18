import { describe, expect, it } from 'vitest'
import { assetsForThemePack, themePacks } from '../data/themePacks'

describe('theme packs', () => {
  it('ships a genuinely broad pack shelf', () => {
    expect(themePacks.length).toBeGreaterThanOrEqual(28)
  })

  it('has unique ids and names', () => {
    expect(new Set(themePacks.map((pack) => pack.id)).size).toBe(themePacks.length)
    expect(new Set(themePacks.map((pack) => pack.name)).size).toBe(themePacks.length)
  })

  it('gives every built-in pack enough matching pieces to feel like a pack', () => {
    for (const pack of themePacks) {
      expect(assetsForThemePack(pack).length, pack.name).toBeGreaterThanOrEqual(6)
    }
  })

  it('covers colors, sports, places, hobbies, aesthetics and story-ish vibes', () => {
    const categories = new Set(themePacks.map((pack) => pack.category))
    expect(categories).toEqual(new Set(['fandom-ish', 'aesthetic', 'hobby', 'places', 'sport', 'color']))
  })
})
