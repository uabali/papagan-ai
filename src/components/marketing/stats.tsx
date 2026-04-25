"use client";
import React from "react";
import { motion } from "framer-motion";

const STATS = [
  { value: "< 100ms", label: "P50 Latency", sub: "Serverless inference" },
  { value: "99.99%", label: "Uptime SLA", sub: "Kurumsal tier" },
  { value: "100+", label: "Model", sub: "7 modalite" },
  { value: "10M+", label: "İstek/gün", sub: "Global infra" },
];

const LOGOS = ["Acme Corp", "TechStart", "AI Labs", "DevCo", "DataFlow", "BuildFast"];

export function Stats() {
  return (
    <section className="py-20 border-y border-white/5 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Numbers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl lg:text-4xl font-bold text-gradient-brand mb-1">{s.value}</div>
              <div className="text-sm font-medium text-foreground mb-0.5">{s.label}</div>
              <div className="text-xs text-muted-foreground">{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Logo strip */}
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-8">
            Güvenilen platformlar tarafından tercih edilen
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {LOGOS.map((name) => (
              <span
                key={name}
                className="text-sm font-semibold text-muted-foreground/50 hover:text-muted-foreground/80 transition-colors cursor-default"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
