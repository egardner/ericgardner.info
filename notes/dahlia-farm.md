---
title: At the Dahlia Farm
date: 2021-09-04
category: personal
preview_image: DSCF3626.jpg
prev:
  text: Wynoochee Lake
  link: /notes/wynoochee-lake
next:
  text: Hello World
  link: /notes/hello-world
---
<script setup>
import image1 from '/images/DSCF3615.jpg?w=900';
import image2 from '/images/DSCF3626.jpg?w=900';
import image3 from '/images/DSCF3622.jpg?w=900';
import image4 from '/images/DSCF3665.jpg?w=900';
import image5 from '/images/DSCF3640.jpg?w=900';
import image6 from '/images/DSCF3621.jpg?w=900';

const images = [ {
    src: image1,
    alt: 'Laurel at the dahlia farm'
}, {
    src: image2,
    alt: 'Dahlias at the dahlia farm'
}, {
    src: image3,
    alt: 'Dahlias at the dahlia farm'
}, {
    src: image4,
    alt: 'Dahlias at the dahlia farm'
}, {
    src: image5,
    alt: 'Dahlias at the dahlia farm'
}, {
    src: image6,
    alt: 'Dahlias at the dahlia farm'
} ];
</script>

Laurel and I visited a dahlia farm outside of Portland this weekend. Here are a
few photos. All pictures taken with the Fuji X-T4, 23mm ƒ1.4 lens, and a Glimmerglass 1
filter.

<div v-for="image in images">
    <Figure :src="image.src" :alt="image.alt" />
</div>