import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const dist = resolve(import.meta.dirname, '..', 'dist');

describe('build output', () => {
	it('dist/ directory exists', () => {
		expect(existsSync(dist)).toBe(true);
	});

	it('index.html exists at root', () => {
		expect(existsSync(resolve(dist, 'index.html'))).toBe(true);
	});

	it('about page exists', () => {
		expect(existsSync(resolve(dist, 'about', 'index.html'))).toBe(true);
	});

	it('rss.xml exists', () => {
		expect(existsSync(resolve(dist, 'rss.xml'))).toBe(true);
	});

	it('blog post pages are generated', () => {
		const blogDir = resolve(dist, 'blog');
		expect(existsSync(blogDir)).toBe(true);
		const entries = readdirSync(blogDir, { withFileTypes: true });
		const dirs = entries.filter((e) => e.isDirectory());
		expect(dirs.length).toBeGreaterThan(0);
		for (const dir of dirs) {
			expect(existsSync(resolve(blogDir, dir.name, 'index.html'))).toBe(true);
		}
	});

	it('static assets are copied (favicon, fonts)', () => {
		expect(existsSync(resolve(dist, 'favicon.svg'))).toBe(true);
		expect(existsSync(resolve(dist, 'favicon.ico'))).toBe(true);
		expect(existsSync(resolve(dist, 'fonts', 'DejaVuSansMono-regular.woff'))).toBe(true);
		expect(existsSync(resolve(dist, 'fonts', 'DejaVuSansMono-bold.woff'))).toBe(true);
	});

	it('sitemap is generated', () => {
		expect(existsSync(resolve(dist, 'sitemap-index.xml'))).toBe(true);
	});
});
