import { NextResponse } from "next/server";
import { createAdminClient } from "../../../../lib/supabaseServer";

function isAdmin(req) {
  return req.headers.get("x-admin-password") === process.env.ADMIN_PASSWORD;
}

// GET – lecture publique des événements (à venir + passés récents)
export async function GET() {
  const db = createAdminClient();
  const { data, error } = await db
    .from("events")
    .select("*")
    .order("event_date", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST – créer un événement (admin)
export async function POST(req) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const db = createAdminClient();

  const { data, error } = await db
    .from("events")
    .insert([{ ...body }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// DELETE – supprimer un événement (admin)
export async function DELETE(req) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { id } = await req.json();
  const db = createAdminClient();

  const { error } = await db.from("events").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}

// PATCH – modifier un événement (admin)
export async function PATCH(req) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { id, ...fields } = await req.json();
  const db = createAdminClient();

  const { data, error } = await db
    .from("events")
    .update(fields)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
