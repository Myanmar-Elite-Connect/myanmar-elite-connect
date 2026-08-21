/* Myanmar Elite Connect — shared bottom navigation */
(function(){
  'use strict';

  const targetPages=new Set([
    'index.html','general.html','add-listing.html','buy.html','sell.html','listing.html',
    'listing-detail.html','post.html','profile.html','chat.html','car.html','gem.html',
    'property.html','feedback.html','allmarket.html','badge.html','kyc.html','mcp.html','mpc.html'
  ]);

  const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  if(!targetPages.has(current)||document.getElementById('mec-global-nav'))return;

  const remove=()=>document.querySelectorAll(
    '.mobile-nav,.bottom-nav,.bottom-navigation,.site-bottom-nav,#bottomNav,#mec-global-nav,[data-bottom-nav]'
  ).forEach(el=>el.remove());
  remove();

  const items=[
    ['general.html','⌂','Home'],
    ['add-listing.html','＋','Add Listing'],
    ['chat.html','♡','Chat'],
    ['profile.html','♙','Profile']
  ];

  const nav=document.createElement('nav');
  nav.id='mec-global-nav';
  nav.setAttribute('aria-label','Main navigation');
  nav.innerHTML=items.map(([href,icon,label])=>
    `<a href="./${href}" class="${current===href?'active':''}" aria-label="${label}">`+
    `<span class="mec-nav-icon" aria-hidden="true">${icon}</span>`+
    `<span class="mec-nav-label">${label}</span></a>`
  ).join('');

  const style=document.createElement('style');
  style.textContent=`
#mec-global-nav{--mec-nav-bg:var(--surface,var(--card,#fff));--mec-nav-border:var(--border,var(--line,rgba(16,35,63,.10)));--mec-nav-text:var(--text,#10233f);--mec-nav-muted:var(--muted,#718097);--mec-nav-soft:var(--surface-2,var(--soft,rgba(16,35,63,.05)));--mec-nav-gold:var(--gold,#d8b45c);position:fixed;left:50%;bottom:max(8px,env(safe-area-inset-bottom));transform:translateX(-50%);z-index:1100;width:min(560px,calc(100% - 20px));min-height:68px;padding:7px;display:grid;grid-template-columns:repeat(4,1fr);gap:5px;background:var(--mec-nav-bg);border:1px solid var(--mec-nav-border);border-radius:20px;box-shadow:var(--shadow,var(--floating-shadow,0 14px 45px rgba(16,35,63,.12)));backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);padding-bottom:max(7px,env(safe-area-inset-bottom));transition:background .2s ease,border-color .2s ease,box-shadow .2s ease}#mec-global-nav a{min-width:0;min-height:52px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;border-radius:14px;color:var(--mec-nav-muted);text-decoration:none;font-size:9px;font-weight:900;-webkit-tap-highlight-color:transparent;transition:transform .18s ease,color .18s ease,background .18s ease}#mec-global-nav .mec-nav-icon{width:28px;height:28px;display:grid;place-items:center;font-size:19px;line-height:1;color:currentColor}#mec-global-nav .mec-nav-label{color:currentColor;white-space:nowrap}#mec-global-nav a.active{color:var(--mec-nav-gold);background:color-mix(in srgb,var(--mec-nav-gold) 12%,transparent)}#mec-global-nav a:hover{color:var(--mec-nav-text);background:var(--mec-nav-soft)}#mec-global-nav a:active{transform:scale(.96)}body{padding-bottom:100px!important}@media(min-width:760px){#mec-global-nav{bottom:18px;width:min(560px,calc(100% - 40px));min-height:60px}#mec-global-nav a{flex-direction:row;gap:7px;min-height:44px;font-size:10px}}@media(prefers-reduced-motion:reduce){#mec-global-nav,#mec-global-nav a{transition:none}}
`;

  const mount=()=>{remove();document.head.appendChild(style);document.body.appendChild(nav)};
  if(document.body)mount();else document.addEventListener('DOMContentLoaded',mount,{once:true});

  /* Profile actions: Follow / Like / direct Chat are wired to Supabase.
     This runs after profile.html has created its buttons, so it replaces the
     old placeholder toasts without changing the rest of the profile UI. */
  if(current==='profile.html'){
    const bootProfileActions=()=>{
      const db=window.supabaseClient;
      if(!db)return;
      const $=id=>document.getElementById(id);
      let me=null,target=null,following=false,liked=false;
      const say=m=>{const t=$('toast');if(!t)return;t.textContent=m;t.classList.add('show');clearTimeout(window.__mecToast);window.__mecToast=setTimeout(()=>t.classList.remove('show'),2300)};
      const setCount=(id,n)=>{const e=$(id);if(e)e.textContent=String(Math.max(0,Number(n)||0))};

      async function init(){
        try{
          const auth=await db.auth.getUser();
          me=auth.data?.user||null;
          const id=new URLSearchParams(location.search).get('id')||me?.id;
          if(!id)return;
          target=id;
          if(!me||me.id===target){
            const f=$('followBtn'),l=$('likeBtn'),c=$('chatBtn');
            if(f)f.style.display=me?.id===target?'none':'';
            if(l)l.style.display=me?.id===target?'none':'';
            if(c)c.style.display=me?.id===target?'none':'';
          }
          if(!me||me.id===target)return;
          const f=await db.from('profile_follows').select('id').eq('follower_id',me.id).eq('following_id',target).maybeSingle();
          following=!!f.data;
          const r=await db.from('profile_reactions').select('id').eq('profile_id',target).eq('user_id',me.id).eq('reaction','like').maybeSingle();
          liked=!!r.data;
          updateButtons();
          await refreshCounts();
        }catch(e){console.warn('Profile actions init:',e)}
      }
      function updateButtons(){
        const f=$('followBtn'),l=$('likeBtn');
        if(f){f.textContent=following?'✓ Following':'＋ Follow';f.classList.toggle('primary',!following)}
        if(l){l.textContent=liked?'♥ Liked':'♡ Like';l.classList.toggle('primary',liked)}
      }
      async function refreshCounts(){
        const [followers,followingCount,likes]=await Promise.all([
          db.from('profile_follows').select('*',{count:'exact',head:true}).eq('following_id',target),
          db.from('profile_follows').select('*',{count:'exact',head:true}).eq('follower_id',target),
          db.from('profile_reactions').select('*',{count:'exact',head:true}).eq('profile_id',target).eq('reaction','like')
        ]);
        if(!followers.error)setCount('followers',followers.count);
        if(!followingCount.error)setCount('following',followingCount.count);
        const likeBtn=$('likeBtn');
        if(likeBtn&&likes.error==null)likeBtn.title=`${likes.count||0} likes`;
      }
      async function toggleFollow(){
        if(!me){location.href='./auth.html?next='+encodeURIComponent(location.href);return}
        if(me.id===target)return;
        const b=$('followBtn');if(b)b.disabled=true;
        try{
          if(following){
            const r=await db.from('profile_follows').delete().eq('follower_id',me.id).eq('following_id',target);
            if(r.error)throw r.error;
            following=false;say('Unfollowed.');
          }else{
            const r=await db.from('profile_follows').insert({follower_id:me.id,following_id:target});
            if(r.error)throw r.error;
            following=true;say('Following this profile.');
          }
          updateButtons();await refreshCounts();
        }catch(e){say(e.message||'Unable to update follow.');console.error(e)}finally{if(b)b.disabled=false}
      }
      async function toggleLike(){
        if(!me){location.href='./auth.html?next='+encodeURIComponent(location.href);return}
        if(me.id===target)return;
        const b=$('likeBtn');if(b)b.disabled=true;
        try{
          if(liked){
            const r=await db.from('profile_reactions').delete().eq('profile_id',target).eq('user_id',me.id).eq('reaction','like');
            if(r.error)throw r.error;
            liked=false;say('Like removed.');
          }else{
            const r=await db.from('profile_reactions').insert({profile_id:target,user_id:me.id,reaction:'like'});
            if(r.error)throw r.error;
            liked=true;say('Profile liked.');
          }
          updateButtons();await refreshCounts();
        }catch(e){say(e.message||'Unable to update like.');console.error(e)}finally{if(b)b.disabled=false}
      }
      function openChat(){
        if(!me){location.href='./auth.html?next='+encodeURIComponent(location.href);return}
        if(me.id===target){say('You cannot chat with yourself.');return}
        location.href='./start-chat.html?user='+encodeURIComponent(target);
      }
      const f=$('followBtn'),l=$('likeBtn'),c=$('chatBtn');
      if(f)f.onclick=toggleFollow;
      if(l)l.onclick=toggleLike;
      if(c)c.onclick=openChat;
      init();
    };
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bootProfileActions,{once:true});else setTimeout(bootProfileActions,0);
  }
})();