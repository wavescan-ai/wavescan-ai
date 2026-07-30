import { MassiveMarketDataProvider } from "./massive-market-data-provider";

export function getMarketDataProvider() {
  const apiKey = process.env.MASSIVE_API_KEY;

  if (!apiKey) {
    return null;
  }

  return new MassiveMarketDataProvider(apiKey);
}
