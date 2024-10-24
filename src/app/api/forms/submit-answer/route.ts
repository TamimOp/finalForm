import { prisma } from "@/lib/prisma";
import { genericMethod } from "@/utils/api/routeTemplate";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

async function submitAnswer(req: Request) {
  const { answers } = await req.json();

  const cookies = parse(req.headers.get("cookie") || "");
  const decoded = jwt.verify(cookies.authToken, JWT_SECRET);

  if (typeof decoded === "string") {
    throw new Error("Invalid token format");
  }

  const newAnswers = await prisma.answers.createMany({
    data: answers.map((ans: any) => ({
      ...ans,
      uid: decoded.id,
    })),
  });

  return {
    data: newAnswers,
    key: "null",
  };
}

export async function POST(req: Request) {
  return genericMethod(
    req,
    "POST",
    async () => submitAnswer(req),
    "Failed to submit answer",
    true
  );
}
