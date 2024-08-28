-- CreateTable
CREATE TABLE "Measure" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" REAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "measureType" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);
