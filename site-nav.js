/* Myanmar Elite Connect — shared bottom navigation + General UI refinements */
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
#mec-global-nav{--mec-nav-bg:var(--surface,var(--card,#fff));--mec-nav-border:var(--border,var(--line,rgba(16,35,63,.10)));--mec-nav-text:var(--text,#10233f);--mec-nav-muted:var(--muted,#718097);--mec-nav-soft:var(--surface-2,var(--soft,rgba(16,35,63,.05)));--mec-nav-gold:var(--gold,#d8b45c);position:fixed;left:50%;bottom:max(8px,env(safe-area-inset-bottom));transform:translateX(-50%);z-index:1100;width:min(560px,calc(100% - 20px));min-height:68px;padding:7px;display:grid;grid-template-columns:repeat(4,1fr);gap:5px;background:var(--mec-nav-bg);border:1px solid var(--mec-nav-border);border-radius:20px;box-shadow:var(--shadow,var(--floating-shadow,0 14px 45px rgba(16,35,63,.12)));backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);padding-bottom:max(7px,env(safe-area-inset-bottom));transition:background .2s ease,border-color .2s ease,box-shadow .2s ease}
#mec-global-nav a{min-width:0;min-height:52px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;border-radius:14px;color:var(--mec-nav-muted);text-decoration:none;font-size:9px;font-weight:900;-webkit-tap-highlight-color:transparent;transition:transform .18s ease,color .18s ease,background .18s ease}
#mec-global-nav .mec-nav-icon{width:28px;height:28px;display:grid;place-items:center;font-size:19px;line-height:1;color:currentColor}
#mec-global-nav .mec-nav-label{color:currentColor;white-space:nowrap}
#mec-global-nav a.active{color:var(--mec-nav-gold);background:color-mix(in srgb,var(--mec-nav-gold) 12%,transparent)}
#mec-global-nav a:hover{color:var(--mec-nav-text);background:var(--mec-nav-soft)}
#mec-global-nav a:active{transform:scale(.96)}
body{padding-bottom:100px!important}
@media(min-width:760px){#mec-global-nav{bottom:18px;width:min(560px,calc(100% - 40px));min-height:60px}#mec-global-nav a{flex-direction:row;gap:7px;min-height:44px;font-size:10px}}
@media(prefers-reduced-motion:reduce){#mec-global-nav,#mec-global-nav a{transition:none}}

/* =========================================================
   GENERAL.HTML — compact horizontal Explore + Filter
   ========================================================= */
body.mec-general-compact .category-grid{
  display:flex !important;
  gap:8px !important;
  overflow-x:auto !important;
  overscroll-behavior-x:contain;
  scrollbar-width:none;
  padding:2px 1px 5px;
}
body.mec-general-compact .category-grid::-webkit-scrollbar{display:none}
body.mec-general-compact .category-card{
  flex:0 0 auto !important;
  width:auto !important;
  min-width:108px !important;
  min-height:0 !important;
  height:56px !important;
  padding:0 12px !important;
  display:flex !important;
  flex-direction:row !important;
  align-items:center !important;
  justify-content:flex-start !important;
  gap:8px !important;
  border:0 !important;
  border-radius:12px !important;
  background:var(--surface-2) !important;
  box-shadow:none !important;
  transform:none !important;
}
body.mec-general-compact .category-card:hover{border:0 !important;box-shadow:none !important;background:color-mix(in srgb,var(--gold) 10%,var(--surface-2)) !important}
body.mec-general-compact .category-icon{
  position:static !important;
  width:32px !important;
  height:32px !important;
  flex:0 0 32px !important;
  border-radius:9px !important;
  background:color-mix(in srgb,var(--gold) 12%,transparent) !important;
  font-size:16px !important;
}
body.mec-general-compact .category-card strong{font-size:10px !important;white-space:nowrap}
body.mec-general-compact .category-card span{display:none !important}
body.mec-general-compact .category-card.market-extra{min-width:120px !important}
body.mec-general-compact .category-card.feedback-extra{min-width:112px !important}

body.mec-general-compact .filter-panel{
  padding:6px !important;
  border-radius:12px !important;
  box-shadow:none !important;
}
body.mec-general-compact .filter-row{
  display:flex !important;
  align-items:center !important;
  gap:6px !important;
  overflow-x:auto !important;
  padding-bottom:1px;
  scrollbar-width:none;
}
body.mec-general-compact .filter-row::-webkit-scrollbar{display:none}
body.mec-general-compact .filter-row .field{flex:0 0 auto !important;width:auto !important}
body.mec-general-compact .filter-row .field:first-child{width:132px !important}
body.mec-general-compact .filter-row .field:nth-child(2){width:132px !important}
body.mec-general-compact .filter-row .field:nth-child(3),
body.mec-general-compact .filter-row .field:nth-child(4){width:88px !important}
body.mec-general-compact .field select,
body.mec-general-compact .field input,
body.mec-general-compact .clear-button{
  height:32px !important;
  border-radius:8px !important;
  font-size:8px !important;
}
body.mec-general-compact .clear-button{width:auto !important;padding:0 10px !important}
body.mec-general-compact .filter-head{margin-bottom:7px !important}
body.mec-general-compact .filter-title{font-size:12px !important;gap:5px !important}
body.mec-general-compact .filter-icon{width:23px !important;height:23px !important;border-radius:7px !important;font-size:11px !important}

@media(max-width:700px){
  body.mec-general-compact .category-card{min-width:100px !important;height:52px !important;padding:0 10px !important}
  body.mec-general-compact .category-icon{width:29px !important;height:29px !important;flex-basis:29px !important;font-size:14px !important}
  body.mec-general-compact .category-card strong{font-size:9px !important}
  body.mec-general-compact .filter-panel{margin-left:-1px;margin-right:-1px}
}
`;

  const mount=()=>{remove();document.head.appendChild(style);document.body.appendChild(nav)};
  if(document.body)mount();else document.addEventListener('DOMContentLoaded',mount,{once:true});

  /* General page: replace the large 3-card Explore grid with a compact
     horizontal category rail. Keep the existing IDs so translations continue
     to work, and add All Market + Feedback as two more destinations. */
  function enhanceGeneral(){
    if(current!=='general.html')return;
    document.body.classList.add('mec-general-compact');
    const grid=document.querySelector('.category-grid');
    if(!grid||grid.dataset.mecEnhanced==='1')return;
    grid.dataset.mecEnhanced='1';
    grid.insertAdjacentHTML('beforeend',`
      <a href="./allmarket.html" class="category-card market-extra" aria-label="All Market">
        <div class="category-icon">🏪</div>
        <strong id="allMarketTitle">All Market</strong>
        <span id="allMarketDescription">Browse all categories.</span>
      </a>
      <a href="./feedback.html" class="category-card feedback-extra" aria-label="Feedback">
        <div class="category-icon">🗒️</div>
        <strong id="feedbackTitle">Feedback</strong>
        <span id="feedbackDescription">Community feedback.</span>
      </a>
    `);
    const t=document.createElement('style');
    t.id='mec-general-inline';
    t.textContent=`body.mec-general-compact .category-grid{scroll-snap-type:x proximity}body.mec-general-compact .category-card{scroll-snap-align:start}`;
    document.head.appendChild(t);
    const translate=()=>{
      const lang=localStorage.getItem('mec_language')||'en';
      const mm=lang==='mm';
      const a=document.getElementById('allMarketTitle');
      const ad=document.getElementById('allMarketDescription');
      const f=document.getElementById('feedbackTitle');
      const fd=document.getElementById('feedbackDescription');
      if(a)a.textContent=mm?'ဈေးကွက်အားလုံး':'All Market';
      if(ad)ad.textContent=mm?'အမျိုးအစားအားလုံးကို ကြည့်ရန်။':'Browse all categories.';
      if(f)f.textContent=mm?'အကြံပြုချက်':'Feedback';
      if(fd)fd.textContent=mm?'အသုံးပြုသူအကြံပြုချက်များ။':'Community feedback.';
    };
    translate();
    window.addEventListener('storage',translate);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',enhanceGeneral,{once:true});else setTimeout(enhanceGeneral,0);

  /* Profile actions are handled by mec-profile-fix.js. */
})();
