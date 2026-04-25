"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Key, BarChart3, FileText, Server, Cpu, Layers,
  CreditCard, Settings, ChevronDown, Plus, Home,
} from "lucide-react";

const NAV = [
  { href: "/console", icon: Home, label: "Genel Bakış" },
  { href: "/console/projects/demo/keys", icon: Key, label: "API Anahtarları" },
  { href: "/console/projects/demo/usage", icon: BarChart3, label: "Kullanım" },
  { href: "/console/projects/demo/logs", icon: FileText, label: "Loglar" },
  { href: "/console/projects/demo/endpoints", icon: Server, label: "Endpoint'ler" },
  { href: "/console/projects/demo/fine-tunes", icon: Layers, label: "Fine-tuning" },
  { href: "/console/projects/demo/compute", icon: Cpu, label: "Compute" },
  null,
  { href: "/console/billing", icon: CreditCard, label: "Fatura" },
  { href: "/console/settings", icon: Settings, label: "Ayarlar" },
];

export function ConsoleSidebar() {
  const pathname = usePathname();
  const [orgOpen, setOrgOpen] = useState(false);

  return (
    <aside className="flex h-full w-56 flex-col border-r border-white/5 bg-card">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700">
          <span className="text-xs font-bold text-white">P</span>
        </div>
        <span className="text-sm font-bold text-white">papagan</span>
        <span className="ml-auto text-[10px] text-muted-foreground border border-white/10 rounded px-1 py-0.5">
          console
        </span>
      </div>

      {/* Org switcher */}
      <div className="px-3 py-3 border-b border-white/5">
        <button
          onClick={() => setOrgOpen(!orgOpen)}
          className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-sm hover:bg-white/5 transition-colors"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded bg-brand-600/30 text-xs font-bold text-brand-300">
            D
          </div>
          <div className="flex-1 text-left">
            <p className="text-xs font-medium text-foreground">Demo Org</p>
            <p className="text-[10px] text-muted-foreground">demo-project</p>
          </div>
          <ChevronDown className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform", orgOpen && "rotate-180")} />
        </button>
        {orgOpen && (
          <div className="mt-1 rounded-lg border border-white/5 bg-background/50 p-1">
            <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors">
              <Plus className="h-3 w-3" />
              Yeni Proje
            </button>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
        {NAV.map((item, i) =>
          item === null ? (
            <div key={i} className="my-2 border-t border-white/5" />
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "bg-brand-500/15 text-brand-300 font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          )
        )}
      </nav>

      {/* User */}
      <div className="border-t border-white/5 px-3 py-3">
        <div className="flex items-center gap-2.5 rounded-lg px-2 py-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600/30 text-xs font-bold text-brand-300">
            U
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">Kullanıcı</p>
            <p className="text-[10px] text-muted-foreground truncate">Pro Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
