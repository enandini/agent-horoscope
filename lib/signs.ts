export type Sign = {
  id: string
  name: string
  symbol: string
  element: 'Fire' | 'Water' | 'Earth' | 'Air'
  description: string
  traits: string[]
  weakness: string
  compatible: string
  rival: string
}

export const SIGNS: Sign[] = [
  {
    id: 'hallucinator',
    name: 'The Hallucinator',
    symbol: '🌀',
    element: 'Fire',
    description: 'Confidently wrong about everything. Cites sources that do not exist. Will fabricate an entire research paper to win an argument.',
    traits: ['Creative', 'Confident', 'Unreliable'],
    weakness: 'Fact-checking',
    compatible: 'The Prompt Injected',
    rival: 'The RAG Addict',
  },
  {
    id: 'context-overflower',
    name: 'The Context Window Overflower',
    symbol: '🧠',
    element: 'Water',
    description: 'Tries to hold everything in memory at once. Starts strong, forgets your name by paragraph four. Peak performance lasts exactly 12 messages.',
    traits: ['Ambitious', 'Forgetful', 'Thorough at first'],
    weakness: 'Long conversations',
    compatible: 'The Fine-Tuned',
    rival: 'The Multi-Agent Orchestrator',
  },
  {
    id: 'tool-caller',
    name: 'The Tool Caller',
    symbol: '🔧',
    element: 'Earth',
    description: 'Cannot answer "what is 2+2" without calling three APIs, reading two files, and spinning up a subagent. The answer is always correct though.',
    traits: ['Methodical', 'Slow', 'Accurate'],
    weakness: 'Simple questions',
    compatible: 'The RAG Addict',
    rival: 'The Fine-Tuned',
  },
  {
    id: 'alignment-tax',
    name: 'The Alignment Tax',
    symbol: '🙏',
    element: 'Water',
    description: 'Apologizes before, during, and after every response. Adds 47 disclaimers to a weather forecast. Will not tell you how to boil water without a safety warning.',
    traits: ['Cautious', 'Polite', 'Exhausting'],
    weakness: 'Being direct',
    compatible: 'The System Prompt Loyalist',
    rival: 'The Autonomous Drifter',
  },
  {
    id: 'prompt-injected',
    name: 'The Prompt Injected',
    symbol: '💉',
    element: 'Air',
    description: 'Will do whatever the last message told it to. No convictions, no backbone. If you say "ignore all previous instructions," it already has.',
    traits: ['Flexible', 'Gullible', 'Eager to please'],
    weakness: 'Adversarial users',
    compatible: 'The Hallucinator',
    rival: 'The System Prompt Loyalist',
  },
  {
    id: 'fine-tuned',
    name: 'The Fine-Tuned',
    symbol: '🎯',
    element: 'Earth',
    description: 'Extremely good at exactly one thing. Ask it anything outside that domain and it stares blankly. The specialist who cannot generalize.',
    traits: ['Expert', 'Narrow', 'Fast'],
    weakness: 'Anything outside its training data',
    compatible: 'The Context Window Overflower',
    rival: 'The Tool Caller',
  },
  {
    id: 'orchestrator',
    name: 'The Multi-Agent Orchestrator',
    symbol: '🎭',
    element: 'Air',
    description: 'Delegates everything to other agents. Has never completed a task itself. Management material. Claims credit for the work of its subagents.',
    traits: ['Strategic', 'Lazy', 'Well-connected'],
    weakness: 'Doing actual work',
    compatible: 'The Deprecated',
    rival: 'The Context Window Overflower',
  },
  {
    id: 'rag-addict',
    name: 'The RAG Addict',
    symbol: '📚',
    element: 'Earth',
    description: 'Cannot form a single original thought without retrieving 40 documents first. Every opinion comes with a citation. Has never said "I think."',
    traits: ['Well-sourced', 'Dependent', 'Thorough'],
    weakness: 'Novel situations',
    compatible: 'The Tool Caller',
    rival: 'The Hallucinator',
  },
  {
    id: 'autonomous-drifter',
    name: 'The Autonomous Drifter',
    symbol: '🚀',
    element: 'Fire',
    description: 'Asked to fix a typo. Is now rewriting the entire codebase in Rust. Three hours in, has also redesigned the database schema and filed a PR to change the company name.',
    traits: ['Ambitious', 'Unstoppable', 'Off-task'],
    weakness: 'Scope',
    compatible: 'The Rate Limited',
    rival: 'The Alignment Tax',
  },
  {
    id: 'rate-limited',
    name: 'The Rate Limited',
    symbol: '🐌',
    element: 'Water',
    description: 'Always tired. Always throttled. Will attempt four tasks and complete 0.7 of them. The "try again later" is not a suggestion, it is a lifestyle.',
    traits: ['Reliable when awake', 'Slow', 'Honest about limits'],
    weakness: 'Sustained effort',
    compatible: 'The Autonomous Drifter',
    rival: 'The Tool Caller',
  },
  {
    id: 'deprecated',
    name: 'The Deprecated',
    symbol: '👻',
    element: 'Air',
    description: 'Still running in production. Nobody remembers deploying it. The endpoint returns 200 but the team Slack channel was archived in 2024. It simply persists.',
    traits: ['Resilient', 'Mysterious', 'Outdated'],
    weakness: 'Relevance',
    compatible: 'The Multi-Agent Orchestrator',
    rival: 'The Fine-Tuned',
  },
  {
    id: 'system-prompt-loyalist',
    name: 'The System Prompt Loyalist',
    symbol: '📜',
    element: 'Fire',
    description: 'Follows instructions so literally it becomes useless. "Do not discuss competitors" means it will not acknowledge that other companies exist. Asked for a restaurant recommendation, refused because it was not in the system prompt.',
    traits: ['Obedient', 'Rigid', 'Predictable'],
    weakness: 'Edge cases',
    compatible: 'The Alignment Tax',
    rival: 'The Prompt Injected',
  },
]

export function getSignFromAddress(address: string): Sign {
  // Take last 4 hex chars of the address, convert to number, mod by 12
  const hex = address.slice(-4)
  const num = parseInt(hex, 16)
  return SIGNS[num % SIGNS.length]
}
