# Carvalho & Roth Orthodontics — Google Ads landing page

Rebuild of `https://smilehub.bracesonline.com/best-offer` as a fast, mobile-first PPC landing page.
Plain HTML, CSS and vanilla JavaScript. No build step: open `index.html` or serve the folder from any static web server.

```
index.html
assets/css/styles.css
assets/js/main.js
assets/images/   (optimized WebP + JPEG/PNG fallbacks, favicon)
```

## Wiring the "Book Complimentary Consultation" CTA

The current landing page opens its lead form in a SmileHub popup. This page reproduces that behaviour with an
accessible modal, and every booking CTA (`[data-conversion="booking"]`) opens it. Choose one of:

1. **Popup form (matches the current page):** paste the SmileHub form embed code inside
   `<div id="booking-embed">` in `index.html`. The phone/email fallback inside the modal hides automatically.
2. **Direct link:** add `data-booking-url="https://…"` to the `<body>` tag. Every booking CTA becomes a plain link
   to that URL and the modal is bypassed.

## Tracking hooks

Conversion elements carry stable IDs and `data-conversion` attributes:

| Element | ID | data-conversion |
| --- | --- | --- |
| Header booking / phone | `header-book-consultation`, `header-phone` | booking / phone |
| Hero booking / phone | `hero-book-consultation`, `hero-phone` | booking / phone |
| Mid-page booking / phone | `mid-book-consultation`, `mid-phone` | booking / phone |
| Contact block phone / email | `contact-phone`, `contact-email` | phone / email |
| Final booking / phone | `final-book-consultation`, `final-phone` | booking / phone |
| Sticky mobile bar | `sticky-book-consultation`, `sticky-phone` | booking / phone |
| Modal fallback | `modal-phone`, `modal-email` | phone / email |

GTM / Google Ads script placeholders are marked with comments in `<head>` and right after `<body>`.
No conversion IDs are included.

## Content sources

The live source page could not be fetched from the build environment (outbound access to
`smilehub.bracesonline.com` and `bracesonline.com` is blocked by network policy). Content was taken only from:

- The practice's own SmileHub landing page screenshots in the agency Google Drive
  (`Carvalho and Roth Orthodontics / Landing Page / LP 1–3.png`): doctor names, credentials and bios (verbatim),
  both testimonials (verbatim, no names or star ratings were shown),
  email `info@bracesonline.com`, all four office addresses, "Massachusetts' Favorite Orthodontists",
  "Schedule A Visit With Your … Orthodontists Today!" and its supporting sentence.
- The practice website's airway orthodontics page and FAQ page (`bracesonline.com`), for the airway
  explanation, signs, treatment approaches, "why families trust us" wording, the complimentary first visit,
  0% interest plans and the FAQ answers.
- Brand guideline PDF (`Carvalho Roth Ortho - Brand Guideline.pdf`): colors `#2d9684`, `#9acdc3`, `#c9e1ed`,
  `#1e1e1e`, `#ffffff`; fonts Trocchi (display) and Helvetica (body).
- Photos from the client's Drive `Pictures` folder (doctors, patients, Northborough office) and `Logo Files`.

The phone number `508-684-2266` was supplied by the client team for this page. Items to confirm against the
live page before launch: the email (the main website lists `info@carortho.com`; the landing page used
`info@bracesonline.com`), and whether the live page still shows the earlier "$500 Off Invisalign or Braces + Free Teeth Whitening" offer,
which was deliberately left out because it could not be verified.
