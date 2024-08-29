/*
  Warnings:

  - You are about to drop the column `date` on the `Measure` table. All the data in the column will be lost.
  - Added the required column `month` to the `Measure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Measure` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Measure" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "measureType" TEXT NOT NULL,
    "customerCode" TEXT NOT NULL,
    "confirmed" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Measure_customerCode_fkey" FOREIGN KEY ("customerCode") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Measure" ("confirmed", "customerCode", "id", "measureType", "value") SELECT "confirmed", "customerCode", "id", "measureType", "value" FROM "Measure";
DROP TABLE "Measure";
ALTER TABLE "new_Measure" RENAME TO "Measure";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
