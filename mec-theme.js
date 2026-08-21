/* Myanmar Elite Connect — site-wide Myanmar culture UI themes */
(function(){
  'use strict';
  const THEMES={
    original:{name:'Original',image:'',overlay:'rgba(7,26,52,.00)',bg:'#f4f6fa',surface:'#ffffff',soft:'#f7f9fc',text:'#10233f',muted:'#718097',gold:'#d8b45c'},
    shwedagon:{name:'Shwedagon Gold',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Shwedagon-Pagode.jpg?width=1800',overlay:'rgba(7,20,42,.70)',bg:'#071a34',surface:'rgba(255,255,255,.94)',soft:'rgba(248,244,231,.92)',text:'#10233f',muted:'#66758b',gold:'#d8b45c'},
    kyaiktiyo:{name:'Kyaiktiyo Heritage',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Kyaiktiyo%20Pagoda.jpg?width=1800',overlay:'rgba(7,18,36,.72)',bg:'#081a2d',surface:'rgba(255,255,255,.94)',soft:'rgba(246,240,224,.92)',text:'#10233f',muted:'#66758b',gold:'#d9b65c'},
    bagan:{name:'Bagan Heritage',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Bagan%20Temple.jpg?width=1800',overlay:'rgba(52,29,12,.58)',bg:'#3a2515',surface:'rgba(255,250,241,.95)',soft:'rgba(247,235,216,.92)',text:'#2a211a',muted:'#786b5d',gold:'#c99b3b'},
    inle:{name:'Inle Serenity',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Inle%20Lake%20%28Myanmar%29.jpg?width=1800',overlay:'rgba(5,34,48,.60)',bg:'#0b3344',surface:'rgba(247,252,252,.95)',soft:'rgba(228,241,242,.92)',text:'#102f3b',muted:'#647d84',gold:'#d5b25a'},
    mandalay:{name:'Mandalay Palace',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Mandalay%20Palace%2C%20Myanmar.jpg?width=1800',overlay:'rgba(50,13,23,.66)',bg:'#32121b',surface:'rgba(255,248,245,.95)',soft:'rgba(246,229,224,.92)',text:'#32121b',muted:'#806b6d',gold:'#d8b45c'},
    lacquer:{name:'Myanmar Lacquer',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Bagan%20Temple.jpg?width=1800',overlay:'rgba(8,8,8,.80)',bg:'#0b0b0b',surface:'rgba(25,25,25,.94)',soft:'rgba(40,40,40,.92)',text:'#f5f1e7',muted:'#a9a193',gold:'#d8b45c'},
    thanaka:{name:'Thanaka Heritage',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Inle%20Lake%2C%20House%20and%20water%20plants%2C%20Myanmar.jpg?width=1800',overlay:'rgba(82,61,35,.54)',bg:'#d9c8a8',surface:'rgba(255,252,244,.95)',soft:'rgba(246,239,224,.94)',text:'#3c3024',muted:'#776957',gold:'#b88a2b'},
    textile:{name:'Myanmar Textile',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Mandalay%20Palace%2C%20Myanmar.jpg?width=1800',overlay:'rgba(16,28,49,.73)',bg:'#101c31',surface:'rgba(249,248,243,.95)',soft:'rgba(237,235,224,.92)',text:'#17233a',muted:'#6c7482',gold:'#d6b45e'},
    goldenNight:{name:'Golden Pagoda Night',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Shwedagon%20Pagoda%2C%20Sunlight%2C%20Yangon%2C%20Myanmar.jpg?width=1800',overlay:'rgba(3,12,28,.78)',bg:'#030c1c',surface:'rgba(12,27,48,.94)',soft:'rgba(20,42,68,.92)',text:'#f5f6f8',muted:'#9aa7b7',gold:'#e0bc63'},
    modern:{name:'Modern Myanmar',image:'https://commons.wikimedia.org/wiki/Special:FilePath/Bagan%2C%20Myanmar%2C%20Htilominlo%20Temple%20and%20other%20Buddhist%20stupas%20in%20Bagan%20plain.jpg?width=1800',overlay:'rgba(7,26,52,.74)',bg:'#071a34',surface:'rgba(255,255,255,.95)',soft:'rgba(242,246,250,.93)',text:'#10233f',muted:'#718097',gold:'#d8b45c'}
  };
  const fallback='original';
  function apply(id){
    const t=THEMES[id]||THEMES[fallback];
    document.documentElement.dataset.mecTheme=id in THEMES?id:fallback;
    const root=document.documentElement;
    Object.entries({bg:t.bg,surface:t.surface,soft:t.soft,text:t.text,muted:t.muted,gold:t.gold}).forEach(([k,v])=>root.style.setProperty('--mec-'+k,v));
    document.body.classList.remove('mec-theme-image');
    document.body.style.removeProperty('--mec-theme-image');
    document.body.style.removeProperty('--mec-theme-overlay');
    if(t.image){
      document.body.classList.add('mec-theme-image');
      document.body.style.setProperty('--mec-theme-image',`url("${t.image}")`);
      document.body.style.setProperty('--mec-theme-overlay',t.overlay);
    }
    window.dispatchEvent(new CustomEvent('mecThemeChanged',{detail:{id,name:t.name}}));
  }
  function install(){
    if(document.getElementById('mec-theme-style'))return;
    const s=document.createElement('style');s.id='mec-theme-style';
    s.textContent=`
:root{--mec-bg:#f4f6fa;--mec-surface:#fff;--mec-soft:#f7f9fc;--mec-text:#10233f;--mec-muted:#718097;--mec-gold:#d8b45c}
body.mec-theme-image::before{content:"";position:fixed;inset:0;z-index:-20;background:linear-gradient(var(--mec-theme-overlay),var(--mec-theme-overlay)),var(--mec-theme-image) center/cover no-repeat;pointer-events:none;transform:translateZ(0)}
body.mec-theme-image::after{content:"";position:fixed;inset:0;z-index:-19;background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.16));pointer-events:none}
body{background:var(--mec-bg);color:var(--mec-text);transition:background .45s ease,color .35s ease}
body.mec-theme-image{background:var(--mec-bg)}
body.mec-theme-image .card,body.mec-theme-image .panel,body.mec-theme-image .surface,body.mec-theme-image .stat,body.mec-theme-image .info-card{backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
`;
    document.head.appendChild(s);
  }
  async function load(){
    install();
    let active=localStorage.getItem('mec_ui_theme')||'original';
    try{
      const url=window.SUPABASE_URL||'https://ikjwisfsdcupibgjiuvp.supabase.co';
      const key=window.SUPABASE_KEY||'sb_publishable_xoh1rjwBlJhR9nB3kQD-KA_QcVY6w2s';
      if(window.supabase?.createClient){
        const db=window.__mecThemeDb||window.supabase.createClient(url,key);window.__mecThemeDb=db;
        const r=await db.from('app_ui_settings').select('active_theme').eq('id',1).maybeSingle();
        if(!r.error&&r.data?.active_theme){active=r.data.active_theme;localStorage.setItem('mec_ui_theme',active)}
      }
    }catch(e){console.warn('MEC theme load:',e)}
    apply(active);
  }
  window.MEC_UI_THEMES=THEMES;window.MEC_applyTheme=apply;window.MEC_loadTheme=load;
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',load,{once:true});else load();
})();
