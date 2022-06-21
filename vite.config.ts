import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import eslint from 'vite-plugin-eslint';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'REACT_APP_');
  let isProd: boolean = false, isDev: boolean = false;
  if(mode === 'development') {
    isDev = true;
  } else {
    isProd = true;
  }

  return {
    plugins: [
      react(),
      isDev && eslint(),
      isProd && legacy() 
    ],
    envPrefix: "REACT_APP_",
    define: {
      'process.env': {
        ...env
      }
    },
    preview: {
      port: 3000
    },
    build: {
      manifest: "asset-manifest.json",
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name.split('.')[1];
            if (/png|jpe?g|webp|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = 'img';
            }

            return `assets/${extType}/[name]-[hash][extname]`;
          },
          chunkFileNames: 'assets/js/chunks/[name]-[hash].js',
          entryFileNames: 'assets/js/main-[hash].js',
        }
      }
    }
  };
})