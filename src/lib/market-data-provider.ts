export type MarketQuote = {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
};

export interface MarketDataProvider {
  getQuote(symbol: string): Promise<MarketQuote>;
  getCandles(
    symbol: string,
    interval: CandleInterval,
    from: string,
    to: string,
  ): Promise<MarketCandle[]>;
}

export type CandleInterval =
  | "5m"
  | "15m"
  | "30m"
  | "1h"
  | "1d"
  | "1w";

export type MarketCandle = {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};
