import { MarkdownPostProcessorContext, Plugin } from 'obsidian';

export function registerDebugPostProcessor(plugin: Plugin) {
	plugin.registerMarkdownPostProcessor((el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
		console.log('--- post-processor chiamato ---');
		console.log('el:', el);
		console.log('el.children.length:', el.children.length);
		console.log('el.parentElement:', el.parentElement);
		console.log('ctx.sourcePath:', ctx.sourcePath);
        console.log('el.parentElement === document.querySelector(".markdown-preview-sizer")?', 
	el.parentElement === el.ownerDocument.querySelector('.markdown-preview-sizer'));
	});
}