export type AssetCategory = 'stickers' | 'washi' | 'papers' | 'stamps'

export interface JournalAsset {
  id: string
  name: string
  category: AssetCategory
  tags: string[]
  svg: string
  defaultSize: { width: number; height: number }
}

const encode = (svg: string) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`

const sticker = (id: string, name: string, body: string, tags: string[] = []): JournalAsset => ({
  id,
  name,
  category: 'stickers',
  tags,
  defaultSize: { width: 112, height: 112 },
  svg: encode(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
    <filter id="s"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity=".18"/></filter>
    <g filter="url(#s)">${body}</g></svg>`),
})

const washi = (id: string, name: string, pattern: string, tags: string[] = []): JournalAsset => ({
  id,
  name,
  category: 'washi',
  tags,
  defaultSize: { width: 210, height: 48 },
  svg: encode(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 50">
    <defs>${pattern}</defs>
    <path d="M4 8L17 2 33 7 51 3 68 8 86 2 104 6 123 3 142 8 160 2 178 6 198 2 216 7V43L202 48 186 43 168 48 151 43 132 48 115 43 95 48 77 43 59 48 42 43 24 48 5 43Z" fill="url(#p)" opacity=".88"/>
  </svg>`),
})

const paper = (id: string, name: string, fill: string, detail: string, tags: string[] = []): JournalAsset => ({
  id,
  name,
  category: 'papers',
  tags,
  defaultSize: { width: 230, height: 170 },
  svg: encode(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180">
    <filter id="s"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity=".14"/></filter>
    <path filter="url(#s)" d="M8 8L233 3 236 167 220 176 196 171 173 178 146 172 121 177 97 171 72 176 48 170 28 176 5 165Z" fill="${fill}"/>
    ${detail}
  </svg>`),
})

const stamp = (id: string, name: string, text: string, color: string, tags: string[] = []): JournalAsset => ({
  id,
  name,
  category: 'stamps',
  tags,
  defaultSize: { width: 155, height: 70 },
  svg: encode(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 80">
    <rect x="8" y="12" width="154" height="56" rx="9" fill="none" stroke="${color}" stroke-width="4" stroke-dasharray="5 4" transform="rotate(-2 85 40)"/>
    <text x="85" y="48" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="19" fill="${color}" transform="rotate(-2 85 40)">${text}</text>
  </svg>`),
})

export const assets: JournalAsset[] = [
  sticker('flower-daisy', 'Daisy', `<circle cx="60" cy="60" r="17" fill="#e9bd5b"/><g fill="#fff7ea" stroke="#5f6859" stroke-width="2">${[0,45,90,135,180,225,270,315].map(a=>`<ellipse cx="60" cy="30" rx="13" ry="24" transform="rotate(${a} 60 60)"/>`).join('')}</g>`, ['flower','botanical']),
  sticker('flower-tulip', 'Pink tulip', `<path d="M58 108C57 82 61 60 62 43" stroke="#6f8d68" stroke-width="5"/><path d="M60 47C37 40 34 18 48 12 58 17 64 23 64 23 68 17 80 12 91 16 91 35 79 47 60 47Z" fill="#e8a7b5" stroke="#775966" stroke-width="2"/><path d="M59 75C43 67 35 71 31 83 44 88 53 84 59 75Z" fill="#89a97e"/>`, ['flower','pink']),
  sticker('moon', 'Sleepy moon', `<path d="M77 18c-23 8-32 36-19 56 11 17 33 22 49 11-8 18-29 29-51 23C28 101 13 72 24 45 34 22 57 10 77 18Z" fill="#f0cf74" stroke="#635c58" stroke-width="2"/><circle cx="47" cy="52" r="2.5" fill="#635c58"/><path d="M55 61q8 6 14-1" fill="none" stroke="#635c58" stroke-width="2"/>`, ['celestial','moon']),
  sticker('stars', 'Tiny stars', `<g fill="#e9c96e" stroke="#6c625b" stroke-width="1.5"><path d="M34 16l5 12 13 2-10 8 3 13-11-7-11 7 3-13-10-8 13-2Z"/><path d="M82 50l4 9 10 1-8 6 2 10-8-5-9 5 3-10-8-6 10-1Z"/><path d="M53 78l3 7 7 1-5 5 1 7-6-4-7 4 2-7-6-5 8-1Z"/></g>`, ['celestial','stars']),
  sticker('butterfly', 'Butterfly', `<path d="M60 60C50 30 24 19 15 36c-9 18 14 31 39 29-20 9-29 31-13 38 15 7 23-15 19-40Z" fill="#c8b6e2" stroke="#62586c" stroke-width="2"/><path d="M60 60C70 30 96 19 105 36c9 18-14 31-39 29 20 9 29 31 13 38-15 7-23-15-19-40Z" fill="#e8b5c3" stroke="#62586c" stroke-width="2"/><ellipse cx="60" cy="62" rx="4" ry="22" fill="#62586c"/>`, ['nature','pastel']),
  sticker('book-stack', 'Book stack', `<rect x="21" y="72" width="77" height="22" rx="4" fill="#b9c8a8" stroke="#625b55" stroke-width="2"/><rect x="28" y="51" width="73" height="22" rx="4" fill="#edc1c7" stroke="#625b55" stroke-width="2"/><rect x="17" y="30" width="76" height="22" rx="4" fill="#aebdd7" stroke="#625b55" stroke-width="2"/><path d="M31 36h44M40 58h45M33 80h46" stroke="#fff7ed" stroke-width="3"/>`, ['books','study']),
  sticker('teacup', 'Tea cup', `<path d="M24 47h65v32c0 16-13 27-32 27S24 95 24 79Z" fill="#f7e4d2" stroke="#675e58" stroke-width="2"/><path d="M89 55c23-4 25 31 2 31" fill="none" stroke="#675e58" stroke-width="7"/><path d="M40 27c-8 9 6 12-2 20M60 22c-8 10 6 13-2 24" fill="none" stroke="#a9a09b" stroke-width="3" stroke-linecap="round"/>`, ['cozy','tea']),
  sticker('bow', 'Soft bow', `<path d="M57 53C38 30 16 26 13 44c-3 16 24 25 44 18M63 53c19-23 41-27 44-9 3 16-24 25-44 18" fill="#e9b6c2" stroke="#6f5960" stroke-width="2"/><ellipse cx="60" cy="58" rx="11" ry="10" fill="#d998a8"/><path d="M55 67L42 105l20-12 16 11-12-37" fill="#e9b6c2" stroke="#6f5960" stroke-width="2"/>`, ['bow','pink']),
  sticker('cloud', 'Cloud', `<path d="M24 79c-15-1-16-21-3-27 2-16 20-24 32-13 7-20 38-17 40 6 20-2 25 31 4 34Z" fill="#f8f7f2" stroke="#788397" stroke-width="2"/><path d="M46 89l-7 13M66 89l-7 13M86 89l-7 13" stroke="#9eb4d1" stroke-width="4" stroke-linecap="round"/>`, ['weather','blue']),
  sticker('mushroom', 'Mushroom', `<path d="M48 55h26l7 50H41Z" fill="#efe0c5" stroke="#665c50" stroke-width="2"/><path d="M15 57c3-31 24-44 46-44 25 0 43 15 46 44-30 6-61 6-92 0Z" fill="#bc7c67" stroke="#665c50" stroke-width="2"/><circle cx="43" cy="34" r="5" fill="#f4dcc5"/><circle cx="73" cy="27" r="7" fill="#f4dcc5"/>`, ['forest','cottage']),
  sticker('planet', 'Tiny planet', `<circle cx="60" cy="58" r="30" fill="#b3bfd8" stroke="#5e6071" stroke-width="2"/><ellipse cx="60" cy="60" rx="53" ry="15" fill="none" stroke="#d7aab3" stroke-width="7" transform="rotate(-12 60 60)"/><circle cx="48" cy="49" r="5" fill="#879bb9"/><circle cx="70" cy="67" r="4" fill="#879bb9"/>`, ['space','celestial']),
  sticker('camera', 'Mini camera', `<rect x="18" y="40" width="84" height="56" rx="12" fill="#d7c6b7" stroke="#625a52" stroke-width="2"/><rect x="35" y="31" width="26" height="13" rx="4" fill="#9d8b7e"/><circle cx="62" cy="68" r="21" fill="#f7f0e9" stroke="#625a52" stroke-width="4"/><circle cx="62" cy="68" r="11" fill="#9fb3c9"/>`, ['photo','memory']),
  sticker('heart-note', 'Heart note', `<path d="M17 26l87-7 5 77-91 5Z" fill="#fff0a8" stroke="#776e52" stroke-width="2"/><path d="M60 78C38 61 33 44 45 38c8-4 15 2 18 8 3-7 11-14 20-9 14 8 5 26-23 41Z" fill="#df8599"/>`, ['love','note']),
  sticker('pressed-leaf', 'Pressed leaf', `<path d="M58 107C58 80 58 48 77 14" stroke="#6a7858" stroke-width="3"/><path d="M71 26C36 28 28 51 42 64 60 79 77 51 71 26Z" fill="#9aae78" opacity=".85"/><path d="M61 66C91 60 105 75 96 90 86 106 67 92 61 66Z" fill="#b7a56f" opacity=".8"/>`, ['botanical','pressed']),
  sticker('cherry', 'Cherries', `<path d="M54 66C52 42 59 24 74 16M68 69C72 45 84 31 94 27" fill="none" stroke="#667557" stroke-width="4"/><circle cx="46" cy="78" r="19" fill="#c96f78" stroke="#704f54" stroke-width="2"/><circle cx="76" cy="82" r="19" fill="#d47a82" stroke="#704f54" stroke-width="2"/>`, ['fruit','red']),
  sticker('sparkle', 'Sparkle', `<path d="M60 8c5 29 15 42 45 50-29 6-41 16-45 49-5-31-15-43-46-49C45 50 56 38 60 8Z" fill="#f2d276" stroke="#806f43" stroke-width="2"/><circle cx="94" cy="25" r="5" fill="#d8b9dd"/><circle cx="25" cy="87" r="4" fill="#b5ccbd"/>`, ['sparkle','celestial']),
  sticker('envelope', 'Little letter', `<rect x="16" y="28" width="88" height="66" rx="7" fill="#f7e5d5" stroke="#6c625b" stroke-width="2"/><path d="M18 33l42 35 42-35M18 89l31-29M102 89L71 60" fill="none" stroke="#6c625b" stroke-width="2"/><path d="M79 18c7-8 22-3 19 8-2 7-11 12-19 18-7-6-16-11-17-18-2-11 10-15 17-8Z" fill="#d993a5"/>`, ['letter','mail']),
  sticker('cat', 'Sleepy cat', `<path d="M29 42l7-24 17 16c5-2 10-2 15 0l17-16 6 25c10 9 13 23 7 36-9 20-62 21-73 1-7-13-4-28 4-38Z" fill="#c6b3a5" stroke="#655c56" stroke-width="2"/><path d="M43 60q7 6 13 0M70 60q7 6 13 0" fill="none" stroke="#655c56" stroke-width="2"/><path d="M58 72l4 3 4-3" fill="none" stroke="#655c56" stroke-width="2"/>`, ['animal','cozy']),
  sticker('ribbon-label', 'Ribbon label', `<path d="M17 34h86v45H17L4 56Z" fill="#c8b8df" stroke="#665b72" stroke-width="2"/><path d="M103 34l13 22-13 23Z" fill="#af9acb"/><text x="60" y="62" text-anchor="middle" font-family="Georgia,serif" font-size="16" fill="#564d5f">remember</text>`, ['label','memory']),
  sticker('music-note', 'Music note', `<path d="M72 18v58c-3-4-10-6-17-4-11 3-18 12-15 20 3 8 14 11 25 7 10-3 16-11 15-18V35l26-7V14Z" fill="#9b88ad" stroke="#5f5666" stroke-width="2"/>`, ['music','purple']),

  washi('washi-pink-grid', 'Pink grid', `<pattern id="p" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="#edc2cc"/><path d="M0 10h20M10 0v20" stroke="#fff" stroke-opacity=".55"/></pattern>`, ['pink','grid']),
  washi('washi-sage-daisy', 'Sage daisies', `<pattern id="p" width="44" height="30" patternUnits="userSpaceOnUse"><rect width="44" height="30" fill="#afc1a8"/><circle cx="12" cy="15" r="4" fill="#f8efd9"/><circle cx="12" cy="15" r="1.5" fill="#d5ad55"/><circle cx="33" cy="8" r="4" fill="#f8efd9"/><circle cx="33" cy="8" r="1.5" fill="#d5ad55"/></pattern>`, ['sage','floral']),
  washi('washi-blue-stars', 'Blue stars', `<pattern id="p" width="36" height="26" patternUnits="userSpaceOnUse"><rect width="36" height="26" fill="#a8bdd7"/><circle cx="8" cy="8" r="2" fill="#fff5d8"/><path d="M25 7l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1Z" fill="#fff5d8"/></pattern>`, ['blue','celestial']),
  washi('washi-vintage', 'Vintage script', `<pattern id="p" width="90" height="30" patternUnits="userSpaceOnUse"><rect width="90" height="30" fill="#d8c4a4"/><text x="5" y="19" font-family="Georgia,serif" font-style="italic" font-size="10" fill="#705e4c" opacity=".7">dear diary · 1978 ·</text></pattern>`, ['vintage','script']),
  washi('washi-gingham', 'Lavender gingham', `<pattern id="p" width="24" height="24" patternUnits="userSpaceOnUse"><rect width="24" height="24" fill="#d8cbe4"/><rect width="12" height="24" fill="#fff" opacity=".24"/><rect width="24" height="12" fill="#fff" opacity=".24"/><rect width="12" height="12" fill="#bca6d0" opacity=".28"/></pattern>`, ['purple','gingham']),
  washi('washi-cherries', 'Cherry tape', `<pattern id="p" width="48" height="28" patternUnits="userSpaceOnUse"><rect width="48" height="28" fill="#f3d9d7"/><circle cx="16" cy="17" r="4" fill="#bf6570"/><circle cx="24" cy="18" r="4" fill="#cf727c"/><path d="M19 13q3-8 10-8" stroke="#61745c" fill="none" stroke-width="2"/></pattern>`, ['cherry','pink']),
  washi('washi-clouds', 'Cloud tape', `<pattern id="p" width="58" height="28" patternUnits="userSpaceOnUse"><rect width="58" height="28" fill="#c7d7e7"/><path d="M7 18c-4-5 2-10 7-7 2-7 12-6 13 1 8-1 9 10 1 10H9Z" fill="#f8f7f0" opacity=".85"/></pattern>`, ['blue','cloud']),
  washi('washi-kraft', 'Kraft checks', `<pattern id="p" width="24" height="24" patternUnits="userSpaceOnUse"><rect width="24" height="24" fill="#bc9d74"/><path d="M0 12h24M12 0v24" stroke="#7c6348" stroke-opacity=".35" stroke-width="1"/></pattern>`, ['kraft','brown']),
  washi('washi-rainbow', 'Muted rainbow', `<linearGradient id="p"><stop stop-color="#e8b9c1"/><stop offset=".25" stop-color="#e8d59e"/><stop offset=".5" stop-color="#b9ceb5"/><stop offset=".75" stop-color="#b8c9df"/><stop offset="1" stop-color="#ccb8da"/></linearGradient>`, ['rainbow','pastel']),
  washi('washi-newspaper', 'Tiny newspaper', `<pattern id="p" width="120" height="40" patternUnits="userSpaceOnUse"><rect width="120" height="40" fill="#e7dfcf"/><text x="3" y="12" font-family="serif" font-size="7" fill="#554e46">THE DAILY NOTE</text><path d="M3 17h108M3 21h45M52 21h59M3 25h108M3 29h75" stroke="#777" stroke-width="1" opacity=".65"/></pattern>`, ['vintage','newspaper']),

  paper('paper-kraft', 'Torn kraft', '#c8a77d', `<path d="M28 32h160M28 52h130M28 72h172" stroke="#8d7356" stroke-width="2" opacity=".35"/>`, ['kraft','brown']),
  paper('paper-note', 'Ruled note', '#fff8e8', `<path d="M20 44h198M20 68h198M20 92h198M20 116h198M20 140h198" stroke="#9eb1c6" stroke-width="1.5" opacity=".6"/><path d="M42 16v145" stroke="#d9959d" stroke-width="1.5" opacity=".65"/>`, ['ruled','note']),
  paper('paper-receipt', 'Receipt scrap', '#f8f3df', `<text x="120" y="35" text-anchor="middle" font-family="monospace" font-size="13" fill="#6b645d">LITTLE THINGS</text><path d="M28 48h184M28 68h145M28 88h176M28 108h160M28 135h184" stroke="#867e75" stroke-dasharray="3 3" opacity=".5"/>`, ['receipt','vintage']),
  paper('paper-pink', 'Blush memo', '#f3d9dc', `<circle cx="199" cy="31" r="10" fill="#d8a5b0" opacity=".65"/><path d="M28 50h175M28 75h175M28 100h175M28 125h120" stroke="#a87883" stroke-width="1.4" opacity=".38"/>`, ['pink','memo']),
  paper('paper-library', 'Library card', '#eadfc7', `<rect x="23" y="23" width="194" height="130" fill="none" stroke="#8b7562" stroke-width="2"/><text x="120" y="44" text-anchor="middle" font-family="serif" font-size="12" fill="#725f4f">DATE DUE</text><path d="M35 56h170M35 79h170M35 102h170M35 125h170" stroke="#998472" stroke-width="1" opacity=".6"/>`, ['library','vintage']),
  paper('paper-blue', 'Blue torn paper', '#d6e2ec', `<path d="M24 42h170M24 64h150M24 86h181M24 108h130" stroke="#748ba2" stroke-width="2" opacity=".35"/>`, ['blue','paper']),
  paper('paper-grid', 'Grid scrap', '#f5eee1', `<path d="${Array.from({length:10},(_,i)=>`M${20+i*20} 16v145`).join(' ')} ${Array.from({length:7},(_,i)=>`M16 ${25+i*20}h205`).join(' ')}" stroke="#a4b2b2" stroke-width="1" opacity=".4"/>`, ['grid','paper']),
  paper('paper-floral', 'Floral memo', '#f8e9e3', `<path d="M190 20c-21 14-31 36-35 60M183 31c13-2 20 6 18 16-13 1-20-4-18-16ZM168 50c-15 0-22 8-19 18 12 1 20-5 19-18Z" fill="#9eb08e" opacity=".75"/><circle cx="191" cy="23" r="8" fill="#dda5b1"/>`, ['floral','pink']),
  paper('paper-calendar', 'Tiny calendar', '#f4efe6', `<rect x="30" y="30" width="180" height="115" rx="3" fill="none" stroke="#897d72" stroke-width="2"/><path d="M30 58h180M75 58v87M120 58v87M165 58v87M30 87h180M30 116h180" stroke="#9b9188" stroke-width="1"/><text x="120" y="49" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#766d65">THIS MONTH</text>`, ['calendar','planning']),

  stamp('stamp-today', 'Today', 'TODAY', '#b97886', ['today']),
  stamp('stamp-memory', 'Memory', 'MEMORY', '#7d9278', ['memory']),
  stamp('stamp-lately', 'Lately', 'LATELY', '#788ca6', ['lately']),
  stamp('stamp-favorite', 'Favorite', 'FAVORITE', '#9b7fa7', ['favorite']),
  stamp('stamp-note', 'Note to self', 'NOTE TO SELF', '#a67f5e', ['note']),
  stamp('stamp-keep', 'Worth keeping', 'WORTH KEEPING', '#77866c', ['keep']),
  stamp('stamp-ordinary', 'Ordinary magic', 'ORDINARY MAGIC', '#af768e', ['magic']),
]

export const assetById = new Map(assets.map((asset) => [asset.id, asset]))

export const assetsByCategory = (category: AssetCategory) =>
  assets.filter((asset) => asset.category === category)
