import type { Env } from './_shared/types'
import { corsHeaders } from './_shared/cors'

interface ModelConfig {
  id: string
  name: string
  provider?: string
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context

  try {
    let models: ModelConfig[] = []

    // Parse AI_MODELS_CONFIG if available
    if (env.AI_MODELS_CONFIG) {
      try {
        const parsed = JSON.parse(env.AI_MODELS_CONFIG)
        if (Array.isArray(parsed)) {
          models = parsed
        }
      } catch (e) {
        console.error('Failed to parse AI_MODELS_CONFIG:', e)
      }
    }

    // Fallback to default model if no config
    if (models.length === 0 && env.AI_MODEL_ID) {
      models = [
        {
          id: env.AI_MODEL_ID,
          name: env.AI_MODEL_ID,
          provider: env.AI_PROVIDER || 'openai',
        },
      ]
    }

    return new Response(JSON.stringify({ models }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Models error:', error)
    return new Response(JSON.stringify({ error: 'Failed to get models' }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    })
  }
}