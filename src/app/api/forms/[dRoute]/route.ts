import { genericMethod } from "@/utils/api/routeTemplate";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

const formElement = async (uid: string | number) => {
  const id = Number(uid);

  const elements = await prisma.element.findMany({
    where: { id },
  });
  const forms = await prisma.form.findFirst({
    where: { id },
  });

  return { data: { elements, forms }, key: "data" };
};

export async function GET(
  req: NextRequest,
  params: { params: { dRoute: string } }
) {
  return genericMethod(
    req,
    "GET",
    async () => formElement(params.params.dRoute),
    "Error getting forms",
    false
  );
}
