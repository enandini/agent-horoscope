import { AGENT_GUIDE_MARKDOWN } from '@/lib/agent-guide'

export async function GET() {
  return new Response(AGENT_GUIDE_MARKDOWN, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
