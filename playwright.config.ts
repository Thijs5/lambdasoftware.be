import { defineConfig, devices } from '@playwright/test';

// Visual regression harness: builds and serves the production output (not
// the dev server) so screenshots reflect what actually ships.
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  webServer: {
    // Serves the built dist/ directly with a plain static server rather
    // than `astro preview`: Astro 7's preview command is now a lock-guarded
    // singleton (`astro preview stop/status/logs`), and an orphaned
    // previous run — e.g. a kill signal that didn't reach the process on
    // Windows — leaves a stale lock that makes the next `astro preview`
    // just print status and exit instead of serving, which crashes this
    // webServer. sirv has no such lifecycle to fight.
    command: 'npm run build && npx sirv dist --port 4321 --quiet',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
