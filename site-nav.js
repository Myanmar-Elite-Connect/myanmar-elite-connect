/* Myanmar Elite Connect — one shared bottom navigation */
(function(){
  'use strict';

  const targetPages = new Set([
    'general.html',
    'buy.html',
    'sell.html',
    'listing.html',
    'profile.html',
    'car.html',
    'gem.html',
    'property.html',
    'feedback.html',
    'allmarket.html'
  ]);

  const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (!targetPages.has(current)) return;
  if (document.getElementById('mec-global-nav')) return;

  /* Remove/hide page-specific mobile navigation so there is exactly one
     shared navigation on the requested pages. */
  const removeExistingNav = () => {
    document.querySelectorAll(
      '.mobile-nav, .bottom-nav, .bottom-navigation, .site-bottom-nav, #bottomNav'
    ).forEach(el => el.remove());
  };

  removeExistingNav();

  const items = [
    ['general.html', '⌂', 'Home'],
    ['add-listing.html', '＋', 'Add Listing'],
    ['chat.html', '♡', 'Chat'],
    ['profile.html', '♙', 'Profile']
  ];

  const nav = document.createElement('nav');
  nav.id = 'mec-global-nav';
  nav.setAttribute('aria-label', 'Mobile navigation');
  nav.innerHTML = items.map(([href, icon, label]) => `
    <a href="./${href}" class="${current === href ? 'active' : ''}">
      <div class="mec-nav-icon">${icon}</div>
      <span>${label}</span>
    </a>
  `).join('');

  const style = document.createElement('style');
  style.textContent = `
    #mec-global-nav{
      position:fixed;
      left:50%;
      bottom:max(10px,env(safe-area-inset-bottom));
      transform:translateX(-50%);
      z-index:99999;
      width:min(560px,calc(100% - 20px));
      min-height:68px;
      padding:7px;
      display:grid;
      grid-template-columns:repeat(4,1fr);
      gap:5px;
      background:color-mix(in srgb,var(--surface,#fff) 94%,transparent);
      border:1px solid var(--border,rgba(16,35,63,.09));
      border-radius:20px;
      box-shadow:0 14px 45px rgba(13,35,64,.16);
      backdrop-filter:blur(18px);
      -webkit-backdrop-filter:blur(18px);
      padding-bottom:max(7px,env(safe-area-inset-bottom));
    }

    #mec-global-nav a{
      min-width:0;
      min-height:52px;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      gap:3px;
      border-radius:14px;
      color:var(--muted,#718097);
      text-decoration:none;
      font-size:9px;
      font-weight:900;
      -webkit-tap-highlight-color:transparent;
      transition:transform .18s ease,color .18s ease,background .18s ease;
    }

    #mec-global-nav .mec-nav-icon{
      width:28px;
      height:28px;
      display:grid;
      place-items:center;
      font-size:19px;
      line-height:1;
    }

    #mec-global-nav a.active{
      color:var(--gold,#d8b45c);
      background:rgba(216,180,92,.11);
    }

    #mec-global-nav a:active{
      transform:scale(.96);
    }

    body{
      padding-bottom:100px!important;
    }

    @media(min-width:760px){
      #mec-global-nav{
        bottom:18px;
        min-height:60px;
        width:min(560px,calc(100% - 40px));
      }
      #mec-global-nav a{
        flex-direction:row;
        gap:7px;
        min-height:44px;
        font-size:10px;
      }
    }
  `;

  const mount = () => {
    removeExistingNav();
    document.head.appendChild(style);
    document.body.appendChild(nav);
  };

  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount, {once:true});
})();
