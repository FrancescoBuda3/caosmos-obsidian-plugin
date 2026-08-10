import { BlockGroupRenderChild } from './BlockGroupRenderChild';

const activeInstances = new WeakMap<HTMLElement, BlockGroupRenderChild>();

export function registerRenderChild(container: HTMLElement, instance: BlockGroupRenderChild): void {
	const existing = activeInstances.get(container);
	if (existing) {
		existing.unload();
	}
	activeInstances.set(container, instance);
}