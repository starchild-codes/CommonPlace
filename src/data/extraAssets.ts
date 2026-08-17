import type { JournalAsset } from './assets'

const encode = (svg: string) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`

const wrapSticker = (body: string) => encode(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <filter id="s"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity=".16"/></filter>
  <g filter="url(#s)">${body}</g>
</svg>`)

const sticker = (id: string, name: string, body: string, tags: string[] = []): JournalAsset => ({
  id, name, category: 'stickers', tags,
  defaultSize: { width: 112, height: 112 },
  svg: wrapSticker(body),
})

const washi = (id: string, name: string, background: string, detail: string, tags: string[] = []): JournalAsset => ({
  id, name, category: 'washi', tags,
  defaultSize: { width: 210, height: 48 },
  svg: encode(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 50">
    <path d="M4 8L17 2 33 7 51 3 68 8 86 2 104 6 123 3 142 8 160 2 178 6 198 2 216 7V43L202 48 186 43 168 48 151 43 132 48 115 43 95 48 77 43 59 48 42 43 24 48 5 43Z" fill="${background}" opacity=".88"/>
    ${detail}
  </svg>`),
})

const paper = (id: string, name: string, fill: string, detail: string, tags: string[] = []): JournalAsset => ({
  id, name, category: 'papers', tags,
  defaultSize: { width: 230, height: 170 },
  svg: encode(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180">
    <filter id="s"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity=".13"/></filter>
    <path filter="url(#s)" d="M8 8L233 3 236 167 220 176 196 171 173 178 146 172 121 177 97 171 72 176 48 170 28 176 5 165Z" fill="${fill}"/>
    ${detail}
  </svg>`),
})

const ephemera = (id: string, name: string, fill: string, detail: string, tags: string[] = []): JournalAsset => ({
  id, name, category: 'ephemera', tags,
  defaultSize: { width: 190, height: 126 },
  svg: encode(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 145">
    <filter id="s"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-opacity=".16"/></filter>
    <rect filter="url(#s)" x="8" y="8" width="204" height="129" rx="3" fill="${fill}"/>
    ${detail}
  </svg>`),
})

const stamp = (id: string, name: string, text: string, color: string, tags: string[] = []): JournalAsset => ({
  id, name, category: 'stamps', tags,
  defaultSize: { width: 155, height: 70 },
  svg: encode(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 80">
    <rect x="8" y="12" width="154" height="56" rx="9" fill="none" stroke="${color}" stroke-width="4" stroke-dasharray="5 4" transform="rotate(-2 85 40)"/>
    <text x="85" y="48" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="17" fill="${color}" transform="rotate(-2 85 40)">${text}</text>
  </svg>`),
})

const botanicalSticker = (id: string, name: string, petal: string, center: string, leaf: string) =>
  sticker(id, name, `<path d="M60 108C60 78 61 55 61 35" stroke="${leaf}" stroke-width="4" stroke-linecap="round"/>
    <path d="M59 74C40 65 33 70 31 83 44 88 54 84 59 74ZM62 60C79 50 89 54 91 66 77 72 68 69 62 60Z" fill="${leaf}" opacity=".9"/>
    <g fill="${petal}" stroke="#655d58" stroke-width="1.3">${[0,60,120,180,240,300].map(a => `<ellipse cx="60" cy="28" rx="9" ry="19" transform="rotate(${a} 60 42)"/>`).join('')}</g><circle cx="60" cy="42" r="7" fill="${center}"/>`, ['flower','botanical'])

const tinyObject = (id: string, name: string, emoji: string, color: string, tags: string[]) => sticker(
  id,
  name,
  `<path d="M18 22Q60 7 102 22L108 94Q60 112 12 94Z" fill="#fffaf0" stroke="#6e655e" stroke-width="2"/><text x="60" y="71" text-anchor="middle" font-size="43">${emoji}</text><circle cx="92" cy="28" r="7" fill="${color}" opacity=".75"/>`,
  tags,
)

const lineWashi = (id: string, name: string, bg: string, ink: string, motif: string, tags: string[]) =>
  washi(id, name, bg, `<text x="12" y="31" font-family="Georgia,serif" font-size="17" fill="${ink}" opacity=".82">${Array.from({ length: 8 }, () => motif).join('   ')}</text>`, tags)

const labelEphemera = (
  id: string,
  name: string,
  heading: string,
  fill: string,
  ink: string,
  footer: string,
  tags: string[],
) => ephemera(id, name, fill, `<rect x="18" y="18" width="184" height="109" fill="none" stroke="${ink}" stroke-width="1.4" opacity=".65"/>
  <text x="110" y="41" text-anchor="middle" font-family="Georgia,serif" font-size="14" font-weight="700" fill="${ink}">${heading}</text>
  <path d="M28 53h164M28 73h118M28 92h164" stroke="${ink}" stroke-width="1" opacity=".4"/>
  <text x="110" y="116" text-anchor="middle" font-family="monospace" font-size="9" fill="${ink}" opacity=".75">${footer}</text>`, tags)

export const extraAssets: JournalAsset[] = [
  // Botanical + tiny-object stickers. All vector art is generated in-repo.
  botanicalSticker('extra-cosmos', 'Cosmos bloom', '#efb3c2', '#d9a64f', '#79956e'),
  botanicalSticker('extra-forget-me-not', 'Forget-me-not', '#a9c7e8', '#f0c66c', '#708b70'),
  botanicalSticker('extra-lilac', 'Lilac bloom', '#c7b3dd', '#f0d3a1', '#738d70'),
  botanicalSticker('extra-peach-flower', 'Peach blossom', '#efc2b4', '#d7a45d', '#76906d'),
  botanicalSticker('extra-buttercup', 'Buttercup', '#f2d56d', '#c99045', '#779269'),
  botanicalSticker('extra-bluebell', 'Bluebell', '#9fb9df', '#e7c176', '#6e8d75'),
  sticker('extra-lavender', 'Lavender stem', `<path d="M58 108C58 78 61 46 66 20" stroke="#748b69" stroke-width="4"/><g fill="#9d83b6">${[24,34,44,54,64].map((y,i)=>`<ellipse cx="${65+i%2*8}" cy="${y}" rx="8" ry="5" transform="rotate(-22 ${65+i%2*8} ${y})"/>`).join('')}</g><path d="M58 76c-14-8-23-5-28 5 13 7 22 4 28-5Z" fill="#8da27f"/>`, ['botanical','purple']),
  sticker('extra-fern', 'Pressed fern', `<path d="M58 108C58 78 63 49 70 17" stroke="#63775c" stroke-width="3"/>${[28,38,48,58,68,78,88].map((y,i)=>`<path d="M${64-i/2} ${y}C${45-i} ${y-9} ${38-i} ${y-5} ${31-i} ${y+2}M${64-i/2} ${y}C${81+i} ${y-9} ${91+i} ${y-5} ${98+i} ${y+2}" stroke="#859b78" stroke-width="5" stroke-linecap="round"/>`).join('')}`, ['botanical','pressed','green']),
  sticker('extra-ginkgo', 'Ginkgo leaf', `<path d="M61 104C58 80 58 60 60 43" stroke="#6e7c59" stroke-width="4"/><path d="M60 48C27 42 20 22 37 13c10 8 17 16 23 29 5-14 14-23 27-29 16 12 5 31-27 35Z" fill="#d2b96b" stroke="#6e6a4e" stroke-width="2"/><path d="M60 47L40 23M60 47l21-25M60 47V18" stroke="#8c8357" opacity=".55"/>`, ['botanical','autumn']),
  sticker('extra-rosebud', 'Rosebud', `<path d="M60 108C59 82 61 62 62 46" stroke="#738c6b" stroke-width="4"/><path d="M60 50C39 39 42 17 60 11c18 7 22 28 0 39Z" fill="#cf8191" stroke="#70575c" stroke-width="2"/><path d="M60 49C51 33 54 20 60 13M60 49c10-16 7-28 1-36" stroke="#a45f70" stroke-width="2" fill="none"/><path d="M59 74c-14-8-22-4-26 7 13 5 22 2 26-7Z" fill="#88a17d"/>`, ['flower','rose','vintage']),
  sticker('extra-strawberry', 'Strawberry', `<path d="M32 39C45 23 75 22 89 39 89 69 77 95 60 106 43 96 31 70 32 39Z" fill="#d96872" stroke="#6d5557" stroke-width="2"/><path d="M38 38c8-17 15-15 22-3 7-13 15-13 23 2-16 10-30 10-45 1Z" fill="#6f9567"/>${[[46,54],[68,51],[56,70],[74,72],[50,87],[64,91]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="2" ry="4" fill="#f6d9a2"/>`).join('')}`, ['fruit','red','cute']),
  sticker('extra-lemon', 'Lemon slice', `<circle cx="60" cy="60" r="43" fill="#f3df7d" stroke="#7a7049" stroke-width="2"/><circle cx="60" cy="60" r="33" fill="#fff6c7"/>${[0,45,90,135,180,225,270,315].map(a=>`<path d="M60 60L60 29A31 31 0 0 1 82 38Z" fill="#f0d765" transform="rotate(${a} 60 60)"/>`).join('')}`, ['fruit','yellow','summer']),
  sticker('extra-blueberries', 'Blueberries', `<path d="M58 52C51 35 50 22 57 13M68 53C74 34 82 25 92 20" stroke="#71846b" stroke-width="4"/><circle cx="44" cy="66" r="22" fill="#7188b2" stroke="#595d75" stroke-width="2"/><circle cx="73" cy="76" r="22" fill="#8295bd" stroke="#595d75" stroke-width="2"/><circle cx="42" cy="63" r="5" fill="#a9b5ce"/><circle cx="72" cy="72" r="5" fill="#a9b5ce"/>`, ['fruit','blue','cute']),
  sticker('extra-moon-phases', 'Moon phases', `<g fill="#e7cd83" stroke="#625d59" stroke-width="1.5"><circle cx="18" cy="60" r="12"/><path d="M41 48a12 12 0 1 0 0 24c-8-5-8-19 0-24Z"/><circle cx="60" cy="60" r="12"/><path d="M79 48a12 12 0 1 1 0 24c8-5 8-19 0-24Z"/><circle cx="102" cy="60" r="12" fill="#615c62"/></g>`, ['celestial','moon','phases']),
  sticker('extra-shooting-star', 'Shooting star', `<path d="M27 84C48 62 60 46 81 29" stroke="#c6b2d8" stroke-width="7" stroke-linecap="round"/><path d="M17 95C42 73 57 54 82 36" stroke="#9ebbd8" stroke-width="4" stroke-linecap="round"/><path d="M87 13l6 14 15 2-12 10 4 15-13-8-14 8 4-15-12-10 15-2Z" fill="#f0d16f" stroke="#6f654b" stroke-width="2"/>`, ['celestial','star','purple']),
  sticker('extra-telescope', 'Tiny telescope', `<path d="M28 36l57-18 9 26-57 18Z" fill="#8e8aa5" stroke="#595663" stroke-width="2"/><circle cx="91" cy="31" r="16" fill="#c7d5e5" stroke="#595663" stroke-width="2"/><path d="M55 57l-18 45M58 57l8 46M59 58l31 42" stroke="#6d645d" stroke-width="5" stroke-linecap="round"/>`, ['space','astronomy','celestial']),
  sticker('extra-constellation', 'Constellation', `<g fill="#f0cf75">${[[20,30],[47,51],[75,30],[98,65],[60,91],[29,85]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4"/>`).join('')}</g><path d="M20 30L47 51 75 30 98 65 60 91 29 85 47 51" fill="none" stroke="#8598b4" stroke-width="2" stroke-dasharray="4 3"/>`, ['space','stars','constellation']),
  sticker('extra-cloud-window', 'Cloud window', `<rect x="17" y="17" width="86" height="86" rx="43" fill="#d9e4ef" stroke="#6d7580" stroke-width="2"/><path d="M29 76c-12-1-13-16-2-21 3-13 17-17 27-9 7-15 28-12 31 5 15-1 20 24 3 25Z" fill="#fffaf4"/><circle cx="78" cy="38" r="12" fill="#f0d37d"/>`, ['sky','cloud','window']),
  tinyObject('extra-fountain-pen', 'Fountain pen', '✒️', '#9a86ad', ['writing','pen','vintage']),
  tinyObject('extra-key', 'Old key', '🗝️', '#c6a25f', ['key','vintage']),
  tinyObject('extra-candle', 'Little candle', '🕯️', '#e0b277', ['cozy','candle']),
  tinyObject('extra-shell', 'Seashell', '🐚', '#e7bfb4', ['sea','summer']),
  tinyObject('extra-rainbow', 'Soft rainbow', '🌈', '#b7a6cf', ['rainbow','cute']),
  tinyObject('extra-coffee', 'Coffee', '☕', '#ae8d75', ['coffee','cozy']),
  tinyObject('extra-croissant', 'Croissant', '🥐', '#dfb970', ['food','cozy']),
  tinyObject('extra-cherries-card', 'Cherry card', '🍒', '#ce7881', ['fruit','red']),
  tinyObject('extra-little-frog', 'Tiny frog', '🐸', '#8eac7b', ['animal','green','cute']),
  tinyObject('extra-letter-heart', 'Love letter', '💌', '#dc9dab', ['mail','letter','heart']),
  tinyObject('extra-cake', 'Tiny cake', '🍰', '#d8a3b0', ['food','birthday','cute']),
  tinyObject('extra-snowglobe', 'Snow globe', '🔮', '#9b94bf', ['whimsical','purple']),

  // Washi drawer expansion.
  lineWashi('extra-washi-moons', 'Moon phase tape', '#273247', '#f2d786', '☾', ['celestial','navy']),
  lineWashi('extra-washi-hearts', 'Tiny heart tape', '#e8b7c2', '#8c5664', '♥', ['pink','heart']),
  lineWashi('extra-washi-bows', 'Bow tape', '#d8c7e8', '#6f5d7d', '⋈', ['purple','bow']),
  lineWashi('extra-washi-flowers', 'Wildflower tape', '#e8dfc9', '#708267', '✿', ['floral','vintage']),
  lineWashi('extra-washi-stars-cream', 'Cream stars', '#f3e4b5', '#7a6f57', '✦', ['stars','cream']),
  lineWashi('extra-washi-letters', 'Air-mail hearts', '#dbe6ed', '#b66e7f', '♡', ['mail','blue']),
  washi('extra-washi-gingham-lilac', 'Lilac gingham', '#d6c6e2', `<path d="M0 12h220M0 37h220M25 0v50M75 0v50M125 0v50M175 0v50" stroke="#fff" stroke-width="9" opacity=".35"/>`, ['purple','gingham']),
  washi('extra-washi-gingham-sage', 'Sage gingham', '#b9c9ad', `<path d="M0 12h220M0 37h220M25 0v50M75 0v50M125 0v50M175 0v50" stroke="#fff" stroke-width="9" opacity=".32"/>`, ['sage','gingham']),
  washi('extra-washi-check-blue', 'Blue notebook tape', '#aac0d5', `<path d="M0 25h220M22 0v50M66 0v50M110 0v50M154 0v50M198 0v50" stroke="#6f8cab" stroke-width="1.4" opacity=".5"/>`, ['blue','grid']),
  washi('extra-washi-postage', 'Postage tape', '#ead9bd', `${[12,52,92,132,172].map(x=>`<rect x="${x}" y="9" width="30" height="30" fill="#fff8e8" stroke="#a77d68" stroke-dasharray="2 2"/><circle cx="${x+15}" cy="24" r="8" fill="#c59aa5" opacity=".7"/>`).join('')}`, ['vintage','postage']),
  washi('extra-washi-clouds', 'Cloud tape', '#b8d1e3', `${[20,70,120,170].map(x=>`<path d="M${x} 31c-8 0-8-10-1-12 2-9 14-9 17-2 9-2 12 12 2 14Z" fill="#fff" opacity=".8"/>`).join('')}`, ['sky','cloud']),
  washi('extra-washi-cherries', 'Cherry tape', '#f0d7d7', `${[27,77,127,177].map(x=>`<circle cx="${x}" cy="29" r="6" fill="#c96f78"/><circle cx="${x+11}" cy="30" r="6" fill="#d47a82"/><path d="M${x+4} 24q3-12 11-15" fill="none" stroke="#6f8b65" stroke-width="2"/>`).join('')}`, ['cherry','pink']),
  washi('extra-washi-newsprint', 'Soft newsprint', '#e7dcc7', `<g fill="#75695c" opacity=".55" font-family="Georgia,serif" font-size="7"><text x="10" y="18">small things / slow days / saved here</text><text x="30" y="34">vol. 03 · notes from nowhere in particular</text></g>`, ['vintage','newspaper']),
  washi('extra-washi-rain', 'Rainy day tape', '#9fb6c9', `<path d="M15 15l-5 10M45 8l-6 13M80 17l-5 10M115 9l-7 13M155 17l-5 10M190 8l-7 13" stroke="#e9f3f8" stroke-width="3" stroke-linecap="round"/>`, ['blue','rain']),

  // Torn papers for layering beneath writing and photos.
  paper('extra-paper-old-letter', 'Old letter', '#efe1c8', `<g fill="#786957" font-family="Georgia,serif" font-size="10" opacity=".65"><text x="28" y="40">dear future me,</text><text x="28" y="62">keep the ordinary bits too.</text><text x="28" y="84">they vanish first.</text></g><path d="M28 107h145M28 124h120" stroke="#8a7966" opacity=".25"/>`, ['letter','vintage','writing']),
  paper('extra-paper-lace', 'Lace paper', '#f6eee4', `<path d="M18 32q12-16 24 0t24 0t24 0t24 0t24 0t24 0t24 0t24 0" fill="none" stroke="#c8aeb8" stroke-width="5" opacity=".55"/><path d="M26 59h180M26 84h160M26 109h181M26 134h125" stroke="#9b8d85" opacity=".22"/>`, ['lace','pink','vintage']),
  paper('extra-paper-blue-letter', 'Blue letter paper', '#e2edf4', `<path d="M26 46h182M26 70h182M26 94h182M26 118h182M26 142h135" stroke="#8099ad" opacity=".33"/><text x="184" y="30" font-family="serif" font-size="15" fill="#8a6f94">✦</text>`, ['blue','letter']),
  paper('extra-paper-sage-note', 'Sage note', '#e0e8d8', `<path d="M30 42h165M30 68h175M30 94h142M30 120h160" stroke="#7c9074" opacity=".32"/><path d="M192 20q-18 16-18 40" stroke="#819875" stroke-width="3"/><circle cx="193" cy="21" r="8" fill="#e5b7bf"/>`, ['sage','botanical']),
  paper('extra-paper-purple-grid', 'Lavender grid', '#ece5f1', `<path d="${Array.from({length:11},(_,i)=>`M${18+i*20} 12v154`).join(' ')} ${Array.from({length:8},(_,i)=>`M12 ${18+i*20}h214`).join(' ')}" stroke="#9887a6" stroke-width="1" opacity=".28"/>`, ['purple','grid']),
  paper('extra-paper-dictionary', 'Dictionary scrap', '#eee4d0', `<text x="28" y="35" font-family="Georgia,serif" font-size="14" font-weight="700" fill="#655c52">wonder, n.</text><text x="28" y="57" font-family="Georgia,serif" font-size="9" fill="#756b61">the feeling that something is larger</text><text x="28" y="72" font-family="Georgia,serif" font-size="9" fill="#756b61">than the explanation you have for it.</text><path d="M28 92h165M28 107h172M28 122h145M28 137h168" stroke="#7e7469" opacity=".25"/>`, ['dictionary','vintage','words']),
  paper('extra-paper-celestial', 'Celestial paper', '#25324b', `<g fill="#f1d37a">${[[30,35],[58,55],[92,30],[146,49],[190,32],[172,110],[107,132],[45,119]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.5"/>`).join('')}</g><path d="M30 35L58 55 92 30 146 49M107 132l65-22 18-78" stroke="#9eb3d2" opacity=".45" stroke-dasharray="3 4"/>`, ['celestial','navy','stars']),
  paper('extra-paper-ticket-grid', 'Ticket-grid scrap', '#f3e8d2', `<rect x="28" y="27" width="172" height="116" fill="none" stroke="#8b7865" stroke-dasharray="6 4" opacity=".6"/><path d="M28 58h172M28 91h172M83 27v116M145 27v116" stroke="#9c8977" opacity=".28"/>`, ['ticket','vintage','grid']),
  paper('extra-paper-pink-ledger', 'Blush ledger', '#f2dfe1', `<path d="M28 37h178M28 62h178M28 87h178M28 112h178M28 137h178M75 20v135M145 20v135" stroke="#a78289" opacity=".3"/>`, ['pink','ledger']),
  paper('extra-paper-kraft-map', 'Kraft map scrap', '#d7c29d', `<path d="M20 120C45 80 60 88 83 55s45-26 62-9 32 10 72-17M34 42c25 24 36 40 48 70M132 29c-8 29-2 63 25 101" fill="none" stroke="#75654f" stroke-width="2" opacity=".38"/><circle cx="153" cy="88" r="6" fill="#b47772"/>`, ['map','kraft','travel']),
  paper('extra-paper-flower-press', 'Flower press card', '#f3ead9', `<path d="M121 151C118 112 120 79 130 38" stroke="#718166" stroke-width="3"/><path d="M130 59c-23-15-36-7-37 8 14 13 30 7 37-8ZM128 90c23-14 37-4 35 11-15 10-29 2-35-11Z" fill="#92a482"/><circle cx="132" cy="32" r="15" fill="#d7a3ad" opacity=".8"/>`, ['pressed','flower','botanical']),
  paper('extra-paper-photo-mat', 'Photo mat', '#fffaf1', `<rect x="43" y="29" width="154" height="102" fill="#d8e0e4" stroke="#c8bdb3"/><rect x="43" y="131" width="154" height="25" fill="#fff"/><text x="120" y="149" text-anchor="middle" font-family="cursive" font-size="11" fill="#9b7e8a">write the tiny caption</text>`, ['photo','polaroid','frame']),

  // Ephemera: intentionally fictional/generic. No real tickets, logos, brands, or copied print material.
  labelEphemera('eph-library-checkout', 'Library checkout card', 'BORROWED & KEPT', '#eadfc7', '#755f4f', 'RETURN WHEN READY', ['library','card','vintage']),
  labelEphemera('eph-train-ticket', 'Train ticket', 'ONE WAY · SOMEWHERE', '#e8d0b0', '#785e50', 'SEAT 07 · WINDOW', ['ticket','train','travel']),
  labelEphemera('eph-museum-ticket', 'Museum ticket', 'MUSEUM OF SMALL THINGS', '#e3d7e9', '#6c5c76', 'ADMIT ONE MEMORY', ['ticket','museum','purple']),
  labelEphemera('eph-cinema-ticket', 'Cinema stub', 'PICTURE HOUSE', '#ebc9c9', '#805c62', 'MATINEE · ROW B', ['ticket','cinema','pink']),
  labelEphemera('eph-observatory-pass', 'Observatory pass', 'NIGHT OBSERVATORY', '#24344d', '#f1d47b', 'SKY CLEAR · 23:17', ['space','astronomy','ticket']),
  labelEphemera('eph-botanical-label', 'Botanical field label', 'FIELD SPECIMEN', '#e1e0bf', '#5f725a', 'FOUND / PRESSED / SAVED', ['botanical','label','vintage']),
  labelEphemera('eph-cafe-receipt', 'Café receipt', 'CORNER TABLE', '#f2ead9', '#76685c', 'tea · cake · long conversation', ['receipt','cafe','cozy']),
  labelEphemera('eph-bookshop-receipt', 'Bookshop receipt', 'SECOND-HAND BOOKS', '#eee5d3', '#6e6458', 'one novel · no regrets', ['receipt','books','vintage']),
  labelEphemera('eph-postcard', 'Postcard back', 'POST CARD', '#efe2cd', '#736458', 'WRITE SOMETHING WORTH MAILING', ['postcard','mail','travel']),
  labelEphemera('eph-hotel-key', 'Hotel key tag', 'ROOM 407', '#c8a879', '#5e4b3e', 'PLEASE RETURN TO THE DESK', ['hotel','tag','travel']),
  labelEphemera('eph-luggage-tag', 'Luggage tag', 'WHERE TO?', '#d9cbb3', '#695c4e', 'NAME ______  CITY ______', ['tag','travel','vintage']),
  labelEphemera('eph-garden-pass', 'Garden pass', 'GLASSHOUSE ENTRY', '#d9e4cf', '#5d725a', 'VALID UNTIL SUNSET', ['garden','ticket','green']),
  ephemera('eph-postage-pair', 'Postage pair', '#f4ead8', `<g transform="translate(24 23)"><rect width="72" height="92" fill="#d6b4bd" stroke="#7a5d67" stroke-dasharray="4 3"/><circle cx="36" cy="42" r="22" fill="#f0d9df"/><path d="M36 19c6 16 17 23 28 26-14 2-23 10-28 25-5-15-14-23-28-25 12-3 22-10 28-26Z" fill="#9f7888"/></g><g transform="translate(122 23)"><rect width="72" height="92" fill="#b8c7d8" stroke="#627286" stroke-dasharray="4 3"/><circle cx="36" cy="42" r="22" fill="#e9f0f5"/><path d="M18 48l18-20 18 20" fill="none" stroke="#738aa0" stroke-width="4"/></g>`, ['postage','mail','vintage']),
  ephemera('eph-airmail', 'Airmail fragment', '#f4efe4', `<path d="M8 18h204M8 126h204" stroke="#a76772" stroke-width="7" stroke-dasharray="22 10"/><path d="M8 18h204M8 126h204" stroke="#6686a6" stroke-width="7" stroke-dasharray="22 10" stroke-dashoffset="16"/><text x="110" y="72" text-anchor="middle" font-family="monospace" font-size="16" fill="#6f6b66">AIR MAIL / PAR AVION</text><text x="110" y="94" text-anchor="middle" font-family="Georgia,serif" font-size="10" fill="#8a7b70">somewhere between here and there</text>`, ['mail','airmail','travel']),
  ephemera('eph-newspaper', 'Tiny newspaper clipping', '#e8dfcc', `<text x="23" y="31" font-family="Georgia,serif" font-weight="700" font-size="15" fill="#5f574e">THE SMALL DAILY</text><path d="M22 40h176M22 51h176M22 62h82M116 62h82M22 73h82M116 73h82M22 84h82M116 84h82M22 95h82M116 95h82M22 106h176" stroke="#6e665d" opacity=".38"/><text x="23" y="126" font-family="Georgia,serif" font-size="9" fill="#6b6259">Nothing historic happened. It was still worth keeping.</text>`, ['newspaper','vintage','words']),
  ephemera('eph-dictionary', 'Dictionary clipping', '#ece2cd', `<text x="23" y="33" font-family="Georgia,serif" font-size="16" font-weight="700" fill="#5e554d">ephemera</text><text x="23" y="53" font-family="Georgia,serif" font-size="9" fill="#6d635a">n. things designed to disappear,</text><text x="23" y="67" font-family="Georgia,serif" font-size="9" fill="#6d635a">kept because somebody decided not to let them.</text><path d="M23 83h168M23 96h151M23 109h172M23 122h132" stroke="#7c7268" opacity=".26"/>`, ['dictionary','words','vintage']),
  ephemera('eph-music-fragment', 'Music paper', '#f2ead8', `<path d="M23 42h175M23 50h175M23 58h175M23 66h175M23 92h175M23 100h175M23 108h175M23 116h175" stroke="#756b61" opacity=".38"/><g fill="#756b61"><circle cx="55" cy="54" r="5"/><path d="M60 54V33" stroke="#756b61" stroke-width="3"/><circle cx="96" cy="62" r="5"/><path d="M101 62V39" stroke="#756b61" stroke-width="3"/><circle cx="145" cy="98" r="5"/><path d="M150 98V76" stroke="#756b61" stroke-width="3"/></g>`, ['music','paper','vintage']),
  ephemera('eph-map-fragment', 'Map fragment', '#d8c59e', `<path d="M16 108C39 84 45 42 78 55s37 48 69 31 24-41 56-55M30 29c21 18 38 21 60 11M145 19c-13 20-13 43 5 65" fill="none" stroke="#6f604c" stroke-width="2" opacity=".48"/><path d="M151 88l5-13 13-5 6 11-6 13-13 5Z" fill="#a66e6c"/><text x="23" y="131" font-family="Georgia,serif" font-size="8" fill="#665747">YOU WERE HERE, APPROXIMATELY</text>`, ['map','travel','kraft']),
  ephemera('eph-recipe-card', 'Recipe card', '#f1e5cc', `<text x="24" y="30" font-family="cursive" font-size="18" fill="#80675c">something warm</text><path d="M24 43h169M24 62h169M24 81h169M24 100h169" stroke="#9c8576" opacity=".34"/><text x="24" y="121" font-family="Georgia,serif" font-size="8" fill="#766358">add more cinnamon than the recipe says</text>`, ['recipe','food','vintage']),
  ephemera('eph-photo-strip', 'Photo booth strip', '#f7f3ec', `<rect x="70" y="15" width="80" height="114" fill="#fff" stroke="#c8c0b7"/><rect x="78" y="23" width="64" height="28" fill="#b9c8d5"/><rect x="78" y="57" width="64" height="28" fill="#e1c1c8"/><rect x="78" y="91" width="64" height="28" fill="#c6d1b8"/><circle cx="110" cy="37" r="8" fill="#fff8"/><circle cx="110" cy="71" r="8" fill="#fff8"/><circle cx="110" cy="105" r="8" fill="#fff8"/>`, ['photo','strip','memory']),
  ephemera('eph-matchbox', 'Matchbox label', '#d6a88c', `<rect x="31" y="25" width="158" height="95" rx="8" fill="#f0d6b8" stroke="#7e5b4c" stroke-width="2"/><text x="110" y="52" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="14" fill="#744f48">LITTLE SPARKS</text><path d="M110 64c5 17 13 24 28 29-16 3-24 12-28 28-4-16-12-25-28-28 16-5 24-12 28-29Z" fill="#c37c71"/><text x="110" y="112" text-anchor="middle" font-family="monospace" font-size="7" fill="#744f48">KEEP DRY · KEEP CURIOUS</text>`, ['label','matchbox','vintage']),
  ephemera('eph-astronomy-chart', 'Astronomy chart', '#233149', `<g fill="#f1d47a">${[[28,26],[55,49],[89,30],[128,57],[168,28],[188,78],[151,110],[92,101],[43,115]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.7"/>`).join('')}</g><path d="M28 26L55 49 89 30 128 57 168 28M43 115l49-14 59 9 37-32" stroke="#9fb6d5" opacity=".6" stroke-dasharray="4 4"/><text x="20" y="132" font-family="monospace" font-size="8" fill="#d7e0ee">FIELD NOTES · SAME SKY / DIFFERENT NIGHT</text>`, ['astronomy','space','chart']),
  ephemera('eph-letter-fragment', 'Handwritten letter', '#efe0c7', `<g fill="#766052" font-family="cursive" font-size="13" opacity=".78"><text x="22" y="36">I meant to write sooner—</text><text x="22" y="57">not because anything happened,</text><text x="22" y="78">but because I noticed something.</text><text x="22" y="105">I think that counts.</text></g>`, ['letter','writing','vintage']),
  ephemera('eph-bookplate', 'Bookplate', '#e6dbc5', `<rect x="30" y="22" width="160" height="101" rx="28" fill="none" stroke="#806f60" stroke-width="2"/><text x="110" y="54" text-anchor="middle" font-family="Georgia,serif" font-size="12" fill="#6f5e50">FROM THE LIBRARY OF</text><path d="M55 72h110" stroke="#857362"/><text x="110" y="97" text-anchor="middle" font-family="cursive" font-size="18" fill="#886c7a">someone sentimental</text>`, ['bookplate','books','library']),
  ephemera('eph-pressed-card', 'Pressed flower card', '#e8e1ca', `<path d="M112 120C108 91 112 68 123 37" stroke="#718165" stroke-width="3"/><path d="M121 59c-20-11-31-4-31 8 12 10 25 5 31-8ZM116 84c20-9 30-1 28 11-13 8-24 1-28-11Z" fill="#95a783"/><circle cx="126" cy="31" r="14" fill="#d4a1ac" opacity=".75"/><text x="22" y="131" font-family="monospace" font-size="7" fill="#71685e">FOUND ON A DAY WORTH REMEMBERING</text>`, ['pressed','flower','botanical']),
  ephemera('eph-weather-slip', 'Weather slip', '#dce7ed', `<text x="23" y="31" font-family="monospace" font-size="10" fill="#627685">TODAY'S SMALL WEATHER</text><path d="M25 53h168M25 80h168M25 107h168" stroke="#7d91a0" opacity=".3"/><text x="29" y="71" font-family="Georgia,serif" font-size="12" fill="#647987">sky:</text><text x="29" y="98" font-family="Georgia,serif" font-size="12" fill="#647987">air:</text><text x="29" y="125" font-family="Georgia,serif" font-size="12" fill="#647987">light:</text>`, ['weather','blue','note']),
  ephemera('eph-tiny-calendar', 'Tiny calendar page', '#f3e9dc', `<text x="110" y="31" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="#76675c">A MONTH, SOMEHOW</text><path d="M25 43h170M25 69h170M25 95h170M25 121h170M59 43v78M93 43v78M127 43v78M161 43v78" stroke="#8f8176" opacity=".35"/>`, ['calendar','date','vintage']),

  // More rubber-stamp language, deliberately gentle rather than productivity-coded.
  stamp('extra-stamp-slow-day', 'Slow day', 'SLOW DAY', '#82937d', ['slow','gentle']),
  stamp('extra-stamp-kept', 'Kept this', 'KEPT THIS', '#9b7785', ['memory','keep']),
  stamp('extra-stamp-found', 'Found', 'FOUND', '#88765e', ['found','ephemera']),
  stamp('extra-stamp-soft', 'Soft hours', 'SOFT HOURS', '#9a86aa', ['soft','purple']),
  stamp('extra-stamp-night', 'Night notes', 'NIGHT NOTES', '#677d9b', ['night','blue']),
  stamp('extra-stamp-unfinished', 'Unfinished', 'UNFINISHED', '#9c786b', ['unfinished','process']),
  stamp('extra-stamp-ordinary', 'Ordinary', 'ORDINARY', '#7f9278', ['ordinary','memory']),
  stamp('extra-stamp-wonder', 'Wonder', 'WONDER', '#8f79a0', ['wonder','curiosity']),
  stamp('extra-stamp-private', 'For me', 'FOR ME', '#ae7e8b', ['private','journal']),
  stamp('extra-stamp-no-rush', 'No rush', 'NO RUSH', '#7f8e8c', ['calm','gentle']),
]
