"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Key, BarChart3, FileText, TrendingUp, TrendingDown } from "lucide-react";

const STATS = [
  { label: "Bugünkü İstekler", value: "12,847", change: "+18%", up: true },
  { label: "Toplam Token", value: "4.2M", change: "+8%", up: true },
  { label: "Ortalama Latency", value: "142ms", change: "-12%", up: true },
  { label: "Bugünkü Maliyet", value: "$1.24", change: "+5%", up: false },
];

const RECENT_REQUESTS = [
  { id: "req_01JT9K", model: "llama-3.1-70b", status: "success", latency: "241ms", cost: "$0.0012", time: "az önce" },
  { id: "req_01JT9J", model: "sdxl-turbo", status: "success", latency: "892ms", cost: "$0.002", time: "1m önce" },
  { id: "req_01JT9I", model: "mistral-7b-instruct", status: "error", latency: "50ms", cost: "$0.0000", time: "3m önce" },
  { id: "req_01JT9H", model: "bge-m3", status: "success", latency: "45ms", cost: "$0.0001", time: "5m önce" },
  { id: "req_01JT9G", model: "whisper-large-v3", status: "success", latency: "1.2s", cost: "$0.0036", time: "7m önce" },
];

export default function ConsoleDashboard() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Genel Bakış</h1>
          <p className="text-sm text-muted-foreground mt-0.5">demo-project · Pro Plan</p>
        </div>
        <Link href="/console/projects/demo/keys">
          <Button variant="gradient" size="sm">
            <Key className="h-3.5 w-3.5" />
            API Anahtarı Al
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-xl border border-white/5 bg-card p-5">
            <p className="text-xs text-muted-foreground mb-2">{s.label}</p>
            <p className="text-2xl font-bold text-foreground mb-1">{s.value}</p>
            <div className={`flex items-center gap-1 text-xs ${s.up ? "text-emerald-400" : "text-red-400"}`}>
              {s.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {s.change} (7 gün)
            </div>
          </div>
        ))}
      </div>

      {/* Quick links + recent */}
      <div className="grid lg:grid-cols-[1fr_2fr] gap-6">
        {/* Quick links */}
        <div className="rounded-xl border border-white/5 bg-card p-5">
          <h2 className="text-sm font-semibold mb-4">Hızlı Erişim</h2>
          <div className="space-y-1.5">
            {[
              { icon: Key, label: "API Anahtarları", href: "/console/projects/demo/keys", desc: "2 aktif anahtar" },
              { icon: BarChart3, label: "Kullanım Raporu", href: "/console/projects/demo/usage", desc: "Bu ay: 4.2M token" },
              { icon: FileText, label: "Request Logları", href: "/console/projects/demo/logs", desc: "Son 7 gün" },
            ].map((l) => (
              <Link key={l.href} href={l.href}>
                <div className="flex items-center gap-3 rounded-lg p-3 hover:bg-white/5 transition-colors group">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10">
                    <l.icon className="h-4 w-4 text-brand-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{l.label}</p>
                    <p className="text-xs text-muted-foreground">{l.desc}</p>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent requests */}
        <div className="rounded-xl border border-white/5 bg-card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <h2 className="text-sm font-semibold">Son İstekler</h2>
            <Link href="/console/projects/demo/logs">
              <Button variant="ghost" size="sm" className="text-xs">
                Tümünü Gör
                <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {RECENT_REQUESTS.map((r) => (
              <div key={r.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full shrink-0 ${r.status === "success" ? "bg-emerald-400" : "bg-red-400"}`} />
                  <div>
                    <p className="text-xs font-mono text-foreground">{r.id}</p>
                    <p className="text-[11px] text-muted-foreground">{r.model}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-xs text-muted-foreground">
                  <span>{r.latency}</span>
                  <span className="font-mono">{r.cost}</span>
                  <span>{r.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
