import { BlockRole } from "./blockModel";

export interface BlockGroup {
    role: BlockRole;
    startIndex: number;
    endIndex: number;
}

/**
 * groups contiguous blocks with the same role into BlockGroup objects.
 * @param roles a map of block indices to their corresponding roles 
 */
export function groupContiguousBlocksByRole(
    roles: Map<number, BlockRole>
): BlockGroup[] {
    const groups: BlockGroup[] = [];
    let currentGroup: BlockGroup | null = null;
    const totalBlocks = Math.max(...roles.keys()) + 1;

    for (let i = 0; i < totalBlocks; i++) {
        const role = roles.get(i);
        if (role) {
            if (currentGroup && currentGroup.role === role) {
                currentGroup.endIndex = i;
            } else {
                currentGroup = { role, startIndex: i, endIndex: i };
                groups.push(currentGroup);
            }
        } else {
            currentGroup = null;
        }
    }           
    return groups;
}