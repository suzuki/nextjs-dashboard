import { MarkType } from "prosemirror-model";
import { EditorState, TextSelection } from "prosemirror-state";

/**
 * 選択中のエディタが既にmarkの設定をしているかチェック
 */
export const isActiveMark = (state: EditorState, markType: MarkType) => {
  // https://github.com/ProseMirror/prosemirror-commands/blob/1.3.1/src/commands.ts#L510-L534
  if (state.selection instanceof TextSelection && state.selection.$cursor) {
    return markType.isInSet(
      state.storedMarks || state.selection.$cursor.marks()
    ) ? true : false;
  }

  const { ranges } = state.selection;
  for (let i = 0; i < ranges.length; i++) {
    if (state.doc.rangeHasMark(ranges[i].$from.pos, ranges[i].$to.pos, markType)) {
      return true;
    }

    return false;
  }
};
