export interface Env {
  AI_PROVIDER: string
  AI_BASE_URL: string
  AI_API_KEY: string
  AI_MODEL_ID: string
  AI_MODELS_CONFIG?: string // JSON array of available models
  ACCESS_PASSWORD?: string
}

// Backend model configuration (includes sensitive data)
export interface ModelConfig {
  id: string
  name: string
  provider?: string
  // Optional per-model API configuration (overrides global settings)
  apiKey?: string
  baseUrl?: string
}

// Parse models config from env
export function parseModelsConfig(env: Env): ModelConfig[] {
  if (env.AI_MODELS_CONFIG) {
    try {
      const parsed = JSON.parse(env.AI_MODELS_CONFIG)
      if (Array.isArray(parsed)) {
        return parsed
      }
    } catch (e) {
      console.error('Failed to parse AI_MODELS_CONFIG:', e)
    }
  }
  return []
}

// Find model config by id
export function getModelConfig(env: Env, modelId: string): ModelConfig | null {
  const models = parseModelsConfig(env)
  return models.find(m => m.id === modelId) || null
}

export interface Message {
  role: 'system' | 'user' | 'assistant'
  content: string | ContentPart[]
}

export interface ContentPart {
  type: 'text' | 'image_url'
  text?: string
  image_url?: { url: string }
}

export interface AnthropicContentPart {
  type: 'text' | 'image'
  text?: string
  source?: {
    type: 'base64'
    media_type: string
    data: string
  }
}

export interface ChatRequest {
  messages: Message[]
  stream?: boolean
  model?: string // Optional model override
}

export interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

export interface AnthropicResponse {
  content: Array<{
    type: string
    text: string
  }>
}
