import { prisma } from "@/lib/prisma";

export type SaveWaveScoreHistoryInput = {
  symbol: string;
  score: number;
  rsi?: number | null;
  macd?: number | null;
  macdSignal?: number | null;
  trendScore: number;
  momentumScore: number;
  liquidityScore: number;
  windowStatus: string;
  windowExplanation: string;
};

export async function saveWaveScoreHistory(
  input: SaveWaveScoreHistoryInput,
) {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

  const recentRecord = await prisma.waveScoreHistory.findFirst({
    where: {
      symbol: input.symbol,
      recordedAt: {
        gte: fiveMinutesAgo,
      },
    },
    orderBy: {
      recordedAt: "desc",
    },
  });

  if (recentRecord) {
    return recentRecord;
  }

  return prisma.waveScoreHistory.create({
    data: {
      symbol: input.symbol,
      score: input.score,
      rsi: input.rsi ?? null,
      macd: input.macd ?? null,
      macdSignal: input.macdSignal ?? null,
      trendScore: input.trendScore,
      momentumScore: input.momentumScore,
      liquidityScore: input.liquidityScore,
      windowStatus: input.windowStatus,
      windowExplanation: input.windowExplanation,
    },
  });
}
