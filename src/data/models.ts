export type Modality = "text" | "image" | "video" | "audio" | "embedding" | "multimodal";
export type Provider = "papagan" | "meta" | "mistral" | "stability" | "openai" | "anthropic" | "google";

export interface ModelPricing {
  input?: number;  // per 1M tokens in $
  output?: number;
  image?: number;  // per 1K steps/images
  perSecond?: number;
  free?: boolean;
}

export interface ModelIOSchema {
  inputs: SchemaField[];
  outputs: SchemaField[];
}

export interface SchemaField {
  name: string;
  type: "string" | "number" | "boolean" | "array" | "object" | "file";
  description?: string;
  default?: unknown;
  enum?: string[];
  min?: number;
  max?: number;
  required?: boolean;
}

export interface Model {
  id: string;
  name: string;
  provider: Provider;
  modality: Modality;
  description: string;
  tags: string[];
  contextLength?: number;
  pricing: ModelPricing;
  latency: "fast" | "medium" | "slow";
  streaming: boolean;
  async: boolean;
  new?: boolean;
  featured?: boolean;
  schema: ModelIOSchema;
  badge?: string;
}

export const MODELS: Model[] = [
  {
    id: "papagan/mistral-7b-instruct",
    name: "Mistral 7B Instruct",
    provider: "mistral",
    modality: "text",
    description: "Hızlı ve verimli 7B parametreli talimat modeli. Kod, analiz ve genel amaçlı görevler için idealdir.",
    tags: ["chat", "code", "fast", "open-source"],
    contextLength: 32768,
    pricing: { input: 0.10, output: 0.10 },
    latency: "fast",
    streaming: true,
    async: false,
    featured: true,
    schema: {
      inputs: [
        { name: "prompt", type: "string", description: "Kullanıcı mesajı", required: true },
        { name: "max_tokens", type: "number", description: "Maksimum token sayısı", default: 1024, min: 1, max: 32768 },
        { name: "temperature", type: "number", description: "Çeşitlilik kontrolü", default: 0.7, min: 0, max: 2 },
        { name: "top_p", type: "number", description: "Nucleus sampling", default: 0.9, min: 0, max: 1 },
        { name: "stream", type: "boolean", description: "Streaming yanıt", default: false },
      ],
      outputs: [
        { name: "text", type: "string", description: "Üretilen metin" },
        { name: "usage", type: "object", description: "Token kullanım detayları" },
      ],
    },
  },
  {
    id: "papagan/llama-3.1-70b",
    name: "Llama 3.1 70B",
    provider: "meta",
    modality: "text",
    description: "Meta'nın en güçlü açık kaynak modellerinden biri. Karmaşık akıl yürütme ve uzun bağlam görevleri için.",
    tags: ["chat", "reasoning", "long-context"],
    contextLength: 131072,
    pricing: { input: 0.88, output: 0.88 },
    latency: "medium",
    streaming: true,
    async: true,
    featured: true,
    badge: "Popular",
    schema: {
      inputs: [
        { name: "messages", type: "array", description: "Sohbet geçmişi (OpenAI format)", required: true },
        { name: "max_tokens", type: "number", default: 2048, min: 1, max: 131072 },
        { name: "temperature", type: "number", default: 0.7, min: 0, max: 2 },
        { name: "stream", type: "boolean", default: false },
        { name: "system", type: "string", description: "Sistem talimatı" },
      ],
      outputs: [
        { name: "choices", type: "array", description: "Model yanıtları" },
        { name: "usage", type: "object" },
      ],
    },
  },
  {
    id: "papagan/llama-3.1-8b",
    name: "Llama 3.1 8B",
    provider: "meta",
    modality: "text",
    description: "Dengeli performans/maliyet oranı. Üretim uygulamaları için tercih edilen hafif model.",
    tags: ["chat", "fast", "cost-effective"],
    contextLength: 131072,
    pricing: { input: 0.18, output: 0.18 },
    latency: "fast",
    streaming: true,
    async: false,
    new: true,
    schema: {
      inputs: [
        { name: "messages", type: "array", required: true },
        { name: "max_tokens", type: "number", default: 1024 },
        { name: "temperature", type: "number", default: 0.7 },
        { name: "stream", type: "boolean", default: false },
      ],
      outputs: [
        { name: "choices", type: "array" },
        { name: "usage", type: "object" },
      ],
    },
  },
  {
    id: "papagan/sdxl-turbo",
    name: "SDXL Turbo",
    provider: "stability",
    modality: "image",
    description: "Gerçek zamanlı görüntü üretimi için optimize edilmiş diffusion modeli. Tek adımda yüksek kalite.",
    tags: ["image-gen", "fast", "real-time"],
    pricing: { image: 0.002 },
    latency: "fast",
    streaming: false,
    async: true,
    featured: true,
    schema: {
      inputs: [
        { name: "prompt", type: "string", description: "Görüntü açıklaması", required: true },
        { name: "negative_prompt", type: "string", description: "İstenmeyen öğeler" },
        { name: "width", type: "number", default: 1024, enum: ["512", "768", "1024"], description: "Genişlik (px)" },
        { name: "height", type: "number", default: 1024, enum: ["512", "768", "1024"], description: "Yükseklik (px)" },
        { name: "num_inference_steps", type: "number", default: 1, min: 1, max: 4 },
        { name: "seed", type: "number", description: "Rastgele tohum" },
      ],
      outputs: [
        { name: "images", type: "array", description: "Üretilen görüntü URL'leri" },
        { name: "seed", type: "number" },
      ],
    },
  },
  {
    id: "papagan/flux-pro",
    name: "FLUX Pro",
    provider: "papagan",
    modality: "image",
    description: "En gelişmiş görüntü üretim modelimiz. Fotorealistik çıktılar ve hassas prompt takibi.",
    tags: ["image-gen", "photorealistic", "premium"],
    pricing: { image: 0.055 },
    latency: "medium",
    streaming: false,
    async: true,
    new: true,
    badge: "New",
    featured: true,
    schema: {
      inputs: [
        { name: "prompt", type: "string", required: true },
        { name: "width", type: "number", default: 1024 },
        { name: "height", type: "number", default: 1024 },
        { name: "steps", type: "number", default: 25, min: 1, max: 50 },
        { name: "guidance", type: "number", default: 3.5, min: 1, max: 20 },
        { name: "safety_tolerance", type: "number", default: 2, min: 1, max: 6 },
      ],
      outputs: [
        { name: "images", type: "array" },
        { name: "timings", type: "object" },
      ],
    },
  },
  {
    id: "papagan/whisper-large-v3",
    name: "Whisper Large v3",
    provider: "openai",
    modality: "audio",
    description: "OpenAI'nın en güçlü konuşma tanıma modeli. 99 dil desteği, yüksek doğruluk.",
    tags: ["speech-to-text", "multilingual"],
    pricing: { perSecond: 0.0001 },
    latency: "medium",
    streaming: false,
    async: true,
    schema: {
      inputs: [
        { name: "audio", type: "file", description: "Ses dosyası (mp3, wav, m4a, webm)", required: true },
        { name: "language", type: "string", description: "Dil kodu (ör: tr, en)", default: "auto" },
        { name: "task", type: "string", enum: ["transcribe", "translate"], default: "transcribe" },
        { name: "response_format", type: "string", enum: ["json", "text", "srt", "vtt"], default: "json" },
      ],
      outputs: [
        { name: "text", type: "string", description: "Transkript" },
        { name: "segments", type: "array", description: "Zaman damgalı segmentler" },
        { name: "language", type: "string" },
      ],
    },
  },
  {
    id: "papagan/bge-m3",
    name: "BGE-M3",
    provider: "papagan",
    modality: "embedding",
    description: "Çok dilli, çok görevli embedding modeli. Anlam arama, RAG ve sınıflandırma için.",
    tags: ["embedding", "multilingual", "rag"],
    contextLength: 8192,
    pricing: { input: 0.02 },
    latency: "fast",
    streaming: false,
    async: false,
    schema: {
      inputs: [
        { name: "input", type: "string", description: "Gömülecek metin", required: true },
        { name: "encoding_format", type: "string", enum: ["float", "base64"], default: "float" },
      ],
      outputs: [
        { name: "data", type: "array", description: "Embedding vektörü" },
        { name: "usage", type: "object" },
      ],
    },
  },
  {
    id: "papagan/deepseek-r1",
    name: "DeepSeek R1",
    provider: "papagan",
    modality: "text",
    description: "Gelişmiş mantık yürütme ve matematik odaklı model. Adım adım düşünme zinciri ile çalışır.",
    tags: ["reasoning", "math", "code", "chain-of-thought"],
    contextLength: 65536,
    pricing: { input: 0.55, output: 2.19 },
    latency: "slow",
    streaming: true,
    async: true,
    new: true,
    badge: "Reasoning",
    featured: true,
    schema: {
      inputs: [
        { name: "messages", type: "array", required: true },
        { name: "max_tokens", type: "number", default: 4096 },
        { name: "temperature", type: "number", default: 0.6 },
      ],
      outputs: [
        { name: "choices", type: "array" },
        { name: "usage", type: "object" },
      ],
    },
  },
];

export const MODALITY_LABELS: Record<Modality, string> = {
  text: "Metin",
  image: "Görüntü",
  video: "Video",
  audio: "Ses",
  embedding: "Embedding",
  multimodal: "Çok Modlu",
};

export const PROVIDER_LABELS: Record<Provider, string> = {
  papagan: "Papagan",
  meta: "Meta",
  mistral: "Mistral AI",
  stability: "Stability AI",
  openai: "OpenAI",
  anthropic: "Anthropic",
  google: "Google",
};
