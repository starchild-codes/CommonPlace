import { describe, expect, it } from 'vitest'
import { createJournal, createPage, duplicatePage, moveElementToFront } from '../utils/model'
import type { TextElement } from '../types'

describe('journal model', () => {
  it('creates a journal with one usable starter page', () => {
    const journal = createJournal('Night book')
    expect(journal.title).toBe('Night book')
    expect(journal.pages).toHaveLength(1)
    expect(journal.pages[0].kind).toBe('dotted')
  })

  it('duplicates pages without reusing element ids', () => {
    const page = createPage()
    const element: TextElement = {
      id: 'text-original',
      kind: 'text',
      x: 1,
      y: 1,
      width: 100,
      height: 40,
      rotation: 0,
      opacity: 1,
      z: 0,
      locked: false,
      text: 'hello',
      style: {
        fontFamily: 'serif',
        fontSize: 20,
        fill: '#000000',
        fontStyle: 'normal',
        align: 'left',
        lineHeight: 1.2,
        letterSpacing: 0,
      },
    }
    page.elements.push(element)
    const copy = duplicatePage(page)
    expect(copy.id).not.toBe(page.id)
    expect(copy.elements[0].id).not.toBe(element.id)
    expect(copy.elements[0]).toMatchObject({ kind: 'text', text: 'hello' })
  })

  it('moves a selected element above its siblings', () => {
    const page = createPage()
    const base = (id: string, z: number): TextElement => ({
      id, kind: 'text', x: 0, y: 0, width: 10, height: 10, rotation: 0, opacity: 1, z, locked: false,
      text: id,
      style: { fontFamily: 'serif', fontSize: 12, fill: '#000', fontStyle: 'normal', align: 'left', lineHeight: 1, letterSpacing: 0 },
    })
    const moved = moveElementToFront([base('a', 0), base('b', 1)], 'a')
    expect(moved.find((item) => item.id === 'a')!.z).toBeGreaterThan(moved.find((item) => item.id === 'b')!.z)
  })
})
