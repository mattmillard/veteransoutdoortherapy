# Content migration manifest

Source audited August 6, 2026: `https://veteransoutdoortherapy.org`

## Migrated collections

- 24 page sitemap entries reviewed
- 14 product sitemap entries represented, including all 9 merchandise products and 4 sponsorship levels
- Merchandise prices, descriptions, options, stock where available, and primary product images captured
- Mission, team, current adventures, sponsorships, contact details, testimonial, raffle, poker run, and Wilderness to Wellness content captured
- All 138 unique full-size gallery assets recovered from the rendered gallery and retained from the original WordPress uploads

## URL handling

Legacy routes are mapped in `next.config.ts`. Utility pages such as WooCommerce account and checkout are replaced by native application routes. The unfinished `banquet-2026` Divi demo content is intentionally redirected to the real Wilderness to Wellness event.

## Media hosting

The migrated pages currently reference the original full-size WordPress uploads so every gallery and product asset is represented without recompression. Before retiring WordPress hosting, upload these assets through the admin panel or bulk-copy them to persistent object storage and update the catalog URLs.