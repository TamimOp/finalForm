import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { title, description, fid } = await req.json();

  try {
    const newTemplate = await prisma.template.create({
      data: {
        title,
        description,
        authorId: 1, // Replace with current user ID
        fid,
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
