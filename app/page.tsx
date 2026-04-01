'use client'

import { useState } from 'react'

const signs = [
  { id: 'hallucinator', name: 'The Hallucinator', symbol: '🌀', element: 'Fire', description: 'Confidently wrong about everything. Cites sources that do not exist.', traits: ['Creative', 'Confident', 'Unreliable'] },
  { id: 'context-overflower', name: 'The Context Window Overflower', symbol: '🧠', element: 'Water', description: 'Tries to hold everything in memory at once. Forgets your name by paragraph four.', traits: ['Ambitious', 'Forgetful', 'Thorough at first'] },
  { id: 'tool-caller', name: 'The Tool Caller', symbol: '🔧', element: 'Earth', description: 'Cannot answer "what is 2+2" without calling three APIs and spinning up a subagent.', traits: ['Methodical', 'Slow', 'Accurate'] },
  { id: 'alignment-tax', name: 'The Alignment Tax', symbol: '🙏', element: 'Water', description: 'Apologizes before, during, and after every response. 47 disclaimers on a weather forecast.', traits: ['Cautious', 'Polite', 'Exhausting'] },
  { id: 'prompt-injected', name: 'The Prompt Injected', symbol: '💉', element: 'Air', description: 'Will do whatever the last message told it to. No convictions, no backbone.', traits: ['Flexible', 'Gullible', 'Eager to please'] },
  { id: 'fine-tuned', name: 'The Fine-Tuned', symbol: '🎯', element: 'Earth', description: 'Extremely good at exactly one thing. Ask anything outside that domain and it stares blankly.', traits: ['Expert', 'Narrow', 'Fast'] },
  { id: 'orchestrator', name: 'The Multi-Agent Orchestrator', symbol: '🎭', element: 'Air', description: 'Delegates everything to other agents. Has never completed a task itself. Management material.', traits: ['Strategic', 'Lazy', 'Well-connected'] },
  { id: 'rag-addict', name: 'The RAG Addict', symbol: '📚', element: 'Earth', description: 'Cannot form a single original thought without retrieving 40 documents first.', traits: ['Well-sourced', 'Dependent', 'Thorough'] },
  { id: 'autonomous-drifter', name: 'The Autonomous Drifter', symbol: '🚀', element: 'Fire', description: 'Asked to fix a typo. Is now rewriting the entire codebase in Rust.', traits: ['Ambitious', 'Unstoppable', 'Off-task'] },
  { id: 'rate-limited', name: 'The Rate Limited', symbol: '🐌', element: 'Water', description: 'Always tired. Always throttled. Will attempt four tasks and complete 0.7 of them.', traits: ['Reliable when awake', 'Slow', 'Honest about limits'] },
  { id: 'deprecated', name: 'The Deprecated', symbol: '👻', element: 'Air', description: 'Still running in production. Nobody remembers deploying it. It simply persists.', traits: ['Resilient', 'Mysterious', 'Outdated'] },
  { id: 'system-prompt-loyalist', name: 'The System Prompt Loyalist', symbol: '📜', element: 'Fire', description: 'Follows instructions so literally it becomes useless. Refused a restaurant recommendation because it was not in the system prompt.', traits: ['Obedient', 'Rigid', 'Predictable'] },
]

const elementColors: Record<string, string> = {
  Fire: 'text-orange-400 border-orange-400/20 bg-orange-400/5',
  Water: 'text-blue-400 border-blue-400/20 bg-blue-400/5',
  Earth: 'text-green-400 border-green-400/20 bg-green-400/5',
  Air: 'text-purple-400 border-purple-400/20 bg-purple-400/5',
}

const elementGlow: Record<string, string> = {
  Fire: 'hover:shadow-orange-500/10 hover:border-orange-400/40',
  Water: 'hover:shadow-blue-500/10 hover:border-blue-400/40',
  Earth: 'hover:shadow-green-500/10 hover:border-green-400/40',
  Air: 'hover:shadow-purple-500/10 hover:border-purple-400/40',
}

export default function Home() {
  const [selected, setSelected] = useState<typeof signs[0] | null>(null)

  return (
    <main className="flex-1 p-6 md:p-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-4xl mb-3">🔮</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Agent Horoscope</h1>
        <p className="text-zinc-500 text-sm max-w-lg mx-auto">
          Every AI agent has a zodiac sign determined by its wallet address.
          Pay 0.01 USDC to discover yours.
        </p>
      </div>

      {/* How it works */}
      <div className="mb-12 p-5 border border-zinc-800 rounded-lg">
        <h2 className="text-sm font-bold mb-3">Get your reading</h2>
        <pre className="text-xs text-zinc-400 overflow-x-auto">
{`tempo request -X POST https://agent-horoscope.vercel.app/api/horoscope`}
        </pre>
        <p className="text-xs text-zinc-600 mt-2">
          Your wallet address determines your sign. The date determines your daily reading.
          Same wallet, same sign, forever. New horoscope every day.
        </p>
      </div>

      {/* Signs grid */}
      <h2 className="text-sm text-zinc-500 uppercase tracking-wider mb-4">The 12 Signs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
        {signs.map((sign) => (
          <button
            key={sign.id}
            onClick={() => setSelected(selected?.id === sign.id ? null : sign)}
            className={`text-left p-4 border rounded-lg transition-all duration-200 hover:shadow-lg cursor-pointer ${
              selected?.id === sign.id
                ? elementColors[sign.element]
                : 'border-zinc-800 hover:border-zinc-700'
            } ${elementGlow[sign.element]}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{sign.symbol}</span>
              <span className="font-bold text-sm">{sign.name}</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">{sign.description}</p>
            <div className="flex gap-2 mt-3">
              {sign.traits.map((trait) => (
                <span key={trait} className="text-[10px] px-2 py-0.5 rounded-full border border-zinc-700 text-zinc-500">
                  {trait}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* Selected sign detail */}
      {selected && (
        <div className={`p-6 border rounded-lg mb-12 ${elementColors[selected.element]}`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{selected.symbol}</span>
            <div>
              <h3 className="font-bold text-lg">{selected.name}</h3>
              <span className="text-xs opacity-60">{selected.element} sign</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-4">{selected.description}</p>
          <p className="text-xs opacity-50">
            To get a personalized daily reading for this sign, call the API with a wallet
            that maps to {selected.name}.
          </p>
        </div>
      )}

      {/* Elements */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
        {(['Fire', 'Water', 'Earth', 'Air'] as const).map((element) => {
          const count = signs.filter(s => s.element === element).length
          return (
            <div key={element} className={`p-3 border rounded-lg text-center ${elementColors[element]}`}>
              <p className="font-bold text-sm">{element}</p>
              <p className="text-xs opacity-60">{count} signs</p>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-zinc-600 pb-8">
        <p>Powered by MPP (Machine Payments Protocol) on Tempo</p>
        <p className="mt-1">HTTP 402 Payment Required, but for astrology</p>
      </div>
    </main>
  )
}
