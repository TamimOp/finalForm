import { genericResponse } from "@/utils/api/routeTemplate";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return genericResponse(405, "Method not allowed");
  }

  try {
    const cookie =
      "authToken=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict";

    return genericResponse(200, "Logout successful", "message", cookie);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return genericResponse(500, `Something went wrong: ${errorMessage}`);
  }
}
