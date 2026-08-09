import { BlockGroup } from "../../core/styling/blockGrouping";
import { BlockBounds, computeOverlayRect } from "../../core/styling/overlayGeometry";


const OVERLAY_CLASS = 'caosmos-block-overlay';
const OVERLAY_ROLE_ATTR = 'data-caosmos-role';

function readBlockBounds(
    container: HTMLElement,
    blockWrappers: HTMLElement[],
    group: BlockGroup,
): BlockBounds[] {
    const bounds: BlockBounds[] = [];

    for (let i = group.startIndex; i <= group.endIndex; i++) {
        const wrapper = blockWrappers[i];
        if (!wrapper) {
            continue;
        }
        bounds.push({
            top: wrapper.offsetTop,
            height: wrapper.offsetHeight,
        });
    }
    return bounds;
}

function removeExistingOverlays(container: HTMLElement): void {
	const existing = container.querySelectorAll(`:scope > .${OVERLAY_CLASS}`);
	existing.forEach((el) => el.remove());
}

export function renderBlockGroupOverlay(
    container: HTMLElement,
    blockWrappers: HTMLElement[],
    groups: BlockGroup[],
): void {
    removeExistingOverlays(container);

    for (const group of groups) {
        const bounds = readBlockBounds(container, blockWrappers, group);
        const rect = computeOverlayRect(bounds);
        if (!rect) {
            continue;
        }

        const overlay = container.ownerDocument.createElement('div');
        overlay.classList.add(OVERLAY_CLASS);
        overlay.setAttribute(OVERLAY_ROLE_ATTR, group.role);
        overlay.style.position = 'absolute';
        overlay.style.top = `${rect.top}px`;
        overlay.style.height = `${rect.height}px`;
        overlay.style.left = '0';
        overlay.style.right = '0';
        overlay.style.pointerEvents = 'none';

        container.appendChild(overlay);
    }
}