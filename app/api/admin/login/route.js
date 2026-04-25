import { NextResponse } from "next/server";

export async function POST(req) {
  const { username, password } = await req.json();

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false, error: "Identifiants incorrects." }, { status: 401 });
}
