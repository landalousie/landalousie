import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

import tailwindcss from '@tailwindcss/vite';
import { nitro } from 'nitro/vite';

const config = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      devtools(),
      nitro(),
      tailwindcss(),
      tanstackStart({
        prerender: {
          enabled: true,
        },
        sitemap: {
          enabled: true,
          host: env.SITE_URL,
        },
      }),
      viteReact(),
    ],
    server: {
      allowedHosts: ['host.docker.internal'],
    },
  };
});

export default config;
