const MEDIA_BASE_URL = "https://www.asrarshow.com/";

for (i = 100; i > -1; i--) {
  window.clearInterval(i);
  window.clearTimeout(i);
}

(function () {
  const lang = getCookie("00f00x-lang-cookie");
  const body = document.querySelector("body");
  if (body) {
    body.classList.add(lang);
  }
})();

$(document).ready(function () {
  // showFloatingNavigation();
  // initMobileMenu();
  initScrollUp();
  new WOW().init();
  // setTimeout(() => {
  //   initOpenSearchMenu();
  //   initCloseSearchMenu();
  //   disableAnchorReload();
  // }, 1500);

  var x = window.matchMedia("(max-width: 991px)")
  hideTabs(x) // Call listener function at run time
  x.addListener(hideTabs) // Attach listener function on state changes
});



function showFloatingNavigation() {
  $(window).scroll(function () {
    if (window.scrollY > 200) {
      $(".nav-menu").addClass("sticky");
    } else {
      $(".nav-menu").removeClass("sticky");
    }
  });
}

function initMobileMenu() {
  document.querySelector(".mobile-menu").addEventListener("click", (e) => {
    e.preventDefault();
    let s = document.querySelectorAll(".navbar");
    if (s) {
      if ($(s).hasClass("loaded")) {
        $(s).removeClass("loaded");
        $("body").css("overflow", "hidden auto");
      } else {
        $(s).addClass("loaded");
        $("body").css("overflow", "hidden");
      }
    }
  });
}

function initMobileMenuItems() {
  let l = document.querySelectorAll(".navigation-wrapper .nav-item .nav-link");
  l.forEach((v, k) => {
    v.addEventListener("click", function (e) {
      e.preventDefault();
      closeMobileMenu();
    });
  });
}

function closeMobileMenu() {
  let m = document.querySelector(".collapse.navbar-collapse.loaded");
  if (m) {
    $(m).removeClass("loaded");
    $("body").css("overflow", "hidden auto");
  }
}

function initScrollUp() {
  let s = document.querySelector(".scroll-up");
  if (s) {
    s.addEventListener("click", function (e) {
      e.preventDefault();
      document.documentElement.scrollTop = 0;
    });
  }

  $(window).scroll(function () {
    if (window.scrollY > 300) {
      $(".scroll-up").addClass("loaded");
      $(".mobile-menu").addClass("loaded");
    } else {
      $(".scroll-up").removeClass("loaded");
      $(".mobile-menu").removeClass("loaded");
    }
  });
}

function getCookie(name) {
  // Split cookie string and get all individual name=value pairs in an array
  var cookieArr = document.cookie.split(";");
  // Loop through the array elements
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");
    /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
    if (name == cookiePair[0].trim()) {
      // Decode the cookie value and return
      return decodeURIComponent(cookiePair[1]);
    }
  }
  // Return null if not found
  return null;
}

function initOpenSearchMenu() {
  let b = document.querySelector(".search-menu-btn");
  if (b) {
    b.addEventListener("click", function (e) {
      e.preventDefault();
      let m = document.querySelector(".search-menu");
      if (m) {
        $(m).addClass("loaded");
      }
    });
  }
}

function initCloseSearchMenu() {
  let c = document.querySelector(".close-search-menu");
  if (c) {
    c.addEventListener("click", function (e) {
      e.preventDefault();
      let m = document.querySelector(".search-menu");
      if (m) {
        $(m).removeClass("loaded");
      }
    });
  }
}

function downloadDocument(filename, textInput) {
  var element = document.createElement("a");
  element.setAttribute("href", `${textInput}`);
  element.setAttribute("target", "_blank");
  element.setAttribute("download", filename);
  document.body.appendChild(element);
  element.click();
}

function disableAnchorReload() {
  $('a[href=""]').click(function (e) {
    e.preventDefault();
  });
}

function hideTabs(x) {
  try{
    if (x.matches) { 
      $(".package-content").addClass("d-none");
      $(".package-1").removeClass("d-none");
      $(".package-tab").removeClass("tab-active");
      $(".package-tab-1").addClass("tab-active");
    } else {
      $(".package-content").removeClass("d-none");
    }
  }
  catch(e){

  }
 
}