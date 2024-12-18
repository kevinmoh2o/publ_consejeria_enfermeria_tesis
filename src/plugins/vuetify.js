import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createVuetify } from "vuetify";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'myTheme',
    themes: {
      myTheme: {
        colors: {
          background: '#FFFFFF',
          surface: '#FFFFFF',
          primary: '#6200EE',
          secondary: '#03DAC6',
          error: '#B00020',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
          customRed: '#ff0000',
          red: '#ee3b36',
          white: '#FFFFFF'
        }
      }
    }
  }
});

export default vuetify;
