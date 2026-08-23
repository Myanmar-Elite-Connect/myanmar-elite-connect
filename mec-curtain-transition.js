/* Myanmar Elite Connect — Myanmar royal curtain page transition */
(function () {
  "use strict";

  const TRANSITION_MS = 1450;
  const STORAGE_KEY = "mec_curtain_transition_seen";

  function escapeHtml(value) {
    return String(value).replace(/[&<>\"]/g, function (char) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" })[char];
    });
  }

  function buildCurtain() {
    if (document.getElementById("mecRoyalCurtain")) return null;

    const overlay = document.createElement("div");
    overlay.id = "mecRoyalCurtain";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML = `
      <div class="mec-curtain-stage">
        <div class="mec-curtain-backdrop"></div>
        <div class="mec-curtain-left"></div>
        <div class="mec-curtain-right"></div>

        <div class="mec-royal-person mec-person-left">
          <div class="mec-person-head"></div>
          <div class="mec-person-crown"></div>
          <div class="mec-person-body"></div>
          <div class="mec-person-arm mec-arm-left"></div>
          <div class="mec-person-arm mec-arm-right"></div>
        </div>

        <div class="mec-royal-person mec-person-right">
          <div class="mec-person-head"></div>
          <div class="mec-person-crown"></div>
          <div class="mec-person-body"></div>
          <div class="mec-person-arm mec-arm-left"></div>
          <div class="mec-person-arm mec-arm-right"></div>
        </div>

        <div class="mec-curtain-brand">
          <div class="mec-curtain-logo">
            <img src="https://lh3.googleusercontent.com/d/1fR8TnvOjrzVbKuro9Ths1_Jt0PAxSmGd" alt="Myanmar Elite Connect">
          </div>
          <div>Myanmar <span>Elite</span> Connect</div>
        </div>
      </div>`;

    const style = document.createElement("style");
    style.id = "mecRoyalCurtainStyle";
    style.textContent = `
      #mecRoyalCurtain{position:fixed;inset:0;z-index:2147483000;pointer-events:none;opacity:1;background:#071a34;overflow:hidden}
      #mecRoyalCurtain *{box-sizing:border-box}
      .mec-curtain-stage{position:relative;width:100%;height:100%;overflow:hidden;background:radial-gradient(circle at 50% 44%,#173b62 0,#071a34 62%,#030d1d 100%)}
      .mec-curtain-backdrop{position:absolute;inset:0;background:radial-gradient(circle at 50% 40%,rgba(244,217,138,.24),transparent 28%),linear-gradient(180deg,rgba(255,255,255,.04),transparent 55%),repeating-linear-gradient(90deg,rgba(216,180,92,.035) 0 2px,transparent 2px 55px)}
      .mec-curtain-stage:after{content:"";position:absolute;left:50%;bottom:0;transform:translateX(-50%);width:min(900px,90vw);height:55%;background:radial-gradient(ellipse at center bottom,rgba(216,180,92,.18),transparent 67%);pointer-events:none}
      .mec-curtain-left,.mec-curtain-right{position:absolute;top:-3%;width:53%;height:106%;z-index:4;background:linear-gradient(90deg,#3b0719 0,#73142b 18%,#4b0a20 36%,#8e2336 53%,#4c091f 72%,#250513 100%);box-shadow:inset 0 0 55px rgba(0,0,0,.38),inset 0 0 0 2px rgba(244,217,138,.14);transition:transform 1.15s cubic-bezier(.76,0,.18,1)}
      .mec-curtain-left{left:0;transform-origin:left center;border-right:2px solid rgba(244,217,138,.38)}
      .mec-curtain-right{right:0;transform-origin:right center;border-left:2px solid rgba(244,217,138,.38)}
      .mec-curtain-left:after,.mec-curtain-right:after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(90deg,rgba(255,255,255,.04) 0 10px,rgba(0,0,0,.12) 10px 25px);mix-blend-mode:screen}
      .mec-royal-person{position:absolute;z-index:6;bottom:8%;width:100px;height:260px;filter:drop-shadow(0 16px 18px rgba(0,0,0,.35));transition:transform 1.15s cubic-bezier(.76,0,.18,1),opacity .8s ease}
      .mec-person-left{left:calc(50% - 102px)}
      .mec-person-right{right:calc(50% - 102px)}
      .mec-person-head{position:absolute;left:35px;top:40px;width:31px;height:38px;border-radius:50% 50% 44% 44%;background:linear-gradient(135deg,#d9a77a,#8e533a);box-shadow:inset -4px -4px 7px rgba(0,0,0,.18)}
      .mec-person-crown{position:absolute;left:31px;top:25px;width:40px;height:23px;background:linear-gradient(135deg,#f4d98a,#b98b32);clip-path:polygon(0 100%,8% 20%,30% 58%,50% 0,70% 58%,92% 20%,100% 100%);filter:drop-shadow(0 2px 3px rgba(0,0,0,.35))}
      .mec-person-body{position:absolute;left:21px;top:76px;width:59px;height:135px;border-radius:28px 28px 8px 8px;background:linear-gradient(110deg,#f4d98a 0 12%,#7e1730 12% 88%,#d8b45c 88%);border:1px solid rgba(244,217,138,.55)}
      .mec-person-body:after{content:"";position:absolute;left:13px;top:8px;width:33px;height:105px;border-left:1px solid rgba(255,255,255,.25);border-right:1px solid rgba(0,0,0,.18)}
      .mec-person-arm{position:absolute;top:91px;width:17px;height:93px;border-radius:12px;background:linear-gradient(90deg,#a7684a,#e0ad7c);transform-origin:top center}
      .mec-person-left .mec-arm-right{right:11px;transform:rotate(-38deg)}
      .mec-person-right .mec-arm-left{left:11px;transform:rotate(38deg)}
      .mec-person-left .mec-arm-left,.mec-person-right .mec-arm-right{display:none}
      .mec-curtain-brand{position:absolute;z-index:7;left:50%;top:38%;transform:translate(-50%,-50%);text-align:center;color:#fff;font:800 15px/1.3 Inter,"Noto Sans Myanmar",system-ui,sans-serif;letter-spacing:.2px;opacity:.96;transition:opacity .45s ease,transform .7s ease}
      .mec-curtain-brand span{color:#f4d98a}
      .mec-curtain-logo{width:78px;height:78px;margin:0 auto 13px;border:1px solid rgba(244,217,138,.65);border-radius:22px;background:rgba(255,255,255,.08);display:grid;place-items:center;box-shadow:0 0 40px rgba(216,180,92,.18)}
      .mec-curtain-logo img{width:74%;height:74%;object-fit:contain}
      #mecRoyalCurtain.mec-opening .mec-curtain-left{transform:translateX(-92%)}
      #mecRoyalCurtain.mec-opening .mec-curtain-right{transform:translateX(92%)}
      #mecRoyalCurtain.mec-opening .mec-person-left{transform:translateX(-48vw);opacity:0}
      #mecRoyalCurtain.mec-opening .mec-person-right{transform:translateX(48vw);opacity:0}
      #mecRoyalCurtain.mec-opening .mec-curtain-brand{opacity:0;transform:translate(-50%,-50%) scale(.96)}
      #mecRoyalCurtain.mec-closing .mec-curtain-left{transform:translateX(0)}
      #mecRoyalCurtain.mec-closing .mec-curtain-right{transform:translateX(0)}
      @media(max-width:600px){.mec-royal-person{transform:scale(.72);transform-origin:bottom center}.mec-person-left{left:calc(50% - 88px)}.mec-person-right{right:calc(50% - 88px)}.mec-curtain-brand{top:36%;font-size:13px}.mec-curtain-logo{width:66px;height:66px;border-radius:19px}}
      @media(prefers-reduced-motion:reduce){#mecRoyalCurtain .mec-curtain-left,#mecRoyalCurtain .mec-curtain-right,#mecRoyalCurtain .mec-royal-person,#mecRoyalCurtain .mec-curtain-brand{transition:none!important}}
    `;
    document.head.appendChild(style);
    document.body.appendChild(overlay);
    return overlay;
  }

  function playCurtain(openImmediately) {
    const overlay = buildCurtain();
    if (!overlay) return Promise.resolve();
    overlay.classList.remove("mec-opening", "mec-closing");
    void overlay.offsetWidth;
    if (openImmediately) {
      requestAnimationFrame(() => overlay.classList.add("mec-opening"));
    }
    return new Promise(resolve => {
      setTimeout(() => {
        overlay.classList.add("mec-opening");
        setTimeout(() => {
          overlay.remove();
          const style = document.getElementById("mecRoyalCurtainStyle");
          if (style) style.remove();
          resolve();
        }, 900);
      }, openImmediately ? 80 : 30);
    });
  }

  function shouldAnimateDestination() {
    const path = (location.pathname || "").toLowerCase();
    return /(?:^|\/)index\.html$/.test(path) || /(?:^|\/)auth\.html$/.test(path);
  }

  function installNavigationHook() {
    document.addEventListener("click", function (event) {
      const link = event.target.closest && event.target.closest("a[href]");
      if (!link || link.target === "_blank" || event.defaultPrevented) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin) return;
      const target = url.pathname.toLowerCase();
      const current = location.pathname.toLowerCase();
      const isTarget = target.endsWith("/auto.html") || target.endsWith("/general.html");
      const isSource = current.endsWith("/index.html") || current.endsWith("/auth.html") || current === "/";
      if (!isTarget || !isSource) return;
      event.preventDefault();
      sessionStorage.setItem("mec_curtain_next", "1");
      const overlay = buildCurtain();
      if (!overlay) { location.href = url.href; return; }
      requestAnimationFrame(() => overlay.classList.add("mec-opening"));
      setTimeout(() => { location.href = url.href; }, 1080);
    }, true);
  }

  function init() {
    installNavigationHook();
    if (!shouldAnimateDestination()) return;
    if (sessionStorage.getItem("mec_curtain_next") === "1") {
      sessionStorage.removeItem("mec_curtain_next");
      playCurtain(true);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();

  window.MECPlayCurtainTransition = function (url) {
    const overlay = buildCurtain();
    if (!overlay) { location.href = url; return; }
    sessionStorage.setItem("mec_curtain_next", "1");
    requestAnimationFrame(() => overlay.classList.add("mec-opening"));
    setTimeout(() => { location.href = url; }, TRANSITION_MS - 300);
  };
})();
