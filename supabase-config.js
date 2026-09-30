const SUPABASE_URL = "https://tsemertlvhgnfvtdnjq.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_I8XmDXRwwcQHhLKXCr25iw_jWbaOS8l";

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );
