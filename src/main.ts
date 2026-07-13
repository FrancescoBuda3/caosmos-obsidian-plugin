import { Plugin } from 'obsidian';
import {
	DEFAULT_SETTINGS,
	MyPluginSettings,
	SampleSettingTab,
} from './settings';
import { HelloItemView, VIEW_TYPE_HELLO } from './obsidian/HelloItemView';
import { registerDebugPostProcessor } from './obsidian/postProcessors/debugPostProcessor';

export default class CaosmosPlugin extends Plugin {
	settings!: MyPluginSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new SampleSettingTab(this.app, this));

		this.registerView(
			VIEW_TYPE_HELLO,
			(leaf) => new HelloItemView(leaf)
		);

		this.addRibbonIcon('sparkles', 'Apri Hello Caosmos', () => {
			this.activateView();
		});

		registerDebugPostProcessor(this);
	}

	onunload() {}

	async activateView() {
		this.app.workspace.detachLeavesOfType(VIEW_TYPE_HELLO);

		const leaf = this.app.workspace.getRightLeaf(false);
		if (!leaf) {
			return;
		}

		await leaf.setViewState({
			type: VIEW_TYPE_HELLO,
			active: true,
		});

		const leaves = this.app.workspace.getLeavesOfType(VIEW_TYPE_HELLO);
		if (leaves.length > 0) {
			this.app.workspace.revealLeaf(leaves[0]!);
		}
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<MyPluginSettings>,
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}