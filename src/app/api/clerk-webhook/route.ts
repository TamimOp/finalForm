// app/api/clerk-webhook/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();

    // Make sure the event is a "user.created" event
    if (data.object === "user" && data.type === "user.created") {
      const { id, email_addresses, first_name, last_name } = data;

      // Create a new Prisma user using the Clerk user data
      await prisma.user.create({
        data: {
          clerkId: id,
          email: email_addresses[0].email_address, // Clerk can store multiple emails
          name: `${first_name} ${last_name}`,
        },
      });
    }

    return NextResponse.json({ status: "User created" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
