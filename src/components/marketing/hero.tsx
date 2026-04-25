"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Copy, Check } from "lucide-react";

const CODE_SNIPPETS = {
  python: `import papagan

client = papagan.Client(api_key="ppg-...")

response = client.chat.complete(
    model="papagan/llama-3.1-70b",
    messages=[{"role": "user", "content": "Merhaba!"}],
    stream=True,
)

for chunk in response:
    print(chunk.text, end="")`,

  typescript: `import Papagan from "papagan";

const client = new Papagan({ apiKey: "ppg-..." });

const stream = await client.chat.complete({
  model: "papagan/llama-3.1-70b",
  messages: [{ role: "user", content: "Merhaba!" }],
  stream: true,
});

for await (const chunk of stream) {
  process.stdout.write(chunk.text);
}`,

  curl: `curl https://api.papagan.ai/v1/chat/completions \\
  -H "Authorization: Bearer ppg-..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "papagan/llama-3.1-70b",
    "messages": [
      {"role": "user", "content": "Merhaba!"}
    ],
    "stream": true
  }'`,
};

export function Hero() {
  const [tab, setTab] = useState<"python" | "typescript" | "curl">("python");
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(CODE_SNIPPETS[tab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-32 pb-24">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-brand-600/8 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-1.5">
              <Zap className="h-3.5 w-3.5 text-brand-400" />
              <span className="text-xs font-medium text-brand-300">100+ model, tek API</span>
            </div>

            <h1 className="mb-6 text-5xl lg:text-6xl font-bold leading-[1.07] tracking-tight">
              <span className="text-gradient">Yapay Zeka</span>
              <br />
              <span className="text-gradient-brand">modellerini</span>
              <br />
              <span className="text-foreground">anında üretimde</span>
              <br />
              <span className="text-foreground">çalıştırın</span>
            </h1>

            <p className="mb-8 text-lg text-muted-foreground leading-relaxed max-w-lg">
              LLM, görüntü, ses ve embedding modellerini saniyeler içinde kullanmaya başlayın.
              Serverless'dan dedicated endpoint'lere, fine-tuning'den ham GPU'ya — hepsi tek platformda.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <Link href="/console">
                <Button size="lg" variant="gradient" className="group">
                  Ücretsiz Başla
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/models">
                <Button size="lg" variant="outline">
                  Model Kataloğu
                </Button>
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div>
                <span className="font-semibold text-foreground">10M+</span> istek/gün
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div>
                <span className="font-semibold text-foreground">100+</span> model
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div>
                <span className="font-semibold text-foreground">&lt;100ms</span> P50 latency
              </div>
            </div>
          </motion.div>

          {/* Right: Code block */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="rounded-2xl border border-white/8 bg-card overflow-hidden shadow-2xl glow">
              {/* Tab bar */}
              <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
                <div className="flex gap-1">
                  {(["python", "typescript", "curl"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                        tab === t
                          ? "bg-brand-500/20 text-brand-300"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t === "typescript" ? "TypeScript" : t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
                <button
                  onClick={copy}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {copied ? (
                    <><Check className="h-3.5 w-3.5 text-emerald-400" /><span className="text-emerald-400">Kopyalandı</span></>
                  ) : (
                    <><Copy className="h-3.5 w-3.5" />Kopyala</>
                  )}
                </button>
              </div>

              {/* Code */}
              <div className="p-5 overflow-x-auto">
                <pre className="text-[13px] leading-relaxed font-mono text-foreground/90">
                  <code>{CODE_SNIPPETS[tab]}</code>
                </pre>
              </div>

              {/* Status bar */}
              <div className="flex items-center gap-3 border-t border-white/5 px-5 py-3 bg-white/[0.02]">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                </div>
                <span className="text-[11px] text-muted-foreground font-mono">
                  <span className="text-emerald-400">✓</span> papagan/llama-3.1-70b · 241 tokens · 1.2s
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
