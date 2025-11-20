interface Window {
  Telegram?: {
    WebApp: {
      initData: string;
      ready: () => void;
      initDataUnsafe?: {
        user?: {
          first_name?: string;
          last_name?: string;
          id?: number;
          username?: string;
        };
      };
    };
  };
}

declare module '*.svg?react' {
  import * as React from 'react';
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
