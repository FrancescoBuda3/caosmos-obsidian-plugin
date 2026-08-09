export interface BlockBounds {
    top: number;
    height: number;
}

export interface OverlayRect {
    top: number;
    height: number;
}

export function computeOverlayRect(blockBounds: BlockBounds[]): OverlayRect | null {
    if (blockBounds.length === 0) {
        return null;
    }

    const first = blockBounds[0];
    const last = blockBounds[blockBounds.length - 1];
    if (!first || !last) {
        return null;
    }

    const top = first.top;
    const bottom = last.top + last.height;

    return {
        top,
        height: bottom - top,
    }
}