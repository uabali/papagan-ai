"use client";
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download, ChevronRight, X } from "lucide-react";
import { formatRelative } from "@/lib/utils";
import { cn } from "@/lib/utils";

const MODELS = ["all", "llama-3.1-70b", "mistral-7b-instruct", "sdxl-turbo", "bge-m3", "whisper-large-v3"];

interface LogEntry {
  id: string;
  model: string;
  status: "success" | "error" | "timeout";
  latency: number;
  tokens?: number;
  cost: number;
  time: string;
  error?: string;
  ip: string;
  keyName: string;
}

function generateLogs(): LogEntry[] {
  const models = ["llama-3.1-70b", "mistral-7b-instruct", "sdxl-turbo", "bge-m3", "whisper-large-v3"];
  const statuses: Array<"success" | "error" | "timeout"> = ["success", "success", "success", "success", "error", "timeout"];
  const keys = ["Production", "Development"];
  return Array.from({ length: 50 }, (_, i) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const model = models[Math.floor(Math.random() * models.length)];
    const latency = Math.floor(Math.random() * 2000) + 50;
    return {
      id: `req_01JT${String(i).padStart(4, "0")}`,
      model,
      status,
      latency,
      tokens: model.includes("sdxl") || model.includes("whisper") ? undefined : Math.floor(Math.random() * 2000) + 100,
      cost: parseFloat((Math.random() * 0.01).toFixed(6)),
      time: new Date(Date.now() - i * 1000 * 60 * (Math.random() * 5 + 1)).toISOString(),
      error: status === "error" ? "rate_limit_exceeded" : status === "timeout" ? "request_timeout" : undefined,
      ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      keyName: keys[Math.floor(Math.random() * keys.length)],
    };
  });
}

const LOGS = generateLogs();

const STATUS_COLOR = {
  success: "text-emerald-400 bg-emerald-400/10",
  error: "text-red-400 bg-red-400/10",
  timeout: "text-yellow-400 bg-yellow-400/10",
};

export default function LogsPage() {
  const [search, setSearch] = useState("");
  const [modelFilter, setModelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<LogEntry | null>(null);

  const filtered = useMemo(() => {
    return LOGS.filter((l) => {
      const matchSearch = !search || l.id.includes(search) || l.model.includes(search);
      const matchModel = modelFilter === "all" || l.model === modelFilter;
      const matchStatus = statusFilter === "all" || l.status === statusFilter;
      return matchSearch && matchModel && matchStatus;
    });
  }, [search, modelFilter, statusFilter]);

  return (
    <div className="flex h-full">
      {/* Main */}
      <div className="flex-1 overflow-y-auto p-6 max-w-5xl">
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold">Request Logları</h1>
            <p className="text-sm text-muted-foreground mt-0.5">demo-project · Son 7 gün</p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-5 flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Request ID veya model ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 text-xs"
            />
          </div>
          <Select value={modelFilter} onValueChange={setModelFilter}>
            <SelectTrigger className="w-44 h-8 text-xs">
              <SelectValue placeholder="Model" />
            </SelectTrigger>
            <SelectContent>
              {MODELS.map((m) => (
                <SelectItem key={m} value={m} className="text-xs">
                  {m === "all" ? "Tüm Modeller" : m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32 h-8 text-xs">
              <SelectValue placeholder="Durum" />
            </SelectTrigger>
            <SelectContent>
              {["all", "success", "error", "timeout"].map((s) => (
                <SelectItem key={s} value={s} className="text-xs capitalize">
                  {s === "all" ? "Tüm Durumlar" : s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-xs text-muted-foreground">{filtered.length} kayıt</span>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-white/5 bg-card overflow-hidden">
          <div className="grid grid-cols-[1.5fr_1fr_80px_80px_80px_24px] gap-3 px-4 py-2.5 border-b border-white/5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            <span>Request ID</span>
            <span>Model</span>
            <span>Durum</span>
            <span className="text-right">Latency</span>
            <span className="text-right">Maliyet</span>
            <span />
          </div>
          <div className="divide-y divide-white/5">
            {filtered.slice(0, 30).map((log) => (
              <div
                key={log.id}
                onClick={() => setSelected(log === selected ? null : log)}
                className={cn(
                  "grid grid-cols-[1.5fr_1fr_80px_80px_80px_24px] gap-3 items-center px-4 py-3 cursor-pointer hover:bg-white/[0.02] transition-colors text-xs",
                  selected?.id === log.id && "bg-brand-500/5"
                )}
              >
                <span className="font-mono text-foreground">{log.id}</span>
                <span className="text-muted-foreground truncate">{log.model}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium w-fit ${STATUS_COLOR[log.status]}`}>
                  {log.status}
                </span>
                <span className="text-right text-muted-foreground">{log.latency}ms</span>
                <span className="text-right font-mono text-muted-foreground">${log.cost.toFixed(5)}</span>
                <ChevronRight className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform", selected?.id === log.id && "rotate-90")} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="w-72 border-l border-white/5 bg-card overflow-y-auto p-5 shrink-0">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold">Detay</h3>
            <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <dl className="space-y-3 text-xs">
            {[
              { label: "Request ID", value: selected.id, mono: true },
              { label: "Model", value: selected.model },
              { label: "Durum", value: selected.status },
              { label: "Latency", value: `${selected.latency}ms` },
              { label: "Maliyet", value: `$${selected.cost.toFixed(6)}`, mono: true },
              ...(selected.tokens ? [{ label: "Tokenlar", value: selected.tokens.toString() }] : []),
              { label: "API Anahtarı", value: selected.keyName },
              { label: "IP", value: selected.ip, mono: true },
              { label: "Zaman", value: formatRelative(selected.time) },
              ...(selected.error ? [{ label: "Hata", value: selected.error, error: true }] : []),
            ].map((row) => (
              <div key={row.label}>
                <dt className="text-muted-foreground mb-0.5">{row.label}</dt>
                <dd className={cn("font-medium", row.mono && "font-mono", (row as { error?: boolean }).error && "text-red-400")}>
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
