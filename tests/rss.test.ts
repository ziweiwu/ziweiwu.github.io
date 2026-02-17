import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import * as cheerio from 'cheerio';
import { describe, expect, it } from 'vitest';

const dist = resolve(import.meta.dirname, '..', 'dist');
const rssPath = resolve(dist, 'rss.xml');

describe('RSS feed', () => {
	const xml = readFileSync(rssPath, 'utf-8');
	const $ = cheerio.load(xml, { xml: true });

	it('is valid XML with <rss> root or <channel>', () => {
		expect($('channel').length).toBe(1);
	});

	it('has correct title', () => {
		const title = $('channel > title').text();
		expect(title).toBeTruthy();
		expect(title).toContain('Blog');
	});

	it('has a link element', () => {
		expect($('channel > link').text()).toBeTruthy();
	});

	it('has items for all blog posts', () => {
		const items = $('item').toArray();
		expect(items.length).toBeGreaterThan(0);
	});

	it('each item has title, link, and pubDate', () => {
		$('item').each((_, el) => {
			expect($(el).find('title').text()).toBeTruthy();
			expect($(el).find('link').text()).toBeTruthy();
			expect($(el).find('pubDate').text()).toBeTruthy();
		});
	});
});
