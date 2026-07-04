import { ItemView, WorkspaceLeaf } from "obsidian";
import { createRoot, Root } from "react-dom/client";
import { HelloView } from "../ui/HelloView";

export const VIEW_TYPE_HELLO = "caosmos-hello-view";

export class HelloItemView extends ItemView {
    private root: Root | null = null;

    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
    }

    getViewType(): string {
        return VIEW_TYPE_HELLO;
    }

    getDisplayText(): string {
        return "Hello Caosmos";
    }

    async onOpen() {
        this.root = createRoot(this.contentEl);
        this.root.render(<HelloView />);
    }

    async onClose() {
        this.root?.unmount();
    }
}