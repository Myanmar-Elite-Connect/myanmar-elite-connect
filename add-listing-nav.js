/* Add-listing mobile navigation: exactly four items. */
(function(){
  function mount(){
    const nav=document.querySelector('.mobile-nav');
    if(!nav) return;
    nav.innerHTML=`<div class="mobile-nav-inner">
      <a href="./general.html"><span class="mobile-icon">⌂</span><span>Home</span></a>
      <a href="./add-listing.html" class="active"><span class="mobile-icon">＋</span><span>Add Listing</span></a>
      <a href="./chat.html"><span class="mobile-icon">◌</span><span>Chat</span></a>
      <a href="./profile.html"><span class="mobile-icon">♙</span><span>Profile</span></a>
    </div>`;
    nav.style.display='block';
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount,{once:true});
  else mount();
})();
