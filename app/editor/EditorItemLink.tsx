import { EditorState } from 'prosemirror-state';
import { FC } from 'react';

export type MenuItemLinkProps = {
  editorState: EditorState;
  onSetLink: (url: string) => void;
};

export const MenuItemLink: FC<MenuItemLinkProps> = (props) => {
  return (
    <button
      onClick={() => {
        const url = window.prompt('URL');
        if (url) {
          props.onSetLink(url);
        }
      }}
    >
      link
    </button>
  );
};
