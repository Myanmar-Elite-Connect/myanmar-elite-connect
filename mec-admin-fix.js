(function(){
  'use strict';
  if(!/admin\.html$/i.test(location.pathname))return;
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  const db=()=>window.supabaseClient;
  async function boot(){
    await sleep(1200);if(!db())return;
    const filter=document.getElementById('postCategoryFilter');
    if(filter&&!filter.querySelector('option[value="allmarket"]')){const o=document.createElement('option');o.value='allmarket';o.textContent='All Market';filter.appendChild(o)}
    async function review(id,status){
      const reason=status==='rejected'?window.prompt('Reason for rejection (optional):')||'':null;
      try{const r=await db().rpc('admin_review_listing',{p_listing_id:id,p_status:status,p_reason:reason});if(r.error)throw r.error;window.toast?.(status==='approved'?'Listing approved.':'Listing rejected.');if(typeof window.loadPosts==='function')await window.loadPosts();if(typeof window.loadDashboard==='function')await window.loadDashboard()}catch(e){console.error(e);window.toast?.('Review failed: '+(e.message||'Unknown error'));alert('Review failed: '+(e.message||'Unknown error'))}
    }
    window.approvePost=id=>review(id,'approved');
    window.rejectPost=id=>review(id,'rejected');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,300),{once:true});else setTimeout(boot,300);
})();
