/* Compatibility loader for the shared site-wide theme system. */
(function(){
  if(window.MEC_UI_THEMES || document.querySelector('script[data-mec-themes-loader]')) return;
  const s=document.createElement('script');
  s.src='./mec-themes.js';
  s.dataset.mecThemesLoader='1';
  (document.head||document.documentElement).appendChild(s);
})();
