export type MACDResult = {
  macd: number[];
  signal: number[];
  histogram: number[];
};

export function calculateEMA(values: number[], period: number): number[] {
  if (period <= 0 || values.length < period) return [];

  const multiplier = 2 / (period + 1);
  const initialSMA =
    values.slice(0, period).reduce((sum, value) => sum + value, 0) / period;

  const ema: number[] = [initialSMA];

  for (let i = period; i < values.length; i++) {
    const nextEMA = (values[i] - ema[ema.length - 1]) * multiplier + ema[ema.length - 1];
    ema.push(nextEMA);
  }

  return ema;
}

export function calculateRSI(values: number[], period = 14): number[] {
  if (period <= 0 || values.length <= period) return [];

  let gains = 0;
  let losses = 0;

  for (let i = 1; i <= period; i++) {
    const change = values[i] - values[i - 1];

    if (change >= 0) gains += change;
    else losses += Math.abs(change);
  }

  let averageGain = gains / period;
  let averageLoss = losses / period;

  const rsi: number[] = [
    averageLoss === 0 ? 100 : 100 - 100 / (1 + averageGain / averageLoss),
  ];

  for (let i = period + 1; i < values.length; i++) {
    const change = values[i] - values[i - 1];
    const gain = change > 0 ? change : 0;
    const loss = change < 0 ? Math.abs(change) : 0;

    averageGain = (averageGain * (period - 1) + gain) / period;
    averageLoss = (averageLoss * (period - 1) + loss) / period;

    rsi.push(
      averageLoss === 0 ? 100 : 100 - 100 / (1 + averageGain / averageLoss),
    );
  }

  return rsi;
}

export function calculateMACD(
  values: number[],
  fastPeriod = 12,
  slowPeriod = 26,
  signalPeriod = 9,
): MACDResult {
  if (
    values.length < slowPeriod ||
    fastPeriod <= 0 ||
    slowPeriod <= fastPeriod ||
    signalPeriod <= 0
  ) {
    return { macd: [], signal: [], histogram: [] };
  }

  const fastEMA = calculateEMA(values, fastPeriod);
  const slowEMA = calculateEMA(values, slowPeriod);
  const offset = slowPeriod - fastPeriod;

  const macd = slowEMA.map(
    (slowValue, index) => fastEMA[index + offset] - slowValue,
  );

  const signal = calculateEMA(macd, signalPeriod);
  const histogramOffset = macd.length - signal.length;

  const histogram = signal.map(
    (signalValue, index) => macd[index + histogramOffset] - signalValue,
  );

  return { macd, signal, histogram };
}
