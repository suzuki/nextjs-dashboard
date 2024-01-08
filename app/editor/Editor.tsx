import { useEffect, useRef, useReducer, FC } from "react";
import { Schema, Node, DOMParser } from "prosemirror-model";
import { EditorState, Plugin } from "prosemirror-state";
import { history, redo, undo } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap, toggleMark } from 'prosemirror-commands';
import { EditorView } from "prosemirror-view";
import { schema } from './schema';
import { EditorMenu } from "./EditorMenu";
import { SelectionLinkTooltipView } from "./SelectionLinkTooltipView";

const createDoc = <T extends Schema>(html: string, pmSchema: T) => {
  const element = document.createElement('div');
  element.innerHTML = html;

  return DOMParser.fromSchema(pmSchema).parse(element);
};

const selectionLinkTooltipPlugin = () => {
  return new Plugin({
    view(editorView) {
      return new SelectionLinkTooltipView(editorView);
    }
  });
};

const createPmState = <T extends Schema>(
  pmSchema: T,
  options: { doc?: Node } = {},
) => {
  return EditorState.create({
    doc: options.doc,
    schema: pmSchema,
    plugins: [
      history(),
      keymap({
        'Mod-z': undo,
        'Mod-y': redo,
        'Mod-Shift-z': redo,
      }),
      keymap({
        Enter: baseKeymap['Enter'],
        Backspace: baseKeymap['Backspace'],
      }),
      keymap({
        "Mod-b": toggleMark(pmSchema.marks.strong),
        "Mod-i": toggleMark(pmSchema.marks.em),
        "Mod-u": toggleMark(pmSchema.marks.underline),
      }),
      selectionLinkTooltipPlugin(),
    ]
  });
};

export type Props = {
  initialHtml: string;
  onChangeHtml: (html: string) => void;
}

export const Editor: FC<Props> = (props) => {
  const [ _, forceUpdate ] = useReducer((x) => x + 1, 0);
  const elContentRef = useRef<HTMLDivElement | null>(null);
  const editorViewRef = useRef<EditorView>();

  useEffect(() => {
    const doc = createDoc(props.initialHtml, schema);
    const state = createPmState(schema, { doc });

    const editorView = new EditorView(elContentRef.current, {
      state,
      dispatchTransaction(transaction) {
        const newState = editorView.state.apply(transaction);
        editorView.updateState(newState);

        props.onChangeHtml(editorView.dom.innerHTML);
        forceUpdate();
      }
    });
    editorViewRef.current = editorView;
    forceUpdate();

    return () => {
      editorView.destroy();
    };
  }, []);

  const css =`
    .ProseMirror {
      height: 100%;
    }
  `;

  return (
    <div>
      {editorViewRef.current && (
        <EditorMenu editorView={editorViewRef.current} />
      )}
      <div
        className="h-full min-h-[100px] block p-2.5 w-full text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        ref={elContentRef}
      />
    </div>
  );
};
