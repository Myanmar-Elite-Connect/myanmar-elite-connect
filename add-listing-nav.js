/* Legacy compatibility shim. The shared site-nav.js now owns primary navigation. */
(function(){
  'use strict';
  if(document.getElementById('mec-global-nav'))return;
  const mount=()=>{
    if(document.getElementById('mec-global-nav'))return;
    const nav=document.querySelector('.mobile-nav');
    if(!nav)return;
    nav.innerHTML=`<div class="mobile-nav-inner">
      <a href="./general.html"><span class="mobile-icon">⌂</span><span>Home</span></a>
      <a href="./allmarket.html" class="active"><span class="mobile-icon">▣</span><span>Listing</span></a>
      <a href="./chat.html"><span class="mobile-icon">◌</span><span>Chat</span></a>
      <a href="./profile.html"><span class="mobile-icon">♙</span><span>Profile</span></a>
    </div>`;
    nav.style.display='block';
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});
  else mount();
})();
