export type OpportunityInput = {
  symbol: string;
  priceAboveEma10: boolean;
  priceAboveMa20: boolean;
  priceAboveMa50: boolean;
  macdBullish: boolean;
  rsi: number;
  volumeRatio: number;
  breakout: boolean;
  trendScore: number;
  elliottScore: number;
  liquidityScore: number;
  momentumScore: number;
  candleScore: number;
  newsScore: number;
  sectorScore: number;
  riskScore: number;
};

export function calculateOpportunityScore(input: OpportunityInput) {
  const reasons: string[] = [];

  const trendScore =
    (input.priceAboveEma10 ? 6 : 0) +
    (input.priceAboveMa20 ? 5 : 0) +
    (input.priceAboveMa50 ? 4 : 0);

  const momentumScore =
    (input.macdBullish ? 6 : 0) +
    (input.rsi >= 50 && input.rsi <= 70 ? 5 : 0) +
    (input.rsi > 70 && input.rsi <= 80 ? 2 : 0);

  const liquidityScore =
    input.volumeRatio >= 2 ? 8 :
    input.volumeRatio >= 1.5 ? 6 :
    input.volumeRatio >= 1.2 ? 4 : 0;

  const breakoutScore = input.breakout ? 5 : 0;

  const score =
    trendScore +
    input.elliottScore +
    liquidityScore +
    momentumScore +
    breakoutScore +
    input.candleScore +
    input.newsScore +
    input.sectorScore -
    input.riskScore;

  reasons.push(`الاتجاه ${input.trendScore}`);
  reasons.push(`إليوت ${input.elliottScore}`);
  reasons.push(`السيولة ${input.liquidityScore}`);
  reasons.push(`الزخم ${input.momentumScore}`);
  reasons.push(`الشموع ${input.candleScore}`);
  reasons.push(`الأخبار ${input.newsScore}`);
  reasons.push(`القطاع ${input.sectorScore}`);
  reasons.push(`خصم المخاطر -${input.riskScore}`);

  return {
    symbol: input.symbol,
    score: Math.min(score, 100),
    reasons,
  };
}

export function rankOpportunities(inputs: OpportunityInput[]) {
  return inputs
    .map(calculateOpportunityScore)
    .sort((a, b) => b.score - a.score);
}
