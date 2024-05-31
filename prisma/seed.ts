import { db } from "@/server/db";
import { PrismaClient } from "@prisma/client";
import { type Prisma } from "@prisma/client";

const locales = [
  {
    code: "en",
    name: "English",
  },
  {
    code: "es",
    name: "Español",
  },
  {
    code: "de",
    name: "Deutsch",
  },
  {
    code: "tr",
    name: "Türkçe",
  },
  {
    code: "fa",
    name: "فارسی",
  },
  {
    code: "ar",
    name: "العربية",
  },
];

const emails = ["aynzad@gmail.com"];

const prisma = new PrismaClient();

async function createUsers() {
  const data: Prisma.UserCreateInput[] = emails.map((email) => ({
    email,
    status: "PENDING",
  }));
  return await db.user.createMany({
    data,
    skipDuplicates: true,
  });
}

async function createLocales() {
  const data: Prisma.LocaleCreateInput[] = locales.map((locale) => ({
    code: locale.code,
    name: locale.name,
    status: "ACTIVE",
  }));

  return await db.locale.createMany({
    data,
    skipDuplicates: true,
  });
}

async function main() {
  const { count: userCount } = await createUsers();
  const { count: localeCount } = await createLocales();

  console.log({ userCount, localeCount });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
