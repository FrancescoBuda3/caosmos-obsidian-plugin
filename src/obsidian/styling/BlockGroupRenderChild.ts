import { MarkdownRenderChild } from "obsidian";
import { getBlockWrappers } from "./blockWrappers";
import { extractBlocksFromContainer } from "../adapters/domBlockExtractor";
import { classifyBlocks } from "../../core/styling/blockClassifier";
import { defaultBlockRules } from "../../core/styling/defaultBlockRules";
import { groupContiguousBlocksByRole } from "../../core/styling/blockGrouping";
import { renderBlockGroupOverlay } from "./blockGroupOverlay";
import { debounce } from "../utils/debounce";
import { applyBlockGroups, unwrapExistingGroups } from "./applyBlockGroups";

const RECOMPUTE_DEBOUNCE_MS = 50;
let instanceCounter = 0;

export class BlockGroupRenderChild extends MarkdownRenderChild {
	private readonly instanceId = ++instanceCounter;
	private mutationObserver: MutationObserver | null = null;
	private debouncedRecompute: () => void;

	constructor(containerEl: HTMLElement) {
		super(containerEl);
		this.debouncedRecompute = debounce(() => this.recompute(), RECOMPUTE_DEBOUNCE_MS);
	}

	onload(): void {
		this.recompute();

		this.mutationObserver = new MutationObserver(() => {
			this.debouncedRecompute();
		});
		this.startObserving();
	}

	onunload(): void {
		this.mutationObserver?.disconnect();
		this.mutationObserver = null;
	}

	private startObserving(): void {
		this.mutationObserver?.observe(this.containerEl, { childList: true });
	}

	private recompute(): void {
		this.mutationObserver?.disconnect();

		unwrapExistingGroups(this.containerEl);
		const wrappers = getBlockWrappers(this.containerEl);
		const blocks = extractBlocksFromContainer(wrappers);
		const roles = classifyBlocks(blocks, defaultBlockRules);
		const groups = groupContiguousBlocksByRole(roles);
		applyBlockGroups(this.containerEl, groups);
		//renderBlockGroupOverlay(this.containerEl, wrappers, groups);


		this.startObserving();
	}
}