"use client";
import React from "react";
import { motion } from "framer-motion";
import { Zap, Shield, BarChart3, Cpu, Code2, Globe } from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Yıldırım Hızında Başlatma",
    description: "Kredi kartı gerekmez. API anahtarınızı alın, 3 satır kod yazın, modeli çalıştırın. İlk çağrınız saniyeler içinde.",
    color: "from-yellow-500/20 to-orange-500/10",
    iconColor: "text-yellow-400",
  },
  {
    icon: Globe,
    title: "100+ Model, Tek API",
    description: "LLM'ler, görüntü, ses, embedding — tüm modaliteler tek tutarlı API'de. OpenAI uyumlu endpoint'ler.",
    color: "from-blue-500/20 to-cyan-500/10",
    iconColor: "text-blue-400",
  },
  {
    icon: BarChart3,
    title: "Gerçek Zamanlı Observability",
    description: "Her isteğin latency, maliyet ve hata analizini görün. Token başına cost attribution, request-level loglar.",
    color: "from-brand-500/20 to-purple-500/10",
    iconColor: "text-brand-400",
  },
  {
    icon: Cpu,
    title: "Dedicated GPU Endpoints",
    description: "Cold start yok, tahmin edilebilir latency. Modelinizi kendi özel donanımında çalıştırın.",
    color: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-400",
  },
  {
    icon: Code2,
    title: "Fine-tuning Pipeline",
    description: "Dataset yükleyin, job başlatın, metrikleri izleyin. Özelleştirilmiş modelinizi dakikalar içinde deploy edin.",
    color: "from-pink-500/20 to-rose-500/10",
    iconColor: "text-pink-400",
  },
  {
    icon: Shield,
    title: "Kurumsal Güvenlik",
    description: "SOC 2 Type II, GDPR uyumlu. SSO, role-based access, private endpoint'ler ve denetim logları.",
    color: "from-violet-500/20 to-indigo-500/10",
    iconColor: "text-violet-400",
  },
];

export function Features() {
  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gradient">
            Üretim için tasarlandı
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Prototipten üretime geçişi hızlandıran altyapı. Ölçeklenebilir, gözlemlenebilir, güvenilir.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group relative rounded-2xl border border-white/5 bg-card p-6 hover:border-white/10 transition-all hover:-translate-y-0.5"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className="relative">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                  <f.icon className={`h-5 w-5 ${f.iconColor}`} />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
