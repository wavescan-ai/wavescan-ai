-- CreateTable
CREATE TABLE "WaveScoreHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "symbol" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "rsi" REAL,
    "macd" REAL,
    "macdSignal" REAL,
    "trendScore" INTEGER NOT NULL,
    "momentumScore" INTEGER NOT NULL,
    "liquidityScore" INTEGER NOT NULL,
    "windowStatus" TEXT NOT NULL,
    "windowExplanation" TEXT NOT NULL,
    "recordedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "WaveScoreHistory_symbol_recordedAt_idx" ON "WaveScoreHistory"("symbol", "recordedAt");
