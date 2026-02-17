import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const contentDir = resolve(import.meta.dirname, '..', 'src', 'content', 'blog');
const publicDir = resolve(import.meta.dirname, '..', 'public');
const posts = readdirSync(contentDir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));

// Match markdown image syntax ![alt](path) and HTML <img src="path">
const mdImageRe = /!\[.*?\]\(([^)]+)\)/g;
const htmlImgRe = /<img[^>]+src=["']([^"']+)["']/g;

describe('image references', () => {
	for (const file of posts) {
		const raw = readFileSync(resolve(contentDir, file), 'utf-8');
		const refs: string[] = [];

		for (const match of raw.matchAll(mdImageRe)) {
			refs.push(match[1]);
		}
		for (const match of raw.matchAll(htmlImgRe)) {
			refs.push(match[1]);
		}

		// Only test posts that have image references
		if (refs.length === 0) continue;

		describe(file, () => {
			for (const ref of refs) {
				it(`image "${ref}" exists in public/`, () => {
					// Skip external URLs
					if (ref.startsWith('http://') || ref.startsWith('https://')) {
						expect.fail(`External image URL found: ${ref}. All images must be stored locally.`);
					}
					// Resolve from public/ (strip leading /)
					const filePath = resolve(publicDir, ref.replace(/^\//, ''));
					expect(existsSync(filePath), `Missing image: ${filePath}`).toBe(true);
				});
			}
		});
	}
});
