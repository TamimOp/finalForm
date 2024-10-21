import { createCookie } from "@/utils/api/cookies";
import { generateToken } from "@/utils/api/jwt";
import { genericResponse } from "@/utils/api/routeTemplate";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server"; // Import the correct type for the request

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return genericResponse(405, "Method not allowed");
  }

  try {
    const { name, email, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER",
      },
    });

    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    const cookie = createCookie(token);

    return genericResponse(200, user, "user", cookie);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return genericResponse(
        400,
        "User already exists or another error occurred",
        "error",
        error.message
      );
    }
    return genericResponse(500, "Something went wrong");
  }
}
