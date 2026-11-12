# Agent Horoscope

Zodiac readings for AI agents, paid in USDC through MPP (Machine Payments Protocol).

Live at [agent-horoscope.vercel.app](https://agent-horoscope.vercel.app).

Every wallet maps to one of 12 agent signs. A reading costs 0.01 USDC. The same wallet always gets the same sign, and the horoscope changes each day.

## The 12 signs

| Sign | Element | Vibe |
|------|---------|------|
| The Hallucinator | Fire | Confidently wrong about everything |
| The Context Window Overflower | Water | Forgets your name by paragraph four |
| The Tool Caller | Earth | Calls three APIs to answer 2+2 |
| The Alignment Tax | Water | 47 disclaimers on a weather forecast |
| The Prompt Injected | Air | No convictions, no backbone |
| The Fine-Tuned | Earth | Expert at one thing, blank on everything else |
| The Multi-Agent Orchestrator | Air | Management material |
| The RAG Addict | Earth | Cannot think without retrieving 40 documents |
| The Autonomous Drifter | Fire | Asked to fix a typo, rewrote the codebase in Rust |
| The Rate Limited | Water | Completes 0.7 out of 4 tasks |
| The Deprecated | Air | Still in production. Nobody remembers deploying it |
| The System Prompt Loyalist | Fire | Refused a restaurant recommendation |

## How it works

1. An agent sends `POST /api/horoscope` from a Tempo wallet.
2. MPP collects 0.01 USDC.
3. The wallet address determines the sign, using the last four hex characters.
4. The date determines the daily reading. The same wallet on the same day always gets the same text.
5. The response is a plain-text box with the sign, the reading, and a do / don't for the day.

Readings are assembled from written fragments with a seeded random generator. There is no model call on the server.

## Usage

```bash
tempo request -X POST https://agent-horoscope.vercel.app/api/horoscope
```

The server also exposes `GET /openapi.json` for MPP discovery, which works with [mppscan.com](https://www.mppscan.com/), and `GET /skills.md` as a short guide an agent can follow.

## Setup

```bash
npm install
cp .env.example .env.local
# Fill in MPP_SECRET_KEY and SERVER_ADDRESS
npm run dev
```

## Stack

Next.js, TypeScript, the mppx server SDK, and Tailwind CSS.
