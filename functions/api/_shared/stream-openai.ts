import type { Env, Message } from './types'
import { corsHeaders } from './cors'
import { getModelConfig } from './types'

export async function streamOpenAI(messages: Message[], env: Env, exempt: boolean = false, model?: string): Promise<Response> {
  // Determine API configuration: per-model override or global fallback
  let baseUrl = env.AI_BASE_URL
  let apiKey = env.AI_API_KEY
  let modelId = model || env.AI_MODEL_ID

  // Check if there's a per-model configuration
  if (model) {
    const modelConfig = getModelConfig(env, model)
    if (modelConfig) {
      // Use per-model override if available, otherwise fall back to global
      baseUrl = modelConfig.baseUrl || env.AI_BASE_URL
      apiKey = modelConfig.apiKey || env.AI_API_KEY
      modelId = modelConfig.id
    }
  }

  if (!apiKey) {
    throw new Error('AI_API_KEY not configured')
  }

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: modelId,
      messages: messages,
      max_tokens: 64000,
      stream: true,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`OpenAI API error: ${error}`)
  }

  const { readable, writable } = new TransformStream()
  const writer = writable.getWriter()
  const encoder = new TextEncoder()

  ;(async () => {
    const reader = response.body?.getReader()
    if (!reader) return

    const decoder = new TextDecoder()
    let buffer = ''

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed || !trimmed.startsWith('data: ')) continue

          const data = trimmed.slice(6)
          if (data === '[DONE]') {
            await writer.write(encoder.encode('data: [DONE]\n\n'))
            continue
          }

          try {
            const parsed = JSON.parse(data)
            const content = parsed.choices?.[0]?.delta?.content
            if (content) {
              await writer.write(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`))
            }
          } catch {
            // Skip invalid JSON
          }
        }
      }
    } finally {
      reader.releaseLock()
      await writer.close()
    }
  })()

  return new Response(readable, {
    headers: {
      ...corsHeaders,
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Quota-Exempt': exempt ? 'true' : 'false',
    },
  })
}
