"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Cpu, Square, Play, Terminal, ExternalLink } from "lucide-react";
import { formatRelative } from "@/lib/utils";

interface Instance {
  id: string;
  name: string;
  gpu: string;
  vram: string;
  vcpus: number;
  ram: string;
  status: "running" | "stopped" | "starting";
  ip?: string;
  createdAt: string;
  cost: string;
}

const INSTANCES: Instance[] = [
  {
    id: "inst_01",
    name: "training-node-1",
    gpu: "NVIDIA A100",
    vram: "80GB",
    vcpus: 12,
    ram: "96GB",
    status: "running",
    ip: "10.0.1.42",
    createdAt: "2025-04-24T10:00:00Z",
    cost: "$2.40/saat",
  },
  {
    id: "inst_02",
    name: "dev-instance",
    gpu: "NVIDIA A10G",
    vram: "24GB",
    vcpus: 8,
    ram: "32GB",
    status: "stopped",
    createdAt: "2025-04-20T08:00:00Z",
    cost: "$1.20/saat",
  },
];

const GPU_CATALOG = [
  { gpu: "NVIDIA A10G", vram: "24GB", vcpus: 8, ram: "32GB", price: "$1.20/saat" },
  { gpu: "NVIDIA A100", vram: "40GB", vcpus: 12, ram: "96GB", price: "$2.00/saat" },
  { gpu: "NVIDIA A100", vram: "80GB", vcpus: 12, ram: "96GB", price: "$2.40/saat" },
  { gpu: "NVIDIA H100", vram: "80GB", vcpus: 16, ram: "128GB", price: "$4.80/saat" },
];

const STATUS_BADGE: Record<string, "success" | "secondary" | "warning"> = {
  running: "success",
  stopped: "secondary",
  starting: "warning",
};

export default function ComputePage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Compute</h1>
          <p className="text-sm text-muted-foreground mt-0.5">demo-project · Ham GPU Erişimi</p>
        </div>
        <Button variant="gradient" size="sm">
          <Plus className="h-3.5 w-3.5" />
          Instance Başlat
        </Button>
      </div>

      {/* Instances */}
      {INSTANCES.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold mb-4">Aktif Instance'lar</h2>
          <div className="space-y-3">
            {INSTANCES.map((inst) => (
              <div key={inst.id} className="rounded-xl border border-white/5 bg-card p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 shrink-0">
                      <Cpu className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{inst.name}</h3>
                        <Badge variant={STATUS_BADGE[inst.status]} className="text-[10px]">
                          {inst.status === "running" ? "Çalışıyor" : inst.status === "stopped" ? "Durduruldu" : "Başlıyor"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {inst.gpu} · {inst.vram} VRAM · {inst.vcpus} vCPU · {inst.ram} RAM
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span>{inst.cost}</span>
                        {inst.ip && <><span>·</span><code className="font-mono">{inst.ip}</code></>}
                        <span>·</span>
                        <span>Oluşturuldu: {formatRelative(inst.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {inst.status === "running" && (
                      <>
                        <Button variant="outline" size="sm">
                          <Terminal className="h-3.5 w-3.5" />
                          SSH
                        </Button>
                        <Button variant="ghost" size="icon-sm" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                          <Square className="h-3.5 w-3.5" />
                        </Button>
                      </>
                    )}
                    {inst.status === "stopped" && (
                      <Button variant="gradient" size="sm">
                        <Play className="h-3.5 w-3.5" />
                        Başlat
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GPU Catalog */}
      <div>
        <h2 className="text-sm font-semibold mb-4">GPU Kataloğu</h2>
        <div className="rounded-xl border border-white/5 bg-card overflow-hidden">
          <div className="grid grid-cols-5 px-5 py-3 border-b border-white/5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            <span>GPU</span>
            <span>VRAM</span>
            <span>vCPU / RAM</span>
            <span>Fiyat</span>
            <span />
          </div>
          {GPU_CATALOG.map((g, i) => (
            <div
              key={i}
              className={`grid grid-cols-5 px-5 py-4 items-center text-sm ${i < GPU_CATALOG.length - 1 ? "border-b border-white/5" : ""}`}
            >
              <span className="font-medium">{g.gpu}</span>
              <span className="text-muted-foreground">{g.vram}</span>
              <span className="text-muted-foreground">{g.vcpus} / {g.ram}</span>
              <span className="font-mono text-brand-300">{g.price}</span>
              <div className="flex justify-end">
                <Button variant="outline" size="sm" className="text-xs">
                  Başlat
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
