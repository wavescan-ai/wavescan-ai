import type {
  CandleInterval,
  MarketCandle,
  MarketDataProvider,
  MarketQuote,
} from "./market-data-provider";

type MassiveSnapshotResponse = {
  ticker?: {
    ticker?: string;
    day?: {
      c?: number;
      v?: number;
    };
    prevDay?: {
      c?: number;
    };
    todaysChange?: number;
    todaysChangePerc?: number;
  };
};

export class MassiveMarketDataProvider implements MarketDataProvider {
  constructor(private readonly apiKey: string) {}


  async getCandles(
    symbol: string,
    interval: CandleInterval,
    from: string,
    to: string,
  ): Promise<MarketCandle[]> {
    if (!this.apiKey) {
      throw new Error("MASSIVE_API_KEY is not configured");
    }

    const intervals: Record<
      CandleInterval,
      { multiplier: number; timespan: string }
    > = {
      "5m": { multiplier: 5, timespan: "minute" },
      "15m": { multiplier: 15, timespan: "minute" },
      "30m": { multiplier: 30, timespan: "minute" },
      "1h": { multiplier: 1, timespan: "hour" },
      "1d": { multiplier: 1, timespan: "day" },
      "1w": { multiplier: 1, timespan: "week" },
    };

    const { multiplier, timespan } = intervals[interval];

    const response = await fetch(
      `https://api.massive.com/v2/aggs/ticker/${encodeURIComponent(symbol)}/range/${multiplier}/${timespan}/${encodeURIComponent(from)}/${encodeURIComponent(to)}?adjusted=true&sort=asc&limit=50000&apiKey=${encodeURIComponent(this.apiKey)}`,
      { cache: "no-store" },
    );

    if (!response.ok) {
      throw new Error(`Massive candles request failed: ${response.status}`);
    }

    const data = (await response.json()) as {
      results?: Array<{
        t?: number;
        o?: number;
        h?: number;
        l?: number;
        c?: number;
        v?: number;
      }>;
    };

    return (data.results ?? [])
      .filter(
        (item) =>
          item.t != null &&
          item.o != null &&
          item.h != null &&
          item.l != null &&
          item.c != null,
      )
      .map((item) => ({
        timestamp: item.t as number,
        open: item.o as number,
        high: item.h as number,
        low: item.l as number,
        close: item.c as number,
        volume: item.v ?? 0,
      }));
  }

  async getQuote(symbol: string): Promise<MarketQuote> {
    if (!this.apiKey) {
      throw new Error("MASSIVE_API_KEY is not configured");
    }

    const response = await fetch(
      `https://api.massive.com/v2/snapshot/locale/us/markets/stocks/tickers/${encodeURIComponent(symbol)}?apiKey=${encodeURIComponent(this.apiKey)}`,
      { cache: "no-store" },
    );

    if (!response.ok) {
      throw new Error(`Massive API request failed: ${response.status}`);
    }

    const data = (await response.json()) as MassiveSnapshotResponse;
    const ticker = data.ticker;

    if (!ticker?.ticker || ticker.day?.c == null) {
      throw new Error(`No market data returned for ${symbol}`);
    }

    return {
      symbol: ticker.ticker,
      price: ticker.day.c,
      change: ticker.todaysChange ?? 0,
      changePercent: ticker.todaysChangePerc ?? 0,
      volume: ticker.day.v ?? 0,
    };
  }
}
