import { BlockRole, RawBlock } from './blockModel';
import { BlockClassificationRule } from './blockClassifier';
import { textContainsOnlyWikilinks } from './blockClassifierPredicates';

const titleRule: BlockClassificationRule = (_blocks: RawBlock[], _roles: Map<number, BlockRole>): Map<number, BlockRole> => {
	return new Map<number, BlockRole>([[0, 'title']]);
};

const trailingLinksRule: BlockClassificationRule = (blocks: RawBlock[], _roles: Map<number, BlockRole>): Map<number, BlockRole> => {
	const newRoles = new Map<number, BlockRole>();
	for (let i = blocks.length - 1; i >= 0; i--) {
		const block = blocks[i];
		if (!block) {
			continue;
		}
		if (block && textContainsOnlyWikilinks(block.text)) {
			newRoles.set(i, 'links');
		} else {
			break;
		}
	}
	return newRoles;
};

const remainingContentRule: BlockClassificationRule = (blocks: RawBlock[], roles: Map<number, BlockRole>): Map<number, BlockRole> => {
	const newRoles = new Map<number, BlockRole>();
	for (let i = 0; i < blocks.length; i++) {
		if (!roles.has(i)) {
			newRoles.set(i, 'content');
		}
	}
	return newRoles;
};

const initialMetadataRule: BlockClassificationRule = (blocks: RawBlock[], _roles: Map<number, BlockRole>): Map<number, BlockRole> => {
	const newRoles = new Map<number, BlockRole>();
	let i = 0;
	let j = blocks.length - 1;
	while (i < blocks.length && blocks[i] && !textContainsOnlyWikilinks(blocks[i]!.text)) {
		i++;
	}
	while (j >= 0 && blocks[j] && textContainsOnlyWikilinks(blocks[j]!.text)) {
		j--;
	}
	if ((i != j + 1 || j != blocks.length - 2) && i < blocks.length) {
		for (let k = 0; k <= i; k++) {
			newRoles.set(k, 'metadata');
		}
	}
	return newRoles;
}

export const defaultBlockRules: BlockClassificationRule[] = [initialMetadataRule, trailingLinksRule, remainingContentRule];