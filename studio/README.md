# Sanity Clean Content Studio

Congratulations, you have now installed the Sanity Content Studio, an open-source real-time content editing environment connected to the Sanity backend.

Now you can do the following things:

- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the Sanity community](https://www.sanity.io/community/join?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)

## Alfa Holidays rebrand: content migration

The schema types were renamed (`service` → `holiday`, `servicesPage` → `ourServicesPage`,
`digitalFootprintPage` → `travelStoriesPage`, `footprintPost` → `travelStory`, `digestPage` → `travelGuidePage`) and several fields
were renamed on `home`, `footer`, `contact` and `holiday`. Existing documents in the dataset keep
their old names until you run the migration:

```bash
npx sanity dataset export production backup.tar.gz          # backup first
npx sanity exec scripts/migrate-rebrand.js --with-user-token            # dry run
npx sanity exec scripts/migrate-rebrand.js --with-user-token -- --commit # apply
```

The migration also turns each post's text category into a reference to a new `category` document
("Honeymoon Ideas", "Travel Tips", ...). From then on, categories are managed under
"Travel Guide categories" in Studio, or created directly from a post's Category field. If your
Sanity webhook filters by document type, add `category` to it so edits go live instantly.

## "Explore Holidays" → "Our Services" migration

The `exploreHolidaysPage` singleton is now `ourServicesPage`, the `holiday` package type is now
`service`, and the page lives at `/our-services` (old `/explore-holidays` URLs redirect there).
Move the existing content once:

```bash
npx sanity dataset export production backup.tar.gz
npx sanity exec scripts/migrate-our-services.js --with-user-token            # dry run
npx sanity exec scripts/migrate-our-services.js --with-user-token -- --commit # apply
```

If your Sanity webhook filters by document type, replace `holiday` / `exploreHolidaysPage` with
`service` / `ourServicesPage` in it.

For a brand-new dataset, `seed/holidays.ndjson` contains placeholder Alfa Holidays content:
`npx sanity dataset import seed/holidays.ndjson production`.
After the migration, rebuild/redeploy the Studio (`npm run build`, `npm run deploy`).
