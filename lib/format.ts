import { Horoscope } from './horoscope'

const WIDTH = 46

function pad(text: string): string {
  const inner = text.padEnd(WIDTH - 4)
  return `║  ${inner}║`
}

function empty(): string {
  return pad('')
}

function wrap(text: string, maxWidth: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    if (current && (current + ' ' + word).length > maxWidth) {
      lines.push(current)
      current = word
    } else {
      current = current ? current + ' ' + word : word
    }
  }
  if (current) lines.push(current)
  return lines
}

export function formatBox(horoscope: Horoscope, price: string): string {
  const top = '╔' + '═'.repeat(WIDTH - 2) + '╗'
  const bottom = '╚' + '═'.repeat(WIDTH - 2) + '╝'

  const dateStr = new Date(horoscope.date + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const readingLines = wrap(horoscope.reading, WIDTH - 6)
  const tipLines = wrap(horoscope.lucky, WIDTH - 6)

  const lines = [
    top,
    pad(`🔮 AGENT HOROSCOPE`),
    empty(),
    pad(`Sign: ${horoscope.sign.symbol} ${horoscope.sign.name}`),
    pad(`Element: ${horoscope.sign.element}`),
    pad(`Date: ${dateStr}`),
    empty(),
    ...readingLines.map(pad),
    empty(),
    ...tipLines.map(pad),
    empty(),
    pad(`Compatible: ${horoscope.sign.compatible}`),
    pad(`Avoid: ${horoscope.sign.rival}`),
    empty(),
    pad(`Cost: ${price} USDC`),
    bottom,
  ]

  return lines.join('\n')
}
