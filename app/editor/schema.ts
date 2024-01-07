import { Schema } from "prosemirror-model";

export const schema = new Schema({
  nodes: {
    doc: {
      content: 'block+',
    },
    paragraph: {
      content: 'inline*',
      group: 'block',
      parseDOM: [{ tag: 'p' }],
      toDOM() {
        return ['p', 0];
      }
    },
    text: {
      group: 'inline',
    }
  },
  marks: {
    em: {
      parseDOM: [{ tag: 'i' }, { tag: 'em' }, { style: 'font-style=italic' }],
      toDOM() {
        return ['em', 0];
      },
    },
    strong: {
      parseDOM: [
        { tag: 'strong' },
        // Workaround for Google Docs
        {
          tag: 'b',
          getAttrs: (node: string | HTMLElement) =>
            typeof node !== 'string' && node.style.fontWeight !== 'normal' && null,
        },
        {
          style: 'font-weight',
          getAttrs: (value: string | HTMLElement) =>
            typeof value === 'string' && /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null,
        },
      ],
      toDOM() {
        return ['strong', 0];
      }
    },
    underline: {
      parseDOM: [{ tag: 'u' }],
      toDOM() {
        return ['u', 0];
      }
    },
    color: {
      attrs: {
        color: {},
      },
      parseDOM: [
        {
          tag: 'span',
          getAttrs: (dom: string | HTMLElement) => {
            if (typeof dom === 'string') {
              return false;
            }
            const { color } = dom.style;
            if (!color) {
              return false;
            }
            return { color };
          },
        },
      ],
      toDOM(mark) {
        const { color } = mark.attrs;
        return ['span', { style: `color: ${color}` }, 0];
      }
    },
  },
});
