declare module 'react-syntax-highlighter' {
  import * as React from 'react';
  export class Prism extends React.Component<any, any> {}
  export class Light extends React.Component<any, any> {}
}

declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
  const tomorrow: any;
  const oneLight: any;
  export { tomorrow, oneLight };
}

declare module 'scratchblocks-react' {
  import * as React from 'react';
  const ScratchBlocks: React.ComponentType<any> & {
    render: (code: string, options?: any) => HTMLElement;
  };
  export default ScratchBlocks;
}

declare module 'react-diff-viewer' {
  import * as React from 'react';
  interface ReactDiffViewerProps {
    oldValue: string;
    newValue: string;
    splitView?: boolean;
    leftTitle?: string;
    rightTitle?: string;
    showDiffOnly?: boolean;
    styles?: any;
    [key: string]: any;
  }
  const ReactDiffViewer: React.ComponentType<ReactDiffViewerProps>;
  export default ReactDiffViewer;
}
