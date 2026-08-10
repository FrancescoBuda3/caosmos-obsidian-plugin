import { MarkdownPostProcessorContext, Plugin } from 'obsidian';
import { debounce } from "../utils/debounce";
import { BlockGroupRenderChild } from '../styling/BlockGroupRenderChild';
import { registerRenderChild } from '../styling/renderChildRegistry';

const CONTAINER_SELECTOR = '.markdown-preview-sizer';
const DEBOUNCE_DELAY_MS = 50;

interface PendingNote {
    lastEl: HTMLElement;
    lastCtx: MarkdownPostProcessorContext;
    trigger: () => void;
}

const pendingBySourcePath = new Map<string, PendingNote>();

export function registerStylePostProcessor(plugin: Plugin): void {
    plugin.registerMarkdownPostProcessor(
        (el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
            let pending = pendingBySourcePath.get(ctx.sourcePath);

            if (!pending) {
                const trigger = debounce(() => {
                    const container = pending!.lastEl.closest(CONTAINER_SELECTOR);
                    pendingBySourcePath.delete(ctx.sourcePath);

                    if (!(container instanceof HTMLElement)) {
                        return;
                    }
                    const instance = new BlockGroupRenderChild(container);
                    registerRenderChild(container, instance);
                    pending!.lastCtx.addChild(instance);
                }, DEBOUNCE_DELAY_MS);

                pending = { lastEl: el, lastCtx: ctx, trigger };
                pendingBySourcePath.set(ctx.sourcePath, pending);
            } else {
                pending.lastEl = el;
                pending.lastCtx = ctx;
            }

            pending.trigger();
        },
    );
}