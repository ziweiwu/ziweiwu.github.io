# Project Agent Instructions

This file provides context for AI coding agents (Claude, Gemini, etc.) working on this project.

## Project Overview

Personal blog for Ziwei Wu, hosted at https://ziweiwu.github.io. Built with Astro 5.x, deployed via GitHub Actions to GitHub Pages.

## Tech Stack

- **Framework:** Astro 5 (static site generator)
- **Content:** Markdown files in `src/content/blog/`
- **Styling:** Plain CSS in `src/styles/global.css` (no Tailwind, no CSS framework)
- **Fonts:** "Helvetica Neue", Helvetica, Arial, sans-serif (body); DejaVu Sans Mono (code)
- **Deployment:** GitHub Actions → GitHub Pages (workflow in `.github/workflows/deploy.yml`)
- **Testing:** Vitest + Cheerio (tests run against built `dist/` output, no browser needed)
- **Package manager:** npm

## Project Structure

```
src/
  content/blog/     # Markdown blog posts (this is where content lives)
  components/       # Astro components (Header, Footer, BaseHead, etc.)
  layouts/          # BlogPost.astro (layout for individual posts)
  pages/            # Route pages (index.astro = blog list, about.astro, blog/[...slug].astro)
  styles/           # global.css
  consts.ts         # Site title and description
  content.config.ts # Content collection schema (frontmatter validation)
public/
  fonts/            # DejaVu Sans Mono woff files
  images/           # All blog images stored locally (no external image URLs)
tests/
  build.test.ts           # dist/ exists, all pages generated, static assets copied
  content.test.ts         # Frontmatter validation, non-empty body on all posts
  html-structure.test.ts  # Meta tags, SEO, nav links, year grouping, post structure
  images.test.ts          # Every image ref in markdown resolves to a file in public/
  rss.test.ts             # Valid XML, correct title/link, all posts have items
  links.test.ts           # All internal <a href> in built HTML resolve to real files
vitest.config.ts          # Vitest configuration
```

## Commands

- `npm run dev` — Start dev server (localhost:4321)
- `npm run build` — Build static site to `dist/`
- `npm run preview` — Preview built site locally
- `npm test` — Build and run all tests (use for CI and verification)
- `npm run test:only` — Run tests against existing `dist/` (skip rebuild)

## Blog Post Format

Posts are markdown files in `src/content/blog/`. Required frontmatter:

```markdown
---
title: 'Post title'
description: 'Short description'
pubDate: 'Mon DD YYYY'       # e.g. 'Feb 17 2026'
updatedDate: 'Mon DD YYYY'   # optional
---
```

The content collection schema is defined in `src/content.config.ts`. The `pubDate` field is coerced to a Date object. Posts are sorted newest-first on the index page, grouped by year.

## Design Principles

- **Minimal styling.** No gradients, shadows, cards, or decorative elements. Content-focused.
- **No hero images** on posts or the index page. The blog list is a simple date + title per line.
- **Font size:** 14px base, matching the original Jekyll site's Helvetica Neue styling.
- **Square list markers** (`list-style-type: square`), matching the original site.
- **All images must be stored locally** in `public/images/`. Never reference external image URLs in blog posts.

## Adding a New Post

1. Create `src/content/blog/your-post-slug.md` with the required frontmatter above
2. Place any images in `public/images/blog/` and reference as `/images/blog/filename.png`
3. Commit and push to `master` — GitHub Actions deploys automatically

## Key Files to Know

| File | Purpose |
|---|---|
| `src/pages/index.astro` | Homepage — blog post list grouped by year |
| `src/pages/blog/[...slug].astro` | Dynamic route for individual blog posts |
| `src/layouts/BlogPost.astro` | Layout wrapper for post pages |
| `src/styles/global.css` | All styling (single file, no preprocessor) |
| `src/consts.ts` | `SITE_TITLE` and `SITE_DESCRIPTION` |
| `src/content.config.ts` | Zod schema for blog post frontmatter |
| `astro.config.mjs` | Astro config (site URL, MDX, sitemap integrations) |
| `.github/workflows/deploy.yml` | GitHub Actions deployment workflow |

## Testing

Tests run against the built `dist/` output using Vitest and Cheerio (no Playwright/browser needed since the site has zero client-side JS).

- `npm test` — full build + test suite (use for CI and before committing)
- `npm run test:only` — run tests against existing `dist/` (skip rebuild, faster iteration)

**Test coverage:**
- **build** — dist/ exists, all pages generated, static assets (favicon, fonts, sitemap) copied
- **content** — every markdown post has valid frontmatter (title, description, pubDate) and non-empty body
- **html-structure** — meta tags, OG tags, nav links, year-grouped headings, post page structure
- **images** — every image reference in markdown resolves to a local file in `public/`
- **rss** — valid XML, correct channel title/link, all posts present with required fields
- **links** — every internal `<a href>` in built HTML resolves to a real file in `dist/`

**CI integration:** Tests run in GitHub Actions between the build and deploy steps. If any test fails, deployment is blocked. See `.github/workflows/deploy.yml`.

## Things to Avoid

- Do not add CSS frameworks (Tailwind, Bootstrap, etc.) — keep styling in `global.css`
- Do not add external image URLs in posts — download and store in `public/images/`
- Do not add client-side JavaScript unless explicitly requested
- Do not add comments systems (Disqus was removed intentionally)
- Do not change the font stack — it matches the original Jekyll site
- Keep the build zero-config: no env vars, no API keys, pure static output
