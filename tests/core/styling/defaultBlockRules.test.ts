import { describe, expect, it } from 'vitest';
import { classifyBlocks } from '../../../src/core/styling/blockClassifier';
import { defaultBlockRules } from '../../../src/core/styling/defaultBlockRules';
import type { RawBlock } from '../../../src/core/styling/blockModel';

describe('defaultBlockRules', () => {
	it('assigns the first block as title when it is not part of trailing wikilinks', () => {
		const blocks: RawBlock[] = [
			{ index: 0, kind: 'heading', text: '# Document title' },
			{ index: 1, kind: 'paragraph', text: 'Body' },
		];

		const roles = classifyBlocks(blocks, defaultBlockRules);

		expect(roles.get(0)).toBe('title');
		expect(roles.get(1)).toBe('content');
	});

	it('classifies trailing wikilink-only blocks as links', () => {
		const blocks: RawBlock[] = [
			{ index: 0, kind: 'paragraph', text: 'Intro' },
			{ index: 1, kind: 'paragraph', text: '[[One]], [[Two]]' },
			{ index: 2, kind: 'paragraph', text: '[[Three]]' },
		];

		const roles = classifyBlocks(blocks, defaultBlockRules);

		expect(roles.get(1)).toBe('links');
		expect(roles.get(2)).toBe('links');
		expect(roles.get(0)).toBe('title');
	});

	it('stops marking links when a non-link block appears at the end', () => {
		const blocks: RawBlock[] = [
			{ index: 0, kind: 'paragraph', text: 'Intro' },
			{ index: 1, kind: 'paragraph', text: '[[One]]' },
			{ index: 2, kind: 'paragraph', text: 'Closing note' },
		];

		const roles = classifyBlocks(blocks, defaultBlockRules);

		expect(roles.get(2)).toBe('content');
		expect(roles.get(1)).toBe('content');
		expect(roles.get(0)).toBe('title');
	});

	it('fills the remaining unclassified blocks as content', () => {
		const blocks: RawBlock[] = [
			{ index: 0, kind: 'heading', text: '# Title' },
			{ index: 1, kind: 'paragraph', text: 'Body text' },
		];

		const roles = classifyBlocks(blocks, defaultBlockRules);

		expect(roles.get(1)).toBe('content');
	});
});