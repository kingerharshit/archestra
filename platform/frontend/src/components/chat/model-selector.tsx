"use client";

import {
  getModelCapabilities,
  providerDisplayNames,
  type SupportedProvider,
} from "@shared";
import { Brain, CheckIcon, Image, Loader2, Sparkles, Volume2, Wrench } from "lucide-react";
import { useMemo, useState } from "react";
import {
  ModelSelectorContent,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorInput,
  ModelSelectorItem,
  ModelSelectorList,
  ModelSelectorLogo,
  ModelSelectorName,
  ModelSelector as ModelSelectorRoot,
  ModelSelectorTrigger,
} from "@/components/ai-elements/model-selector";
import { PromptInputButton } from "@/components/ai-elements/prompt-input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useModelsByProviderQuery } from "@/lib/chat-models.query";

interface ModelSelectorProps {
  /** Currently selected model */
  selectedModel: string;
  /** Callback when model is changed */
  onModelChange: (model: string) => void;
  /** Whether the selector should be disabled */
  disabled?: boolean;
  /** Callback when the selector opens or closes */
  onOpenChange?: (open: boolean) => void;
}

/** Map our provider names to logo provider names */
const providerToLogoProvider: Record<SupportedProvider, string> = {
  openai: "openai",
  anthropic: "anthropic",
  gemini: "google",
  cerebras: "cerebras",
  vllm: "vllm",
  ollama: "ollama",
  zhipuai: "zhipuai",
};

function CapabilityIcon({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex size-5 items-center justify-center text-muted-foreground">
          {children}
        </span>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

function ModelCapabilityIcons({ modelId }: { modelId: string }) {
  const caps = getModelCapabilities(modelId);

  // Only show supported capabilities (keeps the list clean).
  const hasAny =
    caps.supportsVision ||
    caps.supportsTools ||
    caps.supportsImageGeneration ||
    caps.supportsAudio ||
    caps.supportsReasoning;

  if (!hasAny) return null;

  return (
    <div className="flex shrink-0 items-center gap-0.5">
      {caps.supportsVision && (
        <CapabilityIcon label="Vision">
          <Image className="size-3.5" />
        </CapabilityIcon>
      )}
      {caps.supportsTools && (
        <CapabilityIcon label="Tools">
          <Wrench className="size-3.5" />
        </CapabilityIcon>
      )}
      {caps.supportsImageGeneration && (
        <CapabilityIcon label="Image generation">
          <Sparkles className="size-3.5" />
        </CapabilityIcon>
      )}
      {caps.supportsAudio && (
        <CapabilityIcon label="Audio">
          <Volume2 className="size-3.5" />
        </CapabilityIcon>
      )}
      {caps.supportsReasoning && (
        <CapabilityIcon label="Reasoning">
          <Brain className="size-3.5" />
        </CapabilityIcon>
      )}
    </div>
  );
}

/**
 * Model selector dialog with:
 * - Models grouped by provider with provider name headers
 * - Search functionality to filter models
 * - Models filtered by configured API keys
 */
export function ModelSelector({
  selectedModel,
  onModelChange,
  disabled = false,
  onOpenChange: onOpenChangeProp,
}: ModelSelectorProps) {
  const { modelsByProvider, isLoading } = useModelsByProviderQuery();
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    onOpenChangeProp?.(newOpen);
  };

  // Get available providers from the fetched models
  const availableProviders = useMemo(() => {
    return Object.keys(modelsByProvider) as SupportedProvider[];
  }, [modelsByProvider]);

  // Find the provider for a given model
  const getProviderForModel = (model: string): SupportedProvider | null => {
    for (const provider of availableProviders) {
      if (modelsByProvider[provider]?.some((m) => m.id === model)) {
        return provider;
      }
    }
    return null;
  };

  // Get selected model's provider for logo
  const selectedModelProvider = getProviderForModel(selectedModel);
  const selectedModelLogo = selectedModelProvider
    ? providerToLogoProvider[selectedModelProvider]
    : null;

  // Get display name for selected model
  const selectedModelDisplayName = useMemo(() => {
    for (const provider of availableProviders) {
      const model = modelsByProvider[provider]?.find(
        (m) => m.id === selectedModel,
      );
      if (model) return model.displayName;
    }
    return selectedModel; // Fall back to ID if not found
  }, [selectedModel, availableProviders, modelsByProvider]);

  const handleSelectModel = (model: string) => {
    // If selecting the same model, just close the dialog
    if (model === selectedModel) {
      handleOpenChange(false);
      return;
    }

    handleOpenChange(false);
    onModelChange(model);
  };

  // Check if selectedModel is in the available models
  const allAvailableModelIds = useMemo(
    () =>
      availableProviders.flatMap(
        (provider) => modelsByProvider[provider]?.map((m) => m.id) ?? [],
      ),
    [availableProviders, modelsByProvider],
  );
  const isModelAvailable = allAvailableModelIds.includes(selectedModel);

  // If loading, show loading state
  if (isLoading) {
    return (
      <PromptInputButton disabled>
        <Loader2 className="size-4 animate-spin" />
        <ModelSelectorName>Loading models...</ModelSelectorName>
      </PromptInputButton>
    );
  }

  // If no providers configured, show disabled state
  if (availableProviders.length === 0) {
    return (
      <PromptInputButton disabled>
        <ModelSelectorName>No models available</ModelSelectorName>
      </PromptInputButton>
    );
  }

  return (
    <div>
      <ModelSelectorRoot open={open} onOpenChange={handleOpenChange}>
        <ModelSelectorTrigger asChild>
          <PromptInputButton disabled={disabled}>
            {selectedModelLogo && (
              <ModelSelectorLogo provider={selectedModelLogo} />
            )}
            <ModelSelectorName>
              {selectedModelDisplayName || "Select model"}
            </ModelSelectorName>
          </PromptInputButton>
        </ModelSelectorTrigger>
        <ModelSelectorContent
          title="Select Model"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <ModelSelectorInput placeholder="Search models..." />
          <ModelSelectorList>
            <ModelSelectorEmpty>No models found.</ModelSelectorEmpty>

            {/* Show current model if not in available list */}
            {!isModelAvailable && selectedModel && (
              <ModelSelectorGroup heading="Current (API key missing)">
                <ModelSelectorItem
                  disabled
                  value={selectedModel}
                  className="text-yellow-600"
                >
                  {selectedModelLogo && (
                    <ModelSelectorLogo provider={selectedModelLogo} />
                  )}
                  <ModelSelectorName>{selectedModel}</ModelSelectorName>
                  <ModelCapabilityIcons modelId={selectedModel} />
                  <CheckIcon className="ml-2 size-4" />
                </ModelSelectorItem>
              </ModelSelectorGroup>
            )}

            {availableProviders.map((provider) => (
              <ModelSelectorGroup
                key={provider}
                heading={providerDisplayNames[provider]}
              >
                {modelsByProvider[provider]?.map((model) => (
                  <ModelSelectorItem
                    key={model.id}
                    value={model.id}
                    onSelect={() => handleSelectModel(model.id)}
                  >
                    <ModelSelectorLogo
                      provider={providerToLogoProvider[provider]}
                    />
                    <ModelSelectorName>{model.displayName}</ModelSelectorName>
                    <ModelCapabilityIcons modelId={model.id} />
                    {selectedModel === model.id ? (
                      <CheckIcon className="ml-2 size-4" />
                    ) : (
                      <div className="ml-2 size-4" />
                    )}
                  </ModelSelectorItem>
                ))}
              </ModelSelectorGroup>
            ))}
          </ModelSelectorList>
        </ModelSelectorContent>
      </ModelSelectorRoot>
    </div>
  );
}
