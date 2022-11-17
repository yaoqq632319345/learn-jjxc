import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    viewportWidth: 1400,
    viewportHeight: 800,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('before:browser:launch', (...arg) => {
        console.log(arg);
      });
    }
  }
});
