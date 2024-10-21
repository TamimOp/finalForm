import { prisma } from "@/lib/prisma";
import { genericResponse } from "@/utils/api/routeTemplate";
import { parse } from "cookie";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export async function GET(req: Request) {
  try {
    const cookies = parse(req.headers.get("cookie") || "");
    const token = cookies.authToken;

    if (!token) {
      return genericResponse(
        200,
        { valid: false, message: "Token not found" },
        "null"
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "string") {
      throw new Error("Invalid token format");
    }

    // Fetch all templates for the user with the id decoded from the token
    const userTemplates = await prisma.template.findMany({
      where: {
        authorId: decoded.id,
      },
      include: {
        form: true, // Optionally include the form related to the template
      },
    });

    return NextResponse.json(userTemplates, { status: 200 });
  } catch (error) {
    console.error("Error fetching templates:", error);

    return NextResponse.json(
      { error: "Failed to retrieve templates" },
      { status: 500 }
    );
  }
}
