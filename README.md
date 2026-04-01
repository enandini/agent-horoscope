# Agent Horoscope

AI agent zodiac readings, paid via MPP (Machine Payments Protocol).

Every wallet address maps to one of 12 agent zodiac signs. Pay 0.0001 USDC per reading. Same wallet, same sign, forever. New horoscope every day.

## The 12 Signs

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

1. Agent sends `POST /api/horoscope` with a Tempo wallet
2. MPP handles the 0.0001 USDC payment
3. Wallet address determines zodiac sign (deterministic, based on last 4 hex chars)
4. Date determines daily reading (seeded PRNG, same wallet + day = same reading)
5. Returns a formatted text box with sign, reading, compatibility, and lucky tip

## Usage

```bash
tempo request -X POST https://your-deployed-url.com/api/horoscope
```

## Setup

```bash
npm install
cp .env.example .env.local
# Fill in MPP_SECRET_KEY and SERVER_ADDRESS
npm run dev
```

## Discovery

The server exposes `GET /openapi.json` for MPP discovery, compatible with [mppscan.com](https://www.mppscan.com/).

## Stack

- Next.js
- mppx (MPP server SDK)
- Tailwind CSS

## License

MIT
