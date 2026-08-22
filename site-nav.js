/* Myanmar Elite Connect — shared navigation + build-spec UI layer */
(function(){
  'use strict';

  const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const appPages=new Set([
    'general.html','allmarket.html','add-listing.html','buy.html','sell.html',
    'listing-detail.html','listing-detail-v2.html','post.html','profile.html',
    'chat.html','chat-room.html','start-chat.html','car.html','gem.html',
    'property.html','feedback.html','badge.html','kyc.html','mcp.html',
    'mpc.html','admin.html'
  ]);
  if(!appPages.has(current))return;

  const loadSharedCss=()=>{
    if(document.querySelector('link[data-mec-spec-css]'))return;
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='./mec-spec.css';
    link.dataset.mecSpecCss='1';
    (document.head||document.documentElement).appendChild(link);
  };

  const removeLegacyNav=()=>document.querySelectorAll(
    '.mobile-nav,.bottom-nav,.bottom-navigation,.site-bottom-nav,#bottomNav,#mec-global-nav,[data-bottom-nav]'
  ).forEach(el=>el.remove());

  const mount=()=>{
    loadSharedCss();
    document.body.classList.add('mec-standard-page');
    removeLegacyNav();

    if(document.getElementById('mec-global-nav'))return;

    /* Build specification: Home / Listing / Chat / Profile only.
       Add, Settings, Badge, KYC, MCP, Followers and Theme are not primary nav. */
    const items=[
      ['general.html','⌂','Home'],
      ['allmarket.html','▣','Listing'],
      ['chat.html','◌','Chat'],
      ['profile.html','♙','Profile']
    ];

    const nav=document.createElement('nav');
    nav.id='mec-global-nav';
    nav.setAttribute('aria-label','Main navigation');
    nav.innerHTML=items.map(([href,icon,label])=>{
      const active=(href==='allmarket.html')
        ? ['allmarket.html','add-listing.html','buy.html','sell.html','listing-detail.html','listing-detail-v2.html','car.html','gem.html','property.html'].includes(current)
        : current===href;
      return `<a href="./${href}" class="${active?'active':''}" aria-label="${label}">`+
        `<span class="mec-nav-icon" aria-hidden="true">${icon}</span>`+
        `<span class="mec-nav-label">${label}</span></a>`;
    }).join('');

    const style=document.createElement('style');
    style.dataset.mecGlobalNav='1';
    style.textContent=`
      #mec-global-nav{--mec-nav-bg:var(--mec-surface,var(--surface,#fff));--mec-nav-border:var(--mec-border,var(--border,rgba(16,35,63,.10)));--mec-nav-text:var(--mec-text,#10233f);--mec-nav-muted:var(--mec-muted,#718097);--mec-nav-soft:var(--mec-gold-soft,rgba(216,180,92,.12));--mec-nav-gold:var(--mec-gold,#d8b45c);position:fixed;left:50%;bottom:max(8px,env(safe-area-inset-bottom));transform:translateX(-50%);z-index:1100;width:min(560px,calc(100% - 20px));min-height:68px;padding:7px;display:grid;grid-template-columns:repeat(4,1fr);gap:5px;background:var(--mec-nav-bg);border:1px solid var(--mec-nav-border);border-radius:20px;box-shadow:0 14px 45px rgba(16,35,63,.12);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px)}
      #mec-global-nav a{min-width:0;min-height:52px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;border-radius:14px;color:var(--mec-nav-muted);text-decoration:none;font-size:9px;font-weight:900;-webkit-tap-highlight-color:transparent;transition:transform .18s ease,color .18s ease,background .18s ease}
      #mec-global-nav .mec-nav-icon{width:28px;height:28px;display:grid;place-items:center;font-size:19px;line-height:1;color:currentColor}
      #mec-global-nav .mec-nav-label{color:currentColor;white-space:nowrap}
      #mec-global-nav a.active{color:var(--mec-nav-gold);background:var(--mec-nav-soft)}
      #mec-global-nav a:hover{color:var(--mec-nav-text);background:var(--mec-nav-soft)}
      #mec-global-nav a:active{transform:scale(.96)}
      @media(min-width:760px){#mec-global-nav{bottom:18px;width:min(560px,calc(100% - 40px));min-height:60px}#mec-global-nav a{flex-direction:row;gap:7px;min-height:44px;font-size:10px}}
      @media(prefers-reduced-motion:reduce){#mec-global-nav,#mec-global-nav a{transition:none}}
    `;
    document.head.appendChild(style);
    document.body.appendChild(nav);
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});
  else mount();

  /* General page: keep the existing compact category rail enhancement. */
  function enhanceGeneral(){
    if(current!=='general.html'||!document.body)return;
    document.body.classList.add('mec-general-compact');
    const grid=document.querySelector('.category-grid');
    if(!grid||grid.dataset.mecEnhanced==='1')return;
    grid.dataset.mecEnhanced='1';
    if(!grid.querySelector('.market-extra'))grid.insertAdjacentHTML('beforeend',`
      <a href="./allmarket.html" class="category-card market-extra" aria-label="All Market"><div class="category-icon">🏪</div><strong id="allMarketTitle">All Market</strong><span id="allMarketDescription">Browse all categories.</span></a>
      <a href="./feedback.html" class="category-card feedback-extra" aria-label="Feedback"><div class="category-icon">🗒️</div><strong id="feedbackTitle">Feedback</strong><span id="feedbackDescription">Community feedback.</span></a>
    `);
    const translate=()=>{
      const lang=localStorage.getItem('mec_language')||'en',mm=lang==='mm';
      const a=document.getElementById('allMarketTitle'),ad=document.getElementById('allMarketDescription'),f=document.getElementById('feedbackTitle'),fd=document.getElementById('feedbackDescription');
      if(a)a.textContent=mm?'ဈေးကွက်အားလုံး':'All Market';
      if(ad)ad.textContent=mm?'အမျိုးအစားအားလုံးကို ကြည့်ရန်။':'Browse all categories.';
      if(f)f.textContent=mm?'အကြံပြုချက်':'Feedback';
      if(fd)fd.textContent=mm?'အသုံးပြုသူအကြံပြုချက်များ။':'Community feedback.';
    };
    translate();
    window.addEventListener('storage',translate);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',enhanceGeneral,{once:true});
  else setTimeout(enhanceGeneral,0);
})();
