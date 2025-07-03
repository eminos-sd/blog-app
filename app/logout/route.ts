import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  console.log("before log out");

  await supabase.auth.signOut();
  console.log("after log out");
  const url = new URL("/", request.url);
  return NextResponse.redirect(new URL(url));
}
