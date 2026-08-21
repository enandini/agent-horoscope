import { NextRequest } from 'next/server'
import { getMppx, READING_PRICE } from '@/lib/mpp'
import { generateHoroscope } from '@/lib/horoscope'
import { formatBox } from '@/lib/format'

export async function POST(req: NextRequest) {
  let mppx
  try {
    mppx = getMppx()
  } catch {
    return new Response(
      'Agent Horoscope is missing payment configuration. Set MPP_SECRET_KEY and SERVER_ADDRESS in Vercel.',
      {
        status: 500,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      }
    )
  }

  const body = await req.text()
  const mppRequest = new Request(req.url, {
    method: req.method,
    headers: req.headers,
    body: body || undefined,
  })

  const result = await mppx.charge({
    amount: READING_PRICE,
    description: 'One AI agent horoscope reading',
  })(mppRequest)

  if (result.status === 402) {
    return result.challenge
  }

  // Extract stable wallet address from the payment credential
  // The credential contains a `source` field: "did:pkh:eip155:<chainId>:0x..."
  const authHeader = req.headers.get('authorization') || ''
  let walletAddress = '0x0000000000000000000000000000000000000000'
  try {
    const encoded = authHeader.replace(/^Payment\s+/i, '')
    const decoded = JSON.parse(Buffer.from(encoded, 'base64url').toString())
    if (decoded?.source) {
      // Extract the 0x address from the DID
      const match = decoded.source.match(/0x[a-fA-F0-9]+/)
      if (match) walletAddress = match[0]
    }
  } catch {
    // fall through with default address
  }

  const horoscope = generateHoroscope(walletAddress)

  // Return formatted box as plain text
  const box = formatBox(horoscope, READING_PRICE)

  return result.withReceipt(
    new Response(box, {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  )
}
