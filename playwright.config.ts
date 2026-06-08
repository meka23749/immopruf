import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'file:///C:/Users/Steve/Desktop/immopruf/app/index.html',
    headless: false,
  },
});