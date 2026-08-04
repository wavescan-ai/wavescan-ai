import { rankOpportunities } from "@/lib/opportunity-engine";
import { mockMarketData } from "@/lib/mock-market-data";
import { mockNews } from "@/lib/mock-news-data";
import { getMarketDataProvider } from "@/lib/get-market-data-provider";
import { buildOpportunityInput } from "@/lib/build-opportunity-input";




export default async function Dashboard() {
  const marketDataProvider = getMarketDataProvider();
  const liveTslaQuote = marketDataProvider
    ? await marketDataProvider.getQuote("TSLA").catch(() => null)
    : null;
  const liveTslaCandles = marketDataProvider
    ? await marketDataProvider
        .getCandles("TSLA", "30m", "2026-07-01", "2026-07-30")
        .catch(() => [])
    : [];

  const dataSourceLabel =
    liveTslaQuote && liveTslaCandles.length > 0
      ? "Massive متصل"
      : "بيانات تجريبية";
  const liveTslaInput =
    liveTslaCandles.length > 0
      ? buildOpportunityInput("TSLA", liveTslaCandles, {
          elliottScore: 0,
          candleScore: 0,
          newsScore: 0,
          sectorScore: 0,
          riskScore: 0,
        })
      : null;

  const opportunityInputs = liveTslaInput
    ? [
        liveTslaInput,
        ...mockMarketData.filter((item) => item.symbol !== "TSLA"),
      ]
    : mockMarketData;

  const opportunities = rankOpportunities(opportunityInputs);
  const topNews = [...mockNews].sort((a, b) => b.score - a.score)[0];

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "#07101f",
        color: "white",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "8px" }}>
          لوحة تحكم WaveScan AI
        </h1>

        <p style={{ color: "#94a3b8", marginBottom: "8px" }}>
          ملخص السوق وأهم الفرص والتنبيهات
        </p>
        <p style={{ color: "#38bdf8", marginBottom: "28px" }}>
          مصدر البيانات: {dataSourceLabel}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
        {opportunities.slice(0, 3).map((item, index) => (
          <section
            key={item.symbol}
            style={{
              background: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "18px",
              padding: "20px",
            }}
          >
            <div style={{ color: "#94a3b8" }}>
              {item.score >= 80
                ? `فرصة قوية رقم ${index + 1}`
                : item.score >= 60
                ? `فرصة جيدة رقم ${index + 1}`
                : item.score >= 40
                ? "مراقبة"
                : "ضعيفة"}
            </div>
            <h2 style={{ margin: "12px 0 6px" }}>{item.symbol}</h2>
            <div style={{ color: "#38bdf8" }}>
              WaveScore: {item.score}% — {item.reasons.join(" + ")}
            </div>

              <div
                style={{
                  marginTop: "12px",
                  fontWeight: 700,
                  color:
                    item.windowStatus === "فرصة ممتازة"
                      ? "#22c55e"
                      : item.windowStatus === "بدأت القوة تضعف"
                        ? "#f59e0b"
                        : "#ef4444",
                }}
              >
                نافذة الفرصة: {item.windowStatus}
              </div>

              <div
                style={{
                  marginTop: "6px",
                  color: "#94a3b8",
                  lineHeight: 1.7,
                }}
              >
                {item.windowExplanation}
              </div>
          </section>
        ))}

          <section
            style={{
              background: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "18px",
              padding: "20px",
            }}
          >
            <div style={{ color: "#94a3b8" }}>النماذج المكتشفة</div>
            <h2 style={{ margin: "12px 0 6px" }}>0</h2>
            <div style={{ color: "#38bdf8" }}>Pattern AI</div>
          </section>

          <section
            style={{
              background: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "18px",
              padding: "20px",
            }}
          >
            <div style={{ color: "#94a3b8" }}>الأخبار المؤثرة</div>
            <h2 style={{ margin: "12px 0 6px" }}>{topNews.score}/10</h2>
            <div style={{ color: "#38bdf8" }}>{topNews.symbol} — {topNews.impact}</div>
            <div style={{ color: "#94a3b8", marginTop: "8px" }}>{topNews.title}</div>
          </section>
        </div>
      </div>
    </main>
  );
}
