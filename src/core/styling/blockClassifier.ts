import { BlockRole, RawBlock } from './blockModel';

export type BlockClassificationRule = (
    blocks: RawBlock[],
    roles: Map<number, BlockRole>,
) => Map<number, BlockRole>;

/**
 * Classifies blocks based on the provided rules.
 * @param blocks the blocks to classify
 * @param rules the rules to apply for classification
 * @returns a map of block indices to their assigned roles
 */
export function classifyBlocks(blocks: RawBlock[], rules: BlockClassificationRule[]): Map<number, BlockRole> {
    const roles = new Map<number, BlockRole>();
    if (blocks.length === 0) {
        return roles;
    }
    for (const rule of rules) {
        const nextRoles = rule(blocks, roles);
        for (const [index, role] of nextRoles) {
            roles.set(index, role);
        }
    }
    return roles;
} 
