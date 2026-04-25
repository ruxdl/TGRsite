import { createClient } from "@supabase/supabase-js";

// Ce fichier ne doit être importé que dans app/api/** (côté serveur)
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  );
}
