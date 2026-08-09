import { BlockGroup } from "../../core/styling/blockGrouping";

const GROUP_WRAPPER_CLASS = "caosmos-block-group";
const GROUP_WRAPPER_ROLE_ATTR = "data-caosmos-role";

function unwrapExistingGroups(container: Element): void {
    const extistingWrappers = Array.from(
        container.querySelectorAll(`:scope > .${GROUP_WRAPPER_CLASS}`)
    );

    for (const wrapper of extistingWrappers) {
        while (wrapper.firstChild) {
            container.insertBefore(wrapper.firstChild, wrapper);
        }
        wrapper.remove();
    }
}

export function applyBlockGroups(container: Element, groups: BlockGroup[]): void {
    unwrapExistingGroups(container);
    const blocks = Array.from(container.children);

    for (const group of groups) {
        const firtsBlock = blocks[group.startIndex];
        if (!firtsBlock) {
            continue;
        }

        const wrapperDiv = container.ownerDocument.createElement("div");
        wrapperDiv.classList.add(GROUP_WRAPPER_CLASS);
        wrapperDiv.setAttribute(GROUP_WRAPPER_ROLE_ATTR, group.role);

        container.insertBefore(wrapperDiv, firtsBlock);

        for (let i = group.startIndex; i <= group.endIndex; i++) {
            const block = blocks[i];
            if (block) {
                wrapperDiv.appendChild(block);
            }
        }
    }
}