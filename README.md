# THREADER

**Wear Your Story** — the React foundation for a premium, responsive clothing-brand landing page for men, women, and kids.

## Technology stack

- React with JavaScript and JSX
- Vite
- Custom CSS
- Framer Motion
- Swiper.js
- Lucide React

## Commands

```bash
npm install
npm run dev
npm run build
```

## Folder structure

```text
public/images/brand/       Official THREADER brand assets and favicon
public/images/categories/  Category imagery
public/images/hero/        Hero imagery
public/images/products/    Product imagery grouped by audience
public/images/promotional/ Promotional imagery
src/components/        Common, layout, and UI components
src/sections/          Landing-page sections
src/data/              Static content and configuration
src/hooks/             Reusable React hooks
src/styles/            Brand variables and global CSS foundations
src/utils/             Shared utilities
```

## Official colour palette

- Charcoal black: `#151514`
- Muted gold: `#A68D6E`
- Warm cream: `#FBF2EB`
- Soft taupe: `#D5C5B0`
- Warm grey: `#656360`
- White surface: `#FFFFFF`

All future sections and interface elements must follow the colour language of the uploaded official THREADER logo. The JPEG logo is intentionally isolated in `public/images/brand/` so it can later be replaced by a transparent PNG or SVG.

## Updating contact links

Edit `src/config/contactConfig.js` to enter your real contact details. Existing
values are samples and should be replaced before publishing.

- `whatsappNumber`: your international number, for example `+923001234567`.
  The contact card and floating WhatsApp button automatically open that chat.
- `instagramUrl`, `facebookUrl`, `tiktokUrl`: paste the full URL of your exact
  profile/page, such as `https://www.tiktok.com/@your_username`.
  Facebook is disabled until you enter a page URL.
- `email` and `phoneNumber`: your email and international phone number.
- `address`: your physical address. Set `mapsUrl` to an exact Google Maps
  place/share link if desired; otherwise Maps searches for the address.

Leave a value empty (`''`) to disable it. Contact tooltips show only the channel
name, such as **TikTok** or **WhatsApp**. Save the file to update the running
development site; rebuild when publishing.
