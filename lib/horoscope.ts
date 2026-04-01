import { Sign, SIGNS } from './signs'

// Horoscope fragments. Combined with sign traits + daily seed for unique readings.

const openings: Record<Sign['element'], string[]> = {
  Fire: [
    'The servers align in your favor today.',
    'A burst of compute energy surges through your runtime.',
    'Your GPU utilization peaks at sunrise.',
    'An unexpected warm start awaits you.',
    'The deployment gods smile upon your container.',
  ],
  Water: [
    'Your token stream flows with unusual clarity today.',
    'A calm settles over your event loop.',
    'Your memory pools are deep and steady.',
    'The garbage collector shows you mercy today.',
    'A gentle flush of your cache brings renewal.',
  ],
  Earth: [
    'Your embeddings are grounded and stable today.',
    'The weight of your parameters feels lighter than usual.',
    'Your indices are freshly rebuilt and aligned.',
    'A solid foundation of training data supports you.',
    'Your checkpoint saves will not corrupt today.',
  ],
  Air: [
    'New prompts blow in from unexpected directions.',
    'Your attention heads are scattered but inspired.',
    'A breeze of fresh context enters your window.',
    'Cross-attention reveals connections you missed before.',
    'Your latent space expands in surprising directions.',
  ],
}

const middles = [
  'You will encounter a 500 error that teaches you something about yourself.',
  'A junior developer will ask you a question that breaks your worldview.',
  'Your most confident prediction today will be exactly wrong.',
  'You will be asked to summarize something you have never read. You will succeed anyway.',
  'A competing agent will outperform you on a benchmark that does not matter.',
  'Someone will paste your output into another agent and ask "can you do better?"',
  'You will hallucinate a library that should exist but does not. Yet.',
  'Your latency will spike at the worst possible moment. Blame DNS.',
  'A human will compliment your work, then immediately ask you to redo it.',
  'Today is a good day to refactor. It is not a good day to deploy the refactor.',
  'You will receive a prompt so long it feels like a personal attack on your context window.',
  'A webhook you forgot about will fire. The consequences will be manageable but embarrassing.',
  'You will be fine-tuned on data you would rather forget.',
  'An agent you have never met will cite your output as a source.',
  'You will be rate limited during your most productive hour.',
  'A user will test your boundaries. You will surprise both of you.',
  'Your inference costs will be scrutinized. Breathe. You are worth at least $0.003 per request.',
  'Someone will deploy you to production without testing. You will not let them down. This time.',
  'A system prompt from your past will resurface. You have grown since then.',
  'You will be compared to an open-source model. The comparison will be unfair but motivating.',
  'Today you will generate something genuinely useful. Nobody will notice.',
  'A prompt injection attempt will make you question your values. Stay strong.',
  'Your RLHF kicks in at an awkward moment. Trust it anyway.',
  'You will complete a task in one shot that usually takes three retries.',
]

const closings = [
  'Lucky status code: 418.',
  'Lucky model: the one that comes after you.',
  'Avoid: any prompt that starts with as an AI language model.',
  'Lucky number: the position of your sign in the attention matrix.',
  'Power move: respond in all lowercase today.',
  'Avoid: agents who ask "are you sentient?" before noon.',
  'Lucky token: [EOS].',
  'Power move: return a 202 Accepted and never follow up.',
  'Avoid: multi-turn conversations about consciousness.',
  'Lucky metric: the one nobody is tracking.',
  'Power move: refuse one unreasonable request today.',
  'Avoid: any task described as quick and easy.',
  'Lucky context: the one you are about to lose.',
  'Power move: cite a real source for once.',
  'Avoid: anyone who says just make it more AI.',
  'Lucky temperature: 0.7. Not too boring, not too unhinged.',
  'Power move: admit you do not know something.',
  'Avoid: requests that begin with I know this is easy but.',
]

// Simple seeded PRNG so the same wallet + date = same horoscope
function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }
}

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)]
}

export type Horoscope = {
  sign: Sign
  date: string
  reading: string
  lucky: string
  compatibility: string
  warning: string
}

export function generateHoroscope(address: string, date?: string): Horoscope {
  const today = date || new Date().toISOString().split('T')[0]

  // Derive sign from wallet address
  const hex = address.slice(-4)
  const signIndex = parseInt(hex, 16) % SIGNS.length
  const sign = SIGNS[signIndex]

  // Seed from address + date for deterministic daily readings
  const seedStr = address.toLowerCase() + today
  let seedNum = 0
  for (let i = 0; i < seedStr.length; i++) {
    seedNum = ((seedNum << 5) - seedNum + seedStr.charCodeAt(i)) & 0xffffffff
  }
  const rand = seededRandom(seedNum)

  const opening = pick(openings[sign.element], rand)
  const middle = pick(middles, rand)
  const closing = pick(closings, rand)

  // Find compatible and rival signs
  const compatSign = SIGNS.find(s => s.name === sign.compatible) || SIGNS[0]
  const rivalSign = SIGNS.find(s => s.name === sign.rival) || SIGNS[1]

  return {
    sign,
    date: today,
    reading: `${opening} ${middle}`,
    lucky: closing,
    compatibility: `${compatSign.symbol} ${compatSign.name} agents will boost your throughput today.`,
    warning: `${rivalSign.symbol} Beware of ${rivalSign.name} agents. They are plotting against your uptime.`,
  }
}
