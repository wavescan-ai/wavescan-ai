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

  const score =
    input.trendScore +
    input.elliottScore +
    input.liquidityScore +
    input.momentumScore +
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
