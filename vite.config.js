import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';

dotenv.config();

const { VITE_API_KEY } = process.env;

export default defineConfig({
  plugins: [
    react(),
    // Çevre değişkenlerini JavaScript dosyalarına yerleştirme
    replace({
      'process.env.VITE_API_KEY': JSON.stringify(VITE_API_KEY),
    }),
  ],
});
