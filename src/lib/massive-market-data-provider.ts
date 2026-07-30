import type {
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
