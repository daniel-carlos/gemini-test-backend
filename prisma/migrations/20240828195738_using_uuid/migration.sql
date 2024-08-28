/*
  Warnings:

  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Measure` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `customerId` to the `Measure` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "id" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_Customer" ("id") SELECT "id" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE TABLE "new_Measure" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "measureType" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    CONSTRAINT "Measure_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Measure" ("date", "id", "imageUrl", "measureType", "uuid", "value") SELECT "date", "id", "imageUrl", "measureType", "uuid", "value" FROM "Measure";
DROP TABLE "Measure";
ALTER TABLE "new_Measure" RENAME TO "Measure";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
