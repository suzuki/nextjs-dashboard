import { Attrs, MarkType } from "prosemirror-model";
import { Command, TextSelection } from "prosemirror-state";

export const updateMark = (
  markType: MarkType,
  attrs: Attrs | null = null
): Command => {
  return (state, dispatch) => {
    let { empty, $cursor, ranges } = state.selection as TextSelection;
    if ((empty && !$cursor)
    //|| !markApplies(state.doc, ranges, markType)
    ) {
      return false;
    }

    if (dispatch) {
      const $pos = $cursor || state.selection.$from;
      let tr = state.tr;
      const { nodeBefore, nodeAfter } = $pos;

      if (nodeBefore && markType.isInSet(nodeBefore.marks)) {
        const textLength = nodeBefore.isText ? nodeBefore.text!.length : 0;
        tr = tr.addMark($pos.pos - textLength, $pos.pos, markType.create(attrs));
      }

      if (nodeAfter && markType.isInSet(nodeAfter.marks)) {
        const textLength = nodeAfter.isText ? nodeAfter.text!.length : 0;
        tr = tr.addMark($pos.pos, $pos.pos + textLength, markType.create(attrs));
      }

      dispatch(tr.scrollIntoView());
    }

    return true;
  }
};
