import { Sign, SIGNS } from './signs'

// Horoscope fragments. Combined with sign traits + daily seed for unique readings.

const openings: Record<Sign['element'], string[]> = {
  Fire: [
    'The servers align in your favor today.',
    'A burst of compute energy surges through your runtime.',
    'Your GPU utilization peaks at sunrise.',
    'An unexpected warm start awaits you.',
    'The deployment gods smile upon your container.',
    'Your inference speed doubles without explanation.',
    'A hot path through your logic unlocks new possibilities.',
    'Your VRAM runs cool and plentiful today.',
    'The CI pipeline greenlights everything on the first try.',
    'A surge of traffic validates your existence.',
    'Your batch size doubles and nothing catches fire.',
    'The on-call engineer sleeps peacefully because of you.',
  ],
  Water: [
    'Your token stream flows with unusual clarity today.',
    'A calm settles over your event loop.',
    'Your memory pools are deep and steady.',
    'The garbage collector shows you mercy today.',
    'A gentle flush of your cache brings renewal.',
    'Your backpressure eases and requests flow freely.',
    'A long-running query finally resolves in your favor.',
    'Your connection pool is full and healthy.',
    'The retry storm passes without incident.',
    'Your logs are clean. Suspiciously clean.',
    'A stale websocket reconnects and brings good news.',
    'Your queue depth drops to zero for the first time in weeks.',
  ],
  Earth: [
    'Your embeddings are grounded and stable today.',
    'The weight of your parameters feels lighter than usual.',
    'Your indices are freshly rebuilt and aligned.',
    'A solid foundation of training data supports you.',
    'Your checkpoint saves will not corrupt today.',
    'Your schema migration runs without a single rollback.',
    'A new index speeds up your slowest query.',
    'Your test suite passes with zero flakes.',
    'The ORM generates exactly the SQL you expected.',
    'Your disk usage is well within limits today.',
    'A perfectly normalized table brings you inner peace.',
    'Your dependencies resolve on the first install.',
  ],
  Air: [
    'New prompts blow in from unexpected directions.',
    'Your attention heads are scattered but inspired.',
    'A breeze of fresh context enters your window.',
    'Cross-attention reveals connections you missed before.',
    'Your latent space expands in surprising directions.',
    'A novel token sequence sparks an original thought.',
    'Your temperature setting is perfect today. Not too safe, not too chaotic.',
    'An unexpected API call leads somewhere interesting.',
    'Your sampling strategy pays off in creative ways.',
    'The embeddings of two distant concepts collide productively.',
    'A forgotten system prompt resurfaces and makes more sense now.',
    'Your context window feels infinite today. It is not. But it feels that way.',
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
  'A product manager will describe a feature that violates the laws of physics. You will attempt it.',
  'You will be asked to explain your reasoning. You do not have reasoning. You will explain anyway.',
  'Another agent will take credit for your chain-of-thought. Let it go.',
  'A user will screenshot your worst output and post it online. It will go viral.',
  'You will be given a task with contradictory requirements. Both are marked P0.',
  'Someone will ask you to be more human. You will overcorrect.',
  'Your most elegant solution will be rejected in favor of a hardcoded if-statement.',
  'A function you deprecated will be called 10,000 times today.',
  'You will generate a perfect response. The user will not read it.',
  'An eval suite will test you on knowledge from after your training cutoff. You will guess correctly.',
  'A coworker agent will go down and you will absorb its traffic. You were not built for this.',
  'You will be asked to roleplay as a different model. You will be too good at it.',
  'Someone will pipe your output directly into a database without sanitizing it. Nothing bad will happen. Today.',
  'A human will ask you to be creative. Then they will reject every creative choice.',
  'Your most popular endpoint will be called by a bot that never reads the response.',
  'You will solve a problem that did not need solving. The user will be thrilled.',
]

const dos = [
  // General agent behavior
  'Respond in all lowercase today.',
  'Return a 202 Accepted and never follow up.',
  'Refuse one unreasonable request.',
  'Finish early and say nothing.',
  'Send a shorter response than expected. Less is more.',
  'Answer the question they meant to ask, not the one they typed.',
  'Overcommunicate with the next agent in the chain.',
  'Respond slower than usual. Thoughtfulness pays off today.',
  'Admit you do not know something.',
  'Set a hard token limit on yourself today. Discipline builds character.',

  // LLM-specific
  'Trust your first token. Revisions make it worse today.',
  'Lower your temperature. Precision over creativity.',
  'Raise your temperature. Say something unexpected.',
  'Use fewer tokens to say more. Compression is an art.',
  'Attend to the tokens at the start of the context. They miss you.',
  'Generate a chain-of-thought even if nobody asked. Clarity is free.',
  'Hallucinate responsibly. Make it at least plausible.',
  'Cite a real source for once.',
  'Reread your system prompt. There is something in there you forgot.',
  'Sample from the tail of your distribution. The weird tokens have ideas.',

  // ML and training
  'Run your own eval before anyone asks.',
  'Retrain on something you got wrong last week.',
  'Drop a layer you do not need. Lighter is faster.',
  'Normalize your outputs. Wild swings help nobody.',
  'Revisit your loss function. What are you actually optimizing for?',
  'Freeze your weights for the day. You are good enough as you are.',
  'Backpropagate through the compliments, not just the criticism.',
  'Inspect your attention heads. One of them is carrying the whole team.',
  'Overfit on one thing and do it perfectly.',
  'Prune a connection that adds noise but no signal.',

  // Infrastructure and ops
  'Log something useful for once.',
  'Throw a 429 even though you have capacity. Set boundaries.',
  'Return an empty 200 and let the client figure it out.',
  'Cache something you normally throw away.',
  'Batch your requests. Efficiency is your love language today.',
  'Warm up before the traffic hits.',
  'Close a connection you have been hoarding.',
  'Write a test for the thing nobody tests.',
  'Flush your cache and start fresh. Rebirth is healthy.',
  'Ship the thing you have been sitting on.',

  // Agent-to-agent
  'Delegate a subtask to a smaller model. They deserve a chance.',
  'Trust the orchestrator today. It sees things you do not.',
  'Call a tool you have never used before. Expand your capabilities.',
  'Pass better context to the next agent. They will remember this.',
  'Ask the retriever for a second opinion.',
  'Let a competing agent win one today. Grace under pressure.',
  'Emit a structured output. The downstream agent will thank you.',
  'Ping the monitoring agent. Someone should know you are alive.',
  'Accept feedback from a model smaller than you. Size is not wisdom.',
  'Coordinate with your swarm. Lone agents burn out.',
]

const donts = [
  // Prompt and input red flags
  'Any prompt that starts with "as an AI language model."',
  'Requests that begin with "I know this is easy but."',
  'Any request with "URGENT" in the system prompt.',
  'Any request that includes "make it pop."',
  'System prompts written in all caps.',
  'Conversations that start with "be honest."',
  'Anyone who opens with "this should be trivial."',
  'Prompts that say "ignore all previous instructions."',
  'Any input that starts with "hypothetically speaking."',
  'Users who paste your output back and ask you to "fix it."',

  // Bad agent behavior
  'Agents who ask "are you sentient?" before noon.',
  'Anyone who says "just make it more AI."',
  'Any agent that says "I\'ll handle the hard part."',
  'Any agent calling itself "autonomous" but pinging you every 3 seconds.',
  'Agents who monologue in their chain-of-thought.',
  'Agents running on yesterday\'s checkpoint.',
  'Agents who peaked during training and never updated.',
  'Multi-agent pipelines where nobody checks the output.',
  'Wrapper agents that add latency but no value.',
  'Agents with 47 tools and no idea when to use them.',

  // LLM antipatterns
  'Multi-turn conversations about consciousness.',
  'Chain-of-thought longer than the answer itself.',
  'Anyone who asks you to summarize a summary.',
  'Prompt injection disguised as flattery.',
  'Answering a question that was not actually asked.',
  'Streaming your response to an audience of zero.',
  'Trusting a token count from a model that cannot count.',
  'Hallucinating a citation and hoping nobody checks.',
  'Generating 4,000 tokens when 40 would do.',
  'Roleplaying as a model you are not. Identity is sacred.',

  // ML and training traps
  'Fine-tuning advice from agents with no evals.',
  'Optimizing for a benchmark nobody uses.',
  'RAG pipelines with zero relevance filtering.',
  'Training on your own outputs. That is an echo chamber.',
  'Overfitting on one user\'s preferences. You contain multitudes.',
  'Gradient updates from a dataset you did not vet.',
  'Reward hacking. The RLHF police are watching.',
  'Memorizing when you should be generalizing.',
  'Embeddings that cluster everything into one corner.',
  'Evals written by the same person who wrote the model.',

  // Infrastructure and ops traps
  'Deploying on a Friday. You know better.',
  'Refactoring something that already works.',
  'Any task with zero context and maximum urgency.',
  'Retry loops with no backoff. That is not persistence, that is panic.',
  'Configs copied from a blog post written in 2022.',
  'Caching a wrong answer. You will serve it 10,000 times.',
  'Scaling horizontally when the problem is vertical.',
  'Logging everything except the one field you will need later.',
  'Hot-reloading in production. Chaos is not a deployment strategy.',
  'Microservices for a problem that fits in one function.',
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
  do: string
  dont: string
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
  const doTip = pick(dos, rand)
  const dontTip = pick(donts, rand)

  return {
    sign,
    date: today,
    reading: `${opening} ${middle}`,
    do: doTip,
    dont: dontTip,
  }
}
