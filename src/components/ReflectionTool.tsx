import { useMemo, useState } from 'react'
import { Plus, Shuffle, Sparkles } from 'lucide-react'
import { feelingWords, reflectionCategories, reflectionPrompts, type ReflectionCategory, type ReflectionEffort } from '../data/reflectionPrompts'
import { useJournalStore } from '../store/useJournalStore'
import type { TextElement } from '../types'
import { uid } from '../utils/model'

const effortOptions: { id: ReflectionEffort | 'all'; label: string }[] = [
  { id: 'tiny', label: 'one line' },
  { id: 'short', label: 'a minute' },
  { id: 'deeper', label: 'go there' },
  { id: 'all', label: 'surprise me' },
]

const promptInk = '#5d5263'

export function ReflectionTool() {
  const addElement = useJournalStore((state) => state.addElement)
  const [category, setCategory] = useState<ReflectionCategory>('notice')
  const [effort, setEffort] = useState<ReflectionEffort | 'all'>('tiny')
  const [index, setIndex] = useState(0)
  const [pickedFeelings, setPickedFeelings] = useState<string[]>([])

  const pool = useMemo(() => {
    const filtered = reflectionPrompts.filter((prompt) => prompt.category === category && (effort === 'all' || prompt.effort === effort))
    return filtered.length ? filtered : reflectionPrompts.filter((prompt) => prompt.category === category)
  }, [category, effort])

  const prompt = pool[index % pool.length]

  const shuffle = () => setIndex((current) => (current + 1 + Math.floor(Math.random() * Math.max(1, pool.length - 1))) % pool.length)

  const putTextOnPage = (text: string, italic = false) => {
    const element: TextElement = {
      id: uid('reflection'),
      kind: 'text',
      x: 120 + Math.random() * 55,
      y: 105 + Math.random() * 55,
      width: 340,
      height: 110,
      rotation: (Math.random() - 0.5) * 2,
      opacity: 0.9,
      z: Date.now(),
      locked: false,
      text,
      style: {
        fontFamily: '"Source Serif 4", serif',
        fontSize: 24,
        fill: promptInk,
        fontStyle: italic ? 'italic' : 'normal',
        align: 'left',
        lineHeight: 1.3,
        letterSpacing: 0,
      },
    }
    addElement(element)
  }

  const toggleFeeling = (word: string) => {
    setPickedFeelings((current) => current.includes(word) ? current.filter((item) => item !== word) : [...current, word].slice(-3))
  }

  return (
    <section className="tool-section reflection-tool">
      <span className="eyebrow">when “dear diary” is not giving anything</span>
      <h3>Give me a question</h3>
      <p className="tool-hint">No homework. Tap around until one question feels worth answering. Ignore the rest.</p>

      <div className="reflection-effort" aria-label="How much do you feel like writing?">
        {effortOptions.map((option) => (
          <button key={option.id} className={effort === option.id ? 'active' : ''} onClick={() => { setEffort(option.id); setIndex(0) }}>
            {option.label}
          </button>
        ))}
      </div>

      <div className="reflection-categories">
        {reflectionCategories.map((item) => (
          <button key={item.id} className={category === item.id ? 'active' : ''} onClick={() => { setCategory(item.id); setIndex(0) }}>
            {item.label}
          </button>
        ))}
      </div>

      <article className="reflection-card">
        <div className="reflection-card-top">
          <Sparkles size={15} />
          <span>{prompt.title}</span>
        </div>
        <p>{prompt.prompt}</p>
        <div className="reflection-card-actions">
          <button className="soft-button" onClick={shuffle}><Shuffle size={14} /> nope, another</button>
          <button className="primary-button small" onClick={() => putTextOnPage(prompt.prompt, true)}><Plus size={14} /> put it on the page</button>
        </div>
      </article>

      <div className="feeling-palette">
        <div>
          <strong>Okay, but what kind of feeling?</strong>
          <span>pick up to three. contradictory is completely fine.</span>
        </div>
        <div className="feeling-grid">
          {feelingWords.map((word) => (
            <button key={word} className={pickedFeelings.includes(word) ? 'active' : ''} onClick={() => toggleFeeling(word)}>
              {word}
            </button>
          ))}
        </div>
        {pickedFeelings.length > 0 && (
          <button className="soft-button full" onClick={() => putTextOnPage(`Right now: ${pickedFeelings.join(' + ')}. What gave those words away?`)}>
            <Plus size={14} /> add these words
          </button>
        )}
      </div>

      <div className="reflection-boundary">
        <strong>Just prompts, not therapy.</strong>
        <p>Use what helps, skip what does not. Commonplace does not diagnose you, score your mood, or promise that journaling fixes things.</p>
      </div>
    </section>
  )
}
