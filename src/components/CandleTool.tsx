import { useEffect, useState, type CSSProperties } from 'react'
import { Flame } from 'lucide-react'
import { candleScents } from '../data/candles'

const KEY = 'commonplace-candle-v1'

export function CandleTool() {
  const [scentId, setScentId] = useState(() => localStorage.getItem(`${KEY}-scent`) || candleScents[0].id)
  const [lit, setLit] = useState(() => localStorage.getItem(`${KEY}-lit`) === 'true')
  const scent = candleScents.find((item) => item.id === scentId) ?? candleScents[0]

  useEffect(() => {
    localStorage.setItem(`${KEY}-scent`, scentId)
    localStorage.setItem(`${KEY}-lit`, String(lit))
  }, [lit, scentId])

  return (
    <section className="tool-section candle-tool">
      <span className="eyebrow">completely unnecessary. therefore essential.</span>
      <h3>Light a candle</h3>
      <p className="tool-hint">Pick what your room is pretending to smell like. The screen cannot actually smell like vanilla. Tragic, I know.</p>

      <div className={`candle-scene ${lit ? 'lit' : ''}`} style={{ '--wax': scent.wax, '--glow': scent.glow } as CSSProperties}>
        <div className="candle-glow" />
        <button className="candle" onClick={() => setLit((value) => !value)} aria-pressed={lit} aria-label={lit ? 'Blow out candle' : 'Light candle'}>
          <span className="wick" />
          {lit && <span className="flame"><span /></span>}
          <span className="candle-jar"><span>{scent.emoji}</span></span>
        </button>
        <strong>{lit ? 'lit' : 'waiting for a match'}</strong>
      </div>

      <div className="candle-scent-grid">
        {candleScents.map((item) => (
          <button key={item.id} className={scent.id === item.id ? 'active' : ''} onClick={() => setScentId(item.id)}>
            <span className="scent-dot" style={{ background: item.wax }} />
            <div><strong>{item.name}</strong><small>{item.notes}</small></div>
          </button>
        ))}
      </div>

      <div className="candle-line"><Flame size={14} /><p>{scent.line}</p></div>
      <p className="asset-note">This is just a cozy visual. No timer, no streak, no “focus score.” Light it because it is cute.</p>
    </section>
  )
}
