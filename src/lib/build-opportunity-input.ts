import type { MarketCandle } from "./market-data-provider";
import type { OpportunityInput } from "./opportunity-engine";
import { calculateMarketIndicators } from "./market-indicators";

function calculateVolumeRatio(candles: MarketCandle[]): number {
  if (candles.length < 21) return 1;

  const sorted = [...candles].sort((a, b) => a.timestamp - b.timestamp);
  const latestVolume = sorted[sorted.length - 1].volume;
  const previousVolumes = sorted
    .slice(-21, -1)
    .map((candle) => candle.volume);

  const averageVolume =
    previousVolumes.reduce((sum, volume) => sum + volume, 0) /
    previousVolumes.length;

  return averageVolume > 0 ? latestVolume / averageVolume : 1;
}

function detectBreakout(candles: MarketCandle[]): boolean {
  if (candles.length < 21) return false;

  const sorted = [...candles].sort((a, b) => a.timestamp - b.timestamp);
  const latest = sorted[sorted.length - 1];
  const previousHigh = Math.max(
    ...sorted.slice(-21, -1).map((candle) => candle.high),
  );

  return latest.close > previousHigh;
}

export function buildOpportunityInput(
  symbol: string,
  candles: MarketCandle[],
  baseScores: Pick<
    OpportunityInput,
    | "elliottScore"
    | "candleScore"
    | "newsScore"
    | "sectorScore"
    | "riskScore"
  >,
): OpportunityInput {
  const sorted = [...candles].sort((a, b) => a.timestamp - b.timestamp);
  const latestClose = sorted.at(-1)?.close ?? 0;
  const indicators = calculateMarketIndicators(sorted);

  return {
    symbol,
    priceAboveEma10:
      indicators.ema10 !== null && latestClose > indicators.ema10,
    priceAboveMa20:
      indicators.ema20 !== null && latestClose > indicators.ema20,
    priceAboveMa50:
      indicators.ema50 !== null && latestClose > indicators.ema50,
    macdBullish:
      indicators.macd !== null &&
      indicators.macdSignal !== null &&
      indicators.macd > indicators.macdSignal,
    rsi: indicators.rsi14 ?? 50,
    volumeRatio: calculateVolumeRatio(sorted),
    breakout: detectBreakout(sorted),

    trendScore: 0,
    liquidityScore: 0,
    momentumScore: 0,

    ...baseScores,
  };
}
