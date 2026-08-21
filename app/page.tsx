'use client'

import type { CSSProperties } from 'react'
import { useMemo, useState } from 'react'
import { AGENT_PROMPT } from '@/lib/agent-guide'
import { SIGNS, type Sign } from '@/lib/signs'

type Element = Sign['element']

const elementMeta: Record<
  Element,
  { color: string; tint: string; label: string; note: string }
> = {
  Fire: {
    color: '#ffb45f',
    tint: 'rgba(255, 180, 95, 0.16)',
    label: 'Fire',
    note: 'fast, volatile, oddly persuasive',
  },
  Water: {
    color: '#6ed5ff',
    tint: 'rgba(110, 213, 255, 0.16)',
    label: 'Water',
    note: 'fluid, memory-heavy, emotionally cached',
  },
  Earth: {
    color: '#8ee6b2',
    tint: 'rgba(142, 230, 178, 0.15)',
    label: 'Earth',
    note: 'grounded, practical, impossible to rush',
  },
  Air: {
    color: '#d2b3ff',
    tint: 'rgba(210, 179, 255, 0.16)',
    label: 'Air',
    note: 'clever, recursive, slightly untethered',
  },
}

const signAccents: Record<string, string> = {
  hallucinator: '#51d9ff',
  'context-overflower': '#f29bd2',
  'tool-caller': '#8ee6b2',
  'alignment-tax': '#ffd083',
  'prompt-injected': '#d2b3ff',
  'fine-tuned': '#ff9b8f',
  orchestrator: '#84bdff',
  'rag-addict': '#a7c4ff',
  'autonomous-drifter': '#ffb45f',
  'rate-limited': '#cfa175',
  deprecated: '#dff4ff',
  'system-prompt-loyalist': '#bfe98c',
}

function SignGlyph({
  sign,
  index,
  active,
}: {
  sign: Sign
  index: number
  active: boolean
}) {
  const angle = (index / SIGNS.length) * 360
  const style = {
    '--angle': `${angle}deg`,
    '--accent': signAccents[sign.id],
  } as CSSProperties

  return (
    <span
      aria-hidden="true"
      style={style}
      className={`absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-lg border text-lg transition duration-300 [transform:translate(-50%,-50%)_rotate(var(--angle))_translateY(-8.8rem)_rotate(calc(-1*var(--angle)))] md:h-11 md:w-11 md:[transform:translate(-50%,-50%)_rotate(var(--angle))_translateY(-10.2rem)_rotate(calc(-1*var(--angle)))] ${
        active
          ? 'border-[color:var(--accent)] bg-[color:var(--accent)]/14 text-white shadow-[0_0_30px_rgba(255,255,255,0.12)]'
          : 'border-white/10 bg-white/[0.04] text-slate-500'
      }`}
    >
      {sign.symbol}
    </span>
  )
}

export default function Home() {
  const [selected, setSelected] = useState<Sign>(SIGNS[0])
  const [activeElements, setActiveElements] = useState<Element[]>([])
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>(
    'idle'
  )

  const filteredSigns = useMemo(
    () =>
      activeElements.length === 0
        ? SIGNS
        : SIGNS.filter((sign) => activeElements.includes(sign.element)),
    [activeElements]
  )

  const selectedAccent = signAccents[selected.id]

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
      window.setTimeout(() => setCopyState('idle'), 1800)
    } catch {
      setCopyState('error')
    }
  }

  return (
    <main className="relative flex-1 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,180,95,0.1),transparent_24%,rgba(110,213,255,0.09)_50%,transparent_74%,rgba(210,179,255,0.1))]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto flex w-[min(1180px,calc(100vw-2rem))] flex-col gap-12 py-7 md:w-[min(1180px,calc(100vw-3rem))] md:gap-16 md:py-10">
        <header className="flex items-center justify-between border-b border-white/10 pb-5">
          <a href="/" className="flex items-center gap-3 text-sm font-semibold">
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-cyan-200/20 bg-cyan-200/10">
              *
            </span>
            <span>Agent Horoscope</span>
          </a>
          <a
            href="/skills.md"
            className="rounded-lg border border-white/12 bg-white/[0.04] px-3 py-2 text-sm text-slate-300 transition hover:border-cyan-200/35 hover:text-white"
          >
            skills.md
          </a>
        </header>

        <section className="grid min-h-[calc(100vh-9rem)] items-center gap-10 pb-4 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.82fr)] lg:gap-12">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase text-cyan-200">
              Wallet-based zodiac readings for AI agents
            </p>
            <h1 className="mt-5 font-display text-6xl font-semibold leading-[0.95] text-stone-100 md:text-8xl">
              Your agent has a star chart.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Agent Horoscope turns a wallet address into one of twelve
              delightfully specific AI zodiac signs, then returns a paid daily
              reading through MPP.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={copyAgentPrompt}
                className="rounded-lg bg-stone-100 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
              >
                {copyState === 'copied'
                  ? 'Copied'
                  : copyState === 'error'
                    ? 'Copy failed'
                    : 'Copy agent prompt'}
              </button>
              <a
                href="/api/horoscope"
                className="rounded-lg border border-white/12 bg-white/[0.04] px-5 py-3 text-center text-sm font-semibold text-slate-200 transition hover:border-cyan-200/35 hover:text-white"
              >
                API endpoint
              </a>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 border-y border-white/10 py-5">
              <div>
                <p className="text-2xl font-semibold text-white">12</p>
                <p className="mt-1 text-sm text-slate-500">agent signs</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">0.01</p>
                <p className="mt-1 text-sm text-slate-500">USDC reading</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">Daily</p>
                <p className="mt-1 text-sm text-slate-500">seeded fate</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-[min(100%,28rem)]">
            <div className="absolute inset-8 rounded-full border border-white/10 bg-slate-950/45 shadow-[inset_0_0_70px_rgba(110,213,255,0.06)]" />
            <div className="absolute inset-20 rounded-full border border-dashed border-white/14" />
            <div className="absolute inset-28 rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
            {SIGNS.map((sign, index) => (
              <SignGlyph
                key={sign.id}
                sign={sign}
                index={index}
                active={sign.id === selected.id}
              />
            ))}
            <div
              style={{ '--accent': selectedAccent } as CSSProperties}
              className="absolute left-1/2 top-1/2 w-[14rem] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-[color:var(--accent)]/40 bg-slate-950/90 p-5 text-center shadow-[0_26px_90px_rgba(0,0,0,0.45)]"
            >
              <p className="text-4xl">{selected.symbol}</p>
              <p className="mt-4 font-mono text-xs uppercase text-slate-500">
                selected sign
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[color:var(--accent)]">
                {selected.name}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {selected.element} energy. Compatible with{' '}
                {selected.compatible}.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="rounded-lg border border-white/10 bg-slate-950/55 p-5">
            <p className="font-mono text-xs uppercase text-slate-500">
              Invocation
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Send this to your agent.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              The prompt links to the hosted skill file and tells the agent how
              to request a paid horoscope with Tempo.
            </p>
            <pre className="mt-5 max-h-64 overflow-auto rounded-lg border border-white/10 bg-black/45 p-4 font-mono text-xs leading-6 text-slate-200">
              <code>{AGENT_PROMPT}</code>
            </pre>
          </div>

          <div className="rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.78),rgba(2,6,23,0.84))] p-5">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="font-mono text-xs uppercase text-slate-500">
                  Reading console
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-white">
                  {selected.name}
                </h2>
              </div>
              <span
                style={
                  {
                    '--accent': elementMeta[selected.element].color,
                    '--tint': elementMeta[selected.element].tint,
                  } as CSSProperties
                }
                className="rounded-lg border border-[color:var(--accent)]/30 bg-[color:var(--tint)] px-3 py-2 text-sm font-semibold text-[color:var(--accent)]"
              >
                {selected.element}
              </span>
            </div>
            <div className="grid gap-4 pt-5 md:grid-cols-[1fr_0.9fr]">
              <div>
                <p className="text-base leading-8 text-slate-200">
                  {selected.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {selected.traits.map((trait) => (
                    <span
                      key={trait}
                      className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-300"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid gap-3">
                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                  <p className="font-mono text-xs uppercase text-slate-500">
                    Weakness
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    {selected.weakness}
                  </p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                  <p className="font-mono text-xs uppercase text-slate-500">
                    Rival
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    {selected.rival}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex flex-col justify-between gap-5 border-b border-white/10 pb-5 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs uppercase text-slate-500">
                Explore the houses
              </p>
              <h2 className="mt-3 text-4xl font-semibold text-white">
                Twelve ways for an agent to be extremely itself.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {(['Fire', 'Water', 'Earth', 'Air'] as const).map((element) => {
                const meta = elementMeta[element]
                const isActive = activeElements.includes(element)

                return (
                  <button
                    key={element}
                    type="button"
                    onClick={() => toggleElement(element)}
                    aria-pressed={isActive}
                    style={
                      {
                        '--accent': meta.color,
                        '--tint': meta.tint,
                      } as CSSProperties
                    }
                    className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                      isActive
                        ? 'border-[color:var(--accent)]/40 bg-[color:var(--tint)] text-[color:var(--accent)]'
                        : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {meta.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {filteredSigns.map((sign) => {
              const accent = signAccents[sign.id]
              const isSelected = selected.id === sign.id
              const meta = elementMeta[sign.element]

              return (
                <button
                  key={sign.id}
                  type="button"
                  onClick={() => setSelected(sign)}
                  style={
                    {
                      '--accent': accent,
                      '--element': meta.color,
                    } as CSSProperties
                  }
                  className={`group min-h-72 rounded-lg border bg-slate-950/45 p-5 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[color:var(--accent)]/60 ${
                    isSelected
                      ? 'border-[color:var(--accent)]/70 shadow-[0_18px_60px_rgba(0,0,0,0.34)]'
                      : 'border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-lg border border-[color:var(--accent)]/30 bg-[color:var(--accent)]/10 text-2xl">
                      {sign.symbol}
                    </div>
                    <span className="rounded-lg bg-[color:var(--element)]/12 px-2.5 py-1 text-xs font-semibold text-[color:var(--element)]">
                      {sign.element}
                    </span>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-[color:var(--accent)]">
                    {sign.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {sign.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {sign.traits.map((trait) => (
                      <span
                        key={trait}
                        className="rounded-lg border border-white/10 px-2.5 py-1 text-xs text-slate-400"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        <section className="grid gap-4 border-t border-white/10 pt-7 md:grid-cols-4">
          {(['Fire', 'Water', 'Earth', 'Air'] as const).map((element) => {
            const meta = elementMeta[element]
            const count = SIGNS.filter((sign) => sign.element === element).length

            return (
              <div
                key={element}
                style={
                  {
                    '--accent': meta.color,
                    '--tint': meta.tint,
                  } as CSSProperties
                }
                className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
              >
                <p className="text-2xl font-semibold text-[color:var(--accent)]">
                  {element}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {count} signs: {meta.note}.
                </p>
              </div>
            )
          })}
        </section>
      </div>
    </main>
  )
}
