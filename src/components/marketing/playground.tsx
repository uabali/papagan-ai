"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Zap, Clock, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Model } from "@/data/models";

interface PlaygroundProps {
  model: Model;
}

const MOCK_RESPONSE = `Merhaba! Ben Papagan AI platformunda çalışan bir dil modeliyim. Size nasıl yardımcı olabilirim?

Platform hakkında sormak istediğiniz bir şey var mı? API entegrasyonu, fine-tuning, ya da kullanım senaryoları konusunda destek verebilirim.`;

export function Playground({ model }: PlaygroundProps) {
  const [prompt, setPrompt] = useState("");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1024);
  const [stream, setStream] = useState(false);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<{ tokens: number; latency: number; cost: number } | null>(null);

  const [codeTab, setCodeTab] = useState<"python" | "typescript" | "curl">("python");

  const run = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setOutput("");
    setStats(null);
    const start = Date.now();
    await new Promise((r) => setTimeout(r, 800));
    if (stream) {
      for (let i = 0; i < MOCK_RESPONSE.length; i += 4) {
        setOutput(MOCK_RESPONSE.slice(0, i + 4));
        await new Promise((r) => setTimeout(r, 20));
      }
    } else {
      setOutput(MOCK_RESPONSE);
    }
    const latency = Date.now() - start;
    const tokens = Math.floor(MOCK_RESPONSE.split(" ").length * 1.3);
    const cost = model.pricing.input ? (tokens / 1_000_000) * model.pricing.input : 0;
    setStats({ tokens, latency, cost });
    setLoading(false);
  };

  const codeSnippets: Record<"python" | "typescript" | "curl", string> = {
    python: `import papagan\n\nclient = papagan.Client(api_key="ppg-...")\n\nresponse = client.chat.complete(\n    model="${model.id}",\n    messages=[{"role": "user", "content": "${prompt || "Mesajınız"}"}],\n    temperature=${temperature},\n    max_tokens=${maxTokens},\n)`,
    typescript: `import Papagan from "papagan";\n\nconst client = new Papagan({ apiKey: "ppg-..." });\n\nconst res = await client.chat.complete({\n  model: "${model.id}",\n  messages: [{ role: "user", content: "${prompt || "Mesajınız"}" }],\n  temperature: ${temperature},\n  maxTokens: ${maxTokens},\n});`,
    curl: `curl https://api.papagan.ai/v1/chat/completions \\\n  -H "Authorization: Bearer ppg-..." \\\n  -d '{"model":"${model.id}","messages":[{"role":"user","content":"${prompt || "Mesajınız"}"}],"temperature":${temperature}}'`,
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid lg:grid-cols-[320px_1fr] gap-6">
      {/* Left: Params */}
      <div className="space-y-5">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Prompt</label>
          <textarea
            className="w-full min-h-[120px] rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/50 resize-none"
            placeholder="Mesajınızı yazın..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-muted-foreground">Temperature</label>
            <span className="text-xs font-mono text-foreground">{temperature}</span>
          </div>
          <Slider value={temperature} onChange={setTemperature} min={0} max={2} step={0.01} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-muted-foreground">Max Tokens</label>
            <span className="text-xs font-mono text-foreground">{maxTokens}</span>
          </div>
          <Slider value={maxTokens} onChange={setMaxTokens} min={1} max={4096} step={1} />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-muted-foreground">Streaming</label>
          <Switch checked={stream} onCheckedChange={setStream} />
        </div>

        <Button
          onClick={run}
          disabled={loading || !prompt.trim()}
          variant="gradient"
          className="w-full"
        >
          {loading ? (
            <><div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Çalışıyor...</>
          ) : (
            <><Zap className="h-4 w-4" />Çalıştır</>
          )}
        </Button>
      </div>

      {/* Right: Output + Code */}
      <div className="space-y-4">
        {/* Output */}
        <div className="rounded-xl border border-white/5 bg-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
            <span className="text-xs font-medium text-muted-foreground">Çıktı</span>
            {stats && (
              <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1"><Hash className="h-3 w-3" />{stats.tokens} tok</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{stats.latency}ms</span>
                <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />${stats.cost.toFixed(6)}</span>
              </div>
            )}
          </div>
          <div className="min-h-[160px] p-4">
            {output ? (
              <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">{output}</p>
            ) : (
              <p className="text-sm text-muted-foreground/50 italic">
                {loading ? "Yanıt bekleniyor..." : "Çıktı burada görünecek"}
              </p>
            )}
          </div>
        </div>

        {/* Code snippet */}
        <div className="rounded-xl border border-white/5 bg-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
            <div className="flex gap-1">
              {(["python", "typescript", "curl"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setCodeTab(t)}
                  className={cn(
                    "px-2.5 py-1 text-xs font-medium rounded transition-colors",
                    codeTab === t ? "bg-brand-500/20 text-brand-300" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t === "typescript" ? "TypeScript" : t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
            <button
              onClick={() => copy(codeSnippets[codeTab])}
              className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
            </button>
          </div>
          <div className="p-4 overflow-x-auto">
            <pre className="text-[12px] font-mono text-foreground/80 leading-relaxed">
              <code>{codeSnippets[codeTab]}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hash({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" />
      <line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" />
    </svg>
  );
}
