import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const contentDir = resolve(import.meta.dirname, '..', 'src', 'content', 'blog');
const posts = readdirSync(contentDir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));

describe('blog post content', () => {
	it('at least one blog post exists', () => {
		expect(posts.length).toBeGreaterThan(0);
	});

	for (const file of posts) {
		describe(file, () => {
			const raw = readFileSync(resolve(contentDir, file), 'utf-8');
			const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);

			it('has frontmatter', () => {
				expect(fmMatch).not.toBeNull();
			});

			it('has required frontmatter fields (title, description, pubDate)', () => {
				const fm = fmMatch![1];
				expect(fm).toMatch(/^title:\s*.+/m);
				expect(fm).toMatch(/^description:\s*.+/m);
				expect(fm).toMatch(/^pubDate:\s*.+/m);
			});

			it('has non-empty body after frontmatter', () => {
				const body = raw.replace(/^---\n[\s\S]*?\n---/, '').trim();
				expect(body.length).toBeGreaterThan(0);
			});
		});
	}
});
