/* Myanmar Elite Connect — shared luxury splash UI for entry pages. */
(function(){
  const page=(location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if(page !== 'index.html' && page !== 'auth.html') return;
  if(window.__mecSplashLoaded) return;
  window.__mecSplashLoaded=true;

  const logo='https://lh3.googleusercontent.com/d/1fR8TnvOjrzVbKuro9Ths1_Jt0PAxSmGd';
  const style=document.createElement('style');
  style.id='mec-splash-style';
  style.textContent=`
    #mec-splash{
      position:fixed;
      inset:0;
      z-index:100000;
      display:grid;
      place-items:center;
      overflow:hidden;
      background:#071a34;
      opacity:1;
      visibility:visible;
      transition:opacity .55s cubic-bezier(.4,0,.2,1),visibility .55s;
    }
    #mec-splash.is-leaving{
      opacity:0;
      visibility:hidden;
      pointer-events:none;
    }
    #mec-splash::before{
      content:"";
      position:absolute;
      width:62vmin;
      height:62vmin;
      border-radius:50%;
      background:radial-gradient(circle,rgba(216,180,92,.18),rgba(216,180,92,.05) 38%,transparent 70%);
      filter:blur(8px);
      animation:mecGlow 1.8s ease-out both;
    }
    .mec-splash-mark{
      position:relative;
      width:clamp(105px,25vw,150px);
      height:clamp(105px,25vw,150px);
      display:grid;
      place-items:center;
      border:1px solid rgba(216,180,92,.45);
      border-radius:28%;
      background:linear-gradient(145deg,rgba(255,255,255,.98),rgba(245,247,250,.94));
      box-shadow:0 24px 80px rgba(0,0,0,.30),0 0 0 1px rgba(216,180,92,.08) inset;
      transform:scale(.72);
      opacity:0;
      animation:mecLogoIn .75s cubic-bezier(.16,1,.3,1) .08s forwards;
      overflow:hidden;
    }
    .mec-splash-mark img{
      width:78%;
      height:78%;
      object-fit:contain;
      border-radius:8%;
      animation:mecLogoFloat 1.8s ease-in-out .65s both;
    }
    .mec-splash-mark::after{
      content:"";
      position:absolute;
      top:-35%;
      left:-70%;
      width:45%;
      height:170%;
      transform:rotate(22deg);
      background:linear-gradient(90deg,transparent,rgba(255,255,255,.95),rgba(244,217,138,.55),transparent);
      filter:blur(2px);
      animation:mecSheen .72s cubic-bezier(.4,0,.2,1) .55s both;
      pointer-events:none;
    }
    .mec-splash-ring{
      position:absolute;
      width:calc(clamp(105px,25vw,150px) + 24px);
      height:calc(clamp(105px,25vw,150px) + 24px);
      border:1px solid rgba(216,180,92,.28);
      border-radius:30%;
      transform:scale(.82) rotate(-8deg);
      opacity:0;
      animation:mecRing .9s ease .18s forwards;
    }
    .mec-splash-name{
      position:absolute;
      top:calc(50% + clamp(82px,12vw,105px));
      color:#fff;
      font:800 clamp(12px,3vw,16px)/1 Inter,system-ui,sans-serif;
      letter-spacing:.22em;
      text-transform:uppercase;
      opacity:0;
      transform:translateY(8px);
      animation:mecName .55s ease .48s forwards;
    }
    .mec-splash-name span{color:#d8b45c}
    @keyframes mecLogoIn{to{opacity:1;transform:scale(1)}}
    @keyframes mecLogoFloat{0%,100%{transform:scale(1)}50%{transform:scale(1.035)}}
    @keyframes mecSheen{to{left:135%}}
    @keyframes mecRing{to{opacity:1;transform:scale(1) rotate(0)}}
    @keyframes mecGlow{from{opacity:0;transform:scale(.65)}to{opacity:1;transform:scale(1)}}
    @keyframes mecName{to{opacity:1;transform:translateY(0)}}
    @media(prefers-reduced-motion:reduce){
      #mec-splash *,#mec-splash::before{animation:none!important}
      .mec-splash-mark{opacity:1;transform:none}
      .mec-splash-ring{opacity:1;transform:none}
      .mec-splash-name{opacity:1;transform:none}
    }
  `;
  (document.head || document.documentElement).appendChild(style);

  function show(){
    if(document.getElementById('mec-splash')) return;
    const splash=document.createElement('div');
    splash.id='mec-splash';
    splash.setAttribute('aria-hidden','true');
    splash.innerHTML=`
      <div class="mec-splash-ring"></div>
      <div class="mec-splash-mark"><img src="${logo}" alt=""></div>
      <div class="mec-splash-name">Myanmar <span>Elite</span> Connect</div>
    `;
    document.body.prepend(splash);
    const hide=()=>{
      if(splash.classList.contains('is-leaving')) return;
      setTimeout(()=>splash.classList.add('is-leaving'),620);
      setTimeout(()=>splash.remove(),1250);
    };
    if(document.readyState === 'complete') hide();
    else window.addEventListener('load',hide,{once:true});
    setTimeout(hide,1900);
  }
  if(document.body) show();
  else document.addEventListener('DOMContentLoaded',show,{once:true});
})();
