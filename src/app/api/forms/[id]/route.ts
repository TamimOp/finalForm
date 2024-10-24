import { genericMethod } from "@/utils/api/routeTemplate";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

const formElement = async (uid: string | number) => {
  const id = Number(uid);

  const form = await prisma.form.findFirst({
    where: { id },
  });

  const fid = form?.id || 0;

  const elements = await prisma.element.findMany({
    where: { fid },
  });

  return { data: { elements, form }, key: "data" };
};

export async function GET(
  req: NextRequest,
  params: { params: { id: string } }
) {
  return genericMethod(
    req,
    "GET",
    async () => formElement(params.params.id),
    "Error getting forms",
    false
  );
}
