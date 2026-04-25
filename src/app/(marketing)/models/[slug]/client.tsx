"use client";
import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Playground } from "@/components/marketing/playground";
import { ArrowLeft, Zap, MessageSquare, DollarSign, BookOpen, Code2 } from "lucide-react";
import type { Model } from "@/data/models";
import { MODALITY_LABELS } from "@/data/models";

interface Props {
  model: Model;
}

const TYPE_COLORS: Record<string, string> = {
  string: "text-emerald-400",
  number: "text-blue-400",
  boolean: "text-yellow-400",
  array: "text-orange-400",
  object: "text-purple-400",
  file: "text-pink-400",
};

export function ModelDetailClient({ model }: Props) {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Breadcrumb */}
        <Link
          href="/models"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Model Kataloğu
        </Link>

        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600/30 to-brand-900/60 border border-brand-500/30 shadow-lg">
              <span className="text-xl font-bold text-brand-300">{model.name.charAt(0)}</span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-foreground">{model.name}</h1>
                {model.badge && <Badge>{model.badge}</Badge>}
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="capitalize">{model.provider === "papagan" ? "Papagan" : model.provider}</span>
                <span>·</span>
                <span>{MODALITY_LABELS[model.modality]}</span>
                {model.contextLength && (
                  <>
                    <span>·</span>
                    <span>{(model.contextLength / 1000).toFixed(0)}K context</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/console">
              <Button size="sm" variant="gradient">
                <Zap className="h-3.5 w-3.5" />
                API Kullan
              </Button>
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="playground">
          <TabsList>
            <TabsTrigger value="playground">
              <Zap className="h-3.5 w-3.5" />
              Playground
            </TabsTrigger>
            <TabsTrigger value="overview">
              <BookOpen className="h-3.5 w-3.5" />
              Genel Bakış
            </TabsTrigger>
            <TabsTrigger value="schema">
              <Code2 className="h-3.5 w-3.5" />
              I/O Şeması
            </TabsTrigger>
            <TabsTrigger value="pricing">
              <DollarSign className="h-3.5 w-3.5" />
              Fiyatlandırma
            </TabsTrigger>
          </TabsList>

          {/* Playground */}
          <TabsContent value="playground">
            {model.modality === "text" ? (
              <Playground model={model} />
            ) : (
              <div className="rounded-xl border border-white/5 bg-card p-12 text-center">
                <p className="text-muted-foreground">
                  {model.modality === "image"
                    ? "Görüntü playground yakında"
                    : `${MODALITY_LABELS[model.modality]} playground yakında`}
                </p>
                <Link href="/console" className="mt-4 inline-block">
                  <Button variant="gradient" size="sm">API ile Kullan</Button>
                </Link>
              </div>
            )}
          </TabsContent>

          {/* Overview */}
          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-white/5 bg-card p-6">
                <h3 className="font-semibold mb-3">Açıklama</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{model.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {model.tags.map((t) => (
                    <span key={t} className="rounded-full bg-white/5 border border-white/5 px-2.5 py-0.5 text-xs text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-white/5 bg-card p-6">
                <h3 className="font-semibold mb-4">Özellikler</h3>
                <dl className="space-y-3">
                  {[
                    { label: "Modalite", value: MODALITY_LABELS[model.modality] },
                    { label: "Sağlayıcı", value: model.provider === "papagan" ? "Papagan" : model.provider },
                    { label: "Latency", value: model.latency },
                    { label: "Streaming", value: model.streaming ? "✓ Destekleniyor" : "✗" },
                    { label: "Async", value: model.async ? "✓ Destekleniyor" : "✗" },
                    ...(model.contextLength ? [{ label: "Konteks Uzunluğu", value: `${model.contextLength.toLocaleString()} token` }] : []),
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between text-sm">
                      <dt className="text-muted-foreground">{row.label}</dt>
                      <dd className="font-medium text-foreground capitalize">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </TabsContent>

          {/* Schema */}
          <TabsContent value="schema">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Girdiler", fields: model.schema.inputs },
                { title: "Çıktılar", fields: model.schema.outputs },
              ].map(({ title, fields }) => (
                <div key={title} className="rounded-xl border border-white/5 bg-card overflow-hidden">
                  <div className="border-b border-white/5 px-5 py-3">
                    <h3 className="text-sm font-semibold">{title}</h3>
                  </div>
                  <div className="divide-y divide-white/5">
                    {fields.map((f) => (
                      <div key={f.name} className="px-5 py-4">
                        <div className="flex items-center gap-2 mb-1">
                          <code className="text-sm font-mono text-foreground">{f.name}</code>
                          <span className={`text-xs font-mono ${TYPE_COLORS[f.type] ?? "text-muted-foreground"}`}>
                            {f.type}
                          </span>
                          {f.required && (
                            <span className="text-[10px] rounded border border-red-500/20 bg-red-500/10 text-red-400 px-1.5 py-0.5">
                              zorunlu
                            </span>
                          )}
                        </div>
                        {f.description && (
                          <p className="text-xs text-muted-foreground">{f.description}</p>
                        )}
                        {f.default !== undefined && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Varsayılan: <code className="text-foreground/70">{JSON.stringify(f.default)}</code>
                          </p>
                        )}
                        {f.enum && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {f.enum.map((v) => (
                              <code key={v} className="text-[10px] rounded bg-white/5 px-1.5 py-0.5 text-muted-foreground">
                                {v}
                              </code>
                            ))}
                          </div>
                        )}
                        {(f.min !== undefined || f.max !== undefined) && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Aralık: {f.min ?? "−∞"} — {f.max ?? "∞"}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Pricing */}
          <TabsContent value="pricing">
            <div className="max-w-lg">
              <div className="rounded-xl border border-white/5 bg-card p-6">
                <h3 className="font-semibold mb-6">Fiyatlandırma Detayı</h3>
                <div className="space-y-4">
                  {model.pricing.input !== undefined && (
                    <div className="flex justify-between items-center py-3 border-b border-white/5">
                      <div>
                        <p className="text-sm font-medium">Girdi Tokeni</p>
                        <p className="text-xs text-muted-foreground">1 milyon token başına</p>
                      </div>
                      <span className="font-mono font-semibold text-brand-300">${model.pricing.input}</span>
                    </div>
                  )}
                  {model.pricing.output !== undefined && (
                    <div className="flex justify-between items-center py-3 border-b border-white/5">
                      <div>
                        <p className="text-sm font-medium">Çıktı Tokeni</p>
                        <p className="text-xs text-muted-foreground">1 milyon token başına</p>
                      </div>
                      <span className="font-mono font-semibold text-brand-300">${model.pricing.output}</span>
                    </div>
                  )}
                  {model.pricing.image !== undefined && (
                    <div className="flex justify-between items-center py-3 border-b border-white/5">
                      <div>
                        <p className="text-sm font-medium">Görüntü Üretimi</p>
                        <p className="text-xs text-muted-foreground">Görüntü başına</p>
                      </div>
                      <span className="font-mono font-semibold text-brand-300">${model.pricing.image}</span>
                    </div>
                  )}
                  {model.pricing.perSecond !== undefined && (
                    <div className="flex justify-between items-center py-3 border-b border-white/5">
                      <div>
                        <p className="text-sm font-medium">İşlem Süresi</p>
                        <p className="text-xs text-muted-foreground">Saniye başına</p>
                      </div>
                      <span className="font-mono font-semibold text-brand-300">${model.pricing.perSecond}</span>
                    </div>
                  )}
                </div>
                <div className="mt-6 rounded-lg bg-brand-500/10 border border-brand-500/20 p-4">
                  <p className="text-xs text-brand-300">
                    💡 Ücretsiz katmanda aylık 1M token dahil. Daha fazla kapasite için{" "}
                    <Link href="/pricing" className="underline">fiyatlandırma sayfasına</Link> göz atın.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
