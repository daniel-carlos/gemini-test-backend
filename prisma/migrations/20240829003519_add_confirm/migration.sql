-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Measure" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "measureType" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "confirmed" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Measure_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Measure" ("customerId", "date", "id", "imageUrl", "measureType", "uuid", "value") SELECT "customerId", "date", "id", "imageUrl", "measureType", "uuid", "value" FROM "Measure";
DROP TABLE "Measure";
ALTER TABLE "new_Measure" RENAME TO "Measure";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
