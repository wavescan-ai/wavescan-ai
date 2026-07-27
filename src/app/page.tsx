const features = [
  { icon: "📊", title: "أفضل الفرص اليوم", text: "فرص مختارة حسب الزخم والمؤشرات الفنية" },
  { icon: "🧠", title: "Pattern AI", text: "اكتشاف النماذج الفنية ورسمها تلقائيًا" },
  { icon: "📰", title: "محرك الأخبار", text: "تحليل الخبر وتحديد تأثيره على السهم والقطاع" },
  { icon: "🌊", title: "موجات إليوت", text: "تحليل الموجات والسيناريو الأقرب مع الإلغاء" },
];

const markets = [
  { flag: "🇸🇦", name: "السوق السعودي", status: "جاهز للتحليل" },
  { flag: "🇺🇸", name: "السوق الأمريكي", status: "جاهز للتحليل" },
];

export default function Home() {
  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #172554 0%, #08111f 42%, #030712 100%)",
        color: "#f8fafc",
        fontFamily: "Arial, sans-serif",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            padding: "12px 0 28px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: "800",
                letterSpacing: "-1px",
              }}
            >
              WaveScan <span style={{ color: "#38bdf8" }}>AI</span>
            </div>
            <div style={{ color: "#94a3b8", fontSize: "13px", marginTop: "4px" }}>
              منصة ذكاء اصطناعي لتحليل الأسواق
            </div>
          </div>

          <div
            style={{
              background: "rgba(16,185,129,.12)",
              color: "#6ee7b7",
              border: "1px solid rgba(16,185,129,.35)",
              padding: "9px 13px",
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: "700",
            }}
          >
            ● النظام يعمل
          </div>
        </header>

        <section
          style={{
            background: "rgba(15,23,42,.78)",
            border: "1px solid rgba(148,163,184,.18)",
            borderRadius: "26px",
            padding: "34px 24px",
            boxShadow: "0 24px 70px rgba(0,0,0,.35)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              display: "inline-block",
              color: "#7dd3fc",
              background: "rgba(14,165,233,.12)",
              border: "1px solid rgba(14,165,233,.25)",
              borderRadius: "999px",
              padding: "8px 13px",
              fontSize: "13px",
              fontWeight: "700",
              marginBottom: "18px",
            }}
          >
            القرار أوضح عندما تجتمع البيانات
          </div>

          <h1
            style={{
              fontSize: "clamp(38px, 8vw, 72px)",
              lineHeight: "1.05",
              margin: "0 0 18px",
              letterSpacing: "-2px",
            }}
          >
            اكتشف الفرص قبل أن
            <span style={{ color: "#38bdf8" }}> تفوتك</span>
          </h1>

          <p
            style={{
              color: "#a8b3c7",
              fontSize: "18px",
              lineHeight: "1.8",
              maxWidth: "760px",
              margin: "0 0 28px",
            }}
          >
            WaveScan AI يجمع التحليل الفني والأخبار والنماذج السعرية في شاشة
            واحدة، ويشرح لك سبب ظهور كل فرصة ومستوى الإلغاء والمخاطر.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            <button
              style={{
                border: "none",
                borderRadius: "14px",
                padding: "15px 22px",
                background: "#0ea5e9",
                color: "white",
                fontSize: "16px",
                fontWeight: "800",
              }}
            >
              ابدأ التحليل ←
            </button>

            <button
              style={{
                border: "1px solid rgba(148,163,184,.28)",
                borderRadius: "14px",
                padding: "15px 22px",
                background: "rgba(255,255,255,.04)",
                color: "#e2e8f0",
                fontSize: "16px",
                fontWeight: "700",
              }}
            >
              شاهد أفضل الفرص
            </button>
          </div>
        </section>

        <section style={{ marginTop: "22px" }}>
          <h2 style={{ fontSize: "20px", marginBottom: "14px" }}>
            الأسواق المدعومة
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "14px",
            }}
          >
            {markets.map((market) => (
              <article
                key={market.name}
                style={{
                  background: "rgba(15,23,42,.72)",
                  border: "1px solid rgba(148,163,184,.16)",
                  borderRadius: "18px",
                  padding: "20px",
                }}
              >
                <div style={{ fontSize: "34px" }}>{market.flag}</div>
                <h3 style={{ margin: "12px 0 7px", fontSize: "19px" }}>
                  {market.name}
                </h3>
                <div style={{ color: "#6ee7b7", fontSize: "13px" }}>
                  ● {market.status}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section style={{ marginTop: "28px", paddingBottom: "30px" }}>
          <h2 style={{ fontSize: "20px", marginBottom: "14px" }}>
            أدوات WaveScan
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "14px",
            }}
          >
            {features.map((feature) => (
              <article
                key={feature.title}
                style={{
                  background: "rgba(15,23,42,.72)",
                  border: "1px solid rgba(148,163,184,.16)",
                  borderRadius: "18px",
                  padding: "20px",
                }}
              >
                <div style={{ fontSize: "30px" }}>{feature.icon}</div>
                <h3 style={{ margin: "13px 0 8px", fontSize: "18px" }}>
                  {feature.title}
                </h3>
                <p
                  style={{
                    color: "#94a3b8",
                    lineHeight: "1.7",
                    fontSize: "14px",
                    margin: 0,
                  }}
                >
                  {feature.text}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
