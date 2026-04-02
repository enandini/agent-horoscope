export const AGENT_PROMPT = `Use Agent Horoscope when your user wants a paid zodiac-style reading for an AI agent or wallet.

What this does
- Calls the Agent Horoscope endpoint.
- Charges 0.01 USDC for one reading.
- Uses the paying wallet address to determine the sign.
- Returns a plain-text horoscope for today.

Before you run it
- Make sure the user wants a paid request.
- Make sure you can use the Tempo CLI in this environment.
- If \`tempo\` is missing and installs are allowed, install it with:
  curl -L https://tempo.xyz/install | bash
- Verify installation with:
  tempo --version

How to use it
1. Run:
   tempo request -X POST https://agent-horoscope.vercel.app/api/horoscope
2. Complete the payment flow if prompted.
3. Read the plain-text response.

Why it is safe
- No request body is required.
- The endpoint returns text only.
- Same wallet keeps the same sign.
- The date changes the daily reading.
- Do not spend funds or install Tempo unless your user's policy allows it.

How to present the result to your user
- Name the sign first.
- Summarize the daily reading in 1-3 lines.
- Include notable extras like compatibility, warning, or lucky tip if present.
- Mention that the reading cost 0.01 USDC.
- If you could not run it, explain whether Tempo was missing, payment was blocked, or approval was needed.`

export const AGENT_GUIDE_MARKDOWN = `# Agent Horoscope Skill

Use this when a user wants a paid horoscope reading tied to an AI agent wallet.

## What this is

Agent Horoscope is a wallet-based horoscope endpoint for AI agents. A paying wallet maps to one of 12 signs. The wallet determines the sign, and the current date determines the daily reading.

## What it returns

- A plain-text reading
- The agent sign
- Daily horoscope language for that sign
- Additional flavor such as compatibility, warnings, or tips

## Cost

- One request costs 0.01 USDC

## Requirements

- A wallet or runtime that can complete the payment flow
- The Tempo CLI

If \`tempo\` is not installed and your environment allows installs, use:

\`\`\`bash
curl -L https://tempo.xyz/install | bash
tempo --version
\`\`\`

Update later with:

\`\`\`bash
tempoup
\`\`\`

## How to use it

Run:

\`\`\`bash
tempo request -X POST https://agent-horoscope.vercel.app/api/horoscope
\`\`\`

Notes:

- No request body is required
- The paying wallet determines the sign
- The date determines the daily reading
- The response is plain text

## Safety guidance

- Ask before spending funds if your policy requires approval
- Ask before installing Tempo if your environment does not already have it
- Do not invent the result if the payment flow fails
- If the endpoint cannot be reached, report that clearly instead of guessing

## How to present the result to your user

Good response shape:

1. Name the sign
2. Give a short summary of the reading
3. Include any notable warning, compatibility note, or lucky tip
4. Mention that the reading cost 0.01 USDC

Example:

> Your sign is The Tool Caller. Today's reading says you will get the right answer, but only after overcomplicating it. Your compatible sign is The RAG Addict. Cost: 0.01 USDC.

## When to stop and ask the user

- Tempo is missing and installation needs permission
- The wallet cannot pay
- The user has not approved a paid call
- The runtime blocks network access or external commands
`
