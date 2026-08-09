function isMarkdownBlockWrapper(el: Element): boolean {
	return Array.from(el.classList).some((cls) => cls.startsWith('el-'));
}

export function getBlockWrappers(container: Element): HTMLElement[] {
	return Array.from(container.children)
		.filter(isMarkdownBlockWrapper) as HTMLElement[];
}