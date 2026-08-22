(function(){
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  const isProfile=/profile\.html$/i.test(location.pathname);
  const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  function setText(id,value){const el=document.getElementById(id);if(el)el.textContent=value==null?'':String(value)}
  function showPage(){document.getElementById('loading')?.classList.add('hidden');document.getElementById('profileCard')?.classList.remove('hidden')}
  function showError(message){document.getElementById('loading')?.classList.add('hidden');const e=document.getElementById('error');const t=document.getElementById('errorText');if(t)t.textContent=message||'Unable to load profile.';e?.classList.remove('hidden')}

  function renderBadges(profile){
    const box=document.getElementById('badges');
    if(!box)return;
    const values=[];
    const region=profile.region_name||profile.region||profile.state||profile.state_name||profile.region_state;
    const field=profile.field||profile.industry||profile.profession||profile.seller_type;
    if(region)values.push({text:String(region),cls:'region-badge'});
    if(field)values.push({text:String(field),cls:'field-badge'});
    if(profile.is_verified)values.push({text:'✓ Verified',cls:'verified'});
    if(profile.is_mcp)values.push({text:'◆ MPC',cls:'mcp'});
    let old=[];try{old=JSON.parse(localStorage.getItem('mec-profile-badges-'+profile.id)||'[]')}catch{}
    old.forEach(x=>{if(x&&!values.some(v=>v.text===String(x)))values.push({text:String(x),cls:''})});
    box.innerHTML=values.map(v=>`<span class="badge ${v.cls}">✦ ${esc(v.text)}</span>`).join('');
  }

  function renderPosts(rows,isOwner){
    const section=document.getElementById('postsSection'),box=document.getElementById('posts');
    if(!section||!box)return;
    section.classList.remove('hidden');
    if(!rows.length){box.innerHTML='<div class="empty">No listing posts yet.</div>';return}
    box.innerHTML=rows.map(row=>{
      const title=esc(row.item_name||row.title||'Listing');
      const meta=esc([row.category,row.region||row.region_name,row.township,row.nearby_address].filter(Boolean).join(' · ')||'Myanmar');
      const price=row.price!=null?esc((row.currency||'MMK')+' '+Number(row.price).toLocaleString('en-US')):'Contact seller';
      const status=row.status?`<span class="badge">${esc(row.status)}</span>`:'';
      return `<article class="post"><div class="post-title">${title}</div><div class="post-meta">${meta}</div><div class="post-price">${price}</div>${status}<div class="post-actions"><button class="mini" type="button" data-open-listing="${esc(row.id)}">View</button>${isOwner?`<button class="mini" type="button" data-delete-listing="${esc(row.id)}">Delete</button>`:''}</div></article>`;
    }).join('');
    box.querySelectorAll('[data-open-listing]').forEach(b=>b.onclick=()=>location.href='./listing-detail.html?id='+encodeURIComponent(b.dataset.openListing));
    box.querySelectorAll('[data-delete-listing]').forEach(b=>b.onclick=async()=>{
      if(!confirm('Delete this listing?'))return;
      const db=window.supabaseClient;if(!db)return;
      const r=await db.from('listings').delete().eq('id',b.dataset.deleteListing);
      if(r.error){alert(r.error.message);return}
      b.closest('.post')?.remove();
      setText('postCount',Math.max(0,(Number(document.getElementById('postCount')?.textContent)||1)-1));
    });
  }

  async function loadListings(db,targetId,isOwner){
    let r=await db.from('listings').select('id,user_id,seller_id,category,title,item_name,price,currency,region,region_name,township,nearby_address,show_photo_url,images,created_at,status').eq('user_id',targetId).order('created_at',{ascending:false}).limit(50);
    let rows=r.data||[];
    if(r.error){
      r=await db.from('listings').select('id,user_id,seller_id,category,title,item_name,price,currency,region,region_name,township,nearby_address,show_photo_url,images,created_at,status').eq('seller_id',targetId).order('created_at',{ascending:false}).limit(50);
      rows=r.data||[];
    }
    if(r.error){console.warn('Profile listings failed:',r.error.message);return}
    if(!isOwner)rows=rows.filter(x=>['approved','available','active','published'].includes(String(x.status||'').toLowerCase()));
    renderPosts(rows,isOwner);setText('postCount',rows.length);
  }

  async function loadProfileMeta(db,targetId){
    const r=await db.from('profiles').select('id,region_name,region,state,state_name,region_state,field,industry,profession,seller_type,is_verified,is_mcp').eq('id',targetId).maybeSingle();
    if(!r.error&&r.data)renderBadges(r.data);
  }

  async function refreshState(db,current,targetId){
    if(!current||current.id===targetId)return;
    const follow=await db.from('profile_follows').select('id').eq('follower_id',current.id).eq('following_id',targetId).maybeSingle();
    const like=await db.from('profile_reactions').select('id').eq('user_id',current.id).eq('profile_id',targetId).eq('reaction','like').maybeSingle();
    const fb=document.getElementById('followBtn'),lb=document.getElementById('likeBtn');
    if(fb&&!follow.error)fb.textContent=follow.data?'✓ Following':'＋ Follow';
    if(lb&&!like.error)lb.textContent=like.data?'♥ Liked':'♡ Like';
  }

  async function fallbackLoad(db,targetId,isOwner){
    const p=await db.from('profiles').select('*').eq('id',targetId).maybeSingle();
    if(p.error)throw p.error;if(!p.data)throw new Error('Profile not found.');
    const profile=p.data;
    const avatar=document.getElementById('avatar');if(avatar){avatar.src=profile.avatar_url||'';avatar.onerror=()=>avatar.removeAttribute('src')}
    setText('username',profile.username||profile.full_name||'User');setText('real',profile.full_name&&profile.full_name!==profile.username?profile.full_name:'');setText('location',[profile.region_name,profile.region,profile.city].filter(Boolean).join(' · '));setText('bio',profile.bio||'');
    renderBadges(profile);showPage();
    await loadListings(db,targetId,isOwner);await loadProfileMeta(db,targetId);
  }

  async function boot(){
    if(!isProfile||!window.supabaseClient)return;
    await sleep(700);
    const db=window.supabaseClient;
    const {data:me}=await db.auth.getUser();
    const current=me?.user||null;
    const requested=new URLSearchParams(location.search).get('id')||new URLSearchParams(location.search).get('user');
    const targetId=requested||current?.id;
    if(!targetId)return;
    const isOwner=!!current&&current.id===targetId;

    const follow=document.getElementById('followBtn'),like=document.getElementById('likeBtn'),chat=document.getElementById('chatBtn');
    if(follow&&like&&chat){
      document.addEventListener('click',async e=>{
        const fb=e.target.closest('#followBtn'),lb=e.target.closest('#likeBtn'),cb=e.target.closest('#chatBtn');
        if(!fb&&!lb&&!cb)return;
        e.preventDefault();e.stopImmediatePropagation();
        if(!current){location.href='./auth.html?next='+encodeURIComponent(location.href);return}
        if(isOwner){return}
        if(fb){const q=await db.from('profile_follows').select('id').eq('follower_id',current.id).eq('following_id',targetId).maybeSingle();const r=q.data?await db.from('profile_follows').delete().eq('id',q.data.id):await db.from('profile_follows').insert({follower_id:current.id,following_id:targetId});if(r.error)alert(r.error.message);else await refreshState(db,current,targetId)}
        if(lb){const q=await db.from('profile_reactions').select('id').eq('user_id',current.id).eq('profile_id',targetId).eq('reaction','like').maybeSingle();const r=q.data?await db.from('profile_reactions').delete().eq('id',q.data.id):await db.from('profile_reactions').insert({user_id:current.id,profile_id:targetId,reaction:'like'});if(r.error)alert(r.error.message);else await refreshState(db,current,targetId)}
        if(cb)location.href='./start-chat.html?user='+encodeURIComponent(targetId);
      },true);
      await refreshState(db,current,targetId);
    }

    // Re-load these independently so a failure in the original profile loader does not hide posts/badges.
    try{await loadListings(db,targetId,isOwner)}catch(e){console.warn(e)}
    try{await loadProfileMeta(db,targetId)}catch(e){console.warn(e)}

    // If the original loader is still stuck, recover the profile without replacing the existing UI.
    setTimeout(async()=>{
      const loading=document.getElementById('loading'),card=document.getElementById('profileCard');
      if(loading&&card&&!loading.classList.contains('hidden')&&card.classList.contains('hidden')){
        try{await fallbackLoad(db,targetId,isOwner)}catch(err){console.error('Profile fallback failed:',err);showError(err.message)}
      }
    },6500);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,400),{once:true});else setTimeout(boot,400);
})();
