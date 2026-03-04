import { onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vitepress';

/**
 * Adds a fade-in effect to images as they load.
 * Images start transparent via CSS and receive a 'loaded' class
 * once their content is available.
 */
export default function useImageFade() {
    const route = useRoute();

    function initImages() {
        const images = document.querySelectorAll<HTMLImageElement>(
            '.vp-doc img, .home-image img'
        );

        for (const img of images) {
            if (img.complete && img.naturalHeight > 0) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', onLoad);
                img.addEventListener('error', onLoad);
            }
        }
    }

    function onLoad(e: Event) {
        const img = e.target as HTMLImageElement;
        img.classList.add('loaded');
        img.removeEventListener('load', onLoad);
        img.removeEventListener('error', onLoad);
    }

    onMounted(() => {
        initImages();
    });

    watch(() => route.path, () => {
        // Small delay to let VitePress render new page content
        requestAnimationFrame(initImages);
    });
}
