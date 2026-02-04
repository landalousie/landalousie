import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import tailwindcss from '@tailwindcss/vite';
import { nitro } from 'nitro/vite';

const config = defineConfig({
  nitro: {
    rollupConfig: {
      external: ['winston', 'winston-transport'],
    },
  },
  plugins: [devtools(), nitro(), tailwindcss(), tanstackStart(), viteReact()],
  server: {
    allowedHosts: ['host.docker.internal'],
  },
});

export default config;
