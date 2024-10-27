import { createCookie } from "@/utils/api/cookies";
import { generateToken } from "@/utils/api/jwt";
import { genericResponse } from "@/utils/api/routeTemplate";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return genericResponse(405, "Method not allowed");
  }

  try {
    const { email, password }: { email: string; password: string } =
      await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return genericResponse(404, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return genericResponse(401, "Invalid password");
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });
    const cookie = createCookie(token);

    return genericResponse(200, "Login successful", "message", cookie);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return genericResponse(500, `Something went wrong: ${errorMessage}`);
  }
}
