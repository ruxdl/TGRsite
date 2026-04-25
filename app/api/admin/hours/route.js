import { NextResponse } from "next/server";
import { createAdminClient } from "../../../../lib/supabaseServer";

function isAdmin(req) {
  const auth = req.headers.get("x-admin-password");
  return auth === process.env.ADMIN_PASSWORD;
}

// GET – lecture publique des horaires
export async function GET() {
  const db = createAdminClient();
  const { data, error } = await db
    .from("hours")
    .select("*")
    .order("sort_order");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// PUT – mise à jour complète des horaires (admin)
export async function PUT(req) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const hours = await req.json();
  const db = createAdminClient();

  // Upsert all rows
  const { error } = await db.from("hours").upsert(hours, { onConflict: ["id"] });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
