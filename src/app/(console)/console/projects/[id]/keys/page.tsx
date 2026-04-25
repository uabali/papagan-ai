"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Key, Plus, Copy, Check, Eye, EyeOff, Trash2, RefreshCw, AlertTriangle } from "lucide-react";
import { maskKey, formatRelative } from "@/lib/utils";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  scopes: string[];
  active: boolean;
}

const MOCK_KEYS: ApiKey[] = [
  {
    id: "key_01",
    name: "Production",
    key: "ppg-sk-prod-1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p",
    created: "2025-03-15",
    lastUsed: "2025-04-25T14:22:00Z",
    scopes: ["inference", "models:read"],
    active: true,
  },
  {
    id: "key_02",
    name: "Development",
    key: "ppg-sk-dev-9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k",
    created: "2025-04-01",
    lastUsed: "2025-04-25T10:05:00Z",
    scopes: ["inference", "models:read", "fine-tunes:write"],
    active: true,
  },
];

function ApiKeyRow({ apiKey }: { apiKey: ApiKey }) {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(apiKey.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="px-5 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-sm font-semibold text-foreground">{apiKey.name}</h3>
          <Badge variant={apiKey.active ? "success" : "secondary"} className="text-[10px]">
            {apiKey.active ? "Aktif" : "İnaktif"}
          </Badge>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground bg-white/5 rounded-lg px-3 py-1.5 w-fit">
          <Key className="h-3 w-3 shrink-0" />
          <span>{visible ? apiKey.key : maskKey(apiKey.key)}</span>
          <button onClick={() => setVisible(!visible)} className="ml-1 hover:text-foreground transition-colors">
            {visible ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
          </button>
          <button onClick={copy} className="hover:text-foreground transition-colors">
            {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
          </button>
        </div>
        <div className="mt-2 flex items-center gap-4 text-[11px] text-muted-foreground">
          <span>Oluşturuldu: {apiKey.created}</span>
          <span>·</span>
          <span>Son kullanım: {formatRelative(apiKey.lastUsed)}</span>
        </div>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {apiKey.scopes.map((s) => (
            <span key={s} className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-muted-foreground font-mono">
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Button variant="ghost" size="icon-sm" title="Rotate">
          <RefreshCw className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="icon-sm" className="text-red-400 hover:text-red-300 hover:bg-red-500/10" title="Sil">
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}

export default function ApiKeysPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const create = () => {
    if (!newKeyName.trim()) return;
    setCreatedKey("ppg-sk-new-" + Math.random().toString(36).slice(2, 34));
    setNewKeyName("");
    setShowCreate(false);
  };

  const copyNew = () => {
    if (createdKey) navigator.clipboard.writeText(createdKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">API Anahtarları</h1>
          <p className="text-sm text-muted-foreground mt-0.5">demo-project</p>
        </div>
        <Button variant="gradient" size="sm" onClick={() => setShowCreate(true)}>
          <Plus className="h-3.5 w-3.5" />
          Yeni Anahtar
        </Button>
      </div>

      {/* Warning */}
      <div className="mb-5 flex items-start gap-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5 px-4 py-3">
        <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 shrink-0" />
        <p className="text-xs text-yellow-300">
          API anahtarlarını gizli tutun. Yalnızca oluşturma anında tam anahtar görünür. Bundan sonra maskeli gösterilir.
        </p>
      </div>

      {/* Newly created key alert */}
      {createdKey && (
        <div className="mb-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-emerald-300 mb-2">
                ✓ Yeni API anahtarınız oluşturuldu
              </p>
              <p className="text-xs text-muted-foreground mb-2">
                Bu anahtarı şimdi kopyalayın. Bundan sonra bir daha tam haliyle göremezsiniz.
              </p>
              <code className="block text-xs font-mono bg-black/30 rounded-lg px-3 py-2 text-emerald-300 break-all">
                {createdKey}
              </code>
            </div>
            <button
              onClick={copyNew}
              className="shrink-0 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
          <button
            onClick={() => setCreatedKey(null)}
            className="mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Kapat
          </button>
        </div>
      )}

      {/* Create form */}
      {showCreate && (
        <div className="mb-5 rounded-xl border border-white/10 bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Yeni API Anahtarı</h3>
          <div className="flex gap-3">
            <Input
              placeholder="Anahtar adı (ör: Production)"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && create()}
              className="flex-1"
            />
            <Button variant="gradient" onClick={create} disabled={!newKeyName.trim()}>
              Oluştur
            </Button>
            <Button variant="outline" onClick={() => setShowCreate(false)}>
              İptal
            </Button>
          </div>
        </div>
      )}

      {/* Keys list */}
      <div className="rounded-xl border border-white/5 bg-card overflow-hidden">
        <div className="border-b border-white/5 px-5 py-3 flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">{MOCK_KEYS.length} anahtar</span>
        </div>
        <div className="divide-y divide-white/5">
          {MOCK_KEYS.map((k) => (
            <ApiKeyRow key={k.id} apiKey={k} />
          ))}
        </div>
      </div>
    </div>
  );
}
