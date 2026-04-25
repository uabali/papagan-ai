import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Download, AlertTriangle } from "lucide-react";

const INVOICES = [
  { id: "INV-2025-04", period: "Nisan 2025", amount: "$87.32", status: "open", due: "2025-05-01" },
  { id: "INV-2025-03", period: "Mart 2025", amount: "$63.14", status: "paid", due: "2025-04-01" },
  { id: "INV-2025-02", period: "Şubat 2025", amount: "$45.80", status: "paid", due: "2025-03-01" },
  { id: "INV-2025-01", period: "Ocak 2025", amount: "$49.00", status: "paid", due: "2025-02-01" },
];

export default function BillingPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Fatura</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Abonelik ve fatura yönetimi</p>
      </div>

      {/* Current plan */}
      <div className="mb-6 rounded-xl border border-brand-500/20 bg-brand-500/5 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="font-semibold text-lg">Pro Plan</h2>
              <Badge>Aktif</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Aylık $49.00 · Bir sonraki yenileme: 1 Mayıs 2025
            </p>
            <div className="grid grid-cols-3 gap-4 text-xs">
              {[
                { label: "Metin Token", used: "38.2M", total: "50M" },
                { label: "Görüntü", used: "312", total: "500/gün" },
                { label: "Fine-tune Job", used: "1", total: "2/ay" },
              ].map((q) => (
                <div key={q.label}>
                  <p className="text-muted-foreground mb-0.5">{q.label}</p>
                  <p className="font-medium">{q.used} <span className="text-muted-foreground">/ {q.total}</span></p>
                </div>
              ))}
            </div>
          </div>
          <Button variant="outline" size="sm">Plan Değiştir</Button>
        </div>
      </div>

      {/* Usage alert */}
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5 px-4 py-3">
        <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 shrink-0" />
        <p className="text-xs text-yellow-300">
          Metin token kotanızın %76'sını kullandınız. Limitinize yaklaşıyorsunuz. Planınızı yükseltmeyi düşünebilirsiniz.
        </p>
      </div>

      {/* Payment method */}
      <div className="mb-6 rounded-xl border border-white/5 bg-card p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold mb-3">Ödeme Yöntemi</h3>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-14 items-center justify-center rounded-lg bg-white/10 text-xs font-bold">VISA</div>
              <div>
                <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                <p className="text-xs text-muted-foreground">Son kullanma: 12/27</p>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <CreditCard className="h-3.5 w-3.5" />
            Güncelle
          </Button>
        </div>
      </div>

      {/* Invoices */}
      <div className="rounded-xl border border-white/5 bg-card overflow-hidden">
        <div className="px-5 py-3 border-b border-white/5">
          <h3 className="text-sm font-semibold">Fatura Geçmişi</h3>
        </div>
        <div className="divide-y divide-white/5">
          {INVOICES.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-sm font-medium">{inv.period}</p>
                <p className="text-xs text-muted-foreground">#{inv.id} · Vade: {inv.due}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-mono font-medium">{inv.amount}</span>
                <Badge variant={inv.status === "paid" ? "success" : "warning"} className="text-[10px]">
                  {inv.status === "paid" ? "Ödendi" : "Bekliyor"}
                </Badge>
                <Button variant="ghost" size="icon-sm">
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
