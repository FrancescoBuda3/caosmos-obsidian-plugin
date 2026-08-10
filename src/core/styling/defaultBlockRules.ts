import { BlockRole, RawBlock } from './blockModel';
import { BlockClassificationRule } from './blockClassifier';
import { htmlContainsOnlyWikilinks, textContainsOnlyWikilinks } from './blockClassifierPredicates';

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
		const htmlWithoutOuterTag = block.html.replace(/^<[^>]+>|<\/[^>]+>$/g, '');

		if (block && htmlContainsOnlyWikilinks(htmlWithoutOuterTag)) {
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

export const defaultBlockRules: BlockClassificationRule[] = [titleRule, trailingLinksRule, remainingContentRule];