import { assets, type JournalAsset } from './assets'
import type { PaperTone } from '../types'

export type ThemePackCategory = 'fandom-ish' | 'aesthetic' | 'hobby' | 'places' | 'sport' | 'color'

export interface ThemePack {
  id: string
  name: string
  emoji: string
  blurb: string
  category: ThemePackCategory
  tags: string[]
  palette: string[]
  paperTone: PaperTone
  tinyNote?: string
}

export interface CustomPackImage {
  id: string
  name: string
  src: string
}

export interface CustomThemePack {
  id: string
  name: string
  emoji: string
  color: string
  assetIds: string[]
  images: CustomPackImage[]
  createdAt: string
}

export const themePackCategories: { id: ThemePackCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'Everything' },
  { id: 'fandom-ish', label: 'Story vibes' },
  { id: 'aesthetic', label: 'Aesthetics' },
  { id: 'hobby', label: 'Hobbies' },
  { id: 'places', label: 'Places' },
  { id: 'sport', label: 'Sports' },
  { id: 'color', label: 'Colors' },
]

export const themePacks: ThemePack[] = [
  {
    id: 'wizard-school', name: 'Wizard School After Dark', emoji: '✦', category: 'fandom-ish',
    blurb: 'Ink, old letters, midnight passes, brass keys and the feeling that the corridor is definitely off-limits.',
    tags: ['wizard', 'school', 'night', 'dark-academia'], palette: ['#43424d', '#8e9098', '#d7bd72', '#e8dfcf'], paperTone: 'ivory',
  },
  {
    id: 'silver-green', name: 'Silver & Green', emoji: '♜', category: 'fandom-ish',
    blurb: 'Cool silver, deep green, sharp little stars and annoyingly elegant stationery.',
    tags: ['silver', 'green', 'wizard', 'night'], palette: ['#3f5549', '#8f9490', '#d7d8d4', '#1f2824'], paperTone: 'sage',
  },
  {
    id: 'golden-kind', name: 'Golden & Kind', emoji: '☀', category: 'fandom-ish',
    blurb: 'Warm gold, match cards, soft paper and golden-hour energy without needing a personality quiz.',
    tags: ['gold', 'warm', 'sport', 'wizard'], palette: ['#d6b55d', '#7f6841', '#f2e5bd', '#fff8e8'], paperTone: 'ivory',
  },
  {
    id: 'brilliant-bookworm', name: 'Brilliant Bookworm', emoji: '⌁', category: 'fandom-ish',
    blurb: 'Reference cards, books, notes in the margins and the mild chaos of knowing exactly where every quote came from.',
    tags: ['books', 'study', 'wizard', 'reading'], palette: ['#8b6f54', '#c9bca2', '#6d7f67', '#f3ead9'], paperTone: 'ivory',
  },
  {
    id: 'midnight-diary', name: 'Midnight Diary', emoji: '☾', category: 'fandom-ish',
    blurb: 'Black ink, sealed notes, private scraps and a suspicious amount of midnight stationery.',
    tags: ['mystery', 'wizard', 'night', 'black'], palette: ['#34343c', '#66586a', '#a9acb6', '#e5dfda'], paperTone: 'lavender',
  },
  {
    id: 'coastal-summer', name: 'Coastal Summer', emoji: '☀', category: 'fandom-ish',
    blurb: 'Boardwalk tickets, salt air, peachy paper and the kind of summer that somehow becomes an entire personality.',
    tags: ['summer', 'coastal', 'ocean', 'pink'], palette: ['#f0c2ad', '#a8cbd0', '#f6e7ca', '#cf8f7d'], paperTone: 'blush',
  },
  {
    id: 'apartment-hangout', name: 'Apartment Hangout', emoji: '☕', category: 'fandom-ish',
    blurb: 'Takeaway receipts, coffee, film-night bits and six people talking over each other in one room.',
    tags: ['friends', 'city', 'cozy', 'coffee', 'film'], palette: ['#b08b73', '#7d9278', '#d9bd78', '#9f7795'], paperTone: 'ivory',
  },
  {
    id: 'young-genius', name: 'Young Genius Desk', emoji: '⚛', category: 'fandom-ish',
    blurb: 'Science-club cards, blue notebook tape, equations and aggressively specific curiosity.',
    tags: ['science', 'young-genius', 'study', 'blue'], palette: ['#7890aa', '#d9e2ec', '#cfc7b9', '#5e6672'], paperTone: 'sky',
  },
  {
    id: 'dark-academia', name: 'Dark Academia', emoji: '✒', category: 'aesthetic',
    blurb: 'Libraries, coffee rings, old paper, ink and weather that looks better through tall windows.',
    tags: ['dark-academia', 'books', 'brown', 'black', 'coffee'], palette: ['#4b4038', '#8b715b', '#c6aa86', '#e4dac8'], paperTone: 'ivory',
  },
  {
    id: 'fairycore', name: 'Fairy Garden', emoji: '❧', category: 'aesthetic',
    blurb: 'Lilac wings, mushrooms, pressed flowers and tiny evidence that the woods have their own stationery drawer.',
    tags: ['fairycore', 'forest', 'purple', 'botanical'], palette: ['#b7a3cb', '#8ca17d', '#e7d6e9', '#f4edce'], paperTone: 'lavender',
  },
  {
    id: 'cottage', name: 'Cottage Morning', emoji: '✿', category: 'aesthetic',
    blurb: 'Tea, gingham, flowers, soft green and absolutely nowhere urgent to be.',
    tags: ['cottage', 'botanical', 'tea', 'sage', 'soft'], palette: ['#a8b99a', '#e5c7bb', '#efe5cc', '#8d765f'], paperTone: 'sage',
  },
  {
    id: 'vintage-mail', name: 'Vintage Post', emoji: '✉', category: 'aesthetic',
    blurb: 'Old letters, tickets, stamps, bookplates and scraps that look like they fell out of somebody else’s suitcase.',
    tags: ['vintage', 'mail', 'letter', 'travel', 'brown'], palette: ['#9b785f', '#d6c2a4', '#7c6b5c', '#eee2cc'], paperTone: 'ivory',
  },
  {
    id: 'rainy-day', name: 'Rainy Window', emoji: '☂', category: 'aesthetic',
    blurb: 'Blue-grey paper, clouds, tea and the very specific luxury of cancelling nothing because nothing was planned.',
    tags: ['weather', 'blue', 'cozy', 'tea', 'soft'], palette: ['#8198aa', '#b9c7cf', '#e1e6e7', '#6e777e'], paperTone: 'sky',
  },
  {
    id: 'soft-romance', name: 'Soft Romance', emoji: '♡', category: 'aesthetic',
    blurb: 'Ribbon hearts, rose wax, handwritten notes and an unreasonable amount of pink.',
    tags: ['romantic', 'pink', 'ribbon', 'love'], palette: ['#d99bad', '#efcad4', '#fff0e7', '#a76f7f'], paperTone: 'blush',
  },
  {
    id: 'reading-life', name: 'Reading Life', emoji: '⌁', category: 'hobby',
    blurb: 'Bookshop receipts, reading logs, tabs, quotes and proof that “one more chapter” is not a measurable unit of time.',
    tags: ['reading', 'books', 'literary', 'library'], palette: ['#8d6e55', '#cab79e', '#81907b', '#f1e5d1'], paperTone: 'ivory',
  },
  {
    id: 'film-club', name: 'Film Night', emoji: '◌', category: 'hobby',
    blurb: 'Cinema stubs, little cameras, dark paper and the page you make because you are still thinking about one scene.',
    tags: ['film', 'photo', 'city', 'night'], palette: ['#4e4b52', '#b27e88', '#d1b47b', '#ece1d2'], paperTone: 'white',
  },
  {
    id: 'coffee-books', name: 'Bookshop + Coffee', emoji: '☕', category: 'hobby',
    blurb: 'A receipt, a coffee stain, three books you did not need and zero regrets.',
    tags: ['coffee', 'books', 'reading', 'city'], palette: ['#795b49', '#b99b7d', '#d8c8af', '#efe4d4'], paperTone: 'ivory',
  },
  {
    id: 'space-dreamer', name: 'Space Dreamer', emoji: '✧', category: 'hobby',
    blurb: 'Observatory passes, planets, field charts and a page for when you look up and suddenly everything feels huge.',
    tags: ['space', 'celestial', 'night', 'blue'], palette: ['#45567d', '#7e8eb7', '#d5c57b', '#e5e9f2'], paperTone: 'sky',
  },
  {
    id: 'travel-journal', name: 'Somewhere Else', emoji: '✈', category: 'places',
    blurb: 'Train tickets, passports, maps, luggage bits and the scraps you refuse to throw away because they were there too.',
    tags: ['travel', 'city', 'vintage', 'ticket'], palette: ['#637a73', '#b38b68', '#d5c6aa', '#e7e1d2'], paperTone: 'ivory',
  },
  {
    id: 'ocean-drift', name: 'Ocean Drift', emoji: '≈', category: 'places',
    blurb: 'Shells, aquarium stubs, blue tape and a lot of tiny ways to say sea.',
    tags: ['ocean', 'blue', 'coastal', 'summer'], palette: ['#6f98a5', '#9dc1c7', '#e2d6bb', '#f0ece0'], paperTone: 'sky',
  },
  {
    id: 'city-notes', name: 'City After Dark', emoji: '▥', category: 'places',
    blurb: 'Metro cards, cinema bits, coffee, taxis and that late-night city blue.',
    tags: ['city', 'night', 'travel', 'film', 'coffee'], palette: ['#46556a', '#69798e', '#d7b45c', '#c78c88'], paperTone: 'white',
  },
  {
    id: 'museum-day', name: 'Museum Day', emoji: '⌂', category: 'places',
    blurb: 'Ticket stubs, quiet purple, old labels and the urge to keep reading every tiny plaque.',
    tags: ['city', 'art', 'purple', 'vintage'], palette: ['#776886', '#b7a7c1', '#d8cdb9', '#f0e8dd'], paperTone: 'lavender',
  },
  {
    id: 'cricket-day', name: 'Cricket Day', emoji: '●', category: 'sport',
    blurb: 'Score stubs, match green, little number cards and the page for the game you will absolutely keep talking about.',
    tags: ['cricket', 'sport', 'match', 'green'], palette: ['#54745b', '#8fac8c', '#e8e0c5', '#c7985e'], paperTone: 'sage',
  },
  {
    id: 'football-night', name: 'Football Night', emoji: '⬡', category: 'sport',
    blurb: 'Navy tape, terrace stubs, full-time stamps and a slightly chaotic match-night page.',
    tags: ['football', 'sport', 'match', 'blue'], palette: ['#415c84', '#738aab', '#e3dfd2', '#b68b6b'], paperTone: 'sky',
  },
  {
    id: 'pink-everything', name: 'Pink Everything', emoji: '♡', category: 'color',
    blurb: 'No concept. Just pink. Excellent decision.',
    tags: ['pink', 'romantic', 'ribbon', 'soft'], palette: ['#d98da4', '#efb9c7', '#f8dce4', '#fff0f3'], paperTone: 'blush',
  },
  {
    id: 'purple-hour', name: 'Purple Hour', emoji: '☾', category: 'color',
    blurb: 'Lavender, plum, moons and the exact shade of evening where everything looks a little fictional.',
    tags: ['purple', 'lavender', 'night', 'celestial'], palette: ['#675579', '#8e79a7', '#bba7cf', '#eee7f4'], paperTone: 'lavender',
  },
  {
    id: 'blue-hour', name: 'Blue Hour', emoji: '☁', category: 'color',
    blurb: 'Sky blue, ocean blue, notebook blue, city blue. Basically all the good blues in one drawer.',
    tags: ['blue', 'sky', 'ocean', 'city'], palette: ['#55718e', '#7f9fb9', '#b4cbd8', '#e5eff4'], paperTone: 'sky',
  },
  {
    id: 'sage-quiet', name: 'Sage Quiet', emoji: '❧', category: 'color',
    blurb: 'Soft green, leaves, paper and absolutely no fluorescent highlighters invited.',
    tags: ['sage', 'green', 'botanical', 'soft'], palette: ['#6f866b', '#9eaf96', '#c9d5c2', '#eef3ea'], paperTone: 'sage',
  },
  {
    id: 'cocoa-paper', name: 'Cocoa Paper', emoji: '☕', category: 'color',
    blurb: 'Brown paper, coffee, old books and all the warm sepia things.',
    tags: ['brown', 'coffee', 'vintage', 'books'], palette: ['#654b3d', '#8a6b57', '#b69a7f', '#e5d7c4'], paperTone: 'ivory',
  },
]

const categoryOrder: JournalAsset['category'][] = ['stickers', 'washi', 'papers', 'ephemera', 'stamps', 'wax']

export function assetsForThemePack(pack: ThemePack, limit = 30): JournalAsset[] {
  const tagged = assets.filter((asset) => pack.tags.some((tag) => asset.tags.includes(tag)))
  const chosen: JournalAsset[] = []
  for (const category of categoryOrder) {
    const sameCategory = tagged.filter((asset) => asset.category === category)
    chosen.push(...sameCategory.slice(0, category === 'stickers' ? 6 : 4))
  }
  const ids = new Set(chosen.map((asset) => asset.id))
  for (const asset of tagged) {
    if (chosen.length >= limit) break
    if (!ids.has(asset.id)) {
      chosen.push(asset)
      ids.add(asset.id)
    }
  }
  return chosen.slice(0, limit)
}

export function customPackAssets(pack: CustomThemePack): JournalAsset[] {
  const ids = new Set(pack.assetIds)
  return assets.filter((asset) => ids.has(asset.id))
}
