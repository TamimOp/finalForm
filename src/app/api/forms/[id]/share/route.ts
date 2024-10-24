import { genericMethod } from "@/utils/api/routeTemplate";
import { PrismaClient } from "@prisma/client";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

const prisma = new PrismaClient();

const formShare = async (req: Request) => {
  const { email, form, permissionValue } = await req.json();

  const cookies = parse(req.headers.get("cookie") || "");
  const decoded = jwt.verify(cookies.authToken, JWT_SECRET);

  if (typeof decoded === "string") {
    throw new Error("Invalid token format");
  }

  // Update permissionValue of the form
  if (permissionValue && permissionValue !== -1) {
    await prisma.form.update({
      where: {
        id: form.id,
      },
      data: {
        permission: permissionValue,
      },
    });
  }

  let formPermission;

  if (email && email !== "") {
    // find formPermission with email and fid
    formPermission = await prisma.formPermission.findFirst({
      where: {
        email: email,
        fid: form.id,
      },
    });

    // if not exists, create new formPermission
    if (!formPermission) {
      formPermission = await prisma.formPermission.create({
        data: {
          email: email,
          fid: Number(form.id),
          role: "Viewer",
        },
      });
    }
  }

  return { data: { formPermission }, key: "null" };
};

export async function POST(req: Request) {
  return genericMethod(
    req,
    "POST",
    async () => formShare(req),
    "Error setting form permission",
    false
  );
}
