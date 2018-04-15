import React from 'react';
import rehypeReact from 'rehype-react';

import CodeSandbox from './CodeSandbox';

const RenderDoc = new rehypeReact({
  createElement: React.createElement,
  components: {
    'code-sandbox': CodeSandbox
  }
}).Compiler;

export default RenderDoc;
