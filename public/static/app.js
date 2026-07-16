/* Jaimyon Parker — site interactivity (vanilla JS)
   Reveal animations, hero parallax, mobile nav, filmstrip drag/scroll,
   lightbox, section rail active state, custom cursor. */
(function () {
  "use strict";

  /* ---- Mobile nav ---- */
  var toggle = document.querySelector(".nav-mobile-toggle");
  var navLinks = document.querySelector(".nav-links");
  if (toggle && navLinks) {
    toggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      toggle.textContent = open ? "Close" : "Menu";
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("open");
        toggle.textContent = "Menu";
      }
    });
  }

  /* ---- Scroll reveal ---- */
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal, .reveal-clip");
  if (prefersReduced) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Hero parallax ---- */
  if (!prefersReduced) {
    var heroMedia = document.querySelector(".hero-media img");
    if (heroMedia) {
      var onScroll = function () {
        var y = window.scrollY;
        if (y < window.innerHeight) {
          heroMedia.style.transform = "translateY(" + y * 0.35 + "px) scale(" + (1 + y * 0.0004) + ")";
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
    }
  }

  /* ---- Section rail active state ---- */
  var railLinks = document.querySelectorAll(".section-rail a[data-target]");
  var sections = document.querySelectorAll("section[data-section]");
  if (railLinks.length && sections.length && "IntersectionObserver" in window) {
    var railIo = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute("data-section");
            railLinks.forEach(function (a) {
              a.classList.toggle("active", a.getAttribute("data-target") === id);
            });
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach(function (s) { railIo.observe(s); });
  }

  /* ---- Sound toggle (visual only) ---- */
  var soundBtn = document.querySelector(".hero-sound");
  if (soundBtn) {
    soundBtn.addEventListener("click", function () {
      var on = document.documentElement.getAttribute("data-sound") !== "off";
      document.documentElement.setAttribute("data-sound", on ? "off" : "on");
      var label = soundBtn.querySelector(".sound-label");
      if (label) label.textContent = "Sound " + (on ? "off" : "on");
    });
  }

  /* ---- Acting filmstrip: nav buttons + drag-to-scroll ---- */
  var rail = document.querySelector(".acting-gallery-rail");
  if (rail) {
    var prevBtn = document.querySelector('[data-rail-nav="prev"]');
    var nextBtn = document.querySelector('[data-rail-nav="next"]');

    function updateNav() {
      if (prevBtn) prevBtn.disabled = rail.scrollLeft <= 4;
      if (nextBtn) nextBtn.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4;
    }
    rail.addEventListener("scroll", updateNav, { passive: true });
    window.addEventListener("resize", updateNav);
    updateNav();

    if (prevBtn) prevBtn.addEventListener("click", function () {
      rail.scrollBy({ left: -rail.clientWidth * 0.8, behavior: "smooth" });
    });
    if (nextBtn) nextBtn.addEventListener("click", function () {
      rail.scrollBy({ left: rail.clientWidth * 0.8, behavior: "smooth" });
    });

    var down = false, startX = 0, startScroll = 0, moved = false;
    rail.addEventListener("mousedown", function (e) {
      if (e.target.closest(".frame")) return;
      down = true; moved = false;
      startX = e.pageX;
      startScroll = rail.scrollLeft;
      rail.classList.add("dragging");
    });
    window.addEventListener("mousemove", function (e) {
      if (!down) return;
      var dx = e.pageX - startX;
      if (Math.abs(dx) > 3) moved = true;
      rail.scrollLeft = startScroll - dx;
    });
    window.addEventListener("mouseup", function () {
      down = false;
      rail.classList.remove("dragging");
    });
  }

  /* ---- Lightbox ---- */
  var lightboxRoot = document.getElementById("lightbox-root");

  function buildGroup(groupName) {
    var frames = Array.prototype.slice.call(
      document.querySelectorAll('[data-lightbox="' + groupName + '"]')
    );
    return frames.map(function (frame) {
      var img = frame.querySelector("img");
      var figure = frame.closest("figure, .design-item, .series-grid > .frame-wrap");
      var kind = "", label = "";
      var figcap = frame.parentElement ? frame.parentElement.querySelector("figcaption") : null;
      if (figcap) {
        var k = figcap.querySelector(".k");
        var l = figcap.querySelector(".l");
        kind = k ? k.textContent : "";
        label = l ? l.textContent : "";
      } else {
        var series = frame.closest(".photo-series");
        if (series) {
          var t = series.querySelector(".series-head .title");
          var m = series.querySelector(".series-head .meta");
          kind = t ? t.textContent : "";
          label = m ? m.textContent : "";
        } else {
          var cap = frame.parentElement ? frame.parentElement.querySelector(".caption") : null;
          if (cap) {
            var n = cap.querySelector(".name");
            var tg = cap.querySelector(".tag");
            kind = n ? n.textContent : "";
            label = tg ? tg.textContent : "";
          }
        }
      }
      return { src: img ? img.getAttribute("src") : "", kind: kind, label: label };
    }).filter(function (it) { return it.src; });
  }

  var lbState = null;

  function renderLightbox() {
    if (!lbState) {
      lightboxRoot.innerHTML = "";
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    var item = lbState.items[lbState.idx];
    var total = lbState.items.length;
    var cur = String(lbState.idx + 1).padStart(2, "0");
    var tot = String(total).padStart(2, "0");
    lightboxRoot.innerHTML =
      '<div class="lightbox" role="dialog" aria-modal="true">' +
        '<button class="lb-close" aria-label="Close"><span>Close</span><span class="x">\u00d7</span></button>' +
        '<div class="lb-counter"><span class="cur">' + cur + '</span><span class="sep">/</span><span class="tot">' + tot + '</span></div>' +
        '<button class="lb-nav lb-prev" aria-label="Previous"' + (total < 2 ? " disabled" : "") + '>\u2190</button>' +
        '<figure class="lb-stage">' +
          '<img src="' + item.src + '" alt="' + (item.label || item.kind || "") + '" />' +
          '<figcaption>' +
            (item.kind ? '<span class="k">' + item.kind + '</span>' : "") +
            (item.label ? '<span class="l">' + item.label + '</span>' : "") +
          '</figcaption>' +
        '</figure>' +
        '<button class="lb-nav lb-next" aria-label="Next"' + (total < 2 ? " disabled" : "") + '>\u2192</button>' +
      '</div>';

    var box = lightboxRoot.querySelector(".lightbox");
    box.addEventListener("click", function (e) {
      if (e.target === box) closeLightbox();
    });
    lightboxRoot.querySelector(".lb-close").addEventListener("click", closeLightbox);
    var prev = lightboxRoot.querySelector(".lb-prev");
    var next = lightboxRoot.querySelector(".lb-next");
    if (prev) prev.addEventListener("click", function (e) { e.stopPropagation(); step(-1); });
    if (next) next.addEventListener("click", function (e) { e.stopPropagation(); step(1); });
    var stage = lightboxRoot.querySelector(".lb-stage");
    if (stage) stage.addEventListener("click", function (e) { e.stopPropagation(); });
  }

  function openLightbox(group, index) {
    var items = buildGroup(group);
    if (!items.length) return;
    lbState = { group: group, idx: Math.max(0, index), items: items };
    renderLightbox();
  }
  function closeLightbox() {
    lbState = null;
    renderLightbox();
  }
  function step(delta) {
    if (!lbState) return;
    var n = lbState.items.length;
    lbState.idx = (lbState.idx + delta + n) % n;
    renderLightbox();
  }

  document.addEventListener("click", function (e) {
    var frame = e.target.closest("[data-lightbox]");
    if (!frame) return;
    var img = frame.querySelector("img");
    if (!img) return;
    var railEl = frame.closest(".acting-gallery-rail");
    if (railEl && railEl.classList.contains("dragging")) return;
    var group = frame.getAttribute("data-lightbox");
    var groupFrames = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox="' + group + '"]'));
    var idx = groupFrames.indexOf(frame);
    e.preventDefault();
    openLightbox(group, idx);
  });

  window.addEventListener("keydown", function (e) {
    if (!lbState) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
  });

  /* ---- Custom crosshair cursor (desktop only, opt-in via data attr) ---- */
  if (window.matchMedia("(pointer: fine)").matches && document.documentElement.getAttribute("data-cursor") === "cross") {
    var crosshair = document.querySelector(".crosshair");
    if (crosshair) {
      window.addEventListener("mousemove", function (e) {
        crosshair.style.left = e.clientX + "px";
        crosshair.style.top = e.clientY + "px";
        var target = e.target;
        if (target && target.closest && target.closest("a, button, .reel, .slate-item, .contact-card, .design-item, [data-lightbox]")) {
          crosshair.classList.add("hot");
        } else {
          crosshair.classList.remove("hot");
        }
      });
    }
  }
})();
