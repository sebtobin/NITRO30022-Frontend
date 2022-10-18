import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "dtp3p7",
  
  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      // include any other plugin code...
      
      // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config
    },
    baseUrl: 'http://ec2-52-63-2-179.ap-southeast-2.compute.amazonaws.com/'
  },

  viewportWidth: 2560,
  viewportHeight: 1440
});
