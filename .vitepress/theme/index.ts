// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import CustomLayout from './layouts/CustomLayout.vue';
import StartLayout from './layouts/StartLayout.vue';
import Gallery from './components/Gallery.vue';
import Figure from './components/Figure.vue';
import './style.css';

export default {
    extends: DefaultTheme,
    Layout: CustomLayout,
    enhanceApp({ app, router, siteData }) {
        app.component( 'start', StartLayout );
        app.component( 'Gallery', Gallery );
        app.component( 'Figure', Figure );
    }
} satisfies Theme
