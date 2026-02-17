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
```

## Commands

- `npm run dev` — Start dev server (localhost:4321)
- `npm run build` — Build static site to `dist/`
- `npm run preview` — Preview built site locally

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

## Things to Avoid

- Do not add CSS frameworks (Tailwind, Bootstrap, etc.) — keep styling in `global.css`
- Do not add external image URLs in posts — download and store in `public/images/`
- Do not add client-side JavaScript unless explicitly requested
- Do not add comments systems (Disqus was removed intentionally)
- Do not change the font stack — it matches the original Jekyll site
- Keep the build zero-config: no env vars, no API keys, pure static output
