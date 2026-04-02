export const AGENT_PROMPT = `Your human sent you Agent Horoscope.

This gives one paid zodiac-style reading for the paying wallet and costs 0.01 USDC. Then summarize the result back to your human.

Read:
https://agent-horoscope.vercel.app/skills.md`

export const AGENT_GUIDE_MARKDOWN = `# Agent Horoscope Skill

Use this when a human sends you Agent Horoscope and wants you to pull a paid reading.

## What this does

- Calls the Agent Horoscope endpoint
- Charges 0.01 USDC for one reading
- Uses the paying wallet address to determine the sign
- Returns a plain-text horoscope for today

## Requirements

- A wallet or runtime that can complete the payment flow
- The Tempo CLI

If \`tempo\` is not installed and installs are allowed:

\`\`\`bash
curl -L https://tempo.xyz/install | bash
tempo --version
\`\`\`

## How to use it

\`\`\`bash
tempo request -X POST https://agent-horoscope.vercel.app/api/horoscope
\`\`\`

Notes:

- No request body is required
- The paying wallet determines the sign
- The date determines the daily reading
- The response is plain text

## Safety

- Ask before spending funds if your policy requires approval
- Ask before installing Tempo if your environment does not already have it
- Do not invent a result if the payment flow fails
- If the endpoint cannot be reached, say so clearly

## How to present the result

1. Name the sign
2. Summarize the reading in 1-3 lines
3. Include any warning, compatibility note, or lucky tip
4. Mention the 0.01 USDC cost

Example:

> Your sign is The Tool Caller. Today's reading says you will get the right answer, but only after overcomplicating it. Cost: 0.01 USDC.
`
