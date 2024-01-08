import { createRoot } from 'react-dom/client';
import { EditorState, PluginView } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { LinkToolTip } from './LinkTooltip';

export class SelectionLinkTooltipView implements PluginView {
  private dom: HTMLElement;
  private reactRoot: any;

  constructor(view: EditorView) {
    this.dom = document.createElement('div');
    this.reactRoot = createRoot(this.dom);

    if (view.dom.parentNode) {
      view.dom.parentNode.appendChild(this.dom);
    }
  }

  update(view: EditorView, prevState: EditorState) {
    const state = view.state;
    if (prevState &&
      prevState.doc.eq(state.doc) &&
      prevState.selection.eq(state.selection)
    ) {
        return;
    }

    if (this.dom.offsetParent == null) {
      return;
    }

    const box = this.dom.offsetParent.getBoundingClientRect();
    this.reactRoot.render(<LinkToolTip editorView={view} box={box} />);
  }

  destroy() {
    this.dom.remove();

    setTimeout(() => {
      this.reactRoot.unmount();
    }, 0);
  }
}
