import { NextResponse } from "next/server";
import { createAdminClient } from "../../../../lib/supabaseServer";

function isAdmin(req) {
  return req.headers.get("x-admin-password") === process.env.ADMIN_PASSWORD;
}

// GET – lecture publique des marques
export async function GET() {
  const db = createAdminClient();
  const { data, error } = await db
    .from("brands")
    .select("*")
    .order("sort_order");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST – ajouter une marque (admin)
export async function POST(req) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const db = createAdminClient();

  const { data, error } = await db
    .from("brands")
    .insert([{ ...body }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// DELETE – supprimer une marque (admin)
export async function DELETE(req) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { id } = await req.json();
  const db = createAdminClient();

  const { error } = await db.from("brands").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}

// PATCH – modifier une marque (admin)
export async function PATCH(req) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { id, ...fields } = await req.json();
  const db = createAdminClient();

  const { data, error } = await db
    .from("brands")
    .update(fields)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
