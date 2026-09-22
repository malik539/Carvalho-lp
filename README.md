# Carvalho & Roth Orthodontics — Google Ads landing page

Rebuild of `https://smilehub.bracesonline.com/best-offer` as a fast, mobile-first PPC landing page.
Plain HTML, CSS and vanilla JavaScript. No build step: open `index.html` or serve the folder from any static web server.

```
index.html
assets/css/styles.css
assets/js/main.js
assets/images/   (optimized WebP + JPEG/PNG fallbacks, favicon)
```

## Wiring the lead form and booking CTAs

The source page uses a lead form with First Name, Last Name, Email, Phone, Location Preference and a consent
checkbox. This page has two copies of that form with exactly those fields: one in the booking popup (opened
by every "Book Complimentary Consultation" CTA) and one inline in the final section at the bottom of the page.

1. **Connect the forms:** set `data-form-action="https://…"` on both `<form id="lead-form">` and
   `<form id="lead-form-modal">` to the SmileHub endpoint. Until it is set, submitting shows a phone
   fallback instead of pretending to succeed.
2. To send the CTAs to an external URL instead of opening the popup, add `data-booking-url="https://…"`
   to the `<body>` tag. Without JavaScript the CTAs fall back to the inline form.
3. The source page shows a practice video. Add the embed where it fits once the file is available.

## Tracking hooks

Conversion elements carry stable IDs and `data-conversion` attributes:

| Element | ID | data-conversion |
| --- | --- | --- |
| Header booking / phone | `header-book-consultation`, `header-phone` | booking / phone |
| Hero booking (mobile) / phone | `hero-book-consultation`, `hero-phone` | booking / phone |
| Lead form submit (inline / popup) | `form-submit`, `form-submit-modal` | form-submit |
| Airway section booking | `airway-book-consultation` | booking |
| Mid-page booking / phone | `mid-book-consultation`, `mid-phone` | booking / phone |
| Contact block phone / email | `contact-phone`, `contact-email` | phone / email |
| Final booking / phone | `final-book-consultation`, `final-phone` | booking / phone |
| Sticky mobile bar | `sticky-book-consultation`, `sticky-phone` | booking / phone |

GTM / Google Ads script placeholders are marked with comments in `<head>` and right after `<body>`.
No conversion IDs are included.

## Content sources

All copy comes from the airway-campaign landing page export supplied by the client team
(`Carvalho & Roth Orthodontics.md`): headline, subhead, form fields and consent text, About the Practice,
What Is Airway Orthodontics, Why Families Trust Us, the "Level Up Your Smile Today!" CTA, all three doctor
bios, the five FAQ questions, both named reviews, phone `508-684-2266`, email `info@bracesonline.com`,
the four office addresses and their map images. Dr. Evers' portrait and the tired-child image are from
the same export; the Dr. Carvalho, Dr. Roth and three-doctor hero photos were supplied separately.

Brand colors and fonts come from the practice brand guideline PDF (`#2d9684`, `#9acdc3`, `#c9e1ed`,
`#1e1e1e`, `#ffffff`; Trocchi and Helvetica). Logo files come from the client's Drive.

**To confirm before launch:** the export contained the five FAQ questions but not their answers, so the
answers on this page were written only from sentences elsewhere on the same page. Replace them with the
live page's answers if they differ.
