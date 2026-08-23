/* Compatibility loader for the shared site-wide theme system. */
(function(){
  if(window.MEC_UI_THEMES || document.querySelector('script[data-mec-themes-loader]')) return;
  const s=document.createElement('script');
  s.src='./mec-themes.js';
  s.dataset.mecThemesLoader='1';
  (document.head||document.documentElement).appendChild(s);

  /* Myanmar Elite Connect — Myanmar royal curtain transition. */
  if(!document.querySelector('script[data-mec-curtain-loader]')){
    const t=document.createElement('script');
    t.src='./mec-curtain-transition.js';
    t.dataset.mecCurtainLoader='1';
    (document.head||document.documentElement).appendChild(t);
  }
})();