/* Myanmar Elite Connect — shared mobile navigation */
(function(){
'use strict';
if(document.getElementById('mec-global-nav'))return;
const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
const items=[['index.html','⌂','Home'],['allmarket.html','▦','Listing'],['chat.html','✉','Chat'],['profile.html','◉','Profile']];
const nav=document.createElement('nav');nav.id='mec-global-nav';nav.setAttribute('aria-label','Primary navigation');
nav.innerHTML=items.map(([href,icon,label])=>`<a href="./${href}" class="${current===href?'active':''}"><span>${icon}</span><small>${label}</small></a>`).join('');
const style=document.createElement('style');
style.textContent=`#mec-global-nav{position:fixed;left:50%;bottom:max(10px,env(safe-area-inset-bottom));transform:translateX(-50%);z-index:9999;width:min(560px,calc(100% - 20px));height:64px;padding:7px;display:grid;grid-template-columns:repeat(4,1fr);gap:5px;background:color-mix(in srgb,var(--card,#fff) 92%,transparent);border:1px solid var(--line,rgba(16,35,63,.1));border-radius:20px;box-shadow:0 14px 45px rgba(0,0,0,.16);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px)}#mec-global-nav a{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;border-radius:14px;color:var(--muted,#718097);font-weight:800;text-decoration:none;transition:.18s}#mec-global-nav a span{font-size:19px;line-height:1}#mec-global-nav a small{font-size:9px}#mec-global-nav a.active{color:var(--gold,#d7b35a);background:rgba(215,179,90,.12)}#mec-global-nav a:hover{transform:translateY(-1px)}body{padding-bottom:90px!important}@media(min-width:760px){#mec-global-nav{height:58px;bottom:18px}#mec-global-nav a{flex-direction:row;gap:6px}#mec-global-nav a small{font-size:10px}}`;
document.head.appendChild(style);document.body.appendChild(nav);
})();
