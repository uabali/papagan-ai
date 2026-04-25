"use client";
import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Modality, Provider } from "@/data/models";

const MODALITIES: { value: Modality | "all"; label: string }[] = [
  { value: "all", label: "Tümü" },
  { value: "text", label: "Metin" },
  { value: "image", label: "Görüntü" },
  { value: "audio", label: "Ses" },
  { value: "embedding", label: "Embedding" },
];

const LATENCIES = ["all", "fast", "medium", "slow"] as const;

interface ModelFiltersProps {
  search: string;
  onSearch: (v: string) => void;
  modality: Modality | "all";
  onModality: (v: Modality | "all") => void;
  latency: string;
  onLatency: (v: string) => void;
  count: number;
}

export function ModelFilters({
  search, onSearch, modality, onModality, latency, onLatency, count
}: ModelFiltersProps) {
  const hasFilters = search || modality !== "all" || latency !== "all";

  const clear = () => {
    onSearch("");
    onModality("all");
    onLatency("all");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-60">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Model ara..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <span className="text-sm text-muted-foreground whitespace-nowrap">{count} model</span>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clear} className="gap-1.5">
            <X className="h-3.5 w-3.5" />
            Temizle
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-muted-foreground mr-1">Modalite:</span>
        {MODALITIES.map((m) => (
          <button
            key={m.value}
            onClick={() => onModality(m.value)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              modality === m.value
                ? "border-brand-500/40 bg-brand-500/15 text-brand-300"
                : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground hover:border-white/20"
            )}
          >
            {m.label}
          </button>
        ))}

        <div className="h-4 w-px bg-white/10 mx-1" />

        <span className="text-xs text-muted-foreground mr-1">Hız:</span>
        {LATENCIES.map((l) => (
          <button
            key={l}
            onClick={() => onLatency(l)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors capitalize",
              latency === l
                ? "border-brand-500/40 bg-brand-500/15 text-brand-300"
                : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground hover:border-white/20"
            )}
          >
            {l === "all" ? "Tümü" : l}
          </button>
        ))}
      </div>
    </div>
  );
}
