import { Attrs, MarkType } from "prosemirror-model";
import { Command, TextSelection } from "prosemirror-state";

export const addMark = (
  markType: MarkType,
  attrs: Attrs | null = null,
): Command => {
  return (state, dispatch) => {
    let { empty, $cursor, ranges } = state.selection as TextSelection;
    if ((empty && !$cursor)
    // || !markApplies(state.doc, ranges, markType)
    ) {
      return false;
    }

    if (dispatch) {
      if ($cursor) {
        dispatch(state.tr.addStoredMark(markType.create(attrs)));
      } else {
        let tr = state.tr;
        for (let i = 0; i < ranges.length; i++) {
          const { $from, $to } = ranges[i];
          let from = $from.pos,
            to = $to.pos,
            start = $from.nodeAfter,
            end = $to.nodeBefore;
          let spaceStart = start && start.isText ? /^\s*/.exec(start.text!)![0].length : 0;
          let spaceEnd = end && end.isText ? /\s*$/.exec(end.text!)![0].length : 0;
          if (from + spaceStart < to) {
            from += spaceStart;
            to -= spaceEnd;
          }
          tr = tr.addMark(from, to, markType.create(attrs));
        }
        dispatch(tr.scrollIntoView());
      }
    }

    return true;
  };
}
