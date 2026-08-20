/* Myanmar Elite Connect — global helpers */
function toggleMobileMenu(){const m=document.getElementById('mobileNav');if(m)m.classList.toggle('open')}
function closeMobileMenu(){const m=document.getElementById('mobileNav');if(m)m.classList.remove('open')}
function escapeHtml(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
function formatPrice(price,currency='MMK'){if(price===null||price===undefined||price==='')return 'ဈေးနှုန်း မဖော်ပြပါ';const n=Number(price);return Number.isFinite(n)?n.toLocaleString('en-US')+' '+currency:escapeHtml(price)}
function categoryName(category){return({car:'🚗 Cars',property:'🏠 Property',gem:'💎 Gems'})[category]||'📦 Listing'}
function getListingLocation(item){return [...new Set([item?.city,item?.township,item?.location,item?.address].filter(Boolean))].join(' • ')||'တည်နေရာ မဖော်ပြပါ'}
async function getLoggedInUser(){const {data,error}=await supabaseClient.auth.getSession();if(error)throw error;return data?.session?.user||null}
async function requireLogin(){const u=await getLoggedInUser();if(!u){location.href='./auth.html';return null}return u}
async function logout(){const {error}=await supabaseClient.auth.signOut();if(error){alert('Logout မအောင်မြင်ပါ။\n'+error.message);return}location.href='./index.html'}
function listenAuth(){supabaseClient.auth.onAuthStateChange(event=>{if(event==='SIGNED_OUT')location.href='./index.html'})}
function setActiveNavigation(){const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();document.querySelectorAll('.main-nav a,.mobile-nav a').forEach(link=>{const href=link.getAttribute('href');if(!href)return;const target=href.split('/').pop().split('?')[0].toLowerCase();link.classList.toggle('active',target===page)})}
function loadSharedNavigation(){if(document.querySelector('script[data-mec-nav]')||document.getElementById('mec-global-nav'))return;const s=document.createElement('script');s.src='./site-nav.js';s.dataset.mecNav='1';document.head.appendChild(s)}
document.addEventListener('DOMContentLoaded',()=>{setActiveNavigation();listenAuth();loadSharedNavigation()});
