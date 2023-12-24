---
title: Lan Su Garden
date: 2021-11-11 00:00:00 -8
category: personal
preview_image: DSCF0842.jpg
prev:
  text: At the Dahlia Farm
  link: /notes/dahlia-farm
next:
  text: Hello World
  link: /notes/hello-world
---
<script setup>
import image1 from '/images/DSCF0842.jpg?w=900';
import image2 from '/images/DSCF0818.jpg?w=900';
import image3 from '/images/DSCF0855.jpg?w=900';
import image4 from '/images/DSCF0861.jpg?w=900';
import image5 from '/images/DSCF0893.jpg?w=900';
import image6 from '/images/DSCF0819.jpg?w=900';

const images = [
    { src: image1, alt: 'Lan Su Chinese Garden' },
    { src: image2, alt: 'Koi fish in the pond' },
    { src: image3, alt: 'Lan Su Chinese Garden' },
    { src: image4, alt: 'Lan Su Chinese Garden' },
    { src: image5, alt: 'Lan Su Chinese Garden' },
    { src: image6, alt: 'Lan Su Chinese Garden' },
];
</script>

Last weekend I made it out to the [Lan Su Chinese
Garden](https://www.lansugarden.org) for the first time in over a year. I used
to work in this neighborhood back when I was at [Rumors](https://rumo.rs) (RIP),
and used to have a membership so I could come by on lunch breaks or whenever I
had some spare time during the day.

The Old Town area has fallen on some
[pretty rough times](https://www.lansugarden.org/news-and-announcements/post/act-now-to-save-old-town-an-update)
since then, but the garden itself is still worth a visit. An island of
tranquility in a city that is anything but these days.

<div v-for="image in images">
    <Figure :src="image.src" :alt="image.alt" />
</div>