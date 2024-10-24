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
  // Update the form details using fid
  const updatedForm = await prisma.form.update({
    where: { id: Number(fid) },
    data: { title, description },
  });

  // get all elements of the form
  const allElements = await prisma.element.findMany({
    where: { fid: Number(fid) },
  });

  // Separate the elements into those with an id (existing) and those without (new)
  const existingElements = elements.filter((element: any) => element.id);
  const newElements = elements.filter((element: any) => !element.id);

  // find elements that are not in the existingElements list
  const elementsToDelete = allElements.filter(
    (element) => !existingElements.some((e: any) => e.id === element.id)
  );

  // delete elements that are not in the existingElements list
  await prisma.element.deleteMany({
    where: {
      id: {
        in: elementsToDelete.map((element: any) => element.id),
      },
    },
  });

  // Update existing elements
  const updatedElements = await Promise.all(
    existingElements.map((element: any) =>
      prisma.element.update({
        where: { id: Number(element.id) },
        data: {
          type: element.type,
          index: element.index,
          question: element.question,
          required: element.required,
          fieldCount: element.fieldCount,
          text1: element.text1,
          text2: element.text2,
          text3: element.text3,
          text4: element.text4,
        },
      })
    )
  );

  const newE = await prisma.element.createMany({
    data: newElements.map((element: any) => ({
      ...element,
      fid: updatedForm.id,
    })),
  });

  return {
    data: {
      form: updatedForm,
      elements: [...updatedElements, newE],
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
