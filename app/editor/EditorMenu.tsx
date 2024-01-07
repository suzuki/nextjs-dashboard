import { FC } from 'react';
import { EditorView } from "prosemirror-view"
import { isActiveMark } from './isActiveMark';
import { schema } from './schema';
import { toggleMark } from 'prosemirror-commands';


export type EditorMenuProos = {
  editorView: EditorView;
};

export const EditorMenu: FC<EditorMenuProos> = (props) => {
  return (
    <div className='inline-flex'>
      {/* Bold */}
      <button
        className='bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-l'
        style={{
          fontWeight: isActiveMark(props.editorView.state, schema.marks.strong)
            ? 'bold'
            : undefined
        }}
        onClick={() => {
          toggleMark(schema.marks.strong)(
            props.editorView.state,
            props.editorView.dispatch,
            props.editorView
          );
          props.editorView.focus();
        }}
      >
        B
      </button>

      {/* Italic */}
      <button
        className='bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-l'
        style={{
          fontWeight: isActiveMark(props.editorView.state, schema.marks.em)
            ? 'bold'
            : undefined
        }}
        onClick={() => {
          toggleMark(schema.marks.em)(
            props.editorView.state,
            props.editorView.dispatch,
            props.editorView
          );
          props.editorView.focus();
        }}
      >
        I
      </button>

      {/* Underline */}
      <button
        className='bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-l'
        style={{
          fontWeight: isActiveMark(props.editorView.state, schema.marks.underline)
            ? 'bold'
            : undefined
        }}
        onClick={() => {
          toggleMark(schema.marks.underline)(
            props.editorView.state,
            props.editorView.dispatch,
            props.editorView
          );
          props.editorView.focus();
        }}
      >
        U
      </button>
    </div>
  );
}
