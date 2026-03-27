// @ts-check
import { defineConfig } from 'astro/config';

// Update `site` to your GitHub Pages URL before deploying:
//   User/org page (username.github.io): set site, leave base as '/'
//   Project page (username.github.io/repo-name): set site AND base
export default defineConfig({
  site: 'https://YOUR-USERNAME.github.io',
  base: '/',
  publicDir: '../web_assets',
  output: 'static',
});
