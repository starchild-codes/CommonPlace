import type { JournalAsset } from './assets'

const encode = (svg: string) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`

const sticker = (id: string, name: string, body: string, tags: string[]): JournalAsset => ({
  id, name, category: 'stickers', tags,
  defaultSize: { width: 112, height: 112 },
  svg: encode(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><filter id="s"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity=".16"/></filter><g filter="url(#s)">${body}</g></svg>`),
})

const washi = (id: string, name: string, bg: string, ink: string, motif: string, tags: string[]): JournalAsset => ({
  id, name, category: 'washi', tags,
  defaultSize: { width: 210, height: 48 },
  svg: encode(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 50"><path d="M4 8L17 2 33 7 51 3 68 8 86 2 104 6 123 3 142 8 160 2 178 6 198 2 216 7V43L202 48 186 43 168 48 151 43 132 48 115 43 95 48 77 43 59 48 42 43 24 48 5 43Z" fill="${bg}" opacity=".9"/><text x="12" y="31" font-family="Georgia,serif" font-size="16" fill="${ink}" opacity=".86">${Array.from({ length: 8 }, () => motif).join('  ')}</text></svg>`),
})

const paper = (id: string, name: string, fill: string, ink: string, motif: string, tags: string[]): JournalAsset => ({
  id, name, category: 'papers', tags,
  defaultSize: { width: 230, height: 170 },
  svg: encode(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180"><filter id="s"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity=".13"/></filter><path filter="url(#s)" d="M8 8L233 3 236 167 220 176 196 171 173 178 146 172 121 177 97 171 72 176 48 170 28 176 5 165Z" fill="${fill}"/><text x="24" y="45" font-family="Georgia,serif" font-size="18" fill="${ink}" opacity=".42">${motif}</text><path d="M24 64h168M24 88h143M24 112h177M24 136h122" stroke="${ink}" stroke-width="1.4" opacity=".2"/></svg>`),
})

const ephemera = (id: string, name: string, fill: string, ink: string, heading: string, footer: string, tags: string[]): JournalAsset => ({
  id, name, category: 'ephemera', tags,
  defaultSize: { width: 190, height: 126 },
  svg: encode(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 145"><filter id="s"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-opacity=".16"/></filter><rect filter="url(#s)" x="8" y="8" width="204" height="129" rx="3" fill="${fill}"/><rect x="19" y="19" width="182" height="107" fill="none" stroke="${ink}" stroke-width="1.2" opacity=".5"/><text x="110" y="44" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="13" fill="${ink}">${heading}</text><path d="M31 57h158M31 78h112M31 99h158" stroke="${ink}" opacity=".28"/><text x="110" y="118" text-anchor="middle" font-family="monospace" font-size="8" fill="${ink}" opacity=".75">${footer}</text></svg>`),
})

const stamp = (id: string, name: string, text: string, color: string, tags: string[]): JournalAsset => ({
  id, name, category: 'stamps', tags,
  defaultSize: { width: 155, height: 70 },
  svg: encode(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 80"><rect x="8" y="12" width="154" height="56" rx="9" fill="none" stroke="${color}" stroke-width="4" stroke-dasharray="5 4" transform="rotate(-2 85 40)"/><text x="85" y="48" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="16" fill="${color}" transform="rotate(-2 85 40)">${text}</text></svg>`),
})

const waxSeal = (id: string, name: string, color: string, motif: string, tags: string[]): JournalAsset => ({
  id, name, category: 'wax', tags,
  defaultSize: { width: 92, height: 92 },
  svg: encode(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><radialGradient id="w"><stop offset="0" stop-color="#fff" stop-opacity=".18"/><stop offset=".55" stop-color="${color}"/><stop offset="1" stop-color="${color}" stop-opacity=".82"/></radialGradient><filter id="s"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-opacity=".24"/></filter></defs><path filter="url(#s)" d="M60 10c12 0 18 7 27 11 10 4 20 5 23 16 3 10-4 18-3 28 1 11 7 20-1 29-7 8-18 7-27 12-9 5-15 11-27 9-11-2-15-11-24-16-9-5-19-5-22-15-4-11 3-18 3-29 0-10-5-19 2-28 7-9 17-8 27-12 8-3 12-5 22-5Z" fill="url(#w)"/><circle cx="60" cy="61" r="31" fill="none" stroke="#4f2f2b" stroke-opacity=".22" stroke-width="3"/><text x="60" y="72" text-anchor="middle" font-family="Georgia,serif" font-size="31" fill="#fff7ef" opacity=".86">${motif}</text></svg>`),
})

const stickerDefs = [
  ['theme-quill','Ink quill','#3d3b47','✒',['dark-academia','wizard','writing','black']],
  ['theme-key','Old brass key','#b98a4b','⚿',['dark-academia','wizard','vintage','gold']],
  ['theme-potion','Tiny apothecary','#74836b','⚗',['wizard','green','mystery']],
  ['theme-owl','Night owl','#8f775e','◉',['wizard','night','books']],
  ['theme-crown','Little crown','#d1ad58','♕',['gold','royal','match']],
  ['theme-book','Open book','#a77b68','⌁',['books','reading','literary']],
  ['theme-glasses','Reading glasses','#6d5f68','∞',['books','study','reader']],
  ['theme-shell','Sea shell','#e2b8a4','◔',['ocean','coastal','summer']],
  ['theme-sun','Summer sun','#efc65f','☀',['summer','yellow','coastal']],
  ['theme-sunglasses','Tiny shades','#715f65','⌐',['summer','coastal','fun']],
  ['theme-rocket','Paper rocket','#879ec6','↟',['space','celestial','blue']],
  ['theme-saturn','Ringed planet','#aa96c2','◉',['space','purple','celestial']],
  ['theme-city','City lights','#4f647d','▥',['city','night','blue']],
  ['theme-taxi','Tiny taxi','#e4bb4c','▰',['city','yellow','travel']],
  ['theme-passport','Passport','#55766f','▤',['travel','green','city']],
  ['theme-suitcase','Suitcase','#aa7f63','▣',['travel','brown','vintage']],
  ['theme-cricket','Cricket day','#6e9a72','◒',['cricket','sport','green','match']],
  ['theme-football','Football night','#526e98','⬡',['football','sport','blue','match']],
  ['theme-score','Score card','#ece2cb','№',['cricket','football','sport','paper']],
  ['theme-fairy','Fairy wing','#cbb7dc','❧',['fairycore','purple','pastel']],
  ['theme-magic-mushroom','Forest cap','#b57f73','♧',['fairycore','cottage','forest']],
  ['theme-ribbon','Ribbon heart','#dfa7ba','♡',['pink','romantic','ribbon']],
  ['theme-lavender','Lavender sprig','#9e8eb8','❦',['purple','botanical','lavender']],
  ['theme-bluebird','Blue bird','#8ca7c6','⌁',['blue','sky','soft']],
  ['theme-coffee','Coffee mug','#98715c','☕',['city','study','dark-academia','brown']],
  ['theme-film','Film reel','#655e64','◌',['film','city','friends','black']],
  ['theme-couch','Comfy couch','#b49278','▱',['friends','cozy','apartment']],
  ['theme-atom','Tiny atom','#7b8fa7','⚛',['science','young-genius','blue']],
  ['theme-chalk','Chalk formula','#cfc7b9','∑',['science','young-genius','study']],
  ['theme-silver-star','Silver star','#a9acb6','✦',['silver','wizard','night']],
] as const

const themeStickers = stickerDefs.map(([id,name,color,motif,tags]) => sticker(
  id,
  name,
  `<path d="M16 22Q60 8 104 22L109 95Q60 112 11 95Z" fill="#fffaf1" stroke="#6b625d" stroke-width="2"/><circle cx="60" cy="59" r="31" fill="${color}" opacity=".9"/><text x="60" y="72" text-anchor="middle" font-family="Georgia,serif" font-size="34" fill="#fff8ef">${motif}</text>`,
  [...tags],
))

const washiDefs = [
  ['theme-washi-silver','Silver lines','#c1c3c9','#5d6068','✦',['silver','wizard','night']],
  ['theme-washi-gold','Golden stars','#d9bd6c','#695832','✧',['gold','wizard','celestial']],
  ['theme-washi-dark','Library black','#5b5557','#e5d9c7','✦',['dark-academia','black','books']],
  ['theme-washi-ocean','Ocean blue','#93b4c7','#f7f1df','≈',['ocean','blue','summer']],
  ['theme-washi-summer','Summer checks','#f0c4b0','#8d6358','☀',['summer','coastal','pink']],
  ['theme-washi-space','Space night','#4e5e82','#f1d67a','✦',['space','night','blue']],
  ['theme-washi-city','City grid','#6e7785','#f0dfbf','▥',['city','night','travel']],
  ['theme-washi-cricket','Cricket green','#8fb18d','#f9f1dc','•',['cricket','green','sport']],
  ['theme-washi-football','Football navy','#526d94','#f6eee0','⬡',['football','blue','sport']],
  ['theme-washi-fairy','Fairy lilac','#cdbce1','#fff9e8','❧',['fairycore','purple','pastel']],
  ['theme-washi-pink','Pink ribbons','#eab7c6','#8c6470','♡',['pink','ribbon','romantic']],
  ['theme-washi-purple','Purple moons','#b8a3cf','#fff2c9','☾',['purple','celestial','night']],
  ['theme-washi-books','Bookish brown','#bea184','#fff1d5','⌁',['reading','books','brown']],
  ['theme-washi-science','Notebook blue','#9caec4','#f8f1dc','∑',['science','study','young-genius']],
] as const
const themeWashis = washiDefs.map(([id,name,bg,ink,motif,tags]) => washi(id,name,bg,ink,motif,[...tags]))

const paperDefs = [
  ['theme-paper-library','Library scrap','#e7d8bb','#715f50','EX LIBRIS',['dark-academia','books','brown']],
  ['theme-paper-silver','Silver note','#e6e6e8','#62646b','NIGHT NOTES',['silver','wizard','night']],
  ['theme-paper-gold','Golden memo','#f3e7c8','#81693e','GOOD LUCK',['gold','wizard','warm']],
  ['theme-paper-coastal','Coastal letter','#edf3ef','#6d8790','SUMMER, SOMEWHERE',['coastal','summer','ocean']],
  ['theme-paper-space','Star log','#e9edf6','#596985','FIELD LOG',['space','celestial','blue']],
  ['theme-paper-city','City receipt','#eee9df','#65666c','AFTER DARK',['city','night','travel']],
  ['theme-paper-pink','Pink note','#f8e6eb','#9b6f7a','LITTLE THINGS',['pink','romantic','soft']],
  ['theme-paper-purple','Lavender note','#eee9f5','#7e6e91','DAYDREAMS',['purple','fairycore','soft']],
  ['theme-paper-sport','Match notes','#eef2e7','#667a61','MATCH DAY',['cricket','football','sport']],
  ['theme-paper-reader','Reading log','#f0e6d7','#745f4f','BOOK NOTES',['reading','books','literary']],
] as const
const themePapers = paperDefs.map(([id,name,fill,ink,motif,tags]) => paper(id,name,fill,ink,motif,[...tags]))

const ephemeraDefs = [
  ['theme-eph-school-letter','Old school letter','#eadfc9','#6d5a4d','BOARDING SCHOOL','TERM LETTER · ROOM 17',['wizard','school','dark-academia']],
  ['theme-eph-silver-pass','Silver house pass','#dedfe4','#62646d','NIGHT PASS','SILVER WING · 22:13',['silver','wizard','night']],
  ['theme-eph-gold-card','Golden match card','#f0e1b8','#806b39','MATCH CARD','SEAT 07 · GOOD WEATHER',['gold','sport','wizard']],
  ['theme-eph-study-card','Library study card','#e6dac5','#6b5b4f','REFERENCE ROOM','RETURN BEFORE MIDNIGHT',['books','study','dark-academia']],
  ['theme-eph-secret-page','Secret diary scrap','#e8dfd5','#5f5962','PRIVATE NOTES','FOUND BETWEEN PAGES 42–43',['mystery','wizard','dark-academia']],
  ['theme-eph-boardwalk','Boardwalk ticket','#f5dfd1','#8c6c61','BOARDWALK','ONE SUMMER EVENING',['summer','coastal','travel']],
  ['theme-eph-beach-postcard','Beach postcard','#e2edef','#617e8a','POSTCARD','SALT AIR · 6:40 PM',['ocean','coastal','summer']],
  ['theme-eph-apartment','Apartment takeaway','#efe4d4','#775f53','TAKEAWAY','TABLE FOR TOO MANY FRIENDS',['friends','city','cozy']],
  ['theme-eph-science-club','Science club card','#e6ecf2','#65778d','SCIENCE CLUB','ASK WEIRD QUESTIONS',['science','young-genius','study']],
  ['theme-eph-bookshop','Bookshop receipt','#eee4d5','#6e5f53','BOOKSHOP','ONE MORE BOOK WAS NECESSARY',['reading','books','city']],
  ['theme-eph-train','Train ticket','#e6e1d3','#5f665c','TRAIN TICKET','WINDOW SEAT · SOMEWHERE ELSE',['travel','city','vintage']],
  ['theme-eph-stargaze','Stargazing pass','#dfe5f2','#586b8a','OBSERVATORY','CLEAR SKY · NO RUSH',['space','celestial','night']],
  ['theme-eph-aquarium','Aquarium stub','#e1eef0','#5f7d84','AQUARIUM','BLUE ROOM · 14:20',['ocean','blue','city']],
  ['theme-eph-cricket','Cricket score stub','#e5ecdf','#64755f','CRICKET','OVER 18 · KEEP THIS',['cricket','sport','match']],
  ['theme-eph-football','Football terrace stub','#e1e7ef','#5d6f88','FOOTBALL','NIGHT MATCH · GATE C',['football','sport','match']],
  ['theme-eph-fairy','Pressed fairy note','#ece5f2','#796e8a','WOODLAND NOTE','FOUND UNDER FERNS',['fairycore','forest','purple']],
  ['theme-eph-pink','Pink cinema stub','#f4dce5','#8c6677','CINEMA','SEAT PINK · 7:15',['pink','film','city']],
  ['theme-eph-purple','Purple museum card','#e8e1ef','#746481','MUSEUM','ROOM 04 · STAY LONGER',['purple','city','art']],
  ['theme-eph-city','Metro card','#e7e9eb','#5f6873','CITY METRO','LAST TRAIN · 23:41',['city','travel','night']],
  ['theme-eph-cafe','Cafe receipt','#eee2d3','#715c4f','CAFÉ','COFFEE + SOMETHING SWEET',['coffee','city','books']],
] as const
const themeEphemera = ephemeraDefs.map(([id,name,fill,ink,heading,footer,tags]) => ephemera(id,name,fill,ink,heading,footer,[...tags]))

const stampDefs = [
  ['theme-stamp-read','Currently reading','CURRENTLY READING','#806753',['reading','books']],
  ['theme-stamp-travel','Somewhere else','SOMEWHERE ELSE','#667b78',['travel','city']],
  ['theme-stamp-space','Look up','LOOK UP','#64789b',['space','celestial']],
  ['theme-stamp-ocean','Salt air','SALT AIR','#648993',['ocean','coastal']],
  ['theme-stamp-city','After dark','AFTER DARK','#656a79',['city','night']],
  ['theme-stamp-cricket','Match day','MATCH DAY','#6d8768',['cricket','sport']],
  ['theme-stamp-football','Full time','FULL TIME','#60769a',['football','sport']],
  ['theme-stamp-fairy','Found in the woods','FOUND IN THE WOODS','#8a7397',['fairycore','forest']],
  ['theme-stamp-pink','Very pink','VERY PINK','#ad7289',['pink','color']],
  ['theme-stamp-purple','Purple hour','PURPLE HOUR','#7c6b92',['purple','color']],
  ['theme-stamp-wizard','After midnight','AFTER MIDNIGHT','#5f5b68',['wizard','night']],
  ['theme-stamp-science','Question everything','QUESTION EVERYTHING','#687f96',['science','young-genius']],
] as const
const themeStamps = stampDefs.map(([id,name,text,color,tags]) => stamp(id,name,text,color,[...tags]))

const waxDefs = [
  ['wax-rose','Rose wax','#a95f6f','✿',['pink','romantic','botanical']],
  ['wax-lavender','Lavender wax','#8a73a4','❦',['purple','lavender','fairycore']],
  ['wax-midnight','Midnight wax','#4f5364','☾',['night','wizard','dark-academia']],
  ['wax-forest','Forest wax','#668069','❧',['green','forest','fairycore']],
  ['wax-gold','Golden wax','#b68d45','✦',['gold','wizard','warm']],
  ['wax-silver','Silver wax','#8e9098','✦',['silver','wizard','night']],
  ['wax-ocean','Ocean wax','#5f8996','≈',['ocean','blue','coastal']],
  ['wax-sky','Sky wax','#7f9dbd','☁',['blue','sky','soft']],
  ['wax-cherry','Cherry wax','#a95764','♡',['red','pink','romantic']],
  ['wax-coffee','Coffee wax','#7a5948','☕',['brown','coffee','dark-academia']],
  ['wax-ink','Ink wax','#3f4147','✒',['black','writing','dark-academia']],
  ['wax-sage','Sage wax','#7c9275','❀',['sage','botanical','soft']],
  ['wax-cricket','Match green wax','#68866a','●',['cricket','green','sport']],
  ['wax-football','Stadium blue wax','#536f9a','⬡',['football','blue','sport']],
  ['wax-space','Cosmic wax','#606e98','✧',['space','celestial','night']],
  ['wax-summer','Peach wax','#d39278','☀',['summer','coastal','warm']],
  ['wax-book','Bookish wax','#8a6d57','⌁',['reading','books','brown']],
  ['wax-city','City wax','#626873','▥',['city','night','travel']],
  ['wax-pearl','Pearl wax','#c5bdb4','♡',['neutral','soft','romantic']],
  ['wax-plum','Plum wax','#79566f','✤',['purple','dark','romantic']],
] as const
const themeWax = waxDefs.map(([id,name,color,motif,tags]) => waxSeal(id,name,color,motif,[...tags]))

export const themeAssets: JournalAsset[] = [
  ...themeStickers,
  ...themeWashis,
  ...themePapers,
  ...themeEphemera,
  ...themeStamps,
  ...themeWax,
]
