export interface CandleScent {
  id: string
  name: string
  emoji: string
  wax: string
  glow: string
  notes: string
  line: string
}

export const candleScents: CandleScent[] = [
  { id: 'vanilla-paper', name: 'Vanilla + paper', emoji: '📖', wax: '#ead7bd', glow: '#f5b85e', notes: 'vanilla bean · old paper · cedar', line: 'Like reading too late with a blanket you stole from the sofa.' },
  { id: 'rain-window', name: 'Rainy window', emoji: '☂', wax: '#aebdca', glow: '#e7b36a', notes: 'petrichor · wet stone · black tea', line: 'For when the weather is doing half the journaling for you.' },
  { id: 'lavender-dusk', name: 'Lavender dusk', emoji: '❦', wax: '#b7a4c8', glow: '#f0b26f', notes: 'lavender · soft musk · violet leaf', line: 'Purple-hour energy. Very little urgency.' },
  { id: 'sea-salt', name: 'Sea salt', emoji: '≈', wax: '#9dbbc2', glow: '#f4b766', notes: 'sea salt · driftwood · clean linen', line: 'The imaginary window is open and the ocean is conveniently nearby.' },
  { id: 'rosewood', name: 'Rosewood', emoji: '♡', wax: '#c78991', glow: '#f6a95c', notes: 'rose petals · sandalwood · amber', line: 'A little dramatic. As a candle should be.' },
  { id: 'chai-spice', name: 'Chai spice', emoji: '☕', wax: '#b98261', glow: '#f3a34f', notes: 'cardamom · cinnamon · black tea', line: 'Warm, spicy, and pretending the mug is not already cold.' },
  { id: 'library-night', name: 'Library at night', emoji: '✒', wax: '#71615b', glow: '#efaa55', notes: 'cedar shelves · leather · smoke-soft amber', line: 'Old books, quiet corners, questionable bedtime.' },
  { id: 'moon-milk', name: 'Moon milk', emoji: '☾', wax: '#d7d1dc', glow: '#f0b669', notes: 'tonka · warm milk · vanilla', line: 'Soft enough to make a blank page less intimidating.' },
]
