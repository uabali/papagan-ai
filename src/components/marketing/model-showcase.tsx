"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MODELS, MODALITY_LABELS } from "@/data/models";

const FEATURED = MODELS.filter((m) => m.featured).slice(0, 6);

const MODALITY_COLORS: Record<string, string> = {
  text: "default",
  image: "success",
  audio: "warning",
  embedding: "secondary",
  video: "destructive",
  multimodal: "secondary",
};

export function ModelShowcase() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/30 to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-3 text-gradient">
              Öne Çıkan Modeller
            </h2>
            <p className="text-muted-foreground">
              Dünya standartlarında modeller, üretim kalitesinde servis
            </p>
          </div>
          <Link href="/models" className="hidden md:block">
            <Button variant="outline" size="sm" className="group">
              Tüm Modeller
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURED.map((model, i) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
            >
              <Link href={`/models/${model.id.split("/")[1]}`}>
                <div className="group h-full rounded-xl border border-white/5 bg-card p-5 hover:border-brand-500/30 hover:bg-card/80 transition-all hover:-translate-y-0.5 cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600/30 to-brand-800/30 border border-brand-500/20">
                        <span className="text-xs font-bold text-brand-300">
                          {model.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{model.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {model.provider === "papagan" ? "Papagan" : model.provider}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {model.badge && (
                        <Badge variant={model.new ? "default" : "secondary"} className="text-[10px]">
                          {model.badge}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                    {model.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant={MODALITY_COLORS[model.modality] as "default" | "success" | "warning" | "secondary"} className="text-[10px]">
                        {MODALITY_LABELS[model.modality]}
                      </Badge>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Zap className="h-2.5 w-2.5" />
                        {model.latency}
                      </div>
                    </div>
                    <div className="text-[11px] font-mono text-muted-foreground">
                      {model.pricing.input
                        ? `$${model.pricing.input}/1M`
                        : model.pricing.image
                        ? `$${model.pricing.image}/img`
                        : "custom"}
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {model.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/models">
            <Button variant="outline" size="sm" className="group">
              Tüm Modelleri Gör
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
