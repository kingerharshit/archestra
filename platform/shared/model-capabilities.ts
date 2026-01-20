/**
 * Centralized Model Capabilities Registry
 *
 * Defines capabilities for AI models including vision, tools, image generation,
 * audio, and reasoning support.
 *
 * Uses a registry approach where models can be matched by exact ID or pattern.
 * Models not explicitly listed default to conservative capabilities (false for all).
 */

export interface ModelCapabilities {
  /** Whether the model supports vision/image inputs */
  supportsVision: boolean;
  /** Whether the model supports function/tool calling */
  supportsTools: boolean;
  /** Whether the model can generate images */
  supportsImageGeneration: boolean;
  /** Whether the model supports audio input/output */
  supportsAudio: boolean;
  /** Whether the model supports reasoning/chain-of-thought (e.g., o1, o3) */
  supportsReasoning: boolean;
}

/**
 * Default capabilities for unknown models (conservative defaults)
 */
const DEFAULT_CAPABILITIES: ModelCapabilities = {
  supportsVision: false,
  supportsTools: false,
  supportsImageGeneration: false,
  supportsAudio: false,
  supportsReasoning: false,
};

/**
 * Model capabilities registry
 * Maps model IDs (or patterns) to their capabilities
 */
const MODEL_CAPABILITIES_REGISTRY: Record<string, ModelCapabilities> = {
  // ============================================================================
  // Anthropic Claude Models
  // ============================================================================
  "claude-opus-4-1-20250805": {
    supportsVision: true,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: false,
    supportsReasoning: false,
  },
  "claude-3-5-sonnet": {
    supportsVision: true,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: false,
    supportsReasoning: false,
  },
  "claude-3-5-sonnet-20241022": {
    supportsVision: true,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: false,
    supportsReasoning: false,
  },
  "claude-3-5-haiku": {
    supportsVision: true,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: false,
    supportsReasoning: false,
  },
  "claude-3-opus": {
    supportsVision: true,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: false,
    supportsReasoning: false,
  },
  "claude-3-sonnet": {
    supportsVision: true,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: false,
    supportsReasoning: false,
  },
  "claude-3-haiku": {
    supportsVision: true,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: false,
    supportsReasoning: false,
  },
  "claude-haiku-4-5": {
    supportsVision: true,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: false,
    supportsReasoning: false,
  },
  // Pattern: All Claude models support vision and tools by default
  "claude-": {
    supportsVision: true,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: false,
    supportsReasoning: false,
  },

  // ============================================================================
  // OpenAI GPT Models
  // ============================================================================
  "gpt-4o": {
    supportsVision: true,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: true,
    supportsReasoning: false,
  },
  "gpt-4o-2024-08-06": {
    supportsVision: true,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: true,
    supportsReasoning: false,
  },
  "gpt-4o-mini": {
    supportsVision: true,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: true,
    supportsReasoning: false,
  },
  "gpt-5": {
    supportsVision: true,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: true,
    supportsReasoning: false,
  },
  "gpt-5-mini": {
    supportsVision: true,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: true,
    supportsReasoning: false,
  },
  "gpt-4-turbo": {
    supportsVision: true,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: false,
    supportsReasoning: false,
  },
  "gpt-4": {
    supportsVision: true,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: false,
    supportsReasoning: false,
  },
  "gpt-3.5-turbo": {
    supportsVision: false,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: false,
    supportsReasoning: false,
  },
  // OpenAI Reasoning Models (o1, o3)
  "o1-preview": {
    supportsVision: false,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: false,
    supportsReasoning: true,
  },
  "o1-mini": {
    supportsVision: false,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: false,
    supportsReasoning: true,
  },
  "o1": {
    supportsVision: false,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: false,
    supportsReasoning: true,
  },
  "o3-mini": {
    supportsVision: false,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: false,
    supportsReasoning: true,
  },
  "o3": {
    supportsVision: false,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: false,
    supportsReasoning: true,
  },
  // Pattern: GPT-4 variants support vision and tools
  "gpt-4": {
    supportsVision: true,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: false,
    supportsReasoning: false,
  },
  // Pattern: GPT-3.5 variants don't support vision
  "gpt-3.5": {
    supportsVision: false,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: false,
    supportsReasoning: false,
  },
  // Pattern: o1/o3 reasoning models
  "o1": {
    supportsVision: false,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: false,
    supportsReasoning: true,
  },
  "o3": {
    supportsVision: false,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: false,
    supportsReasoning: true,
  },

  // ============================================================================
  // Google Gemini Models
  // ============================================================================
  "gemini-2.5-pro": {
    supportsVision: true,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: true,
    supportsReasoning: false,
  },
  "gemini-2.5-flash": {
    supportsVision: true,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: true,
    supportsReasoning: false,
  },
  "gemini-2.0-flash": {
    supportsVision: true,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: true,
    supportsReasoning: false,
  },
  "gemini-1.5-pro": {
    supportsVision: true,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: true,
    supportsReasoning: false,
  },
  "gemini-1.5-flash": {
    supportsVision: true,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: true,
    supportsReasoning: false,
  },
  // Pattern: Gemini models generally support vision, tools, and audio
  "gemini-": {
    supportsVision: true,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: true,
    supportsReasoning: false,
  },

  // ============================================================================
  // Zhipu AI Models
  // ============================================================================
  "glm-4.5": {
    supportsVision: true,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: false,
    supportsReasoning: false,
  },
  "glm-4.5-flash": {
    supportsVision: true,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: false,
    supportsReasoning: false,
  },
  "glm-4.5-air": {
    supportsVision: true,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: false,
    supportsReasoning: false,
  },
  "chatglm-": {
    supportsVision: true,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: false,
    supportsReasoning: false,
  },
  // Pattern: GLM models support vision and tools
  "glm-": {
    supportsVision: true,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: false,
    supportsReasoning: false,
  },

  // ============================================================================
  // Cerebras Models
  // ============================================================================
  // Pattern: Cerebras models generally support tools (OpenAI-compatible)
  "cerebras-": {
    supportsVision: false,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: false,
    supportsReasoning: false,
  },

  // ============================================================================
  // vLLM Models (OpenAI-compatible, capabilities depend on underlying model)
  // ============================================================================
  // Note: vLLM can serve any model, so capabilities depend on the actual model
  // For now, we default to conservative values - users should configure specific models
  "vllm-": {
    supportsVision: false,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: false,
    supportsReasoning: false,
  },

  // ============================================================================
  // Ollama Models (OpenAI-compatible, capabilities depend on underlying model)
  // ============================================================================
  // Note: Ollama can serve any model, so capabilities depend on the actual model
  // For now, we default to conservative values - users should configure specific models
  "ollama-": {
    supportsVision: false,
    supportsTools: true,
    supportsImageGeneration: false,
    supportsAudio: false,
    supportsReasoning: false,
  },
};

/**
 * Get capabilities for a model by ID
 *
 * Uses a matching strategy:
 * 1. Exact match (case-insensitive)
 * 2. Prefix match for patterns (e.g., "claude-" matches "claude-opus-4-1-20250805")
 * 3. Default capabilities if no match found
 *
 * @param modelId - The model ID to look up
 * @returns Model capabilities
 */
export function getModelCapabilities(modelId: string): ModelCapabilities {
  const normalizedModel = modelId.toLowerCase();

  // Try exact match first
  if (MODEL_CAPABILITIES_REGISTRY[normalizedModel]) {
    return MODEL_CAPABILITIES_REGISTRY[normalizedModel]!;
  }

  // Try prefix matches (patterns ending with "-")
  // Sort by length (longest first) to match more specific patterns first
  const patterns = Object.keys(MODEL_CAPABILITIES_REGISTRY)
    .filter((key) => key.endsWith("-"))
    .sort((a, b) => b.length - a.length);

  for (const pattern of patterns) {
    if (normalizedModel.startsWith(pattern)) {
      return MODEL_CAPABILITIES_REGISTRY[pattern]!;
    }
  }

  // Default: conservative capabilities
  return DEFAULT_CAPABILITIES;
}

/**
 * Check if a model supports vision/image inputs
 */
export function modelSupportsVision(modelId: string): boolean {
  return getModelCapabilities(modelId).supportsVision;
}

/**
 * Check if a model supports function/tool calling
 */
export function modelSupportsTools(modelId: string): boolean {
  return getModelCapabilities(modelId).supportsTools;
}

/**
 * Check if a model supports image generation
 */
export function modelSupportsImageGeneration(modelId: string): boolean {
  return getModelCapabilities(modelId).supportsImageGeneration;
}

/**
 * Check if a model supports audio input/output
 */
export function modelSupportsAudio(modelId: string): boolean {
  return getModelCapabilities(modelId).supportsAudio;
}

/**
 * Check if a model supports reasoning/chain-of-thought
 */
export function modelSupportsReasoning(modelId: string): boolean {
  return getModelCapabilities(modelId).supportsReasoning;
}
