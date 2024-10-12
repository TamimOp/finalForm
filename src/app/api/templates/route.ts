import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all templates (or filter based on query params)
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const authorId = url.searchParams.get("authorId"); // Example of filtering by authorId

    const templates = await prisma.template.findMany({
      where: authorId ? { authorId: Number(authorId) } : {},
      include: {
        author: true, // Include related author
        likes: true, // Include likes for each template
        comments: true, // Include comments
        tags: true, // Include tags
      },
    });

    return NextResponse.json(templates, { status: 200 });
  } catch (error) {
    console.error("Error fetching templates:", error);
    return NextResponse.json(
      { error: "Failed to fetch templates" },
      { status: 500 }
    );
  }
}

// POST a new template
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { authorId, fid, title, description } = body;

    const newTemplate = await prisma.template.create({
      data: {
        authorId,
        fid,
        form: {
          connect: { id: fid }, // Connect template to an existing form
        },
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

// PUT (Update a specific template by ID)
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, description } = body;

    const updatedTemplate = await prisma.template.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(updatedTemplate, { status: 200 });
  } catch (error) {
    console.error("Error updating template:", error);
    return NextResponse.json(
      { error: "Failed to update template" },
      { status: 500 }
    );
  }
}

// DELETE a specific template by ID
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Template ID is required" },
        { status: 400 }
      );
    }

    const deletedTemplate = await prisma.template.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(deletedTemplate, { status: 200 });
  } catch (error) {
    console.error("Error deleting template:", error);
    return NextResponse.json(
      { error: "Failed to delete template" },
      { status: 500 }
    );
  }
}
