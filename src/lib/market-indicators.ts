import type { MarketCandle } from "./market-data-provider";
import {
  calculateEMA,
  calculateMACD,
  calculateRSI,
} from "./technical-indicators";

export type MarketIndicators = {
  ema10: number | null;
  ema20: number | null;
  ema50: number | null;
  ema200: number | null;
  rsi14: number | null;
  macd: number | null;
  macdSignal: number | null;
  macdHistogram: number | null;
};

function getLastValue(values: number[]): number | null {
  return values.length > 0 ? values[values.length - 1] : null;
}

export function calculateMarketIndicators(
  candles: MarketCandle[],
): MarketIndicators {
  const sortedCandles = [...candles].sort(
    (a, b) => a.timestamp - b.timestamp,
  );

  const closes = sortedCandles.map((candle) => candle.close);
  const macdResult = calculateMACD(closes);

  return {
    ema10: getLastValue(calculateEMA(closes, 10)),
    ema20: getLastValue(calculateEMA(closes, 20)),
    ema50: getLastValue(calculateEMA(closes, 50)),
    ema200: getLastValue(calculateEMA(closes, 200)),
    rsi14: getLastValue(calculateRSI(closes, 14)),
    macd: getLastValue(macdResult.macd),
    macdSignal: getLastValue(macdResult.signal),
    macdHistogram: getLastValue(macdResult.histogram),
  };
}
