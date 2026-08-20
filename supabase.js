const SUPABASE_URL =
  "https://ikjwisfsdcupibgjiuvp.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_xoh1rjwBlJhR9nB3kQD-KA_QcVY6w2s";

window.supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

/* Shared app navigation: every page that loads supabase.js gets the same
   Home / Listing / Chat / Profile navigation without duplicating markup. */
(function(){
  if(document.querySelector('script[data-mec-nav]')) return;
  const s=document.createElement('script');
  s.src='./site-nav.js';
  s.dataset.mecNav='1';
  document.head.appendChild(s);
})();
