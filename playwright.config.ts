import { defineConfig } from '@playwright/test';

const isCI = process.env.CI === 'true';

export default defineConfig({
  testDir: './tests',
  reporter: [['html'], ['list']],
  use: {
    baseURL: isCI
      ? 'file:///home/runner/work/immopruf/immopruf/app/index.html'
      : 'file:///C:/Users/Steve/Desktop/immopruf/app/index.html',
    headless: true,
  },
});