"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Layers, ChevronRight, BarChart3, Download } from "lucide-react";
import { formatRelative } from "@/lib/utils";

interface FineTuneJob {
  id: string;
  name: string;
  baseModel: string;
  status: "running" | "completed" | "failed" | "queued";
  createdAt: string;
  completedAt?: string;
  trainLoss?: number;
  valLoss?: number;
  steps: number;
  totalSteps: number;
  datasetSize: number;
}

const JOBS: FineTuneJob[] = [
  {
    id: "ft_01",
    name: "customer-support-v2",
    baseModel: "mistral-7b-instruct",
    status: "completed",
    createdAt: "2025-04-20T08:00:00Z",
    completedAt: "2025-04-20T10:24:00Z",
    trainLoss: 0.312,
    valLoss: 0.341,
    steps: 5000,
    totalSteps: 5000,
    datasetSize: 12400,
  },
  {
    id: "ft_02",
    name: "code-assistant-llama",
    baseModel: "llama-3.1-8b",
    status: "running",
    createdAt: "2025-04-25T09:00:00Z",
    trainLoss: 0.528,
    valLoss: 0.571,
    steps: 1842,
    totalSteps: 5000,
    datasetSize: 8300,
  },
  {
    id: "ft_03",
    name: "classification-experiment",
    baseModel: "mistral-7b-instruct",
    status: "queued",
    createdAt: "2025-04-25T14:00:00Z",
    steps: 0,
    totalSteps: 3000,
    datasetSize: 5000,
  },
  {
    id: "ft_04",
    name: "summarization-v1",
    baseModel: "llama-3.1-8b",
    status: "failed",
    createdAt: "2025-04-19T16:00:00Z",
    steps: 420,
    totalSteps: 3000,
    datasetSize: 2100,
  },
];

const STATUS_BADGE: Record<string, "success" | "warning" | "secondary" | "destructive"> = {
  completed: "success",
  running: "warning",
  queued: "secondary",
  failed: "destructive",
};

const STATUS_LABEL: Record<string, string> = {
  completed: "Tamamlandı",
  running: "Eğitiliyor",
  queued: "Kuyrukta",
  failed: "Başarısız",
};

export default function FineTunesPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Fine-tuning</h1>
          <p className="text-sm text-muted-foreground mt-0.5">demo-project</p>
        </div>
        <Button variant="gradient" size="sm">
          <Plus className="h-3.5 w-3.5" />
          Yeni Job
        </Button>
      </div>

      <div className="space-y-3">
        {JOBS.map((job) => {
          const pct = Math.round((job.steps / job.totalSteps) * 100);
          return (
            <div key={job.id} className="rounded-xl border border-white/5 bg-card p-5">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/10 shrink-0">
                    <Layers className="h-4.5 w-4.5 text-brand-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-sm font-semibold">{job.name}</h3>
                      <Badge variant={STATUS_BADGE[job.status]} className="text-[10px]">
                        {STATUS_LABEL[job.status]}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono">{job.baseModel}</p>
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-1">
                      <span>Oluşturuldu: {formatRelative(job.createdAt)}</span>
                      {job.completedAt && <><span>·</span><span>Tamamlandı: {formatRelative(job.completedAt)}</span></>}
                      <span>·</span>
                      <span>{job.datasetSize.toLocaleString()} örnek</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {job.status === "completed" && (
                    <Button variant="outline" size="sm">
                      <Download className="h-3.5 w-3.5" />
                      Modeli İndir
                    </Button>
                  )}
                  <Button variant="ghost" size="icon-sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-3">
                <div className="flex justify-between text-[11px] text-muted-foreground mb-1.5">
                  <span>{job.steps.toLocaleString()} / {job.totalSteps.toLocaleString()} step</span>
                  <span>{pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      job.status === "failed" ? "bg-red-500" :
                      job.status === "completed" ? "bg-emerald-500" :
                      "bg-brand-500"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {/* Metrics */}
              {(job.trainLoss !== undefined || job.valLoss !== undefined) && (
                <div className="flex items-center gap-6 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <BarChart3 className="h-3 w-3" />
                    <span>Train loss: <code className="text-foreground">{job.trainLoss?.toFixed(3)}</code></span>
                  </div>
                  <div>
                    Val loss: <code className="text-foreground">{job.valLoss?.toFixed(3)}</code>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
