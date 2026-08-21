/* Server-side pagination for general.html. Loads only one page from Supabase. */
(function(){
  const PAGE_SIZE=20;
  let page=1;
  let total=0;
  let loading=false;
  const client=window.supabaseClient||window.supabase.createClient("https://ikjwisfsdcupibgjiuvp.supabase.co","sb_publishable_xoh1rjwBlJhR9nB3kQD-KA_QcVY6w2s");

  function esc(v){return String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;')}
  function cat(v){const x=String(v||'').toLowerCase();if(x.includes('car')||x.includes('ကား'))return'car';if(x.includes('property')||x.includes('အိမ်')||x.includes('ခြံ')||x.includes('မြေ'))return'property';if(x.includes('gem')||x.includes('ကျောက်'))return'gem';return'allmarket'}
  function img(i){return i.show_photo_url||i.cover_url||i.image_url||(Array.isArray(i.images)?i.images[0]:'')||(Array.isArray(i.detail_images)?i.detail_images[0]:'')}
  function loc(i){return [i.location,i.region,i.township,i.nearby_address,i.address].filter(Boolean).join(' · ')||'Myanmar'}
  function money(v){const n=Number(v);return Number.isFinite(n)?'MMK '+n.toLocaleString('en-US'):'Price on request'}

  function inject(){
    const section=document.querySelector('#listingContainer')?.closest('.section');
    if(!section||document.getElementById('paginationBar'))return;
    const bar=document.createElement('div');bar.id='paginationBar';bar.innerHTML=`<button id="pagePrev" type="button">← Previous</button><div id="pageNumbers"></div><button id="pageNext" type="button">Next →</button>`;
    section.appendChild(bar);
    const style=document.createElement('style');style.textContent=`#paginationBar{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:18px}#paginationBar button,#pageNumbers button{height:34px;min-width:34px;padding:0 10px;border:1px solid var(--border);border-radius:9px;background:var(--surface);color:var(--text);font-size:9px;font-weight:800}#paginationBar button:hover,#pageNumbers button:hover,#pageNumbers button.active{background:var(--gold);color:#071a34;border-color:var(--gold)}#paginationBar button:disabled{opacity:.35;cursor:not-allowed}#pageNumbers{display:flex;gap:5px;flex-wrap:wrap;justify-content:center}`;document.head.appendChild(style);
    document.getElementById('pagePrev').onclick=()=>{if(page>1){page--;load()}};
    document.getElementById('pageNext').onclick=()=>{if(page<Math.ceil(total/PAGE_SIZE)){page++;load()}};
  }
  function renderPages(){
    const n=Math.max(1,Math.ceil(total/PAGE_SIZE));const box=document.getElementById('pageNumbers');if(!box)return;let start=Math.max(1,page-2),end=Math.min(n,start+4);start=Math.max(1,end-4);box.innerHTML='';for(let p=start;p<=end;p++){const b=document.createElement('button');b.textContent=p;b.className=p===page?'active':'';b.onclick=()=>{page=p;load()};box.appendChild(b)}document.getElementById('pagePrev').disabled=page<=1;document.getElementById('pageNext').disabled=page>=n;document.getElementById('resultCount').textContent=`Page ${page} · ${total.toLocaleString()} listings`;
  }
  function render(items){
    const c=document.getElementById('listingContainer');
    if(!items.length){c.innerHTML='<div class="state"><div><strong>No listings found</strong><small>There are no approved listings on this page.</small></div></div>';return}
    c.innerHTML=items.map(i=>{const title=i.item_name||i.title||i.name||'Untitled Listing',im=img(i),k=cat(i.category||i.type);return `<a class="listing-card" href="./listing-detail.html?id=${encodeURIComponent(i.id)}"><div class="listing-image">${im?`<img src="${esc(im)}" alt="${esc(title)}" loading="lazy">`:'<div class="state">No Photo</div>'}<div class="listing-category">${k==='allmarket'?'ALL MARKET':k.toUpperCase()}</div></div><div class="listing-body"><div class="listing-title">${esc(title)}</div><div class="listing-price">${money(i.price)}</div><div class="listing-location">⌖ ${esc(loc(i))}</div></div></a>`}).join('');
  }
  async function load(){
    if(loading)return;loading=true;inject();const c=document.getElementById('listingContainer');c.innerHTML='<div class="state"><div><strong>Loading listings…</strong><small>Fetching this page only.</small></div></div>';
    try{
      let q=client.from('listings').select('*',{count:'exact'}).order('created_at',{ascending:false}).range((page-1)*PAGE_SIZE,page*PAGE_SIZE-1);
      const cat=document.getElementById('categoryFilter')?.value||'',reg=document.getElementById('regionFilter')?.value||'',min=document.getElementById('minPrice')?.value||'',max=document.getElementById('maxPrice')?.value||'',search=document.getElementById('searchInput')?.value?.trim()||'';
      if(cat) q=q.or(`category.ilike.%${cat}%,category.ilike.%${cat==='allmarket'?'Other':''}%`);
      if(reg) q=q.eq('region',reg);if(min)q=q.gte('price',Number(min));if(max)q=q.lte('price',Number(max));
      if(search) q=q.or(`title.ilike.%${search}%,item_name.ilike.%${search}%,description.ilike.%${search}%,details.ilike.%${search}%`);
      q=q.not('status','in','(pending,rejected,draft,declined)');
      const {data,error,count}=await q;if(error)throw error;total=count||0;render(data||[]);renderPages();
    }catch(e){console.error(e);c.innerHTML=`<div class="state"><div><strong>Unable to load listings</strong><small>${esc(e.message||'Supabase query failed.')}</small></div></div>`}
    finally{loading=false}
  }
  window.MEC_GENERAL_PAGINATION={load};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{inject();load()},{once:true});else{inject();load()}
})();
