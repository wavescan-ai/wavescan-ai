export type MarketQuote = {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
};

export interface MarketDataProvider {
  getQuote(symbol: string): Promise<MarketQuote>;
}
