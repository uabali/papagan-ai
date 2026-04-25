"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ModelFilters } from "@/components/marketing/model-filters";
import { MODELS, MODALITY_LABELS, type Modality } from "@/data/models";
import { Zap, MessageSquare, Image, Mic, Hash } from "lucide-react";

const MODALITY_ICONS: Record<string, React.ElementType> = {
  text: MessageSquare,
  image: Image,
  audio: Mic,
  embedding: Hash,
  multimodal: Zap,
  video: Zap,
};

const MODALITY_BADGE: Record<string, "default" | "success" | "warning" | "secondary"> = {
  text: "default",
  image: "success",
  audio: "warning",
  embedding: "secondary",
  multimodal: "secondary",
  video: "destructive",
};

const LATENCY_COLOR: Record<string, string> = {
  fast: "text-emerald-400",
  medium: "text-yellow-400",
  slow: "text-red-400",
};

export default function ModelsPage() {
  const [search, setSearch] = useState("");
  const [modality, setModality] = useState<Modality | "all">("all");
  const [latency, setLatency] = useState("all");

  const filtered = useMemo(() => {
    return MODELS.filter((m) => {
      const matchSearch =
        !search ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.description.toLowerCase().includes(search.toLowerCase()) ||
        m.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchModality = modality === "all" || m.modality === modality;
      const matchLatency = latency === "all" || m.latency === latency;
      return matchSearch && matchModality && matchLatency;
    });
  }, [search, modality, latency]);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gradient mb-3">Model Kataloğu</h1>
          <p className="text-lg text-muted-foreground">
            En iyi açık kaynak ve özel yapay zeka modellerine tek API ile erişin
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <ModelFilters
            search={search}
            onSearch={setSearch}
            modality={modality}
            onModality={setModality}
            latency={latency}
            onLatency={setLatency}
            count={filtered.length}
          />
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center text-muted-foreground">
            <p className="text-lg font-medium mb-2">Sonuç bulunamadı</p>
            <p className="text-sm">Filtrelerinizi değiştirmeyi deneyin</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((model) => {
              const Icon = MODALITY_ICONS[model.modality] ?? Zap;
              return (
                <Link key={model.id} href={`/models/${encodeURIComponent(model.id)}`}>
                  <div className="group h-full rounded-xl border border-white/5 bg-card p-5 hover:border-brand-500/30 hover:bg-card/70 transition-all hover:-translate-y-0.5 cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600/20 to-brand-900/40 border border-brand-500/20 group-hover:border-brand-500/40 transition-colors">
                          <Icon className="h-5 w-5 text-brand-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-foreground">{model.name}</h3>
                            {model.badge && (
                              <Badge variant="default" className="text-[9px] py-0">
                                {model.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground capitalize">
                            {model.provider === "papagan" ? "Papagan" : model.provider}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                      {model.description}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                      <Badge variant={MODALITY_BADGE[model.modality]} className="text-[10px]">
                        {MODALITY_LABELS[model.modality]}
                      </Badge>
                      <div className="flex items-center gap-3 text-[11px]">
                        <span className={LATENCY_COLOR[model.latency]}>● {model.latency}</span>
                        {model.streaming && (
                          <span className="text-muted-foreground">streaming</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <div className="flex flex-wrap gap-1">
                        {model.tags.slice(0, 2).map((t) => (
                          <span key={t} className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="text-[11px] font-mono text-right">
                        {model.pricing.input ? (
                          <span className="text-foreground">${model.pricing.input}<span className="text-muted-foreground">/1M tok</span></span>
                        ) : model.pricing.image ? (
                          <span className="text-foreground">${model.pricing.image}<span className="text-muted-foreground">/img</span></span>
                        ) : model.pricing.perSecond ? (
                          <span className="text-foreground">${model.pricing.perSecond}<span className="text-muted-foreground">/sn</span></span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
