// Tut Dessert — Supabase configuration

const SUPABASE_URL = "ТВОЙ_SUPABASE_URL";
const SUPABASE_PUBLISHABLE_KEY = "ТВОЙ_sb_publishable_КЛЮЧ";

const SUPABASE_CONFIGURED = true;

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);
