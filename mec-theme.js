/* Compatibility loader for the shared site-wide theme system. */
(function(){
  if(window.MEC_UI_THEMES || document.querySelector('script[data-mec-themes-loader]')) return;
  const s=document.createElement('script');
  s.src='./mec-themes.js';
  s.dataset.mecThemesLoader='1';
  (document.head||document.documentElement).appendChild(s);
})();

/* Add-listing uses the four-item mobile navigation: Home / Add Listing / Chat / Profile. */
(function(){
  const page=(location.pathname.split('/').pop()||'').toLowerCase();
  if(page!=='add-listing.html') return;
  if(document.querySelector('script[data-add-listing-nav]')) return;
  const s=document.createElement('script');
  s.src='./add-listing-nav.js';
  s.dataset.addListingNav='1';
  (document.head||document.documentElement).appendChild(s);
})();
