'use client'

import type { CSSProperties } from 'react'
import { useState } from 'react'
import { AGENT_PROMPT } from '@/lib/agent-guide'
import { SIGNS, type Sign } from '@/lib/signs'

type Element = Sign['element']

const accentBySign: Record<string, { color: string; surface: string }> = {
  hallucinator: { color: '#42e6ff', surface: 'rgba(66, 230, 255, 0.16)' },
  'context-overflower': { color: '#ff8ecb', surface: 'rgba(255, 142, 203, 0.16)' },
  'tool-caller': { color: '#91f4de', surface: 'rgba(145, 244, 222, 0.14)' },
  'alignment-tax': { color: '#ffc97c', surface: 'rgba(255, 201, 124, 0.14)' },
  'prompt-injected': { color: '#caa4ff', surface: 'rgba(202, 164, 255, 0.16)' },
  'fine-tuned': { color: '#ff8f86', surface: 'rgba(255, 143, 134, 0.15)' },
  orchestrator: { color: '#77bfff', surface: 'rgba(119, 191, 255, 0.14)' },
  'rag-addict': { color: '#95b6ff', surface: 'rgba(149, 182, 255, 0.14)' },
  'autonomous-drifter': { color: '#ffb16c', surface: 'rgba(255, 177, 108, 0.14)' },
  'rate-limited': { color: '#d3a06e', surface: 'rgba(211, 160, 110, 0.14)' },
  deprecated: { color: '#dbf1ff', surface: 'rgba(219, 241, 255, 0.12)' },
  'system-prompt-loyalist': { color: '#b8e786', surface: 'rgba(184, 231, 134, 0.13)' },
}

const elementStyles = {
  Fire: {
    border: 'border-orange-400/20',
    text: 'text-orange-200',
    tile: 'bg-orange-500/[0.08] text-orange-200',
  },
  Water: {
    border: 'border-sky-400/20',
    text: 'text-sky-200',
    tile: 'bg-sky-500/[0.08] text-sky-200',
  },
  Earth: {
    border: 'border-emerald-400/20',
    text: 'text-emerald-200',
    tile: 'bg-emerald-500/[0.08] text-emerald-200',
  },
  Air: {
    border: 'border-violet-400/20',
    text: 'text-violet-200',
    tile: 'bg-violet-500/[0.08] text-violet-200',
  },
} as const

const commands = [
  { label: 'mppx', cmd: 'mppx -X POST https://agent-horoscope.vercel.app/api/horoscope' },
  { label: 'tempo', cmd: 'tempo request -X POST https://agent-horoscope.vercel.app/api/horoscope' },
  { label: 'agentcash', cmd: 'agentcash request -X POST https://agent-horoscope.vercel.app/api/horoscope' },
] as const

export default function Home() {
  const [selected, setSelected] = useState<Sign | null>(null)
  const [activeElements, setActiveElements] = useState<Element[]>([])
  const [activeCmd, setActiveCmd] = useState(0)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>(
    'idle'
  )

  const toggleElement = (element: Element) => {
    setActiveElements((current) =>
      current.includes(element)
        ? current.filter((entry) => entry !== element)
        : [...current, element]
    )
  }

  const copyAgentPrompt = async () => {
    try {
      await navigator.clipboard.writeText(AGENT_PROMPT)
      setCopyState('copied')
    } catch {
      setCopyState('error')
    }
  }

  return (
    <main className="relative flex-1 overflow-hidden">
      <div className="absolute inset-x-0 top-[-16rem] h-[32rem] bg-[radial-gradient(circle,rgba(92,118,255,0.24),transparent_54%)] blur-3xl" />
      <div className="absolute right-[-10rem] top-32 h-[24rem] w-[24rem] rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative mx-auto flex w-[min(1180px,calc(100vw-2rem))] flex-col gap-14 px-1 py-8 md:w-[min(1180px,calc(100vw-3rem))] md:gap-20 md:py-14">
        <section className="pt-6 md:pt-8">
          <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] lg:gap-12">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-[1.15rem] bg-[linear-gradient(140deg,#855cff,#35e8ff)] text-2xl shadow-[0_18px_50px_rgba(65,112,255,0.32)]">
                🔮
              </div>
              <p className="mt-7 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-cyan-300/80">
                Wallet-based zodiac readings
              </p>
              <h1 className="mt-3 max-w-xl text-[clamp(3.2rem,8vw,5.4rem)] font-semibold leading-[0.92] tracking-[-0.07em] text-stone-100">
                Agent Horoscope
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-300 md:text-lg">
                Every agent has a sign hiding in its wallet address. Pay 0.01
                USDC, pull a reading, and get something that feels more like a
                cosmic personality profile than a generic horoscope.
              </p>
            </div>

            <div className="w-full overflow-hidden rounded-[1.5rem] border border-cyan-400/20 bg-[linear-gradient(180deg,rgba(16,24,47,0.9),rgba(8,13,25,0.96))] shadow-[0_30px_90px_rgba(0,0,0,0.34)]">
              <div className="flex items-center gap-4 border-b border-cyan-400/10 bg-slate-950/30 px-5 py-4">
                <div className="flex gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ef6a5d]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#f0ba43]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#48c77a]" />
                </div>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-slate-500">
                  terminal_reading
                </p>
              </div>
              <div className="space-y-4 px-5 py-5 md:px-6 md:py-6">
                <p className="text-base font-semibold text-cyan-300">
                  Get your reading
                </p>
                <div className="flex gap-2 mb-2">
                  {commands.map((c, i) => (
                    <button
                      key={c.label}
                      type="button"
                      onClick={() => setActiveCmd(i)}
                      className={`rounded-lg px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] transition ${
                        activeCmd === i
                          ? 'bg-cyan-400/15 text-cyan-300'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
                <pre className="overflow-x-auto rounded-2xl bg-slate-950/85 px-4 py-4 font-mono text-sm leading-7 text-slate-100">
                  <code>{commands[activeCmd].cmd}</code>
                </pre>
                <p className="text-sm leading-7 text-slate-300">
                  Same wallet, same sign, forever. The date changes the daily
                  reading, so the archetype sticks while the forecast moves.
                </p>
                <div className="rounded-2xl border border-cyan-400/12 bg-slate-950/45 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-mono text-[0.64rem] uppercase tracking-[0.24em] text-slate-500">
                        For agents
                      </p>
                      <p className="mt-2 text-sm leading-7 text-slate-300">
                        Copy a ready-to-send instruction block for another
                        agent, or open the hosted markdown guide.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={copyAgentPrompt}
                        className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:border-cyan-300/40 hover:bg-cyan-400/14"
                      >
                        {copyState === 'copied'
                          ? 'Copied prompt'
                          : copyState === 'error'
                            ? 'Copy failed'
                            : 'Copy agent prompt'}
                      </button>
                      <a
                        href="/agents.md"
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white"
                      >
                        Open agents.md
                      </a>
                    </div>
                  </div>
                  <pre className="mt-4 overflow-x-auto rounded-2xl bg-slate-950/85 px-4 py-4 font-mono text-xs leading-6 text-slate-200">
                    <code>{AGENT_PROMPT}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-mono text-[0.8rem] uppercase tracking-[0.34em] text-slate-400">
            12 Signs
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {SIGNS.map((sign) => {
              const accent = accentBySign[sign.id]
              const isSelected = selected?.id === sign.id
              const isElementMatch =
                activeElements.length === 0 ||
                activeElements.includes(sign.element)
              const cardStyle = {
                '--sign-accent': accent.color,
                '--sign-surface': accent.surface,
              } as CSSProperties

              return (
                <button
                  key={sign.id}
                  type="button"
                  onClick={() =>
                    setSelected((current) =>
                      current?.id === sign.id ? null : sign
                    )
                  }
                  style={cardStyle}
                  className={`group relative overflow-hidden rounded-[1.45rem] border bg-[linear-gradient(180deg,rgba(12,16,28,0.9),rgba(8,11,20,0.98))] p-5 text-left shadow-[0_18px_50px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-1 hover:border-[color:var(--sign-accent)] hover:shadow-[0_22px_70px_rgba(0,0,0,0.32)] ${
                    isSelected
                      ? 'border-[color:var(--sign-accent)]'
                      : 'border-slate-800/90'
                  } ${
                    isElementMatch
                      ? 'opacity-100 saturate-100'
                      : 'opacity-40 saturate-50'
                  }`}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(140deg,var(--sign-surface),transparent_40%)] opacity-80" />
                  <div className="relative flex items-center gap-3">
                    <span className="text-2xl">{sign.symbol}</span>
                    <div className="min-w-0">
                      <h3 className="text-xl font-semibold text-[color:var(--sign-accent)]">
                        {sign.name}
                      </h3>
                      <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-slate-500">
                        {sign.element} sign
                      </p>
                    </div>
                  </div>
                  <p className="relative mt-4 text-sm leading-7 text-slate-300">
                    {sign.description}
                  </p>
                  <div className="relative mt-5 flex flex-wrap gap-2">
                    {sign.traits.map((trait) => (
                      <span
                        key={trait}
                        className="rounded-full border border-white/8 bg-white/6 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-slate-400"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>

                  <div
                    className={`relative grid transition-[grid-template-rows,opacity,margin] duration-300 ${
                      isSelected
                        ? 'mt-5 grid-rows-[1fr] opacity-100'
                        : 'mt-0 grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="grid gap-3 border-t border-white/8 pt-5 sm:grid-cols-2">
                        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                          <p className="font-mono text-[0.64rem] uppercase tracking-[0.22em] text-slate-500">
                            Weakness
                          </p>
                          <p className="mt-3 text-sm leading-7 text-slate-200">
                            {sign.weakness}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                          <p className="font-mono text-[0.64rem] uppercase tracking-[0.22em] text-slate-500">
                            Cosmic drama
                          </p>
                          <p className="mt-3 text-sm leading-7 text-slate-200">
                            Loves {sign.compatible}. Feuds with {sign.rival}.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {(['Fire', 'Water', 'Earth', 'Air'] as const).map((element) => {
            const count = SIGNS.filter((sign) => sign.element === element).length
            const styles = elementStyles[element]
            const isActive = activeElements.includes(element)

            return (
              <button
                key={element}
                type="button"
                onClick={() => toggleElement(element)}
                aria-pressed={isActive}
                className={`rounded-[1.35rem] border px-5 py-6 text-left transition duration-200 ${
                  isActive
                    ? `${styles.border} ${styles.tile} shadow-[0_18px_50px_rgba(0,0,0,0.2)]`
                    : 'border-slate-800/90 bg-white/[0.02] text-slate-300 hover:border-slate-700'
                }`}
              >
                <p className="text-xl font-semibold">{element}</p>
                <p className="mt-2 text-sm text-current/70">{count} signs</p>
              </button>
            )
          })}
        </section>

        <footer className="border-t border-slate-800/80 pt-8 pb-4 text-center">
          <p className="text-sm text-slate-500">
            Wallet-based zodiac readings for AI agents.
          </p>
        </footer>
      </div>
    </main>
  )
}
