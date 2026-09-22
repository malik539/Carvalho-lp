/* Carvalho & Roth Orthodontics — landing page interactions (vanilla JS, no dependencies) */
(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
     Booking CTAs → open the booking popup (lead form).
     Set data-booking-url on <body> to send every booking CTA to a URL instead.
     Without JS the CTAs fall back to the inline form at #lead-form.
     ------------------------------------------------------------------ */
  var modal = document.getElementById('booking-modal');
  var bookingUrl = (document.body.getAttribute('data-booking-url') || '').trim();
  var bookingLinks = document.querySelectorAll('[data-conversion="booking"]');
  var lastFocused = null;

  Array.prototype.forEach.call(bookingLinks, function (a) {
    if (bookingUrl) { a.setAttribute('href', bookingUrl); a.removeAttribute('aria-haspopup'); return; }
    if (!modal) return;
    a.addEventListener('click', function (e) { e.preventDefault(); openModal(); });
  });

  function focusableIn(el) {
    return el.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea, [tabindex]:not([tabindex="-1"])');
  }

  function openModal() {
    lastFocused = document.activeElement;
    modal.setAttribute('data-open', 'true');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var sticky = document.getElementById('sticky-cta');
    if (sticky) sticky.setAttribute('data-hidden', 'true');
    var first = modal.querySelector('input, select');
    if (first) setTimeout(function () { first.focus(); }, 50);
    document.addEventListener('keydown', onModalKey);
  }

  function closeModal() {
    modal.setAttribute('data-open', 'false');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    var sticky = document.getElementById('sticky-cta');
    if (sticky) sticky.removeAttribute('data-hidden');
    document.removeEventListener('keydown', onModalKey);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function onModalKey(e) {
    if (e.key === 'Escape') { closeModal(); return; }
    if (e.key !== 'Tab') return;
    var items = focusableIn(modal);
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  if (modal) {
    Array.prototype.forEach.call(modal.querySelectorAll('[data-modal-close]'), function (el) {
      el.addEventListener('click', closeModal);
    });
  }

  /* ------------------------------------------------------------------
     Lead forms (popup + inline). The source page submits to SmileHub.
     Put that endpoint in data-form-action on each <form>; until it is set,
     the form does not pretend to submit and shows the phone fallback.
     ------------------------------------------------------------------ */
  Array.prototype.forEach.call(document.querySelectorAll('form.lead-form'), function (form) {
    var notice = form.querySelector('.form-notice');
    form.addEventListener('submit', function (e) {
      var action = (form.getAttribute('data-form-action') || '').trim();
      if (action) { form.setAttribute('action', action); return; }
      e.preventDefault();
      if (notice) { notice.setAttribute('data-show', 'true'); notice.focus(); }
    });
  });

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
     Sticky mobile CTA: hide while the final section (with the inline
     form) is in view so the bar never covers its own controls.
     ------------------------------------------------------------------ */
  var sticky = document.getElementById('sticky-cta');
  var finalCta = document.getElementById('final-cta');
  if (sticky && finalCta && 'IntersectionObserver' in window) {
    var stickyIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (modal && modal.getAttribute('data-open') === 'true') return;
        if (entry.isIntersecting) sticky.setAttribute('data-hidden', 'true');
        else sticky.removeAttribute('data-hidden');
      });
    }, { threshold: 0.2 });
    stickyIo.observe(finalCta);
  }
})();
