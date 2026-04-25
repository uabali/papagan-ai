"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Cpu, ChevronDown, Menu, X, Zap, BookOpen, BarChart3,
  Server, Settings2, Layers
} from "lucide-react";

const NAV_ITEMS = [
  {
    label: "Ürünler",
    items: [
      { icon: Zap, label: "Serverless API", desc: "Saniyeler içinde başlayın", href: "/models" },
      { icon: Server, label: "Dedicated Endpoints", desc: "Özel GPU kapasitesi", href: "/pricing" },
      { icon: Cpu, label: "Fine-tuning", desc: "Modelinizi özelleştirin", href: "/pricing" },
      { icon: Layers, label: "Compute", desc: "Ham GPU erişimi", href: "/pricing" },
    ],
  },
  {
    label: "Modeller",
    href: "/models",
  },
  {
    label: "Fiyatlandırma",
    href: "/pricing",
  },
  {
    label: "Kurumsal",
    href: "/enterprise",
  },
  {
    label: "Dökümanlar",
    items: [
      { icon: BookOpen, label: "Başlangıç Rehberi", desc: "İlk çağrınızı yapın", href: "/docs" },
      { icon: BarChart3, label: "API Referansı", desc: "Tam API dökümantasyonu", href: "/docs" },
      { icon: Settings2, label: "SDK'lar", desc: "Python, TypeScript, cURL", href: "/docs" },
    ],
  },
];

export function MarketingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/5 bg-background/90 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg group-hover:shadow-brand-500/30 transition-shadow">
              <span className="text-sm font-bold text-white">P</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-white">papagan</span>
            <span className="hidden sm:inline-flex items-center rounded-full border border-brand-500/20 bg-brand-500/10 px-2 py-0.5 text-[10px] font-medium text-brand-300">
              BETA
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) =>
              item.items ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", openDropdown === item.label && "rotate-180")} />
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-64 rounded-xl border border-white/8 bg-popover/95 backdrop-blur-xl p-2 shadow-2xl">
                      {item.items.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="flex items-start gap-3 rounded-lg p-3 hover:bg-white/5 transition-colors group"
                        >
                          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand-500/10">
                            <sub.icon className="h-3.5 w-3.5 text-brand-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{sub.label}</p>
                            <p className="text-xs text-muted-foreground">{sub.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/console">
              <Button variant="ghost" size="sm">Giriş Yap</Button>
            </Link>
            <Link href="/console">
              <Button size="sm" variant="gradient">Ücretsiz Başla</Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/5 bg-background/95 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <div>
                    <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </p>
                    {item.items?.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="flex items-center gap-2 rounded-lg px-6 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5"
                        onClick={() => setMobileOpen(false)}
                      >
                        <sub.icon className="h-4 w-4 text-brand-400" />
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <Link href="/console" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" className="w-full" size="sm">Giriş Yap</Button>
              </Link>
              <Link href="/console" onClick={() => setMobileOpen(false)}>
                <Button variant="gradient" className="w-full" size="sm">Ücretsiz Başla</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
