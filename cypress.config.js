const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'v8idi1',
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/tests/**/*.spec.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/index.js',
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' && browser.isHeadless) {
          launchOptions.args.push('--window-size=720,480');
          launchOptions.args.push('--force-device-scale-factor=1');
        }

        if (browser.name === 'electron' && browser.isHeadless) {
          launchOptions.preferences.width = 320;
          launchOptions.preferences.height = 480;
        }

        if (browser.name === 'firefox' && browser.isHeadless) {
          launchOptions.args.push('--width=1400');
          launchOptions.args.push('--height=1200');
        }

        return launchOptions;
      });
    },
  },
});
