/* =====================================================
   MYANMAR ELITE CONNECT
   SUPABASE CONNECTION
===================================================== */

const SUPABASE_URL =
  "https://ikjwisfsdcupibgjiuvp.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_xoh1rjwBlJhR9nB3kQD-KA_QcVY6w2s";


/*
 * Create Supabase client
 */

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );


/*
 * Make client available to
 * every page script.
 */

window.supabaseClient =
  supabaseClient;
