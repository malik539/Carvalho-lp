/* Carvalho & Roth Orthodontics — landing page interactions (vanilla JS, no dependencies) */
(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
     Booking CTAs → scroll to the lead form (same behaviour as the source
     page, where "Book Complimentary Consultation" leads to the form).
     Set data-booking-url on <body> to send every booking CTA to a URL instead.
     ------------------------------------------------------------------ */
  var form = document.getElementById('lead-form');
  var bookingUrl = (document.body.getAttribute('data-booking-url') || '').trim();
  var bookingLinks = document.querySelectorAll('[data-conversion="booking"]');

  Array.prototype.forEach.call(bookingLinks, function (a) {
    if (bookingUrl) { a.setAttribute('href', bookingUrl); return; }
    if (!form) return;
    a.addEventListener('click', function (e) {
      e.preventDefault();
      form.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      var first = form.querySelector('input, select');
      if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, reduceMotion ? 0 : 450);
    });
  });

  /* ------------------------------------------------------------------
     Lead form
     The source page submits to SmileHub. Put that endpoint in
     data-form-action on the <form>; until it is set, the form does not
     pretend to submit and instead shows the phone fallback.
     ------------------------------------------------------------------ */
  if (form) {
    var notice = document.getElementById('form-notice');
    form.addEventListener('submit', function (e) {
      var action = (form.getAttribute('data-form-action') || '').trim();
      if (action) { form.setAttribute('action', action); return; }
      e.preventDefault();
      if (notice) { notice.setAttribute('data-show', 'true'); notice.focus(); }
    });
  }

  /* ------------------------------------------------------------------
     FAQ accordion (accessible: button + aria-expanded + region)
     ------------------------------------------------------------------ */
  var faqButtons = document.querySelectorAll('.faq__btn');
  Array.prototype.forEach.call(faqButtons, function (btn) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    var open = btn.getAttribute('aria-expanded') === 'true';
    panel.setAttribute('data-open', open ? 'true' : 'false');
    panel.hidden = !open;

    btn.addEventListener('click', function () {
      setPanel(btn, panel, btn.getAttribute('aria-expanded') !== 'true');
    });

    btn.addEventListener('keydown', function (e) {
      var list = Array.prototype.slice.call(faqButtons);
      var i = list.indexOf(btn);
      if (e.key === 'ArrowDown') { e.preventDefault(); list[(i + 1) % list.length].focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); list[(i - 1 + list.length) % list.length].focus(); }
      if (e.key === 'Home') { e.preventDefault(); list[0].focus(); }
      if (e.key === 'End') { e.preventDefault(); list[list.length - 1].focus(); }
    });
  });

  function setPanel(btn, panel, open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) {
      panel.hidden = false;
      requestAnimationFrame(function () { panel.setAttribute('data-open', 'true'); });
    } else {
      panel.setAttribute('data-open', 'false');
      if (reduceMotion) { panel.hidden = true; }
      else {
        var onEnd = function () { if (btn.getAttribute('aria-expanded') === 'false') panel.hidden = true; panel.removeEventListener('transitionend', onEnd); };
        panel.addEventListener('transitionend', onEnd);
        setTimeout(onEnd, 350);
      }
    }
  }

  /* ------------------------------------------------------------------
     Subtle reveal on scroll (disabled for reduced motion)
     ------------------------------------------------------------------ */
  var revealEls = document.querySelectorAll('.reveal');
  if (!reduceMotion && 'IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    Array.prototype.forEach.call(revealEls, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(revealEls, function (el) { el.classList.add('is-visible'); });
  }

  /* ------------------------------------------------------------------
     Sticky mobile CTA: hide while the lead form or the final CTA is in
     view so the bar never covers its own conversion controls.
     ------------------------------------------------------------------ */
  var sticky = document.getElementById('sticky-cta');
  if (sticky && 'IntersectionObserver' in window) {
    var watched = [form, document.getElementById('final-cta')].filter(Boolean);
    var visible = {};
    var stickyIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { visible[entry.target.id] = entry.isIntersecting; });
      var anyVisible = Object.keys(visible).some(function (k) { return visible[k]; });
      if (anyVisible) sticky.setAttribute('data-hidden', 'true'); else sticky.removeAttribute('data-hidden');
    }, { threshold: 0.25 });
    watched.forEach(function (el) { stickyIo.observe(el); });
  }
})();
