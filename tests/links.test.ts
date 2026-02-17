import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import * as cheerio from 'cheerio';
import { describe, expect, it } from 'vitest';

const dist = resolve(import.meta.dirname, '..', 'dist');

function collectHtmlFiles(dir: string): string[] {
	const results: string[] = [];
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const full = resolve(dir, entry.name);
		if (entry.isDirectory()) {
			results.push(...collectHtmlFiles(full));
		} else if (entry.name.endsWith('.html')) {
			results.push(full);
		}
	}
	return results;
}

describe('internal links', () => {
	const htmlFiles = collectHtmlFiles(dist);

	for (const file of htmlFiles) {
		const relativePath = file.replace(dist, '');
		const html = readFileSync(file, 'utf-8');
		const $ = cheerio.load(html);

		const internalLinks = $('a[href]')
			.toArray()
			.map((el) => $(el).attr('href')!)
			.filter((href) => href.startsWith('/') && !href.startsWith('//'));

		if (internalLinks.length === 0) continue;

		describe(relativePath, () => {
			for (const href of internalLinks) {
				it(`link "${href}" resolves to a file`, () => {
					// Strip query string and hash
					const clean = href.split('?')[0].split('#')[0];
					// Try exact path, path/index.html, and path with .html
					const candidates = [
						resolve(dist, clean.replace(/^\//, '')),
						resolve(dist, clean.replace(/^\//, ''), 'index.html'),
						resolve(dist, clean.replace(/^\//, '') + '.html'),
					];
					const found = candidates.some((c) => existsSync(c));
					expect(found, `Broken link: ${href} (tried ${candidates.join(', ')})`).toBe(true);
				});
			}
		});
	}
});
