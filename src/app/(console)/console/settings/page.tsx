"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Webhook, Bell, Globe, Trash2, Plus } from "lucide-react";

export default function SettingsPage() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [slackAlerts, setSlackAlerts] = useState(false);
  const [rateLimitAlert, setRateLimitAlert] = useState(true);
  const [errorAlert, setErrorAlert] = useState(true);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Proje Ayarları</h1>
        <p className="text-sm text-muted-foreground mt-0.5">demo-project</p>
      </div>

      {/* General */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Genel</h2>
        <div className="rounded-xl border border-white/5 bg-card p-5 space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Proje Adı</label>
            <div className="flex gap-3">
              <Input defaultValue="demo-project" className="flex-1" />
              <Button variant="outline" size="sm">Kaydet</Button>
            </div>
          </div>
          <Separator />
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Proje ID</label>
            <code className="text-xs font-mono text-muted-foreground bg-white/5 px-3 py-2 rounded-lg block">
              proj_01JT0XXXXXXXXX
            </code>
          </div>
        </div>
      </section>

      {/* Rate limits */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Rate Limitler</h2>
        <div className="rounded-xl border border-white/5 bg-card p-5 space-y-4">
          {[
            { label: "Dakikada maksimum istek (RPM)", default: "1000" },
            { label: "Dakikada maksimum token (TPM)", default: "500000" },
            { label: "Günlük maksimum maliyet ($)", default: "50" },
          ].map((l) => (
            <div key={l.label}>
              <label className="text-xs font-medium text-muted-foreground block mb-1.5">{l.label}</label>
              <div className="flex gap-3">
                <Input defaultValue={l.default} className="w-40" />
                <Button variant="outline" size="sm">Kaydet</Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Webhooks */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Webhook'lar</h2>
          <Button variant="outline" size="sm">
            <Plus className="h-3.5 w-3.5" />
            Ekle
          </Button>
        </div>
        <div className="rounded-xl border border-white/5 bg-card overflow-hidden">
          <div className="px-5 py-4 flex items-center gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 shrink-0">
              <Webhook className="h-4 w-4 text-brand-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">https://example.com/webhooks/papagan</p>
              <p className="text-xs text-muted-foreground">Olaylar: fine_tune.completed, endpoint.error</p>
            </div>
            <Button variant="ghost" size="icon-sm" className="text-red-400 hover:text-red-300">
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="px-5 py-3 bg-white/[0.02] border-t border-white/5">
            <p className="text-[11px] text-muted-foreground">İmzalama anahtarı: <code className="font-mono">whsec_•••••••••••••••••</code></p>
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Uyarılar</h2>
        <div className="rounded-xl border border-white/5 bg-card p-5 space-y-4">
          {[
            { label: "E-posta uyarıları", desc: "Önemli olaylar için e-posta gönder", value: emailAlerts, set: setEmailAlerts },
            { label: "Rate limit uyarısı", desc: "Limitin %80'ine ulaşıldığında uyar", value: rateLimitAlert, set: setRateLimitAlert },
            { label: "Hata oranı uyarısı", desc: "%5'in üzerinde hata oranında uyar", value: errorAlert, set: setErrorAlert },
            { label: "Slack bildirimleri", desc: "Slack webhook entegrasyonu", value: slackAlerts, set: setSlackAlerts },
          ].map((a) => (
            <div key={a.label} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{a.label}</p>
                <p className="text-xs text-muted-foreground">{a.desc}</p>
              </div>
              <Switch checked={a.value} onCheckedChange={a.set} />
            </div>
          ))}
        </div>
      </section>

      {/* Danger zone */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-red-400/70 mb-4">Tehlikeli Bölge</h2>
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Projeyi Sil</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Bu işlem geri alınamaz. Tüm API anahtarları, loglar ve veriler silinir.
              </p>
            </div>
            <Button variant="outline" size="sm" className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50">
              Sil
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
