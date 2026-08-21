const SUPABASE_URL =
  "https://ikjwisfsdcupibgjiuvp.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_xoh1rjwBlJhR9nB3kQD-KA_QcVY6w2s";

window.supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

window.$ = window.$ || function(id){
  return document.getElementById(id);
};

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

(function(){
  if(document.querySelector('script[data-mec-themes]')) return;
  const s=document.createElement('script');s.src='./mec-themes.js';s.dataset.mecThemes='1';document.head.appendChild(s);
})();

(function(){
  if(document.querySelector('link[data-mec-responsive]')) return;
  const l=document.createElement('link');l.rel='stylesheet';l.href='./mec-responsive.css';l.dataset.mecResponsive='1';document.head.appendChild(l);
})();

(function(){
  const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  if(current!=='index.html' && current!=='auth.html') return;
  const s=document.createElement('script');s.src='./mec-splash.js';s.dataset.mecSplash='1';document.head.appendChild(s);
})();

(function(){
  const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  if(current==='index.html') return;
  const s=document.createElement('script');s.src='./site-nav.js';s.dataset.mecNav='1';document.head.appendChild(s);
})();

(function(){
  const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  if(current!=='general.html') return;
  const s=document.createElement('script');s.src='./general-ui.js';s.dataset.mecGeneralUi='1';document.head.appendChild(s);
})();

(function(){
  const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  if(current!=='add-listing.html') return;
  const s=document.createElement('script');s.src='./mec-add-listing-fix.js';s.dataset.mecAddListingFix='1';document.head.appendChild(s);
})();

(function(){
  if(document.querySelector('script[data-mec-app-fixes]')) return;
  const s=document.createElement('script');s.src='./mec-app-fixes.js';s.dataset.mecAppFixes='1';document.head.appendChild(s);
})();

(function(){
  if(document.querySelector('script[data-mec-profile-fix]')) return;
  const s=document.createElement('script');s.src='./mec-profile-fix.js';s.dataset.mecProfileFix='1';document.head.appendChild(s);
})();

(function(){
  const current=(location.pathname.split('/').pop()||'').toLowerCase();
  if(current!=='admin.html') return;
  const s=document.createElement('script');s.src='./mec-admin-fix.js';s.dataset.mecAdminFix='1';document.head.appendChild(s);
})();

(function(){
  const current=(location.pathname.split('/').pop()||'').toLowerCase();
  if(current!=='auth.html') return;
  const l=document.createElement('link');l.rel='stylesheet';l.href='./mec-auth-mobile.css';l.dataset.mecAuthMobile='1';document.head.appendChild(l);
})();
