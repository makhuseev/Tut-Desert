// Tut Dessert — Supabase configuration

const SUPABASE_URL = "https://tsemlertlvhgnfvtdnjq.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_I8XmDXRwwcQHhLKXCr25iw_jWbaOS8l";

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
