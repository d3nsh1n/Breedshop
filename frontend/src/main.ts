import { createApp } from "vue";
import App from "./App.vue";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: "dark",
        themes: {
            dark: {
                colors: {
                    primary: "#1976D2",
                    secondary: "#424242",
                    accent: "#82B1FF",
                },
            },
        },
    },
});

createApp(App).use(vuetify).mount("#app");
