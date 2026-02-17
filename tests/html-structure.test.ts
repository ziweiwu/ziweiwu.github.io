import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import * as cheerio from 'cheerio';
import { describe, expect, it } from 'vitest';

const dist = resolve(import.meta.dirname, '..', 'dist');

function loadPage(path: string) {
	return cheerio.load(readFileSync(resolve(dist, path), 'utf-8'));
}

describe('index page structure', () => {
	const $ = loadPage('index.html');

	it('has a <title> tag', () => {
		expect($('title').text()).toBeTruthy();
	});

	it('has meta description', () => {
		expect($('meta[name="description"]').attr('content')).toBeTruthy();
	});

	it('has Open Graph meta tags', () => {
		expect($('meta[property="og:title"]').attr('content')).toBeTruthy();
		expect($('meta[property="og:description"]').attr('content')).toBeTruthy();
	});

	it('has navigation links (About, RSS)', () => {
		const navText = $('header').text();
		expect(navText).toContain('About');
		expect(navText).toContain('RSS');
	});

	it('has year grouping headings', () => {
		const yearHeadings = $('h2')
			.toArray()
			.map((el) => $(el).text())
			.filter((t) => /^\d{4}$/.test(t));
		expect(yearHeadings.length).toBeGreaterThan(0);
	});

	it('has links to blog posts', () => {
		const blogLinks = $('a[href^="/blog/"]').toArray();
		expect(blogLinks.length).toBeGreaterThan(0);
	});
});

describe('blog post page structure', () => {
	const blogDir = resolve(dist, 'blog');
	const slugs = readdirSync(blogDir, { withFileTypes: true })
		.filter((e) => e.isDirectory())
		.map((e) => e.name);

	for (const slug of slugs) {
		describe(slug, () => {
			const $ = loadPage(`blog/${slug}/index.html`);

			it('has a <title> tag', () => {
				expect($('title').text()).toBeTruthy();
			});

			it('has meta description', () => {
				expect($('meta[name="description"]').attr('content')).toBeTruthy();
			});

			it('has an <article> or <main> with content', () => {
				const content = $('article').text() || $('main').text();
				expect(content.trim().length).toBeGreaterThan(0);
			});
		});
	}
});
