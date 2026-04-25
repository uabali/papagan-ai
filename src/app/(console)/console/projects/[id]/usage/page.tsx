"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, TrendingUp } from "lucide-react";

const DAILY = [
  { date: "19 Nis", tokens: 380000, cost: 0.41, requests: 2840 },
  { date: "20 Nis", tokens: 520000, cost: 0.58, requests: 3900 },
  { date: "21 Nis", tokens: 290000, cost: 0.32, requests: 2100 },
  { date: "22 Nis", tokens: 640000, cost: 0.71, requests: 4800 },
  { date: "23 Nis", tokens: 710000, cost: 0.79, requests: 5300 },
  { date: "24 Nis", tokens: 890000, cost: 0.99, requests: 6650 },
  { date: "25 Nis", tokens: 760000, cost: 0.85, requests: 5700 },
];

const MODEL_BREAKDOWN = [
  { model: "llama-3.1-70b", tokens: 2_100_000, cost: 1.85, pct: 44 },
  { model: "mistral-7b-instruct", tokens: 1_400_000, cost: 0.14, pct: 29 },
  { model: "sdxl-turbo", tokens: 0, cost: 0.62, pct: 13, images: 310 },
  { model: "bge-m3", tokens: 980_000, cost: 0.02, pct: 10 },
  { model: "whisper-large-v3", tokens: 0, cost: 0.18, pct: 4, minutes: 500 },
];

const maxTokens = Math.max(...DAILY.map((d) => d.tokens));

export default function UsagePage() {
  const [period, setPeriod] = useState("7d");

  const totalTokens = DAILY.reduce((a, b) => a + b.tokens, 0);
  const totalCost = DAILY.reduce((a, b) => a + b.cost, 0);
  const totalRequests = DAILY.reduce((a, b) => a + b.requests, 0);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Kullanım</h1>
          <p className="text-sm text-muted-foreground mt-0.5">demo-project</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Son 7 gün</SelectItem>
              <SelectItem value="30d">Son 30 gün</SelectItem>
              <SelectItem value="90d">Son 90 gün</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-3.5 w-3.5" />
            CSV
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Toplam Token", value: (totalTokens / 1_000_000).toFixed(2) + "M" },
          { label: "Toplam Maliyet", value: "$" + totalCost.toFixed(2) },
          { label: "Toplam İstek", value: totalRequests.toLocaleString() },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-white/5 bg-card px-5 py-4">
            <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
            <p className="text-xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="mb-8 rounded-xl border border-white/5 bg-card overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5">
          <h2 className="text-sm font-semibold">Günlük Token Kullanımı</h2>
        </div>
        <div className="p-5">
          <div className="flex items-end gap-2 h-40">
            {DAILY.map((d) => {
              const h = Math.round((d.tokens / maxTokens) * 100);
              return (
                <div key={d.date} className="flex-1 flex flex-col items-center gap-1.5 group">
                  <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {(d.tokens / 1000).toFixed(0)}K
                  </span>
                  <div className="w-full relative">
                    <div
                      className="w-full bg-brand-500/70 hover:bg-brand-500 rounded-t transition-colors"
                      style={{ height: `${h * 1.2}px` }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{d.date}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Model breakdown */}
      <div className="rounded-xl border border-white/5 bg-card overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5">
          <h2 className="text-sm font-semibold">Model Bazlı Dağılım</h2>
        </div>
        <div className="divide-y divide-white/5">
          {MODEL_BREAKDOWN.map((m) => (
            <div key={m.model} className="px-5 py-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <code className="text-xs font-mono text-foreground">{m.model}</code>
                  <span className="text-xs text-muted-foreground">
                    {m.tokens > 0
                      ? `${(m.tokens / 1_000_000).toFixed(2)}M token`
                      : m.images
                      ? `${m.images} görüntü`
                      : m.minutes
                      ? `${m.minutes} dakika`
                      : ""}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-muted-foreground">{m.pct}%</span>
                  <span className="font-mono font-medium text-foreground">${m.cost.toFixed(2)}</span>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-brand-500/70"
                  style={{ width: `${m.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
