'use client';

import { useState } from 'react';
import { Editor } from './Editor';

const INITIAL_HTML = `<p>React</p>`;

export default function Page() {
  const [html, setHtml] = useState(INITIAL_HTML);


  return (
    <div>
      <Editor
        initialHtml={html}
        onChangeHtml={(newHtml) => {
          setHtml(newHtml);
        }}
      />
      <div>
        <h3>HTML</h3>
        <div>{html}</div>
      </div>
      <div className='preview'>
        <h3>プレビュー</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
      </div>
    </div>
  );
}
