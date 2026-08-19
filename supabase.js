const SUPABASE_URL =
  "https://ikjwisfsdcupibgjiuvp.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_xoh1rjwBlJhR9nB3kQD-KA_QcVY6w2s";

window.supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );
