import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { useModelStore } from '@/stores/modelStore'
import type { ModelConfig } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
const PASSWORD_STORAGE_KEY = 'ai-flowchart-access-password'

async function fetchModels(): Promise<ModelConfig[]> {
  try {
    const password = localStorage.getItem(PASSWORD_STORAGE_KEY)
    const response = await fetch(`${API_BASE_URL}/models`, {
      headers: password ? { 'X-Access-Password': password } : {},
    })
    if (!response.ok) {
      throw new Error('Failed to fetch models')
    }
    const data = await response.json()
    return data.models || []
  } catch (error) {
    console.error('Failed to fetch models:', error)
    return []
  }
}

export function ModelSelector() {
  const {
    availableModels,
    selectedModelId,
    setAvailableModels,
    setSelectedModelId,
    isLoading,
    setIsLoading,
  } = useModelStore()
  const [isOpen, setIsOpen] = useState(false)

  // Load models on mount
  useEffect(() => {
    const loadModels = async () => {
      setIsLoading(true)
      const models = await fetchModels()
      setAvailableModels(models)
      // Set default selection if not already set
      if (models.length > 0 && !selectedModelId) {
        setSelectedModelId(models[0].id)
      }
      setIsLoading(false)
    }
    loadModels()
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false)
    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  const selectedModel = availableModels.find((m) => m.id === selectedModelId)

  if (isLoading || availableModels.length === 0) {
    return null
  }

  if (availableModels.length === 1) {
    // Only one model available, just show the name without dropdown
    return (
      <div className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-muted">
        <span>{availableModels[0].name}</span>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-muted transition-colors hover:bg-background hover:text-primary"
      >
        <span>{selectedModel?.name || '选择模型'}</span>
        <ChevronDown className="h-4 w-4" />
      </button>
      {isOpen && (
        <div
          className="absolute bottom-full left-0 mb-2 w-56 rounded-xl border border-border bg-surface py-1 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {availableModels.map((model) => (
            <button
              key={model.id}
              onClick={() => {
                setSelectedModelId(model.id)
                setIsOpen(false)
              }}
              className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-background ${
                selectedModelId === model.id
                  ? 'text-accent font-medium'
                  : 'text-primary'
              }`}
            >
              <div>{model.name}</div>
              {model.provider && (
                <div className="text-xs text-muted mt-0.5">{model.provider}</div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}