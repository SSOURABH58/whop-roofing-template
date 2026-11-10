// @cloudflare/vite-plugin
import { whop } from '@whop/cli/vite'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    whop({ disableTanstackDevtools: true }),react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      NEXT_PUBLIC_WHOP_APP_ID: JSON.stringify(process.env.NEXT_PUBLIC_WHOP_APP_ID || ''),
      NEXT_PUBLIC_PLAN_INSPECTION: JSON.stringify(process.env.NEXT_PUBLIC_PLAN_INSPECTION || 'plan_inspection_149'),
      NEXT_PUBLIC_PLAN_DEPOSIT: JSON.stringify(process.env.NEXT_PUBLIC_PLAN_DEPOSIT || 'plan_deposit_500'),
      NEXT_PUBLIC_PLAN_TUNEUP: JSON.stringify(process.env.NEXT_PUBLIC_PLAN_TUNEUP || 'plan_tuneup_299'),
      NEXT_PUBLIC_WHOP_PIXEL_ID: JSON.stringify(process.env.NEXT_PUBLIC_WHOP_PIXEL_ID || 'px_apexroof_prod'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    target: 'esnext',
    sourcemap: true,
  },
});
