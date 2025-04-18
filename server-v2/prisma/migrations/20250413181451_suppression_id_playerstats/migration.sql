/*
  Warnings:

  - The primary key for the `PlayerStats` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PlayerStats` table. All the data in the column will be lost.
  - Made the column `playerId` on table `PlayerStats` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PlayerStats" DROP CONSTRAINT "PlayerStats_playerId_fkey";

-- AlterTable
ALTER TABLE "PlayerStats" DROP CONSTRAINT "PlayerStats_pkey",
DROP COLUMN "id",
ALTER COLUMN "playerId" SET NOT NULL,
ADD CONSTRAINT "PlayerStats_pkey" PRIMARY KEY ("playerId");

-- AddForeignKey
ALTER TABLE "PlayerStats" ADD CONSTRAINT "PlayerStats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
