/* =====================================================
   MYANMAR ELITE CONNECT
   GLOBAL JAVASCRIPT
===================================================== */


/* =====================================================
   MOBILE MENU
===================================================== */

function toggleMobileMenu(){

  const menu =
    document.getElementById(
      "mobileNav"
    );

  if(!menu){
    return;
  }

  menu.classList.toggle("open");

}


/* =====================================================
   CLOSE MOBILE MENU
===================================================== */

function closeMobileMenu(){

  const menu =
    document.getElementById(
      "mobileNav"
    );

  if(menu){
    menu.classList.remove("open");
  }

}


/* =====================================================
   HTML ESCAPE
===================================================== */

function escapeHtml(value){

  if(
    value === null ||
    value === undefined
  ){
    return "";
  }

  return String(value)
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");

}


/* =====================================================
   PRICE
===================================================== */

function formatPrice(
  price,
  currency="MMK"
){

  if(
    price === null ||
    price === undefined ||
    price === ""
  ){
    return "ဈေးနှုန်း မဖော်ပြပါ";
  }

  const number =
    Number(price);

  if(!Number.isFinite(number)){
    return escapeHtml(price);
  }

  return (
    number.toLocaleString("en-US")
    + " "
    + currency
  );

}


/* =====================================================
   CATEGORY NAME
===================================================== */

function categoryName(category){

  const names = {

    car:"🚗 Cars",

    property:"🏠 Property",

    gem:"💎 Gems"

  };

  return (
    names[category]
    || "📦 Listing"
  );

}


/* =====================================================
   LOCATION
===================================================== */

function getListingLocation(item){

  const parts = [];

  if(item.city){
    parts.push(item.city);
  }

  if(item.township){
    parts.push(item.township);
  }

  if(item.location){
    parts.push(item.location);
  }

  if(item.address){
    parts.push(item.address);
  }

  return [
    ...new Set(parts)
  ].join(" • ")
  || "တည်နေရာ မဖော်ပြပါ";

}


/* =====================================================
   AUTH USER
===================================================== */

async function getLoggedInUser(){

  const {
    data,
    error
  } =
  await supabaseClient
    .auth
    .getSession();

  if(error){
    throw error;
  }

  return (
    data &&
    data.session &&
    data.session.user
  )
  || null;

}


/* =====================================================
   REQUIRE LOGIN
===================================================== */

async function requireLogin(){

  const user =
    await getLoggedInUser();

  if(!user){

    window.location.href =
      "./auth.html";

    return null;

  }

  return user;

}


/* =====================================================
   LOGOUT
===================================================== */

async function logout(){

  const {
    error
  } =
  await supabaseClient
    .auth
    .signOut();

  if(error){

    alert(
      "Logout မအောင်မြင်ပါ။\n"
      + error.message
    );

    return;

  }

  window.location.href =
    "./index.html";

}


/* =====================================================
   AUTH STATE
===================================================== */

function listenAuth(){

  supabaseClient
    .auth
    .onAuthStateChange(
      function(event){

        if(
          event ===
          "SIGNED_OUT"
        ){

          window.location.href =
            "./index.html";

        }

      }
    );

}


/* =====================================================
   CURRENT PAGE
===================================================== */

function setActiveNavigation(){

  const page =
    location.pathname
      .split("/")
      .pop()
      .toLowerCase();

  document
    .querySelectorAll(
      ".main-nav a, .mobile-nav a"
    )
    .forEach(function(link){

      const href =
        link
          .getAttribute("href");

      if(!href){
        return;
      }

      const target =
        href
          .split("/")
          .pop()
          .split("?")[0]
          .toLowerCase();

      link.classList.toggle(
        "active",
        target === page
      );

    });

}


/* =====================================================
   GLOBAL START
===================================================== */

document.addEventListener(
  "DOMContentLoaded",
  function(){

    setActiveNavigation();

    listenAuth();

  }
);
