import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import basicSsl from "@vitejs/plugin-basic-ssl"

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  vite:{
    plugins:[basicSsl()],
    server:{
      https: import.meta.env.DEV,
    }
  }
});