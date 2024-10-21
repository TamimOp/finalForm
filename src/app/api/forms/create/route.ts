import { prisma } from "@/lib/prisma";
import { genericMethod } from "@/utils/api/routeTemplate";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

async function createForm(req: Request) {
  const { title, description, elements } = await req.json();

  const cookies = parse(req.headers.get("cookie") || "");
  const decoded = jwt.verify(cookies.authToken, JWT_SECRET);

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

  const newElements = await prisma.element.createMany({
    data: elements.map((element: any) => ({
      ...element,
      fid: newForm.id,
    })),
  });

  return {
    data: {
      form: newForm,
      elements: newElements,
    },
    key: "null",
  };
}

export async function POST(req: Request) {
  return genericMethod(
    req,
    "POST",
    async () => createForm(req),
    "Failed to create template",
    true
  );
}
