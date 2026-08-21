/* Myanmar Elite Connect — one shared bottom navigation */
(function(){
  'use strict';
  const targetPages=new Set(['general.html','add-listing.html','buy.html','sell.html','listing.html','profile.html','chat.html','car.html','gem.html','property.html','feedback.html','allmarket.html']);
  const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  if(!targetPages.has(current)||document.getElementById('mec-global-nav'))return;
  const remove=()=>document.querySelectorAll('.mobile-nav,.bottom-nav,.bottom-navigation,.site-bottom-nav,#bottomNav').forEach(el=>el.remove());
  remove();
  const items=[['general.html','⌂','Home'],['add-listing.html','＋','Add Listing'],['chat.html','♡','Chat'],['profile.html','♙','Profile']];
  const nav=document.createElement('nav');nav.id='mec-global-nav';nav.setAttribute('aria-label','Main navigation');
  nav.innerHTML=items.map(([href,icon,label])=>`<a href="./${href}" class="${current===href?'active':''}" aria-label="${label}"><span class="mec-nav-icon">${icon}</span><span class="mec-nav-label">${label}</span></a>`).join('');
  const style=document.createElement('style');style.textContent=`
#mec-global-nav{position:fixed;left:50%;bottom:max(8px,env(safe-area-inset-bottom));transform:translateX(-50%);z-index:1100;width:min(560px,calc(100% - 20px));min-height:68px;padding:7px;display:grid;grid-template-columns:repeat(4,1fr);gap:5px;background:color-mix(in srgb,var(--surface,#fff) 94%,transparent);border:1px solid var(--border,rgba(16,35,63,.09));border-radius:20px;box-shadow:var(--floating-shadow,0 14px 45px rgba(13,35,64,.16));backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);padding-bottom:max(7px,env(safe-area-inset-bottom))}
#mec-global-nav a{min-width:0;min-height:52px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;border-radius:14px;color:var(--muted,#718097);text-decoration:none;font-size:9px;font-weight:900;-webkit-tap-highlight-color:transparent;transition:transform .18s ease,color .18s ease,background .18s ease}
#mec-global-nav .mec-nav-icon{width:28px;height:28px;display:grid;place-items:center;font-size:19px;line-height:1;color:currentColor}
#mec-global-nav .mec-nav-label{color:currentColor;white-space:nowrap}
#mec-global-nav a.active{color:var(--gold,#d8b45c);background:color-mix(in srgb,var(--gold,#d8b45c) 12%,transparent)}
#mec-global-nav a:hover{color:var(--text,#10233f);background:var(--surface-2,rgba(16,35,63,.05))}
#mec-global-nav a:active{transform:scale(.96)}
body{padding-bottom:100px!important}
@media(min-width:760px){#mec-global-nav{bottom:18px;width:min(560px,calc(100% - 40px));min-height:60px}#mec-global-nav a{flex-direction:row;gap:7px;min-height:44px;font-size:10px}}
`;const mount=()=>{remove();document.head.appendChild(style);document.body.appendChild(nav)};if(document.body)mount();else document.addEventListener('DOMContentLoaded',mount,{once:true});
})();
