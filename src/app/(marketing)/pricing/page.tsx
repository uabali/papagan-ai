import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap } from "lucide-react";

const PLANS = [
  {
    name: "Ücretsiz",
    price: "$0",
    period: "/ay",
    desc: "Başlangıç ve prototipleme için",
    badge: null,
    features: [
      "Aylık 1M metin tokeni",
      "Günlük 10 görüntü",
      "100 ses dakikası",
      "Topluluk desteği",
      "API anahtarı",
      "Request logları (7 gün)",
    ],
    cta: "Ücretsiz Başla",
    href: "/console",
    variant: "outline" as const,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/ay",
    desc: "Büyüyen projeler ve startuplar için",
    badge: "Popüler",
    features: [
      "Aylık 50M metin tokeni",
      "Günlük 500 görüntü",
      "5.000 ses dakikası",
      "Email desteği (24s)",
      "3 API anahtarı",
      "Request logları (30 gün)",
      "Usage dashboard",
      "Fine-tuning (2 job/ay)",
    ],
    cta: "Pro'ya Geç",
    href: "/console",
    variant: "gradient" as const,
  },
  {
    name: "Scale",
    price: "$299",
    period: "/ay",
    desc: "Ölçekli üretim uygulamaları için",
    badge: null,
    features: [
      "Aylık 500M metin tokeni",
      "Sınırsız görüntü",
      "Sınırsız ses",
      "Öncelikli destek (4s)",
      "20 API anahtarı",
      "Request logları (90 gün)",
      "Dedicated endpoints",
      "Fine-tuning (sınırsız)",
      "Webhook desteği",
      "SLA %99.9",
    ],
    cta: "Scale'e Geç",
    href: "/console",
    variant: "outline" as const,
  },
  {
    name: "Enterprise",
    price: "Özel",
    period: "",
    desc: "Büyük kurumlar için özelleştirilmiş çözümler",
    badge: null,
    features: [
      "Sınırsız kullanım",
      "Özel fiyatlandırma",
      "Private endpoints",
      "SSO / SAML",
      "Role-based access",
      "Audit logları",
      "SLA %99.99",
      "Dedicated hesap yöneticisi",
      "GDPR / SOC2 uyumu",
      "On-premise seçeneği",
    ],
    cta: "İletişime Geç",
    href: "/enterprise",
    variant: "outline" as const,
  },
];

const USAGE_PRICING = [
  { service: "Metin (LLM)", unit: "1M girdi tokeni", price: "$0.10 – $2.20", note: "Modele göre değişir" },
  { service: "Görüntü üretimi", unit: "1.000 görüntü", price: "$2 – $55", note: "Modele göre değişir" },
  { service: "Ses (STT)", unit: "Saat başına", price: "$0.36", note: "Whisper Large v3" },
  { service: "Embedding", unit: "1M token", price: "$0.02", note: "BGE-M3" },
  { service: "Fine-tuning", unit: "1M token", price: "$0.50 – $3.00", note: "Eğitim maliyeti" },
  { service: "Dedicated GPU", unit: "Saat başına", price: "$1.20 – $8.00", note: "A10G – A100" },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gradient mb-4">
            Şeffaf Fiyatlandırma
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Küçük projelerden kurumsal ölçeğe kadar her büyüklüğe uygun plan.
            Gizli ücret yok, sürpriz fatura yok.
          </p>
        </div>

        {/* Plans */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-20">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-6 flex flex-col ${
                plan.badge
                  ? "border-brand-500/40 bg-brand-500/5 shadow-lg shadow-brand-500/10"
                  : "border-white/5 bg-card"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="shadow-lg">{plan.badge}</Badge>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-1">{plan.name}</h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground text-sm mb-1">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.desc}</p>
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-brand-400 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href} className="mt-auto">
                <Button variant={plan.variant} className="w-full">
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Usage-based pricing */}
        <div className="mb-20">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gradient mb-2">Kullanım Bazlı Fiyatlandırma</h2>
            <p className="text-muted-foreground">Plan kotanızın üzerinde her kullanım için</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-card overflow-hidden">
            <div className="grid grid-cols-4 px-6 py-3 border-b border-white/5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <span>Servis</span>
              <span>Birim</span>
              <span>Fiyat</span>
              <span>Not</span>
            </div>
            {USAGE_PRICING.map((row, i) => (
              <div
                key={row.service}
                className={`grid grid-cols-4 px-6 py-4 text-sm ${i < USAGE_PRICING.length - 1 ? "border-b border-white/5" : ""}`}
              >
                <span className="font-medium text-foreground">{row.service}</span>
                <span className="text-muted-foreground">{row.unit}</span>
                <span className="font-mono text-brand-300">{row.price}</span>
                <span className="text-muted-foreground text-xs">{row.note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-gradient mb-8 text-center">Sıkça Sorulan Sorular</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { q: "Ücretsiz katman ne kadar sürüyor?", a: "Süresiz ücretsiz katman. Aylık limitler reset olur." },
              { q: "Fatura nasıl işliyor?", a: "Aylık fatura kesilir. Kullanım bazlı ücretler bir sonraki ay işlenir." },
              { q: "Fine-tuning'i nasıl fiyatlandırıyorsunuz?", a: "Eğitim süresi ve model büyüklüğüne göre token bazlı fiyatlandırma uygulanır." },
              { q: "Kurumsal plan için ne gerekiyor?", a: "Ekibinizle bir görüşme ayarlıyoruz ve ihtiyaçlarınıza özel bir teklif hazırlıyoruz." },
            ].map((faq) => (
              <div key={faq.q} className="rounded-xl border border-white/5 bg-card p-5">
                <h4 className="font-medium mb-2">{faq.q}</h4>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
