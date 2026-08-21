(function(){
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  const isProfile=/profile\.html$/i.test(location.pathname);

  function showPage(){
    const loading=document.getElementById('loading');
    const card=document.getElementById('profileCard');
    if(loading)loading.classList.add('hidden');
    if(card)card.classList.remove('hidden');
  }

  function showError(message){
    const loading=document.getElementById('loading');
    const error=document.getElementById('error');
    const text=document.getElementById('errorText');
    if(loading)loading.classList.add('hidden');
    if(text)text.textContent=message||'Unable to load profile.';
    if(error)error.classList.remove('hidden');
  }

  function setText(id,value){
    const el=document.getElementById(id);
    if(el)el.textContent=value==null?'':String(value);
  }

  function escapeText(value){
    return value==null?'':String(value);
  }

  function renderFallbackProfile(profile){
    setText('username',profile.username||profile.full_name||'User');
    setText('real',profile.full_name&&profile.full_name!==profile.username?profile.full_name:'');
    setText('age',profile.age?('Age '+profile.age):'');
    setText('location',profile.region_name||profile.city||'');
    setText('bio',profile.bio||'');

    const avatar=document.getElementById('avatar');
    if(avatar){
      avatar.src=profile.avatar_url||'./assets/default-avatar.png';
      avatar.onerror=()=>{avatar.removeAttribute('src');};
    }

    const badges=document.getElementById('badges');
    if(badges){
      badges.innerHTML='';
      if(profile.region_name){
        const b=document.createElement('span');
        b.className='badge region-badge';
        b.textContent=escapeText(profile.region_name);
        badges.appendChild(b);
      }
      if(profile.seller_type){
        const b=document.createElement('span');
        const key=String(profile.seller_type).toLowerCase();
        b.className='badge '+(
          key.includes('car')?'field-car':
          key.includes('property')?'field-property':
          key.includes('gem')?'field-gem':'field-allmarket'
        );
        b.textContent=escapeText(profile.seller_type);
        badges.appendChild(b);
      }
      if(profile.is_verified){
        const b=document.createElement('span');
        b.className='badge verified';
        b.textContent='✓ Verified';
        badges.appendChild(b);
      }
      if(profile.is_mcp){
        const b=document.createElement('span');
        b.className='badge mcp';
        b.textContent='◆ MCP';
        badges.appendChild(b);
      }
    }

    const verify=document.getElementById('verify');
    if(verify)verify.style.display=profile.is_verified?'grid':'none';
    showPage();
  }

  function renderFallbackPosts(rows){
    const section=document.getElementById('postsSection');
    const box=document.getElementById('posts');
    if(!section||!box)return;
    box.innerHTML='';
    if(!rows.length){
      box.innerHTML='<div class="empty">No public listing posts yet.</div>';
      section.classList.remove('hidden');
      return;
    }
    rows.forEach(row=>{
      const post=document.createElement('article');
      post.className='post';
      const title=document.createElement('div');
      title.className='post-title';
      title.textContent=row.item_name||row.title||'Listing';
      const meta=document.createElement('div');
      meta.className='post-meta';
      meta.textContent=[row.category,row.region,row.township,row.nearby_address].filter(Boolean).join(' · ');
      const price=document.createElement('div');
      price.className='post-price';
      price.textContent=row.price!=null?((row.currency||'MMK')+' '+Number(row.price).toLocaleString('en-US')):'';
      post.append(title,meta,price);
      const actions=document.createElement('div');
      actions.className='post-actions';
      const open=document.createElement('button');
      open.type='button';
      open.className='mini';
      open.textContent='View';
      open.addEventListener('click',()=>location.href='./listing-detail.html?id='+encodeURIComponent(row.id));
      actions.appendChild(open);
      post.appendChild(actions);
      box.appendChild(post);
    });
    section.classList.remove('hidden');
  }

  async function fallbackLoad(db,current,targetId){
    const profileQuery=await db.from('profiles').select('id,username,full_name,avatar_url,city,bio,region_name,is_verified,is_mcp,seller_type,age').eq('id',targetId).maybeSingle();
    if(profileQuery.error)throw profileQuery.error;
    if(!profileQuery.data)throw new Error('Profile not found.');
    renderFallbackProfile(profileQuery.data);

    const listingQuery=await db.from('listings')
      .select('id,user_id,category,title,item_name,price,currency,region,township,nearby_address,show_photo_url,images,created_at,status')
      .eq('user_id',targetId)
      .in('status',['approved','Available','active','published'])
      .order('created_at',{ascending:false});
    if(!listingQuery.error)renderFallbackPosts(listingQuery.data||[]);

    const followerQuery=await db.from('profile_follows').select('id',{count:'exact',head:true}).eq('following_id',targetId);
    const followingQuery=await db.from('profile_follows').select('id',{count:'exact',head:true}).eq('follower_id',targetId);
    const postCount=listingQuery.data?listingQuery.data.length:0;
    setText('followers',followerQuery.count||0);
    setText('following',followingQuery.count||0);
    setText('postCount',postCount);
  }

  async function boot(){
    if(!isProfile||!window.supabaseClient)return;
    await sleep(600);
    const db=window.supabaseClient;
    const {data:me}=await db.auth.getUser();
    const current=me?.user||null;
    const urlId=new URLSearchParams(location.search).get('id');
    const targetId=urlId||current?.id;
    if(!targetId)return;

    const follow=document.getElementById('followBtn');
    const like=document.getElementById('likeBtn');
    const chat=document.getElementById('chatBtn');
    if(!follow||!like||!chat)return;

    async function refresh(){
      if(!current)return;
      const f=await db.from('profile_follows').select('id').eq('follower_id',current.id).eq('following_id',targetId).maybeSingle();
      const l=await db.from('profile_reactions').select('id').eq('user_id',current.id).eq('profile_id',targetId).eq('reaction','like').maybeSingle();
      if(!f.error)follow.textContent=f.data?'✓ Following':'＋ Follow';
      if(!l.error)like.textContent=l.data?'♥ Liked':'♡ Like';
    }

    document.addEventListener('click',async e=>{
      const fb=e.target.closest('#followBtn'),lb=e.target.closest('#likeBtn'),cb=e.target.closest('#chatBtn');
      if(!fb&&!lb&&!cb)return;
      e.preventDefault();
      e.stopImmediatePropagation();
      if(!current){location.href='./auth.html?next='+encodeURIComponent(location.href);return;}
      if(targetId===current.id){if(fb||lb)window.alert('This is your own profile.');return;}
      if(fb){
        const q=await db.from('profile_follows').select('id').eq('follower_id',current.id).eq('following_id',targetId).maybeSingle();
        const r=q.data?await db.from('profile_follows').delete().eq('id',q.data.id):await db.from('profile_follows').insert({follower_id:current.id,following_id:targetId});
        if(r.error)window.alert(r.error.message);else await refresh();
      }
      if(lb){
        const q=await db.from('profile_reactions').select('id').eq('user_id',current.id).eq('profile_id',targetId).eq('reaction','like').maybeSingle();
        const r=q.data?await db.from('profile_reactions').delete().eq('id',q.data.id):await db.from('profile_reactions').insert({user_id:current.id,profile_id:targetId,reaction:'like'});
        if(r.error)window.alert(r.error.message);else await refresh();
      }
      if(cb)location.href='./start-chat.html?user='+encodeURIComponent(targetId);
    },true);

    await refresh();

    // Do not interfere with the original profile implementation.
    // Only provide a fallback if the original page is still stuck on Loading.
    setTimeout(async()=>{
      const loading=document.getElementById('loading');
      const card=document.getElementById('profileCard');
      if(!loading||!card||loading.classList.contains('hidden')||!card.classList.contains('hidden'))return;
      try{
        await fallbackLoad(db,current,targetId);
      }catch(err){
        console.error('Profile fallback failed:',err);
        showError(err?.message||'Unable to load profile.');
      }
    },6500);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,400),{once:true});
  else setTimeout(boot,400);
})();
