import { streamText, convertToModelMessages, type UIMessage } from 'ai'
import { buildSystemPrompt } from '@/lib/system-prompt'
import type { ExperienceLevel } from '@/lib/learning-paths'

export async function POST(req: Request) {
  const { messages, userProfile } = await req.json()

  const { name, role, experience } = userProfile as {
    name: string
    role: string
    experience: ExperienceLevel
  }

  const systemPrompt = buildSystemPrompt(name, role, experience)

  const result = streamText({
    model: 'openai/gpt-4o-mini',
    system: systemPrompt,
    messages: await convertToModelMessages(messages as UIMessage[]),
    maxOutputTokens: 600,
  })

  return result.toUIMessageStreamResponse()
}
