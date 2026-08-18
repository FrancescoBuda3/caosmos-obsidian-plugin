import { describe, expect, it } from 'vitest';
import { classifyBlocks } from '../../../src/core/styling/blockClassifier';
import type { BlockRole, RawBlock } from '../../../src/core/styling/blockModel';

describe('classifyBlocks', () => {
	it('returns an empty map when there are no blocks', () => {
		const result = classifyBlocks([], []);

		expect(result.size).toBe(0);
	});

	it('merges rule results in order', () => {
		const blocks: RawBlock[] = [
			{
				index: 0, kind: 'paragraph', text: 'title', html: ''
			},
			{ index: 1, kind: 'paragraph', text: 'body', html: '' },
		];

		const firstRule = () => new Map<number, BlockRole>([[0, 'title']]);
		const secondRule = () => new Map<number, BlockRole>([[1, 'content']]);

		const result = classifyBlocks(blocks, [firstRule, secondRule]);

		expect(result.get(0)).toBe('title');
		expect(result.get(1)).toBe('content');
	});
});