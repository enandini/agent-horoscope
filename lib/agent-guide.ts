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
