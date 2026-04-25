"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

export function CTA() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-radial from-brand-600/10 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto max-w-3xl px-4 sm:px-6 text-center"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-1.5">
          <Zap className="h-3.5 w-3.5 text-brand-400" />
          <span className="text-xs font-medium text-brand-300">Ücretsiz katmanla başlayın</span>
        </div>

        <h2 className="mb-5 text-4xl lg:text-5xl font-bold leading-tight">
          <span className="text-gradient">İlk API çağrınızı</span>
          <br />
          <span className="text-gradient-brand">bugün yapın</span>
        </h2>

        <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
          Kredi kartı gerektirmez. Birkaç dakikada API anahtarınızı alın,
          100+ modele erişin ve üretim altyapınızı kurun.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/console">
            <Button size="xl" variant="gradient" className="group w-full sm:w-auto">
              Hemen Başla — Ücretsiz
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/docs">
            <Button size="xl" variant="outline" className="w-full sm:w-auto">
              Dökümanları İncele
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Ücretsiz katman: <span className="text-foreground">1M token/ay</span> ·{" "}
          <span className="text-foreground">10 görüntü/gün</span> · Kredi kartı yok
        </p>
      </motion.div>
    </section>
  );
}
