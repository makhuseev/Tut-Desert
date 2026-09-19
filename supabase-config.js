// Tut Dessert — Supabase configuration
// IMPORTANT: use only the Supabase Project URL and PUBLISHABLE key here.
// NEVER put a secret/service_role key in this file.
const SUPABASE_URL = "PASTE_YOUR_SUPABASE_PROJECT_URL_HERE";
const SUPABASE_PUBLISHABLE_KEY = "PASTE_YOUR_SUPABASE_PUBLISHABLE_KEY_HERE";

const SUPABASE_CONFIGURED =
  SUPABASE_URL.startsWith("https://") &&
  SUPABASE_URL.includes(".supabase.co") &&
  !SUPABASE_URL.includes("PASTE_") &&
  SUPABASE_PUBLISHABLE_KEY.length > 20 &&
  !SUPABASE_PUBLISHABLE_KEY.includes("PASTE_");

const supabaseClient = SUPABASE_CONFIGURED
  ? supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;
