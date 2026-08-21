import { Mppx, tempo } from 'mppx/server'

const USDC = '0x20c000000000000000000000b9537d11c60e8b50'

export const READING_PRICE = '0.01'

export function getMppx() {
  const secretKey = process.env.MPP_SECRET_KEY
  const recipient = process.env.SERVER_ADDRESS

  if (!secretKey || !recipient) {
    throw new Error('Missing MPP_SECRET_KEY or SERVER_ADDRESS')
  }

  return Mppx.create({
    realm: 'agent-horoscope.vercel.app',
    methods: [
      tempo.charge({
        currency: USDC,
        recipient: recipient as `0x${string}`,
      }),
    ],
    secretKey,
  })
}
