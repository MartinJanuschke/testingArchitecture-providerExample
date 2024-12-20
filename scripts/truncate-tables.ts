import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

//SQLLite Truncate is not supported, thats why we use DELETE

export async function truncateTables(): Promise<void> {
  await prisma.$executeRaw`DELETE FROM "Movie"`
  await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='Movie'`
  console.log('Tables truncated')
  await prisma.$disconnect()
}
