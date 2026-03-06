# ericgardner.info

Personal website and blog built with [VitePress](https://vitepress.dev) and
[Vue.js](https://vuejs.org). Hosted on [Netlify](https://www.netlify.com).

## Development

```sh
npm install
npm run dev      # Start dev server at localhost:5173
npm run build    # Build for production (output in .vitepress/dist/)
npm run preview  # Preview the production build locally
```

## Project Structure

```
.
├── .bin/               # CLI scripts (see below)
├── .vitepress/
│   ├── config.ts       # VitePress site config, RSS feed generation
│   └── theme/
│       ├── index.ts        # Theme entry: registers layouts & components
│       ├── style.css       # All custom styles and CSS variable overrides
│       ├── components/     # Vue components (Figure, Gallery, PageHeader)
│       ├── composables/    # Vue composables (useImageFade)
│       ├── layouts/        # CustomLayout (default), StartLayout (homepage)
│       └── utils/          # formatDate, getSorted, formatPageContentForRSS
├── data/
│   └── posts.data.ts   # VitePress content loader for blog posts
├── images/             # Source images (processed by vite-imagetools at build)
├── notes/              # Blog posts (Markdown with YAML frontmatter)
├── projects/           # Project pages
├── public/             # Static assets served as-is
├── index.md            # Homepage (uses `layout: start`)
├── about.md            # About page
└── notes.md            # Blog listing page
```

## Writing Posts

### Creating a new post

Use the scaffolding script to create a new post with frontmatter:

```sh
npm exec new "My Post Title"
```

This creates a file like `notes/my-post-title-march-2026.md` with the title and
current date pre-filled in the YAML frontmatter.

### Frontmatter

Posts use YAML frontmatter for metadata:

```yaml
---
title: "Post Title"
date: 2026-03-04T00:00:00.000Z
---
```

## Images

Source images live in the `images/` directory. They are **not** served directly
to visitors. Instead, [vite-imagetools](https://github.com/JonasKruckenberg/imagetools)
processes them at build time when they are imported with a query parameter:

```vue
<script setup>
import photo from '/images/example.jpg?w=1000';
</script>

<Figure :src="photo" alt="Description" caption="Optional caption" />
```

The `?w=1000` directive resizes the image to 1000px wide during the build.

### Auto-resizing

A git pre-commit hook automatically resizes any staged images in `images/` so
the longest edge is at most 3000px. This keeps the repository manageable without
manual intervention. The hook is installed via `npm run prepare` (runs
automatically on `npm install`).

To resize all images manually:

```sh
npm run resize
```

The `<Figure>` component renders an `<img>` inside a `<figure>` element with an
optional `<figcaption>`. The `<Gallery>` component provides a horizontally
scrolling image layout for photo-heavy posts.

## Design

The site extends the VitePress default theme with a warm, editorial aesthetic:

- **Typography**: Source Serif 4 (headings), Source Sans 3 (body), Source Code Pro (code)
- **Colors**: Warm cream/terracotta palette with both light and dark modes
- **Layout**: A CSS content grid with `content`, `feature`, `padding`, and
  `bleed` columns for flexible content widths

Custom styles override VitePress CSS variables in `style.css` rather than
modifying default theme components directly.

## License

Code is MIT-licensed. Written content and photographs are copyright Eric
Gardner and all rights reserved. See LICENSE file for details.

## RSS Feed

An RSS feed is generated at build time (`feed.rss` in the output directory).
The `transformHtml` and `buildEnd` hooks in `config.ts` use the
[feed](https://www.npmjs.com/package/feed) package and
[cheerio](https://cheerio.js.org) to produce the feed with fully-qualified
image URLs.
