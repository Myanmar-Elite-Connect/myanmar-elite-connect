/* Myanmar Elite Connect — General page compact Explore + collapsible Filter */
(function(){
  'use strict';
  if((location.pathname.split('/').pop()||'index.html').toLowerCase()!=='general.html') return;

  const css = `
    .mec-general-refine .category-grid{
      display:flex!important;gap:8px!important;overflow-x:auto!important;
      padding:2px 1px 5px!important;scrollbar-width:none!important;
      -webkit-overflow-scrolling:touch!important;
    }
    .mec-general-refine .category-grid::-webkit-scrollbar{display:none!important}
    .mec-general-refine .category-card{
      flex:0 0 auto!important;width:auto!important;min-width:104px!important;height:54px!important;
      min-height:54px!important;padding:0 11px!important;display:flex!important;flex-direction:row!important;
      align-items:center!important;justify-content:flex-start!important;gap:8px!important;
      border:1px solid var(--border)!important;border-radius:12px!important;background:var(--surface)!important;
      box-shadow:none!important;transform:none!important;
    }
    .mec-general-refine .category-card:hover{
      border-color:rgba(216,180,92,.45)!important;
      background:color-mix(in srgb,var(--gold) 8%,var(--surface))!important;
    }
    .mec-general-refine .category-icon{
      position:static!important;width:30px!important;height:30px!important;flex:0 0 30px!important;
      border-radius:9px!important;background:color-mix(in srgb,var(--gold) 12%,transparent)!important;
      font-size:15px!important;
    }
    .mec-general-refine .category-card strong{font-size:10px!important;white-space:nowrap!important}
    .mec-general-refine .category-card span{display:none!important}
    .mec-general-refine .filter-head{margin-bottom:0!important;align-items:center!important}
    .mec-general-refine .filter-head .filter-title{display:none!important}
    .mec-general-refine .mec-filter-toggle{
      width:34px;height:34px;padding:0;display:grid;place-items:center;flex:0 0 34px;
      border:1px solid var(--border);border-radius:10px;color:var(--text);background:var(--surface);
      box-shadow:none;font-size:15px;line-height:1;transition:background .2s,border-color .2s,transform .15s;
    }
    .mec-general-refine .mec-filter-toggle:hover{border-color:rgba(216,180,92,.55)}
    .mec-general-refine .mec-filter-toggle:active{transform:scale(.95)}
    .mec-general-refine .mec-filter-toggle.active{color:var(--gold);background:color-mix(in srgb,var(--gold) 10%,var(--surface));border-color:rgba(216,180,92,.5)}
    .mec-general-refine .filter-panel.mec-filter-hidden{display:none!important}
    .mec-general-refine .filter-panel{
      margin-top:9px!important;padding:9px!important;border-radius:13px!important;
      background:var(--surface)!important;border:1px solid var(--border)!important;
      box-shadow:0 10px 28px rgba(13,35,64,.08)!important;
      animation:mecFilterIn .16s ease-out;
    }
    body.dark .mec-general-refine .filter-panel{box-shadow:0 12px 30px rgba(0,0,0,.25)!important}
    @keyframes mecFilterIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
    @media(max-width:700px){
      .mec-general-refine .category-card{min-width:94px!important;height:50px!important;min-height:50px!important;padding:0 9px!important}
      .mec-general-refine .category-icon{width:28px!important;height:28px!important;flex-basis:28px!important;font-size:14px!important}
      .mec-general-refine .category-card strong{font-size:9px!important}
      .mec-general-refine .mec-filter-toggle{width:32px;height:32px;flex-basis:32px;font-size:14px}
    }
  `;
  const style=document.createElement('style');style.id='mec-general-refine-style';style.textContent=css;
  document.head.appendChild(style);

  function init(){
    if(document.body.classList.contains('mec-general-refine')) return;
    document.body.classList.add('mec-general-refine');

    const grid=document.querySelector('.category-grid');
    if(grid && !grid.querySelector('.mec-extra-market')){
      grid.insertAdjacentHTML('beforeend',`
        <a href="./allmarket.html" class="category-card mec-extra-market" aria-label="All Market">
          <div class="category-icon">🏪</div><strong>All Market</strong><span>Browse all categories.</span>
        </a>
        <a href="./feedback.html" class="category-card mec-extra-feedback" aria-label="Feedback">
          <div class="category-icon">🗒️</div><strong>Feedback</strong><span>Community feedback.</span>
        </a>
      `);
    }

    const head=document.querySelector('.filter-head');
    const panel=document.querySelector('.filter-panel');
    if(head && panel && !head.querySelector('.mec-filter-toggle')){
      const toggle=document.createElement('button');
      toggle.type='button';toggle.className='mec-filter-toggle';toggle.setAttribute('aria-label','Open filters');
      toggle.setAttribute('aria-expanded','false');toggle.innerHTML='⚙';
      head.appendChild(toggle);
      panel.classList.add('mec-filter-hidden');
      const setOpen=open=>{
        panel.classList.toggle('mec-filter-hidden',!open);
        toggle.classList.toggle('active',open);
        toggle.setAttribute('aria-expanded',String(open));
        toggle.setAttribute('aria-label',open?'Close filters':'Open filters');
      };
      toggle.addEventListener('click',e=>{e.stopPropagation();setOpen(panel.classList.contains('mec-filter-hidden'));});
      document.addEventListener('click',e=>{
        if(!panel.contains(e.target)&&!toggle.contains(e.target)) setOpen(false);
      });
      panel.addEventListener('click',e=>e.stopPropagation());
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
