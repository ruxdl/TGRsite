import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const authHeader = req.headers.get("x-admin-password");
    if (authHeader !== process.env.ADMIN_PASSWORD) {
      return Response.json({ ok: false, error: "Non autorisé" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file");
    const bucket = formData.get("bucket") || "images";
    const folder = formData.get("folder") || "general";

    if (!file) {
      return Response.json({ ok: false, error: "Aucun fichier fourni" }, { status: 400 });
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    const buffer = await file.arrayBuffer();

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, buffer, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      return Response.json({ ok: false, error: error.message }, { status: 400 });
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName);
    const publicUrl = urlData?.publicUrl;

    return Response.json({
      ok: true,
      fileName: data.path,
      publicUrl: publicUrl,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
