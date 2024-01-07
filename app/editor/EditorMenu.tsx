import { FC } from 'react';
import { EditorView } from "prosemirror-view"
import { isActiveMark } from './isActiveMark';
import { schema } from './schema';
import { setBlockType, toggleMark } from 'prosemirror-commands';
import { MenuItemColor } from './EditorItemColor';
import { addMark } from './addMark';
import { removeMark } from './removeMark';
import { MenuItemFontSize } from './MenuItemFontSize';
import { MenuItemTextAlign } from './MenuItemTextAlign';
import { MenuItemLink } from './EditorItemLink';


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

      {/* COLOR */}
      <MenuItemColor
        editorState={props.editorView.state}
        onSetColor={(color) => {
          addMark(schema.marks.color, { color })(
            props.editorView.state,
            props.editorView.dispatch,
            props.editorView
          );
          props.editorView.focus();
        }}
        onResetColor={() => {
          removeMark(schema.marks.color)(
            props.editorView.state,
            props.editorView.dispatch,
            props.editorView
          );
          props.editorView.focus();
        }}
      />

      {/* FONT_SIZE */}
      <MenuItemFontSize
        editorState={props.editorView.state}
        onSetFontSize={(fontSize) => {
          addMark(schema.marks.size, { fontSize })(
            props.editorView.state,
            props.editorView.dispatch,
            props.editorView
          );

          props.editorView.focus();
        }}
        onResetFontSize={() => {
          removeMark(schema.marks.size)(
            props.editorView.state,
            props.editorView.dispatch,
            props.editorView
          );
          props.editorView.focus();
        }}
      />

      {/* TEXT ALING */}
      <MenuItemTextAlign
        editorState={props.editorView.state}
        onSetTextAlign={(align) => {
          setBlockType(schema.nodes.paragraph, { align })(
            props.editorView.state,
            props.editorView.dispatch,
            props.editorView
          );
          props.editorView.focus();
        }}
      />

      {/* Link */}
      <MenuItemLink
        editorState={props.editorView.state}
        onSetLink={(url) => {
          addMark(schema.marks.link, { href: url })(
            props.editorView.state,
            props.editorView.dispatch,
            props.editorView
          );
          props.editorView.focus();
        }}
      />
    </div>
  );
}
