(function(){
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  async function boot(){
    if(!/profile\.html$/i.test(location.pathname)||!window.supabaseClient)return;
    await sleep(2200);
    const db=window.supabaseClient;
    const {data:me}=await db.auth.getUser();
    const current=me?.user||null;
    const urlId=new URLSearchParams(location.search).get('id');
    const targetId=urlId||current?.id;
    if(!targetId)return;
    const follow=document.getElementById('followBtn'),like=document.getElementById('likeBtn'),chat=document.getElementById('chatBtn');
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
      e.preventDefault();e.stopImmediatePropagation();
      if(!current){location.href='./auth.html?next='+encodeURIComponent(location.href);return;}
      if(targetId===current.id){if(fb||lb)window.alert('This is your own profile.');return;}
      if(fb){const q=await db.from('profile_follows').select('id').eq('follower_id',current.id).eq('following_id',targetId).maybeSingle();const r=q.data?await db.from('profile_follows').delete().eq('id',q.data.id):await db.from('profile_follows').insert({follower_id:current.id,following_id:targetId});if(r.error)window.alert(r.error.message);else await refresh();}
      if(lb){const q=await db.from('profile_reactions').select('id').eq('user_id',current.id).eq('profile_id',targetId).eq('reaction','like').maybeSingle();const r=q.data?await db.from('profile_reactions').delete().eq('id',q.data.id):await db.from('profile_reactions').insert({user_id:current.id,profile_id:targetId,reaction:'like'});if(r.error)window.alert(r.error.message);else await refresh();}
      if(cb)location.href='./start-chat.html?user='+encodeURIComponent(targetId);
    },true);
    await refresh();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,400),{once:true});else setTimeout(boot,400);
})();
