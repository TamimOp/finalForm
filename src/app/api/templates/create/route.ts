import { prisma } from "@/lib/prisma";
import { genericResponse } from "@/utils/api/routeTemplate";
import { parse } from "cookie";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export async function POST(req: Request) {
  const { title, description } = await req.json();

  try {
    const cookies = parse(req.headers.get("cookie") || "");
    const token = cookies.authToken;

    if (!token) {
      return genericResponse(
        200,
        { valid: false, decoded: "Token not found" },
        "null"
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "string") {
      throw new Error("Invalid token format");
    }

    const newForm = await prisma.form.create({
      data: {
        title,
        description,
        uid: decoded.id,
      },
    });

    const newTemplate = await prisma.template.create({
      data: {
        title,
        description,
        authorId: decoded.id,
        fid: newForm.id,
      },
    });

    return NextResponse.json(newTemplate, { status: 201 });
  } catch (error) {
    console.error("Error creating template:", error);

    return NextResponse.json(
      { error: "Failed to create template" },
      { status: 500 }
    );
  }
}
