/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly REACT_APP_API: string;
    readonly REACT_APP_ENDPOINT: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  