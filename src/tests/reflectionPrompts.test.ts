import { describe, expect, it } from 'vitest'
import { feelingWords, reflectionCategories, reflectionPrompts } from '../data/reflectionPrompts'

describe('reflection deck', () => {
  it('has enough variety to avoid feeling like one prescribed exercise', () => {
    expect(reflectionPrompts.length).toBeGreaterThanOrEqual(30)
  })

  it('covers every reflection doorway', () => {
    const categories = new Set(reflectionPrompts.map((prompt) => prompt.category))
    expect(categories).toEqual(new Set(reflectionCategories.map((category) => category.id)))
  })

  it('keeps prompts descriptive rather than diagnostic', () => {
    const joined = reflectionPrompts.map((prompt) => `${prompt.prompt} ${prompt.why}`).join(' ').toLowerCase()
    expect(joined).not.toContain('diagnose')
    expect(joined).not.toContain('disorder')
    expect(joined).not.toContain('score your mood')
  })

  it('provides a broad but finite feeling vocabulary', () => {
    expect(feelingWords.length).toBeGreaterThanOrEqual(20)
    expect(new Set(feelingWords).size).toBe(feelingWords.length)
  })
})
