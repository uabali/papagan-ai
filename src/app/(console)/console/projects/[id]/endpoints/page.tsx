"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Server, Play, Pause, Trash2, RefreshCw, ExternalLink } from "lucide-react";
import { formatRelative } from "@/lib/utils";

interface Endpoint {
  id: string;
  name: string;
  model: string;
  status: "running" | "stopped" | "deploying";
  instances: number;
  gpu: string;
  url: string;
  created: string;
  rps: number;
  latency: number;
}

const ENDPOINTS: Endpoint[] = [
  {
    id: "ep_01",
    name: "production-llm",
    model: "papagan/llama-3.1-70b",
    status: "running",
    instances: 2,
    gpu: "A100 80GB",
    url: "https://ep-01.papagan.run",
    created: "2025-04-01T10:00:00Z",
    rps: 48,
    latency: 180,
  },
  {
    id: "ep_02",
    name: "image-gen-endpoint",
    model: "papagan/flux-pro",
    status: "running",
    instances: 1,
    gpu: "A10G 24GB",
    url: "https://ep-02.papagan.run",
    created: "2025-04-10T08:00:00Z",
    rps: 12,
    latency: 920,
  },
  {
    id: "ep_03",
    name: "dev-test",
    model: "papagan/mistral-7b-instruct",
    status: "stopped",
    instances: 0,
    gpu: "A10G 24GB",
    url: "https://ep-03.papagan.run",
    created: "2025-04-15T12:00:00Z",
    rps: 0,
    latency: 0,
  },
];

const STATUS_BADGE: Record<string, "success" | "secondary" | "warning"> = {
  running: "success",
  stopped: "secondary",
  deploying: "warning",
};

const STATUS_LABEL: Record<string, string> = {
  running: "Çalışıyor",
  stopped: "Durduruldu",
  deploying: "Deploy ediliyor...",
};

export default function EndpointsPage() {
  const [endpoints, setEndpoints] = useState(ENDPOINTS);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dedicated Endpoint'ler</h1>
          <p className="text-sm text-muted-foreground mt-0.5">demo-project</p>
        </div>
        <Button variant="gradient" size="sm">
          <Plus className="h-3.5 w-3.5" />
          Yeni Endpoint
        </Button>
      </div>

      {/* Info */}
      <div className="mb-6 rounded-xl border border-brand-500/20 bg-brand-500/5 px-4 py-3 text-xs text-brand-300">
        Dedicated endpoint'ler seçtiğiniz GPU donanımında modelinizi her zaman hazır tutar. Cold start yok, tahmin edilebilir latency.
      </div>

      <div className="space-y-4">
        {endpoints.map((ep) => (
          <div key={ep.id} className="rounded-xl border border-white/5 bg-card overflow-hidden">
            <div className="flex items-start justify-between p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 shrink-0">
                  <Server className="h-5 w-5 text-brand-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{ep.name}</h3>
                    <Badge variant={STATUS_BADGE[ep.status]} className="text-[10px]">
                      {STATUS_LABEL[ep.status]}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono mb-2">{ep.model}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{ep.gpu}</span>
                    <span>·</span>
                    <span>{ep.instances} instance</span>
                    <span>·</span>
                    <span>Oluşturuldu: {formatRelative(ep.created)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {ep.status === "running" ? (
                  <Button variant="outline" size="sm">
                    <Pause className="h-3.5 w-3.5" />
                    Durdur
                  </Button>
                ) : ep.status === "stopped" ? (
                  <Button variant="gradient" size="sm">
                    <Play className="h-3.5 w-3.5" />
                    Başlat
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" disabled>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    Deploy
                  </Button>
                )}
                <Button variant="ghost" size="icon-sm" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            {ep.status === "running" && (
              <div className="border-t border-white/5 px-5 py-4 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-[11px] text-muted-foreground mb-0.5">RPS (son 5dk)</p>
                  <p className="text-lg font-bold text-foreground">{ep.rps}</p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground mb-0.5">P50 Latency</p>
                  <p className="text-lg font-bold text-foreground">{ep.latency}ms</p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground mb-0.5">Endpoint URL</p>
                  <div className="flex items-center gap-1.5">
                    <code className="text-xs font-mono text-brand-300 truncate">{ep.url}</code>
                    <ExternalLink className="h-3 w-3 text-muted-foreground shrink-0" />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
