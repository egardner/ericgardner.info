<template>
    <div class="start-page">
        <Transition name="fade">
            <Gallery :images="images" />
        </Transition>
    </div>
</template>

<script>
import { ref, defineComponent } from 'vue';

export default defineComponent( {
    name: 'StartLayout',

    setup() {
        const ready = ref( false );
        const images = ref( [] );
        const imageData = import.meta.glob( '/images/discontentment/*.jpg', {
            query: { h: '450;800' }
        } );

        const pending = Object.values( imageData ).map( img => img() );

        Promise.all( pending ).then( data => {
            data.forEach( image => {
                images.value.push( {
                    src: image.default[ 0 ],
                    srcset: `${image.default[ 0 ]} 450w, ${image.default[ 1 ]} 800w`,
                    sizes: '(max-width: 600px) 450px, 800px'
                } );
            } );

            ready.value = true;
        } );

        return {
            ready,
            images
        };
    }

} );
</script>

<style>
.start-page {
    height: 100%;
    display: grid;
    grid-area: main;
    grid-template-columns: var(--content-grid);
    align-self: center;
    justify-self: center;
}
</style>