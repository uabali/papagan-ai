import React from "react";
import Link from "next/link";
import { BookOpen, Zap, Code2, Cpu, Settings2, BarChart3, ArrowRight } from "lucide-react";

const SECTIONS = [
  {
    icon: Zap,
    title: "Başlangıç Rehberi",
    desc: "API anahtarı alın ve ilk çağrınızı 5 dakikada yapın.",
    href: "#",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    icon: Code2,
    title: "Model API'leri",
    desc: "Chat, completion, görüntü, ses ve embedding endpoint'leri.",
    href: "#",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: Settings2,
    title: "SDK'lar",
    desc: "Python, TypeScript/Node.js ve cURL örnekleri.",
    href: "#",
    color: "text-brand-400",
    bg: "bg-brand-500/10",
  },
  {
    icon: Cpu,
    title: "Fine-tuning",
    desc: "Dataset hazırlama, job oluşturma ve model deploy etme.",
    href: "#",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: BarChart3,
    title: "Observability",
    desc: "Loglar, metrikler, cost attribution ve alertler.",
    href: "#",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
  {
    icon: BookOpen,
    title: "Referans",
    desc: "Tam API referansı, hata kodları ve rate limit bilgileri.",
    href: "#",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
];

const QUICKSTART = `import papagan

client = papagan.Client(api_key="ppg-...")

# Chat tamamlama
response = client.chat.complete(
    model="papagan/llama-3.1-70b",
    messages=[
        {"role": "system", "content": "Sen yardımcı bir asistansın."},
        {"role": "user", "content": "Merhaba!"},
    ],
)

print(response.choices[0].message.content)
# → "Merhaba! Size nasıl yardımcı olabilirim?"`;

export default function DocsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gradient mb-3">Dökümanlar</h1>
          <p className="text-lg text-muted-foreground">
            Papagan platformunu entegre etmek için ihtiyacınız olan her şey
          </p>
        </div>

        {/* Quick start */}
        <div className="mb-12 rounded-2xl border border-brand-500/20 bg-brand-500/5 p-6">
          <div className="flex items-start gap-4 mb-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/20 shrink-0">
              <Zap className="h-4.5 w-4.5 text-brand-400" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground mb-1">Hızlı Başlangıç</h2>
              <p className="text-sm text-muted-foreground">3 adımda ilk çağrınızı yapın</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-5">
            {[
              { step: "1", title: "Hesap Oluştur", desc: "papagan.ai/console adresine gidin" },
              { step: "2", title: "API Anahtarı Al", desc: "Console → Projects → API Keys" },
              { step: "3", title: "İlk İsteği Yap", desc: "Aşağıdaki kodu çalıştırın" },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white shrink-0">
                  {s.step}
                </div>
                <div>
                  <p className="text-sm font-medium">{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-white/5 bg-background/50 p-4">
            <pre className="text-[12px] font-mono text-foreground/80 leading-relaxed overflow-x-auto">
              <code>{QUICKSTART}</code>
            </pre>
          </div>
        </div>

        {/* Sections */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECTIONS.map((s) => (
            <Link key={s.title} href={s.href}>
              <div className="group rounded-xl border border-white/5 bg-card p-5 hover:border-white/10 hover:-translate-y-0.5 transition-all">
                <div className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl ${s.bg}`}>
                  <s.icon className={`h-4.5 w-4.5 ${s.color}`} />
                </div>
                <h3 className="font-semibold mb-1.5">{s.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
                <div className="flex items-center gap-1 text-xs text-brand-400 group-hover:gap-2 transition-all">
                  İncele <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
