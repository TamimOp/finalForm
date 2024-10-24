import { genericMethod } from "@/utils/api/routeTemplate";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

const formResponse = async (uid: string | number) => {
  const id = Number(uid);

  const form = await prisma.form.findFirst({
    where: { id },
  });

  const fid = form?.id || 0;

  const elements = await prisma.element.findMany({
    where: { fid },
  });

  // find answers where eid and fid same
  const answers = await prisma.answers.findMany({
    where: { fid: fid },
  });

  // group answers by uid
  const groupedAnswersByUid = answers.reduce((acc, answer) => {
    if (!acc[answer.uid]) {
      acc[answer.uid] = [];
    }
    acc[answer.uid].push(answer);
    return acc;
  }, {} as Record<string, any[]>);

  // group answers by eid
  const groupedAnswersByEid = answers.reduce((acc, answer) => {
    if (!acc[answer.eid]) {
      acc[answer.eid] = [];
    }
    acc[answer.eid].push(answer);
    return acc;
  }, {} as Record<string, any[]>);

  return {
    data: {
      groupedAnswersByUid,
      groupedAnswersByEid,
    },
    key: "null",
  };
};

export async function GET(
  req: NextRequest,
  params: { params: { id: string } }
) {
  return genericMethod(
    req,
    "GET",
    async () => formResponse(params.params.id),
    "Error getting response",
    false
  );
}
