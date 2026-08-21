const SUPABASE_URL =
  "https://ikjwisfsdcupibgjiuvp.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_xoh1rjwBlJhR9nB3kQD-KA_QcVY6w2s";

window.supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

/* Small shared DOM helper used by profile.html and other MEC pages. */
window.$ = window.$ || function(id){
  return document.getElementById(id);
};

/* Shared logo treatment. */
(function(){
  if(document.getElementById('mec-logo-style')) return;
  const style=document.createElement('style');
  style.id='mec-logo-style';
  style.textContent=`
    :where(.logo-wrap,.brand-logo,.logo-showcase,.logo-box,.brand-mark,.brand-image):has(> img[src*="lh3.googleusercontent.com/d/1fR8TnvOjrzVbKuro9Ths1_Jt0PAxSmGd"]){border-radius:18% !important;overflow:hidden}
    img[src*="lh3.googleusercontent.com/d/1fR8TnvOjrzVbKuro9Ths1_Jt0PAxSmGd"]{border-radius:8%}
  `;
  (document.head||document.documentElement).appendChild(style);
})();

/* Global Myanmar UI/UX theme layer. Visual-only; content and page logic are untouched. */
(function(){
  if(document.querySelector('script[data-mec-themes]')) return;
  const s=document.createElement('script');
  s.src='./mec-themes.js';
  s.dataset.mecThemes='1';
  document.head.appendChild(s);
})();

/* Luxury entry splash for the public landing and authentication pages. */
(function(){
  const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  if(current!=='index.html' && current!=='auth.html') return;
  if(document.querySelector('script[data-mec-splash]')) return;
  const s=document.createElement('script');
  s.src='./mec-splash.js';
  s.dataset.mecSplash='1';
  document.head.appendChild(s);
})();

/* Shared app navigation: index.html is the public landing page and stays free of bottom navigation. */
(function(){
  if(document.querySelector('script[data-mec-nav]')) return;
  const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  if(current==='index.html') return;
  const s=document.createElement('script');
  s.src='./site-nav.js';
  s.dataset.mecNav='1';
  document.head.appendChild(s);
})();

/* General page UI: compact horizontal categories + collapsible filter. */
(function(){
  if(document.querySelector('script[data-mec-general-ui]')) return;
  const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  if(current!=='general.html') return;
  const s=document.createElement('script');
  s.src='./general-ui.js';
  s.dataset.mecGeneralUi='1';
  document.head.appendChild(s);
})();
