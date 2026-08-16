import { ViewPlugin, ViewUpdate, EditorView } from '@codemirror/view';
import { syntaxTree } from '@codemirror/language';

export const debugSyntaxTreePlugin = ViewPlugin.fromClass(
	class {
		constructor(view: EditorView) {
			this.logTopLevelNodes(view);
		}

		update(update: ViewUpdate): void {
			// Rilogghiamo solo se il documento è cambiato, per non intasare
			// la console ad ogni scroll/movimento del cursore.
			if (update.docChanged) {
				this.logTopLevelNodes(update.view);
			}
		}

		private logTopLevelNodes(view: EditorView): void {
			const tree = syntaxTree(view.state);
			console.log('--- Syntax tree: nodi di primo livello ---');

			let node = tree.topNode.firstChild;
			while (node !== null) {
				const preview = view.state.doc
					.sliceString(node.from, node.to)
					.slice(0, 40)
					.replace(/\n/g, '\\n');

				console.log(`${node.type.name} [${node.from}, ${node.to}]`, JSON.stringify(preview));

				node = node.nextSibling;
			}
		}
	}
);