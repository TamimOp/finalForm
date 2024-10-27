import { prisma } from "@/lib/prisma";
import { genericMethod } from "@/utils/api/routeTemplate";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

async function updateForm(req: Request) {
  const { fid, title, description, elements } = await req.json();

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

  const elementToCopy = elements.map((e: any) => {
    if (e.id) {
      delete e.id;
    }
    return e;
  });

  // Duplicate the elements of the original form
  const replicatedElements = await prisma.element.createMany({
    data: elementToCopy.map((element: any) => ({
      ...element,
      fid: newForm.id,
    })),
  });

  return {
    data: {
      form: newForm,
      elements: replicatedElements,
    },
    key: "null",
  };
}

export async function POST(req: Request) {
  return genericMethod(
    req,
    "POST",
    async () => updateForm(req),
    "Failed to update form",
    true
  );
}
