---
title: Sunshine in Old Town
date: 2026-03-05
prev:
  text: Knowledge Management in the Age of AI
  link: /notes/knowledge-management-june-2025
---
<script setup>

import image1 from '/images/L1008454-1.jpg?w=1000';
import image2 from '/images/L1008411-1.jpg?w=1000';
import image3 from '/images/L1008402.jpg?w=1000';
import image4 from '/images/L1008449-1.jpg?w=1000';
import image5 from '/images/L1008461-1.jpg?w=1000';


const images = [
    { src: image1, alt: 'Person walking a dog past a City of Roses mural with Chinese characters on a green building' },
    { src: image2, alt: 'Wooden double doors numbered 122 on a Victorian-era storefront with ornate columns' },
    { src: image3, alt: 'Man walking past a boarded-up Old Town building with a red lamp post and floral mural' },
    { src: image4, alt: 'Chinatown gate building covered in colorful murals and graffiti on a quiet street corner' },
    { src: image5, alt: 'Row of boarded-up Victorian storefronts with cast-iron columns along an empty sidewalk' },
];
</script>

Caught a brief sliver of sun in Old Town Portland last weekend.

City of Roses • 玫瑰之城

<div v-for="image in images">
    <Figure :src="image.src" :alt="image.alt" />
</div>
