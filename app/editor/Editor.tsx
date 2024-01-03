import { useEffect, useRef, useReducer, FC } from "react";
import { Schema, Node, DOMParser } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import { history, redo, undo } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap, toggleMark } from 'prosemirror-commands';
import { EditorView } from "prosemirror-view";
import { schema } from './schema';

const createDoc = <T extends Schema>(html: string, pmSchema: T) => {
  const element = document.createElement('div');
  element.innerHTML = html;

  return DOMParser.fromSchema(pmSchema).parse(element);
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

  return (
    <div>
      <div ref={elContentRef} />
    </div>
  );
};
