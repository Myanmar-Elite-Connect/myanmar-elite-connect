/* Myanmar Elite Connect — global UI/UX theme layer.
   Visual-only: changes backgrounds, surfaces, borders, shadows and accents.
   It deliberately does not change page content, routes or business logic. */
(function(){
  'use strict';
  const THEMES={
    'royal-myanmar':{name:'Royal Myanmar',bg:'#f6f2e8',surface:'#fffdf7',soft:'#f2ecdc',text:'#17243b',muted:'#6f7180',border:'rgba(93,67,25,.12)',gold:'#c99d38',gold2:'#f0d58a',navy:'#071a34',shadow:'0 22px 60px rgba(76,56,20,.12)',texture:'royal'},
    'burmese-lacquer':{name:'Burmese Lacquer',bg:'#170f0d',surface:'#211512',soft:'#2b1b17',text:'#f7ead0',muted:'#bcae9a',border:'rgba(218,180,92,.15)',gold:'#d7b55b',gold2:'#f1d68f',navy:'#f7ead0',shadow:'0 22px 65px rgba(0,0,0,.36)',texture:'lacquer'},
    'shwe-palace':{name:'Shwe Palace',bg:'#f8f1df',surface:'#fffaf0',soft:'#f4e8c8',text:'#263044',muted:'#77715f',border:'rgba(194,150,48,.16)',gold:'#c99427',gold2:'#f3d77f',navy:'#17243b',shadow:'0 24px 70px rgba(141,100,20,.13)',texture:'gold'},
    'yangon-heritage':{name:'Yangon Heritage',bg:'#f4f2e8',surface:'#fffef9',soft:'#e9eee5',text:'#19352f',muted:'#6c7b74',border:'rgba(36,85,68,.12)',gold:'#c5a24e',gold2:'#ead28b',navy:'#15352d',shadow:'0 22px 60px rgba(34,65,55,.11)',texture:'heritage'},
    'inle-serenity':{name:'Inle Serenity',bg:'#edf5f4',surface:'#fbffff',soft:'#e3efee',text:'#17343b',muted:'#6d8185',border:'rgba(35,101,111,.12)',gold:'#c8a557',gold2:'#ead38e',navy:'#123944',shadow:'0 22px 60px rgba(35,91,100,.11)',texture:'water'},
    'bagan-sunset':{name:'Bagan Sunset',bg:'#f5ede3',surface:'#fffaf5',soft:'#efe0d0',text:'#3a2924',muted:'#816f65',border:'rgba(126,75,43,.14)',gold:'#c49a48',gold2:'#efd58e',navy:'#432b24',shadow:'0 22px 60px rgba(103,62,42,.12)',texture:'bagan'},
    'thanaka-classic':{name:'Thanaka Classic',bg:'#f5f0df',surface:'#fffdf4',soft:'#eee7cd',text:'#303325',muted:'#7b7d6b',border:'rgba(111,105,61,.14)',gold:'#bd9947',gold2:'#e8cf91',navy:'#303d2b',shadow:'0 22px 60px rgba(91,87,45,.11)',texture:'natural'},
    'myanmar-silk':{name:'Myanmar Silk',bg:'#f7eef0',surface:'#fffafd',soft:'#f0dfe5',text:'#3a2230',muted:'#866f7b',border:'rgba(112,52,80,.12)',gold:'#c79a49',gold2:'#ecd18b',navy:'#47233b',shadow:'0 22px 60px rgba(100,47,77,.12)',texture:'silk'},
    'jade-myanmar':{name:'Jade Myanmar',bg:'#edf4ee',surface:'#fbfffc',soft:'#e0eee3',text:'#18352c',muted:'#6c8076',border:'rgba(35,104,74,.13)',gold:'#c6a24e',gold2:'#ead38c',navy:'#123c31',shadow:'0 22px 60px rgba(27,91,64,.11)',texture:'jade'},
    'modern-myanmar':{name:'Modern Myanmar',bg:'#f5f7fb',surface:'#ffffff',soft:'#eef2f7',text:'#10233f',muted:'#718097',border:'rgba(16,35,63,.10)',gold:'#d8b45c',gold2:'#f4d98a',navy:'#071a34',shadow:'0 22px 60px rgba(13,35,64,.10)',texture:'modern'}
  };
  const KEY='mec_ui_theme';
  const STYLE_ID='mec-theme-style';
  const root=document.documentElement;
  function css(t){return `
    :root{--mec-bg:${t.bg};--mec-surface:${t.surface};--mec-soft:${t.soft};--mec-text:${t.text};--mec-muted:${t.muted};--mec-border:${t.border};--mec-gold:${t.gold};--mec-gold-light:${t.gold2};--mec-navy:${t.navy};--mec-shadow:${t.shadow}}
    body:not(.dark){background-color:${t.bg}!important;color:${t.text}!important}
    body:not(.dark) .card,body:not(.dark) .panel,body:not(.dark) .sidebar,body:not(.dark) .stat,body:not(.dark) .info-card,body:not(.dark) .listing-card,body:not(.dark) .post-card,body:not(.dark) .modal-box,body:not(.dark) .surface,body:not(.dark) .profile-card,body:not(.dark) .form-card{background:${t.surface}!important;border-color:${t.border}!important;box-shadow:${t.shadow}!important}
    body:not(.dark) input,body:not(.dark) select,body:not(.dark) textarea,body:not(.dark) .soft,body:not(.dark) .search,body:not(.dark) .filter{background:${t.soft}!important;color:${t.text}!important;border-color:${t.border}!important}
    body:not(.dark) .topbar,body:not(.dark) .mobile-nav{background:${t.surface}eF!important;border-color:${t.border}!important}
    body:not(.dark) .nav a:hover,body:not(.dark) .nav a.active,body:not(.dark) .side-btn:hover,body:not(.dark) .side-btn.active{background:${t.soft}!important;color:${t.text}!important}
    body:not(.dark) .eyebrow,body:not(.dark) .section-note,body:not(.dark) .preview-category,body:not(.dark) .mobile-nav a.active{color:${t.gold}!important}
    body:not(.dark) .publish-button,body:not(.dark) .btn.primary{background:linear-gradient(135deg,${t.gold2},${t.gold})!important;border-color:${t.gold}!important}
    body:not(.dark) .icon-btn,body:not(.dark) .profile{background:${t.surface}!important;border-color:${t.border}!important}
    body:not(.dark) .photo-upload{border-color:${t.gold}88!important;background:linear-gradient(135deg,${t.gold}12,transparent)!important}
    body:not(.dark) .preview-cover{background:linear-gradient(135deg,${t.soft},${t.bg})!important}
    body.mec-theme-darkfix{background:${t.bg}!important}
    body.mec-theme-lacquer::before,body.mec-theme-texture::before{content:"";position:fixed;inset:0;pointer-events:none;z-index:-1;opacity:.42;background-image:radial-gradient(${t.gold}18 1px,transparent 1px);background-size:22px 22px}
  `}
  function apply(name,save){
    const t=THEMES[name]||THEMES['modern-myanmar'];
    root.dataset.mecTheme=name;
    document.body.classList.toggle('mec-theme-lacquer',name==='burmese-lacquer');
    document.body.classList.toggle('mec-theme-texture',name!=='modern-myanmar');
    let s=document.getElementById(STYLE_ID);
    if(!s){s=document.createElement('style');s.id=STYLE_ID;document.head.appendChild(s)}
    s.textContent=css(t);
    if(save)localStorage.setItem(KEY,name);
  }
  async function load(){
    let name=localStorage.getItem(KEY)||'modern-myanmar';
    try{
      if(window.supabaseClient){
        const r=await window.supabaseClient.from('app_ui_settings').select('active_theme').eq('id',1).maybeSingle();
        if(!r.error&&r.data&&THEMES[r.data.active_theme]) name=r.data.active_theme;
      }
    }catch(e){}
    apply(name,false);
  }
  window.MECThemes={themes:THEMES,apply,load};
  function mountAdmin(){
    if(!/admin\.html$/i.test(location.pathname)||document.getElementById('mec-theme-admin'))return;
    const style=document.createElement('style');style.textContent=`#mec-theme-admin{position:fixed;right:18px;bottom:18px;z-index:1000;font-family:Inter,"Noto Sans Myanmar",system-ui,sans-serif}#mec-theme-admin .trigger{border:1px solid ${'#d8b45c'};background:#071a34;color:#f4d98a;border-radius:12px;padding:11px 14px;font-weight:900;font-size:11px;box-shadow:0 15px 35px #0002}#mec-theme-admin .panel{display:none;width:min(370px,calc(100vw - 30px));margin-bottom:9px;padding:15px;border-radius:16px;background:#fff;border:1px solid #e4e8ef;box-shadow:0 25px 70px #0003;color:#10233f}#mec-theme-admin.open .panel{display:block}#mec-theme-admin h3{font-size:14px;margin-bottom:4px}#mec-theme-admin p{font-size:9px;color:#718097;margin-bottom:11px}#mec-theme-admin .themes{display:grid;grid-template-columns:1fr 1fr;gap:7px;max-height:320px;overflow:auto}#mec-theme-admin button.theme{border:1px solid #e4e8ef;background:#f7f8fb;border-radius:10px;padding:10px;text-align:left;font-size:9px;font-weight:850;color:#10233f}#mec-theme-admin button.theme.active{border-color:#d8b45c;box-shadow:0 0 0 2px #d8b45c22}#mec-theme-admin .dot{display:inline-block;width:10px;height:10px;border-radius:50%;vertical-align:-1px;margin-right:5px;background:var(--c)}#mec-theme-admin .save{width:100%;margin-top:10px;height:38px;border:0;border-radius:10px;background:#d8b45c;color:#071a34;font-weight:950;font-size:10px}`;document.head.appendChild(style);
    const box=document.createElement('div');box.id='mec-theme-admin';box.innerHTML='<div class="panel"><h3>Myanmar UI / UX</h3><p>Background, surfaces, accents and visual atmosphere only. Page functions and content stay unchanged.</p><div class="themes"></div><button class="save">Save theme for all pages</button></div><button class="trigger">🎨 UI / UX</button>';document.body.appendChild(box);
    const themes=box.querySelector('.themes');const current=root.dataset.mecTheme||localStorage.getItem(KEY)||'modern-myanmar';
    Object.entries(THEMES).forEach(([id,t])=>{const b=document.createElement('button');b.className='theme'+(id===current?' active':'');b.dataset.theme=id;b.innerHTML=`<span class="dot" style="--c:${t.gold}"></span>${t.name}`;b.onclick=()=>{themes.querySelectorAll('.theme').forEach(x=>x.classList.remove('active'));b.classList.add('active');apply(id,true)};themes.appendChild(b)});
    box.querySelector('.trigger').onclick=()=>box.classList.toggle('open');
    box.querySelector('.save').onclick=async()=>{const id=root.dataset.mecTheme||'modern-myanmar';try{const r=await window.supabaseClient.from('app_ui_settings').upsert({id:1,active_theme:id,updated_at:new Date().toISOString()});if(r.error)throw r.error;localStorage.setItem(KEY,id);box.querySelector('.save').textContent='Saved ✓';setTimeout(()=>box.querySelector('.save').textContent='Save theme for all pages',1200)}catch(e){box.querySelector('.save').textContent='Save failed';console.error(e)}};
  }
  function boot(){load();setTimeout(mountAdmin,80)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
