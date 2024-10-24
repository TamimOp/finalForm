import { genericMethod } from "@/utils/api/routeTemplate";
import { PrismaClient } from "@prisma/client";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

const prisma = new PrismaClient();

const formElement = async (req: Request, fid: string | number) => {
  const id = Number(fid);

  const cookies = parse(req.headers.get("cookie") || "");
  const decoded = jwt.verify(cookies.authToken, JWT_SECRET);

  if (typeof decoded === "string") {
    throw new Error("Invalid token format");
  }

  const form = await prisma.form.findFirst({
    where: { id },
  });

  const permission = await prisma.formPermission.findFirst({
    where: { fid: id, email: decoded.email },
  });

  // Check permissions if only form is private
  if (form?.permission === 1) {
    if (form?.uid !== decoded.id && !permission) {
      return {
        data: {
          msg: "You are not authorized to view this form",
        },
        key: "null",
      };
    }
  }

  const elements = await prisma.element.findMany({
    where: { fid: id },
  });

  return { data: { elements, form }, key: "data" };
};

export async function GET(req: Request, params: { params: { id: string } }) {
  return genericMethod(
    req,
    "GET",
    async () => formElement(req, params.params.id),
    "Error getting forms",
    true
  );
}
