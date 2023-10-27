const { defineConfig } = require("cypress");

const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",


    // baseUrl: "https://api.realworld.io",
    // baseUrl:"https://conduit.productionready.io",
    baseUrl: "https://opensource-demo.orangehrmlive.com/web/index.php",

    setupNodeEvents(on, config) {
      allureWriter(on, config);

      return config;
    },

    env: {
      allure: true,
      download_dir: "./cypress/downloads",
      allureResulsPath: "allure-results",
      snapshotOnly: true
    },

    videosFolder: "allure-results/",
    screenshotOnRunFailure: true,
  },
});