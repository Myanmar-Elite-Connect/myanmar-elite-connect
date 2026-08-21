/* MEC visual-only Myanmar UI/UX themes. No content, routes or business logic are changed. */
(function(){
'use strict';
const THEMES={
'royal-myanmar':{name:'Royal Myanmar',bg:'#f6f2e8',surface:'#fffdf7',soft:'#f2ecdc',text:'#17243b',muted:'#6f7180',border:'rgba(93,67,25,.12)',gold:'#c99d38'},
'burmese-lacquer':{name:'Burmese Lacquer',bg:'#170f0d',surface:'#211512',soft:'#2b1b17',text:'#f7ead0',muted:'#bcae9a',border:'rgba(218,180,92,.15)',gold:'#d7b55b'},
'shwe-palace':{name:'Shwe Palace',bg:'#f8f1df',surface:'#fffaf0',soft:'#f4e8c8',text:'#263044',muted:'#77715f',border:'rgba(194,150,48,.16)',gold:'#c99427'},
'yangon-heritage':{name:'Yangon Heritage',bg:'#f4f2e8',surface:'#fffef9',soft:'#e9eee5',text:'#19352f',muted:'#6c7b74',border:'rgba(36,85,68,.12)',gold:'#c5a24e'},
'inle-serenity':{name:'Inle Serenity',bg:'#edf5f4',surface:'#fbffff',soft:'#e3efee',text:'#17343b',muted:'#6d8185',border:'rgba(35,101,111,.12)',gold:'#c8a557'},
'bagan-sunset':{name:'Bagan Sunset',bg:'#f5ede3',surface:'#fffaf5',soft:'#efe0d0',text:'#3a2924',muted:'#816f65',border:'rgba(126,75,43,.14)',gold:'#c49a48'},
'thanaka-classic':{name:'Thanaka Classic',bg:'#f5f0df',surface:'#fffdf4',soft:'#eee7cd',text:'#303325',muted:'#7b7d6b',border:'rgba(111,105,61,.14)',gold:'#bd9947'},
'myanmar-silk':{name:'Myanmar Silk',bg:'#f7eef0',surface:'#fffafd',soft:'#f0dfe5',text:'#3a2230',muted:'#866f7b',border:'rgba(112,52,80,.12)',gold:'#c79a49'},
'jade-myanmar':{name:'Jade Myanmar',bg:'#edf4ee',surface:'#fbfffc',soft:'#e0eee3',text:'#18352c',muted:'#6c8076',border:'rgba(35,104,74,.13)',gold:'#c6a24e'},
'modern-myanmar':{name:'Modern Myanmar',bg:'#f5f7fb',surface:'#fff',soft:'#eef2f7',text:'#10233f',muted:'#718097',border:'rgba(16,35,63,.10)',gold:'#d8b45c'}
};
const KEY='mec_ui_theme';
function apply(id,save){
 const t=THEMES[id]||THEMES['modern-myanmar'];
 const r=document.documentElement;
 Object.entries({bg:t.bg,surface:t.surface,soft:t.soft,text:t.text,muted:t.muted,border:t.border,gold:t.gold}).forEach(([k,v])=>r.style.setProperty('--mec-'+k,v));
 r.dataset.mecTheme=id;
 let s=document.getElementById('mec-theme-style');
 if(!s){s=document.createElement('style');s.id='mec-theme-style';document.head.appendChild(s)}
 s.textContent=`
 body[data-mec-theme],body{background-color:var(--mec-bg)!important;color:var(--mec-text)!important}
 body[data-mec-theme] .card,body[data-mec-theme] .panel,body[data-mec-theme] .sidebar,body[data-mec-theme] .stat,body[data-mec-theme] .info-card,body[data-mec-theme] .listing-card,body[data-mec-theme] .post-card,body[data-mec-theme] .modal-box,body[data-mec-theme] .surface,body[data-mec-theme] .profile-card,body[data-mec-theme] .form-card{background:var(--mec-surface)!important;border-color:var(--mec-border)!important}
 body[data-mec-theme] input,body[data-mec-theme] select,body[data-mec-theme] textarea,body[data-mec-theme] .search,body[data-mec-theme] .filter{background:var(--mec-soft)!important;color:var(--mec-text)!important;border-color:var(--mec-border)!important}
 body[data-mec-theme] .topbar,body[data-mec-theme] .mobile-nav{background:var(--mec-surface)!important;border-color:var(--mec-border)!important}
 body[data-mec-theme] .nav a:hover,body[data-mec-theme] .nav a.active,body[data-mec-theme] .side-btn:hover,body[data-mec-theme] .side-btn.active{background:var(--mec-soft)!important;color:var(--mec-text)!important}
 body[data-mec-theme] .eyebrow,body[data-mec-theme] .section-note,body[data-mec-theme] .preview-category,body[data-mec-theme] .mobile-nav a.active{color:var(--mec-gold)!important}
 body[data-mec-theme] .publish-button,body[data-mec-theme] .btn.primary{background:linear-gradient(135deg,var(--mec-gold),var(--mec-gold))!important;border-color:var(--mec-gold)!important}
 #mec-theme-admin .mec-theme-btn{color:var(--mec-text)!important;background:var(--mec-soft)!important;border-color:var(--mec-border)!important}
 #mec-theme-admin .mec-theme-btn.active{color:var(--mec-gold)!important;border-color:var(--mec-gold)!important;background:var(--mec-surface)!important}
 `;
 document.body&&document.body.setAttribute('data-mec-theme',id);
 if(save)localStorage.setItem(KEY,id);
}
async function load(){
 let id=localStorage.getItem(KEY)||'modern-myanmar';
 try{if(window.supabaseClient){const q=await window.supabaseClient.from('app_ui_settings').select('active_theme').eq('id',1).maybeSingle();if(!q.error&&q.data&&THEMES[q.data.active_theme])id=q.data.active_theme;}}catch(e){}
 apply(id,false);
}
function adminUI(){
 if(!/admin\.html$/i.test(location.pathname)||document.getElementById('mec-theme-admin'))return;
 const style=document.createElement('style');style.textContent=`
 #mec-theme-admin{font-family:Inter,"Noto Sans Myanmar",system-ui,sans-serif}
 #mec-theme-admin .mec-theme-btn{width:100%;display:flex;align-items:center;gap:9px;padding:11px 12px;margin-top:5px;border:1px solid transparent;border-radius:10px;font-size:11px;font-weight:900;cursor:pointer;text-align:left}
 #mec-theme-pop{position:fixed;inset:0;z-index:9999;display:none;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,.62);backdrop-filter:blur(7px)}
 #mec-theme-pop.open{display:flex}
 .mec-theme-box{width:min(760px,100%);max-height:90vh;overflow:auto;padding:20px;border-radius:20px;background:var(--mec-surface);color:var(--mec-text);border:1px solid var(--mec-border);box-shadow:0 30px 100px #0005}
 .mec-theme-head{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-bottom:15px}.mec-theme-head h2{font-size:18px}.mec-theme-head p{margin-top:4px;color:var(--mec-muted);font-size:9px}.mec-theme-close{width:34px;height:34px;border:0;border-radius:9px;background:var(--mec-soft);color:var(--mec-text);font-size:18px}
 .mec-theme-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:9px}.mec-theme-option{padding:11px;border:1px solid var(--mec-border);border-radius:13px;background:var(--mec-soft);color:var(--mec-text);cursor:pointer;text-align:left}.mec-theme-option.active{border:2px solid var(--mec-gold);padding:10px}.mec-swatch{height:48px;border-radius:9px;margin-bottom:8px}.mec-theme-name{font-size:10px;font-weight:950}.mec-theme-desc{margin-top:3px;color:var(--mec-muted);font-size:8px}.mec-theme-save{width:100%;height:42px;margin-top:12px;border:0;border-radius:10px;background:var(--mec-gold);color:#071a34;font-size:10px;font-weight:950}.mec-theme-status{text-align:center;margin-top:7px;color:var(--mec-muted);font-size:9px}
 @media(max-width:600px){.mec-theme-grid{grid-template-columns:1fr}}
 `;document.head.appendChild(style);
 const side=document.querySelector('.sidebar');
 const holder=document.createElement('div');holder.id='mec-theme-admin';
 const btn=document.createElement('button');btn.type='button';btn.className='mec-theme-btn';btn.innerHTML='<span>🎨</span><span>UI / UX Themes</span>';
 if(side){const title=side.querySelector('.side-title');if(title)title.insertAdjacentElement('afterend',holder);else side.appendChild(holder);holder.appendChild(btn)}else{holder.style.cssText='position:fixed;right:15px;bottom:15px;z-index:9998';holder.appendChild(btn);document.body.appendChild(holder)}
 const pop=document.createElement('div');pop.id='mec-theme-pop';pop.innerHTML='<div class="mec-theme-box"><div class="mec-theme-head"><div><h2>Myanmar Culture UI / UX</h2><p>Background and visual style only. Your posts, functions and navigation are not changed.</p></div><button class="mec-theme-close" type="button">×</button></div><div class="mec-theme-grid"></div><button class="mec-theme-save" type="button">Save for all pages</button><div class="mec-theme-status">Choose a theme</div></div>';document.body.appendChild(pop);
 const grid=pop.querySelector('.mec-theme-grid'),status=pop.querySelector('.mec-theme-status');let selected=document.documentElement.dataset.mecTheme||localStorage.getItem(KEY)||'modern-myanmar';
 Object.entries(THEMES).forEach(([id,t])=>{const o=document.createElement('button');o.type='button';o.className='mec-theme-option'+(id===selected?' active':'');o.innerHTML=`<div class="mec-swatch" style="background:linear-gradient(135deg,${t.bg},${t.surface});box-shadow:inset 0 0 0 2px ${t.gold}66"></div><div class="mec-theme-name">${t.name}</div><div class="mec-theme-desc">Myanmar-inspired background</div>`;o.onclick=()=>{selected=id;grid.querySelectorAll('.mec-theme-option').forEach(x=>x.classList.remove('active'));o.classList.add('active');apply(id,true);status.textContent=t.name+' selected';};grid.appendChild(o)});
 btn.onclick=()=>pop.classList.add('open');pop.querySelector('.mec-theme-close').onclick=()=>pop.classList.remove('open');pop.onclick=e=>{if(e.target===pop)pop.classList.remove('open')};
 pop.querySelector('.mec-theme-save').onclick=async()=>{status.textContent='Saving…';try{const r=await window.supabaseClient.from('app_ui_settings').update({active_theme:selected,updated_at:new Date().toISOString()}).eq('id',1);if(r.error)throw r.error;localStorage.setItem(KEY,selected);status.textContent='✓ Saved. All pages now use this theme.'}catch(e){console.error(e);status.textContent='Save failed. Check admin permission.'}};
}
function boot(){load();setTimeout(adminUI,300)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
