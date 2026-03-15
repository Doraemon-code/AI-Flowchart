import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ModelConfig } from '@/types'

interface ModelState {
  // Available models from server
  availableModels: ModelConfig[]
  // User selected model (persisted)
  selectedModelId: string | null
  // Loading state
  isLoading: boolean

  // Actions
  setAvailableModels: (models: ModelConfig[]) => void
  setSelectedModelId: (modelId: string | null) => void
  setIsLoading: (loading: boolean) => void
  // Get selected model config
  getSelectedModel: () => ModelConfig | undefined
}

export const useModelStore = create<ModelState>()(
  persist(
    (set, get) => ({
      availableModels: [],
      selectedModelId: null,
      isLoading: false,

      setAvailableModels: (models) => set({ availableModels: models }),

      setSelectedModelId: (modelId) => set({ selectedModelId: modelId }),

      setIsLoading: (loading) => set({ isLoading: loading }),

      getSelectedModel: () => {
        const { availableModels, selectedModelId } = get()
        return availableModels.find((m) => m.id === selectedModelId)
      },
    }),
    {
      name: 'ai-model-storage',
      partialize: (state) => ({ selectedModelId: state.selectedModelId }),
    }
  )
)