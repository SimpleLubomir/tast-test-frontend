import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createVuetify } from 'vuetify';

export default defineNuxtPlugin((nuxtApp) => {
	const vuetify = createVuetify({
		components,
		directives,
		ssr: true,
		theme: {
			themes: {
				light: {
					colors: {
						primary: '#00226c',
						error: '#ff6b6b',
					},
				},
			},
		},
	});

	nuxtApp.vueApp.use(vuetify);
});
