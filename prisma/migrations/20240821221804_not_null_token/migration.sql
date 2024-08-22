/*
  Warnings:

  - Made the column `token` on table `linkURL` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_linkURL" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "token" TEXT NOT NULL
);
INSERT INTO "new_linkURL" ("id", "token", "url") SELECT "id", "token", "url" FROM "linkURL";
DROP TABLE "linkURL";
ALTER TABLE "new_linkURL" RENAME TO "linkURL";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
