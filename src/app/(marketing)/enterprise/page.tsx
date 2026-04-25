import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Globe, BarChart3, Users, Headphones, Check } from "lucide-react";

const FEATURES = [
  {
    icon: Shield,
    title: "SOC 2 Type II Uyumlu",
    description: "Güvenlik kontrollerimiz bağımsız denetçiler tarafından yıllık doğrulanır.",
  },
  {
    icon: Lock,
    title: "SSO / SAML Entegrasyonu",
    description: "Mevcut kimlik sağlayıcınızla (Okta, Azure AD, Google Workspace) entegre olun.",
  },
  {
    icon: Globe,
    title: "Private Endpoint'ler",
    description: "Modellerinizi izole ağlarda çalıştırın. Public internet'e çıkış gerektirmez.",
  },
  {
    icon: BarChart3,
    title: "Detaylı Audit Logları",
    description: "Her API çağrısı, key işlemi ve yönetimsel eylem kayıt altına alınır.",
  },
  {
    icon: Users,
    title: "Rol Bazlı Erişim",
    description: "Owner, Admin, Developer, Billing — granüler izin yönetimi.",
  },
  {
    icon: Headphones,
    title: "Dedicated Hesap Yöneticisi",
    description: "Teknik ve operasyonel destek için özel bir müşteri başarı ekibi.",
  },
];

const COMPLIANCE = ["GDPR", "HIPAA", "SOC 2", "ISO 27001", "PCI DSS"];

export default function EnterprisePage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Hero */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5">
            <Shield className="h-3.5 w-3.5 text-violet-400" />
            <span className="text-xs font-medium text-violet-300">Kurumsal Çözümler</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gradient mb-4">
            Kurumsal güvenlik ile
            <br />
            AI altyapısı
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Büyük kurumların ihtiyaç duyduğu güvenlik, uyumluluk ve ölçeklenebilirlik.
            Özel fiyatlandırma ve SLA garantisi ile.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" variant="gradient">
              Satış Ekibiyle Görüş
            </Button>
            <Button size="lg" variant="outline">
              Teknik Demo İste
            </Button>
          </div>
        </div>

        {/* Compliance badges */}
        <div className="mb-16 text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-6">
            Uyumluluk sertifikaları
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {COMPLIANCE.map((c) => (
              <div
                key={c}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-card px-4 py-2"
              >
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-sm font-medium">{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-white/5 bg-card p-6">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
                <f.icon className="h-5 w-5 text-violet-400" />
              </div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div className="max-w-xl mx-auto rounded-2xl border border-white/5 bg-card p-8">
          <h2 className="text-xl font-bold mb-2">Satış Ekibiyle İletişim</h2>
          <p className="text-sm text-muted-foreground mb-6">
            24 saat içinde size geri dönüyoruz
          </p>
          <form className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Ad Soyad</label>
                <input
                  type="text"
                  className="w-full h-9 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                  placeholder="Ahmet Yılmaz"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Şirket</label>
                <input
                  type="text"
                  className="w-full h-9 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                  placeholder="Şirket Adı"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1.5">İş E-postası</label>
              <input
                type="email"
                className="w-full h-9 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                placeholder="ahmet@sirket.com"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1.5">Mesajınız</label>
              <textarea
                className="w-full min-h-[100px] rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/50 resize-none"
                placeholder="Kullanım senaryonuzu ve ekip büyüklüğünüzü kısaca anlatın..."
              />
            </div>
            <Button variant="gradient" className="w-full">
              Gönder
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
