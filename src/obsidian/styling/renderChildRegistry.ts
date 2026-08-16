import { BlockGroupRenderChild } from './BlockGroupRenderChild';

const activeInstances = new WeakMap<HTMLElement, BlockGroupRenderChild>();
const allActiveInstances = new Set<BlockGroupRenderChild>();

export function registerRenderChild(container: HTMLElement, instance: BlockGroupRenderChild): void {
	const existing = activeInstances.get(container);
	if (existing) {
		existing.unload();
	}
	activeInstances.set(container, instance);
	allActiveInstances.add(instance);
}

export function unregisterRenderChild(instance: BlockGroupRenderChild): void {
	allActiveInstances.delete(instance);
}

export function unloadAllRenderChildren(): void {
	for (const instance of allActiveInstances) {
		instance.unload();
	}
	allActiveInstances.clear();
}