import { describe, expect, it } from 'vitest'
import { candleScents } from '../data/candles'

describe('candle corner', () => {
  it('has a real scent shelf rather than one decorative candle', () => {
    expect(candleScents.length).toBeGreaterThanOrEqual(8)
  })

  it('uses unique scent ids', () => {
    expect(new Set(candleScents.map((scent) => scent.id)).size).toBe(candleScents.length)
  })
})
