import { createClient } from "@supabase/supabase-js";

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnon) {
  throw new Error(
    "❌ Variables Supabase manquantes — copiez .env.local.example vers .env.local et remplissez les valeurs."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnon);
