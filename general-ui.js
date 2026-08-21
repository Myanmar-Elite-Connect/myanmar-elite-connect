/* Myanmar Elite Connect — General page compact UI */
(function(){
  'use strict';
  const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  if(page!=='general.html') return;

  function init(){
    if(document.body.dataset.mecGeneralUi==='1') return;
    document.body.dataset.mecGeneralUi='1';

    const panel=document.querySelector('.filter-panel');
    if(!panel) return;

    const head=panel.previousElementSibling?.classList.contains('filter-head')
      ? panel.previousElementSibling
      : document.querySelector('.filter-head');
    if(!head) return;

    /* Keep the filter closed until the user asks for it. */
    panel.classList.add('mec-filter-collapsed');

    const button=document.createElement('button');
    button.type='button';
    button.className='mec-filter-toggle';
    button.setAttribute('aria-expanded','false');
    button.setAttribute('aria-controls','mec-filter-panel');
    button.innerHTML='<span class="mec-filter-toggle-icon">⚙</span><span>Filter</span>';
    panel.id='mec-filter-panel';

    const meta=head.querySelector('.listing-meta');
    if(meta) meta.replaceWith(button);
    else head.appendChild(button);

    const style=document.createElement('style');
    style.id='mec-general-filter-ui';
    style.textContent=`
      body.mec-general-compact .category-grid{
        display:flex !important;
        flex-wrap:nowrap !important;
        overflow-x:auto !important;
        gap:8px !important;
        scrollbar-width:none !important;
        padding:2px 1px 5px !important;
      }
      body.mec-general-compact .category-grid::-webkit-scrollbar{display:none}
      body.mec-general-compact .category-card{
        flex:0 0 auto !important;
        min-width:108px !important;
        width:auto !important;
      }

      .mec-filter-toggle{
        display:inline-flex !important;
        align-items:center !important;
        justify-content:center !important;
        gap:5px !important;
        width:auto !important;
        min-width:64px !important;
        height:30px !important;
        padding:0 9px !important;
        border:1px solid var(--border,rgba(16,35,63,.1)) !important;
        border-radius:9px !important;
        color:var(--text,#10233f) !important;
        background:var(--surface,#fff) !important;
        font-size:9px !important;
        font-weight:900 !important;
        box-shadow:none !important;
        -webkit-tap-highlight-color:transparent !important;
      }
      .mec-filter-toggle:hover{
        border-color:rgba(216,180,92,.55) !important;
      }
      .mec-filter-toggle-icon{font-size:11px;line-height:1;color:var(--gold,#d8b45c)}
      .mec-filter-collapsed{
        display:none !important;
      }
      .mec-filter-open{
        display:block !important;
        margin-top:8px !important;
        animation:mecFilterDrop .18s ease-out;
      }
      @keyframes mecFilterDrop{
        from{opacity:0;transform:translateY(-5px)}
        to{opacity:1;transform:translateY(0)}
      }
      @media(max-width:700px){
        .mec-filter-toggle{min-width:60px !important;height:28px !important;padding:0 8px !important;font-size:8px !important}
      }
    `;
    document.head.appendChild(style);

    button.addEventListener('click',function(){
      const open=panel.classList.toggle('mec-filter-open');
      panel.classList.toggle('mec-filter-collapsed',!open);
      button.setAttribute('aria-expanded',String(open));
      button.innerHTML=open
        ? '<span class="mec-filter-toggle-icon">×</span><span>Close</span>'
        : '<span class="mec-filter-toggle-icon">⚙</span><span>Filter</span>';
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else setTimeout(init,0);
})();
