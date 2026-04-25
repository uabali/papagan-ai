import React from "react";

const SERVICES = [
  { name: "API Gateway", status: "operational", uptime: "99.98%" },
  { name: "LLM Inference (Serverless)", status: "operational", uptime: "99.97%" },
  { name: "Image Generation", status: "operational", uptime: "99.95%" },
  { name: "Audio Processing", status: "operational", uptime: "99.99%" },
  { name: "Fine-tuning Jobs", status: "degraded", uptime: "98.50%" },
  { name: "Developer Console", status: "operational", uptime: "100%" },
  { name: "Webhooks", status: "operational", uptime: "99.96%" },
];

const INCIDENTS = [
  {
    date: "25 Nisan 2025",
    title: "Fine-tuning job sürelerinde gecikmeler",
    status: "investigating",
    updates: [
      { time: "14:32", msg: "Fine-tuning job kuyruklarında normalin üzerinde bekleme süreleri tespit edildi. İnceliyoruz." },
      { time: "14:10", msg: "Bazı kullanıcılardan fine-tuning job gecikmesi raporları aldık." },
    ],
  },
  {
    date: "20 Nisan 2025",
    title: "API Gateway kısa kesinti — ÇÖZÜLDÜ",
    status: "resolved",
    updates: [
      { time: "11:15", msg: "Sorun tamamen çözüldü. Tüm sistemler normal çalışıyor." },
      { time: "10:48", msg: "Kıkök neden tespit edildi: routing tablosu güncellemesi." },
      { time: "10:30", msg: "API Gateway'de ~8 dakika kesinti yaşandı. Ekip müdahale etti." },
    ],
  },
];

const STATUS_COLORS: Record<string, string> = {
  operational: "text-emerald-400",
  degraded: "text-yellow-400",
  outage: "text-red-400",
};

const STATUS_BG: Record<string, string> = {
  operational: "bg-emerald-400",
  degraded: "bg-yellow-400",
  outage: "bg-red-400",
};

const STATUS_LABELS: Record<string, string> = {
  operational: "Çalışıyor",
  degraded: "Bozulmuş",
  outage: "Kesinti",
};

export default function StatusPage() {
  const allOperational = SERVICES.every((s) => s.status === "operational");

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Overall status */}
        <div className={`mb-10 rounded-2xl border p-6 text-center ${allOperational ? "border-emerald-500/20 bg-emerald-500/5" : "border-yellow-500/20 bg-yellow-500/5"}`}>
          <div className={`mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full ${allOperational ? "bg-emerald-500/20" : "bg-yellow-500/20"}`}>
            <div className={`h-5 w-5 rounded-full ${allOperational ? "bg-emerald-400 animate-pulse" : "bg-yellow-400"}`} />
          </div>
          <h1 className={`text-2xl font-bold mb-1 ${allOperational ? "text-emerald-300" : "text-yellow-300"}`}>
            {allOperational ? "Tüm Sistemler Çalışıyor" : "Kısmi Bozulma"}
          </h1>
          <p className="text-sm text-muted-foreground">Son güncelleme: 25 Nisan 2025, 14:45</p>
        </div>

        {/* Services */}
        <div className="mb-10 rounded-xl border border-white/5 bg-card overflow-hidden">
          <div className="border-b border-white/5 px-5 py-3">
            <h2 className="text-sm font-semibold">Servis Durumları</h2>
          </div>
          <div className="divide-y divide-white/5">
            {SERVICES.map((s) => (
              <div key={s.name} className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${STATUS_BG[s.status]}`} />
                  <span className="text-sm font-medium">{s.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground">{s.uptime} uptime</span>
                  <span className={`text-xs font-medium ${STATUS_COLORS[s.status]}`}>
                    {STATUS_LABELS[s.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incidents */}
        <div>
          <h2 className="text-lg font-bold mb-5">Olay Geçmişi</h2>
          <div className="space-y-4">
            {INCIDENTS.map((inc) => (
              <div key={inc.title} className="rounded-xl border border-white/5 bg-card overflow-hidden">
                <div className="flex items-start justify-between px-5 py-4 border-b border-white/5">
                  <div>
                    <h3 className="text-sm font-semibold">{inc.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{inc.date}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
                    inc.status === "resolved"
                      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                      : "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                  }`}>
                    {inc.status === "resolved" ? "Çözüldü" : "İnceleniyor"}
                  </span>
                </div>
                <div className="px-5 py-3 space-y-2">
                  {inc.updates.map((u, i) => (
                    <div key={i} className="flex gap-3 text-xs">
                      <span className="text-muted-foreground font-mono shrink-0">{u.time}</span>
                      <span className="text-muted-foreground">{u.msg}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
