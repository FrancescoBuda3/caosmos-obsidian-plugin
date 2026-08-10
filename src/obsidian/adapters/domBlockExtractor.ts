import { BlockKind, RawBlock } from "../../core/styling/blockModel";

/**
 * Extracts the kind of a block from its DOM element.
 * @param el The DOM element representing the block.
 * @returns The kind of the block.
 */
function extractBlockKind(el: Element): BlockKind {
    const contentEl = el.children[0];
    if (!contentEl) {
        return 'other';
    }
    const tag = contentEl.tagName.toLowerCase();
    switch (tag) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
            return 'heading';
        case 'p':
            return 'paragraph';
        case 'pre':
            return 'code';
        case 'ul':
        case 'ol':
            return 'list';
        default:
            return 'other';
    }
}

/**
 * Converts a list of block wrapper elements into an array of RawBlock objects.
 * @param wrappers The list of block wrapper elements.
 * @returns An array of RawBlock objects.
 */
export function extractBlocksFromContainer(wrappers: HTMLElement[]): RawBlock[] {
    return wrappers.map((child, index) => ({
        index,
        kind: extractBlockKind(child),
        text: child.textContent || '',
        html: child.innerHTML || '',
    }));
}