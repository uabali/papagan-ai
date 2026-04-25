import React from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Github, Twitter } from "lucide-react";

const FOOTER_LINKS = {
  "Ürünler": [
    { label: "Serverless API", href: "/models" },
    { label: "Dedicated Endpoints", href: "/pricing" },
    { label: "Fine-tuning", href: "/pricing" },
    { label: "Compute", href: "/pricing" },
  ],
  "Kaynaklar": [
    { label: "Dökümanlar", href: "/docs" },
    { label: "API Referansı", href: "/docs" },
    { label: "SDK'lar", href: "/docs" },
    { label: "Blog", href: "#" },
  ],
  "Şirket": [
    { label: "Hakkında", href: "#" },
    { label: "Kurumsal", href: "/enterprise" },
    { label: "Fiyatlar", href: "/pricing" },
    { label: "Durum", href: "/status" },
  ],
  "Hukuki": [
    { label: "Gizlilik", href: "#" },
    { label: "Kullanım Koşulları", href: "#" },
    { label: "Güvenlik", href: "#" },
  ],
};

export function MarketingFooter() {
  return (
    <footer className="border-t border-white/5 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700">
                <span className="text-sm font-bold text-white">P</span>
              </div>
              <span className="text-lg font-bold text-white">papagan</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Yapay zeka modellerini üretimde çalıştırmanın en hızlı yolu.
            </p>
            <div className="flex gap-3">
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20 transition-colors">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {group}
              </h4>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2025 Papagan AI. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-muted-foreground">Tüm sistemler çalışıyor</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
