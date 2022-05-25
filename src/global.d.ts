declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;
      MONGO_URI: string;
      REACT_APP_ENDPOINT: string;
    }
}

declare module '*.jpg' {
  const value: string;
  export = value;
};

declare module '*.svg' {
  const value: string;
  export = value;
};

declare module '*.webp' {
  const value: string;
  export = value;
};