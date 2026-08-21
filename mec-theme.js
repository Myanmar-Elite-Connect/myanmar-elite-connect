/* Myanmar Elite Connect — site-wide cultural UI/UX theme system */
(function(){
'use strict';

const THEMES={
 original:{name:'Original',image:'',overlay:'transparent',bg:'#f5f7fb',surface:'#ffffff',soft:'#f7f9fc',text:'#10233f',muted:'#718097',gold:'#d8b45c'},
 royal:{name:'Royal Myanmar',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Shwedagon-Pagode.jpg?width=1800',overlay:'rgba(4,17,37,.64)',bg:'#071a34',surface:'rgba(14,30,51,.92)',soft:'rgba(24,46,73,.90)',text:'#f7f2e7',muted:'#aeb9c8',gold:'#d8b45c'},
 shwedagon:{name:'Shwedagon Gold',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Shwedagon-Pagode.jpg?width=1800',overlay:'rgba(6,19,42,.58)',bg:'#0a1d38',surface:'rgba(255,255,255,.94)',soft:'rgba(247,242,227,.92)',text:'#10233f',muted:'#68778c',gold:'#dfb95e'},
 kyaiktiyo:{name:'Kyaiktiyo Heritage',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Kyaiktiyo%20Pagoda.jpg?width=1800',overlay:'rgba(8,24,38,.52)',bg:'#10283b',surface:'rgba(255,253,247,.94)',soft:'rgba(247,240,224,.92)',text:'#182c3c',muted:'#6b7b8c',gold:'#d9b65c'},
 bagan:{name:'Bagan Heritage',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Bagan%20Temple.jpg?width=1800',overlay:'rgba(51,28,12,.50)',bg:'#402717',surface:'rgba(255,250,241,.94)',soft:'rgba(248,235,214,.92)',text:'#2b2119',muted:'#796b5b',gold:'#c99b3b'},
 inle:{name:'Inle Serenity',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Inle%20Lake%20%28Myanmar%29.jpg?width=1800',overlay:'rgba(4,37,50,.48)',bg:'#0b3547',surface:'rgba(247,252,252,.94)',soft:'rgba(228,241,242,.92)',text:'#102f3b',muted:'#647e85',gold:'#d5b25a'},
 mandalay:{name:'Mandalay Palace',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Mandalay%20Palace%2C%20Myanmar.jpg?width=1800',overlay:'rgba(54,13,24,.52)',bg:'#35141e',surface:'rgba(255,248,245,.94)',soft:'rgba(246,229,224,.92)',text:'#32121b',muted:'#806b6d',gold:'#d8b45c'},
 lacquer:{name:'Burmese Lacquer',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Bagan%20Temple.jpg?width=1800',overlay:'rgba(5,5,5,.72)',bg:'#0a0a0a',surface:'rgba(25,25,25,.94)',soft:'rgba(40,40,40,.92)',text:'#f5f1e7',muted:'#a9a193',gold:'#d8b45c'},
 thanaka:{name:'Thanaka Classic',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Thanaka.jpg?width=1800',overlay:'rgba(81,61,36,.42)',bg:'#dac9aa',surface:'rgba(255,252,244,.94)',soft:'rgba(246,239,224,.92)',text:'#3c3024',muted:'#776957',gold:'#b88a2b'},
 silk:{name:'Myanmar Silk',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Myanmar%20silk.jpg?width=1800',overlay:'rgba(57,25,40,.38)',bg:'#f6eef0',surface:'rgba(255,250,251,.94)',soft:'rgba(247,235,240,.92)',text:'#3c2730',muted:'#856f77',gold:'#c69a50'},
 jade:{name:'Jade Myanmar',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Jade%20market%20Myanmar.jpg?width=1800',overlay:'rgba(8,51,38,.38)',bg:'#e8f2ed',surface:'rgba(251,255,252,.94)',soft:'rgba(231,244,237,.92)',text:'#17362c',muted:'#668176',gold:'#b99743'}
};

const SUPABASE_URL='https://ikjwisfsdcupibgjiuvp.supabase.co';
const SUPABASE_KEY='sb_publishable_xoh1rjwBlJhR9nB3kQD-KA_QcVY6w2s';

function install(){
 if(document.getElementById('mec-theme-style')) return;
 const style=document.createElement('style');
 style.id='mec-theme-style';
 style.textContent=`
:root{--mec-theme-image:none;--mec-overlay:transparent}
body.mec-theme-active{background-color:var(--bg)!important;background-image:var(--mec-theme-background)!important;background-size:cover!important;background-position:center!important;background-attachment:fixed!important;background-repeat:no-repeat!important}
body.mec-theme-active .topbar,body.mec-theme-active .mobile-nav{background:color-mix(in srgb,var(--surface) 88%,transparent)!important;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}
body.mec-theme-active .card,body.mec-theme-active .panel,body.mec-theme-active .surface,body.mec-theme-active .listing-card,body.mec-theme-active .info-card,body.mec-theme-active .modal-box{background:var(--surface)!important;color:var(--text)!important}
#mecThemeStudio{margin:0!important;border:0!important;border-radius:0!important;box-shadow:none!important;background:transparent!important;overflow:visible!important}
#mecThemeStudio .mec-theme-hint{padding:14px 15px 8px;color:var(--muted);font-size:9px;line-height:1.65}
#mecThemeStudio .mec-theme-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;padding:15px}
#mecThemeStudio .mec-theme-card{position:relative;overflow:hidden;padding:0;border:1px solid var(--border);border-radius:14px;background:var(--surface);cursor:pointer;transition:.2s ease;text-align:left}
#mecThemeStudio .mec-theme-card:hover{transform:translateY(-2px);border-color:var(--gold);box-shadow:0 12px 30px rgba(0,0,0,.10)}
#mecThemeStudio .mec-theme-card.active{border:2px solid var(--gold)}
#mecThemeStudio .mec-theme-preview{height:105px;background-position:center;background-size:cover;display:flex;align-items:flex-end;padding:10px}
#mecThemeStudio .mec-theme-preview span{padding:5px 7px;border-radius:7px;background:rgba(7,26,52,.78);color:#fff;font-size:8px;font-weight:900}
#mecThemeStudio .mec-theme-name{padding:10px 11px;font-size:10px;font-weight:900;color:var(--text)}
#mecThemeStudio .mec-theme-status{position:absolute;right:8px;top:8px;padding:4px 6px;border-radius:6px;background:var(--gold);color:#071a34;font-size:7px;font-weight:950;display:none}
#mecThemeStudio .active .mec-theme-status{display:block}
#mecThemeStudio .mec-theme-actions{display:flex;justify-content:flex-end;gap:7px;padding:0 15px 15px}
#mecThemeStudio .mec-theme-message{padding:0 15px 15px;color:var(--muted);font-size:9px}
#mecThemeStudio .mec-theme-save-error{color:#c74747}
#mecThemeStudio .mec-theme-save-ok{color:#27855b}
@media(max-width:900px){#mecThemeStudio .mec-theme-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media(max-width:650px){#mecThemeStudio .mec-theme-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}}
`;
 document.head.appendChild(style);
}

function setVars(t){
 const vars={bg:t.bg,surface:t.surface,soft:t.soft,text:t.text,muted:t.muted,gold:t.gold};
 Object.entries(vars).forEach(([key,value])=>document.documentElement.style.setProperty('--'+key,value));
}

function apply(id){
 const key=THEMES[id]?id:'original';
 const t=THEMES[key];
 setVars(t);
 document.documentElement.dataset.mecTheme=key;
 document.body.classList.add('mec-theme-active');
 document.body.style.setProperty('--mec-overlay',t.overlay);
 document.body.style.setProperty('--mec-theme-background',t.image?`linear-gradient(${t.overlay},${t.overlay}),url("${t.image}")`:'none');
 localStorage.setItem('mec_ui_theme',key);
 window.dispatchEvent(new CustomEvent('mecThemeChanged',{detail:{id:key,name:t.name}}));
 updateStudio();
}

async function getRemoteTheme(){
 try{
  const r=await fetch(`${SUPABASE_URL}/rest/v1/app_ui_settings?id=eq.1&select=active_theme`,{headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${SUPABASE_KEY}`} });
  if(!r.ok)return null;
  const rows=await r.json();
  return rows[0]?.active_theme&&THEMES[rows[0].active_theme]?rows[0].active_theme:null;
 }catch(e){return null}
}

async function saveRemote(id){
 const r=await fetch(`${SUPABASE_URL}/rest/v1/app_ui_settings?id=eq.1`,{
  method:'PATCH',
  headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${SUPABASE_KEY}`,'Content-Type':'application/json','Prefer':'return=minimal'},
  body:JSON.stringify({active_theme:id,updated_at:new Date().toISOString()})
 });
 if(!r.ok)throw new Error('HTTP '+r.status);
}

function ensureAdminStudio(){
 if(!location.pathname.toLowerCase().endsWith('/admin.html'))return;
 if(document.getElementById('mecThemeStudio'))return;
 const sidebar=document.querySelector('.sidebar');
 const content=document.querySelector('.content');
 if(!sidebar||!content)return;

 const nav=document.createElement('button');
 nav.type='button';
 nav.className='side-btn';
 nav.dataset.view='uiux';
 nav.innerHTML='✦ UI / UX';
 const reports=sidebar.querySelector('[data-view="reports"]');
 sidebar.insertBefore(nav,reports||null);

 const view=document.createElement('section');
 view.className='view';
 view.id='view-uiux';
 view.innerHTML=`<div class="panel"><div class="panel-head"><strong>UI / UX Themes</strong><span style="color:var(--muted);font-size:9px">11 themes • site-wide</span></div><div id="mecThemeStudio"><div class="mec-theme-hint">Choose the background and visual style for the whole Myanmar Elite Connect website. This changes the website UI/UX only; existing features, listings and navigation remain unchanged.</div><div class="mec-theme-grid"></div><div class="mec-theme-actions"><button type="button" class="btn" id="mecThemeReset">Original</button><button type="button" class="btn primary" id="mecThemeSave">Save Theme</button></div><div class="mec-theme-message" id="mecThemeMessage"></div></div></div>`;
 content.appendChild(view);

 const grid=view.querySelector('.mec-theme-grid');
 Object.entries(THEMES).forEach(([id,t])=>{
  const card=document.createElement('button');
  card.type='button';
  card.className='mec-theme-card';
  card.dataset.theme=id;
  card.innerHTML=`<div class="mec-theme-preview" style="background-image:${t.image?`linear-gradient(${t.overlay},${t.overlay}),url("${t.image}")`:`linear-gradient(135deg,${t.bg},${t.soft})`}"><span>${t.name}</span></div><div class="mec-theme-name">${t.name}</div><div class="mec-theme-status">ACTIVE</div>`;
  card.addEventListener('click',()=>apply(id));
  grid.appendChild(card);
 });

 nav.addEventListener('click',()=>{
  document.querySelectorAll('.side-btn').forEach(x=>x.classList.remove('active'));
  nav.classList.add('active');
  document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));
  view.classList.add('active');
  const title=document.getElementById('pageTitle');
  const subtitle=document.getElementById('pageSubtitle');
  if(title)title.textContent='UI / UX Themes';
  if(subtitle)subtitle.textContent='Myanmar cultural visual themes for the whole website';
 });

 view.querySelector('#mecThemeReset').addEventListener('click',()=>apply('original'));
 view.querySelector('#mecThemeSave').addEventListener('click',async()=>{
  const id=document.documentElement.dataset.mecTheme||'original';
  const btn=view.querySelector('#mecThemeSave');
  const msg=view.querySelector('#mecThemeMessage');
  btn.disabled=true;btn.textContent='Saving...';msg.className='mec-theme-message';msg.textContent='Saving theme...';
  try{
   await saveRemote(id);
   msg.className='mec-theme-message mec-theme-save-ok';
   msg.textContent=`${THEMES[id].name} is now the site-wide theme.`;
  }catch(e){
   console.error(e);
   msg.className='mec-theme-message mec-theme-save-error';
   msg.textContent='Save failed. The theme is still active on this device, but Supabase did not accept the site-wide update.';
  }finally{
   btn.disabled=false;btn.textContent='Save Theme';
  }
 });
 updateStudio();
}

function updateStudio(){
 const studio=document.getElementById('mecThemeStudio');
 if(!studio)return;
 const active=document.documentElement.dataset.mecTheme||localStorage.getItem('mec_ui_theme')||'original';
 studio.querySelectorAll('.mec-theme-card').forEach(card=>card.classList.toggle('active',card.dataset.theme===active));
}

async function load(){
 install();
 let active=localStorage.getItem('mec_ui_theme')||'original';
 const remote=await getRemoteTheme();
 if(remote)active=remote;
 apply(active);
 ensureAdminStudio();
}

window.MEC_UI_THEMES=THEMES;
window.MEC_applyTheme=apply;
window.MEC_loadTheme=load;

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',load,{once:true});
else load();
})();
