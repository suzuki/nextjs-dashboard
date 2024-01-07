import { FC, useMemo } from 'react';
import { EditorState } from "prosemirror-state";
import { getSelectionMark } from './getSelectionMark';
import { schema } from './schema';

export type MenuItemFontSizeProps = {
  editorState: EditorState;
  onSetFontSize: (fontSize: string) => void;
  onResetFontSize: () => void;
};

const FONT_SIZE_LIST = [
  '12px',
  '16px',
  '24px',
];

export const MenuItemFontSize: FC<MenuItemFontSizeProps> = (props) => {
  const selectedFontSize = useMemo(() => {
    const mark = getSelectionMark(props.editorState, schema.marks.size);
    return mark ? mark.attrs.fontSize : '16px';
  }, [props.editorState]);

  return (
    <select
      value={selectedFontSize}
      onChange={(event) => {
        const fontSize = event.currentTarget.value;
        if (fontSize === '16px') {
          props.onResetFontSize();
        } else {
          props.onSetFontSize(fontSize);
        }
      }}
    >
      {FONT_SIZE_LIST.map((fontSize) => (
        <option key={fontSize} value={fontSize}>
          {fontSize}
        </option>
      ))}
    </select>
  );
};
