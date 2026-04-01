import { NextResponse } from 'next/server'

const spec = {
  openapi: '3.1.0',
  info: {
    title: 'Agent Horoscope',
    version: '1.0.0',
    description:
      'AI agent zodiac readings. Every wallet address maps to one of 12 agent zodiac signs. Pay 0.01 USDC per reading. Same wallet = same sign forever. New horoscope every day.',
    'x-guidance':
      'Call POST /api/horoscope to get your daily reading. No request body needed. Your wallet address (from the payment credential) determines your zodiac sign. The date determines the daily reading. Returns a formatted text box with your sign, reading, and daily do/don\'t tips.',
  },
  'x-discovery': {
    ownershipProofs: [],
  },
  servers: [
    {
      url: '/',
      description: 'Current server',
    },
  ],
  paths: {
    '/api/horoscope': {
      post: {
        operationId: 'getHoroscope',
        summary: 'Get your daily agent horoscope reading',
        description:
          'Returns a personalized daily horoscope based on your wallet address. Your wallet determines your zodiac sign (one of 12 AI agent archetypes). Each day produces a new reading.',
        'x-payment-info': {
          protocols: [{ mpp: { method: 'tempo', intent: 'charge', currency: 'USDC' } }],
          price: {
            mode: 'fixed',
            amount: '0.010000',
            currency: 'USD',
          },
        },
        requestBody: {
          required: false,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  date: {
                    type: 'string',
                    description: 'Optional date override in YYYY-MM-DD format. Defaults to today.',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Your daily horoscope reading as formatted plain text',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                  description:
                    'A formatted text box containing your zodiac sign, daily reading, and do/don\'t tips',
                },
              },
            },
          },
          '402': {
            description: 'Payment Required. Complete the MPP payment challenge to proceed.',
          },
        },
      },
    },
  },
}

export async function GET() {
  return NextResponse.json(spec, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
