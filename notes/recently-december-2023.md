---
title: "Recently"
date: 2023-12-23 00:00:00 -8
category: personal
next:
  text: Blogging with Vitepress
  link: /notes/blogging-with-vitepress-january-2024
prev:
  text: Hello World
  link: /notes/hello-world
---
<script setup>
import image1 from '/images/DSCF6909.jpg?w=900';
import image2 from '/images/DSCF7037.jpg?w=900';
import image3 from '/images/DSCF4764.jpg?w=900';
</script>

<Figure :src="image1" caption="View of Coit Tower from my hotel room in San Francisco" />

Hello there. It's been a while. The last update to this site was more than a year ago, in
May of 2022. Now it's almost the end of 2023 and I'm finally able to devote some energy 
into this project once again.

The intervening 19 months have been busy. Learning how to take care of a new baby and
be a parent, taking parental leave and then returning to work, navigating childcare, buying
and selling a house... it's been an eventful time.

Fully summarizing that time is beyond the scope of this blog post. Instead, I'm going to take
a cue from [some writers](https://macwright.com) [that I admire](https://www.kostaharlan.net) 
and begin posting "recent update" posts that that summarize what I've been doing / reading / 
thinking about over the last month or two. Even if no other human ever looks at this website, 
I think it will be useful for me to be able to look back and see what was on my mind at a 
given point in time.

## Work

Next month will mark my 5th year at the [Wikimedia Foundation](https://wikimedia.org). For
the last 2 years or so, I've been a member of the 
[Design Systems Team](https://www.mediawiki.org/wiki/Design_Systems_Team) at the Foundation, 
and I'm very proud of the work that my team has been doing. We recently released version 
1.0 of [Codex](https://doc.wikimedia.org/codex/latest/), Wikimedia's new design system. 
We've also been working to improve the front-end development experience in MediaWiki itself.

In November, I attended my first in-person meeting with colleagues since the pandemic. It was
great to finally meet some folks in person that I had been working with for years. This meeting
coincided with the [APEC 2023 summit](https://en.wikipedia.org/wiki/APEC_United_States_2023) 
(both Joe Biden and Xi Jinping where in the city during our visit). San Francisco was full of 
cops and seemed like a quasi police-state.

<Figure :src="image2" caption="Police motorcyles outside of a dim sum restaurant in Chinatown" />

## Website updates

I've updated this site in the hopes of making it easier to maintain in the future. Over the 
years I have experimented with various blogging tools (Jekyll, Middleman, Astro, Hugo),
but I've come to the conclusion that I should try to align the tech stack used here with what
I'm using in my day job; I don't really have time right now to become familiar with
a bunch of different web publishing tools just for fun. To that end, I've migrated this site
to [Vitepress](https://vitepress.dev). This allows me to leverage my existing knowledge of
[Vue.js](https://vuejs.org) and [Vite](https://vitejs.dev). I can also use Typescript as much 
(or as little) as desired, which is nice.

The default Vitepress theme gives you a fair amount out of the box (responsive layout, color 
theme switching, sane routing defaults, SSR, various performance optimizations).  It's also 
very easy to customize if you are familiar with Vue. So far my biggest customization
has been to generate an RSS feed that includes the rendered output of Vue components embedded
in markdown files, which I should write about at some point. In the future I hope to build 
out more interactive UI elements for viewing photos and galleries too, as I'd like to use this 
site as a platform to showcase some of my photography outside the confines of social media.

## Personal updates

<Figure :src="image3" caption="Iris at the Christmas tree farm" />

Iris is 20 months old now. She's currently in a really interesting stage of development 
where her language and communication skills appear to be increasing exponentially. She can 
understand (and say!) her own name and is generally able to convey what she wants pretty 
effectively. She's a lot of fun to be around.

Parenting a toddler doesn't leave a ton of time for other activities, but I did find the
time to attend a series of classes this fall on the fundamentals of Buddhism. They were
held at the [Dharma Rain Zen Center](https://dharma-rain.org), a Portland-based Zen 
Buddhist community whose facility is very close to my home. I've been interested
in mindfulness and meditation over the last few years (these are somewhat trendy topics 
in the tech world nowadays). There's something very intriguing about seeing these 
practices in their wider context (traditions, ethics, etc).  This form of Buddhism does 
not seem to require belief in any supernatural phenomena, which is a big plus for me. 
I've historically been pretty hostile to religions of all kinds, but I'm starting to 
think that there may be something here worth engaging with. This is something I hope
to write about more in the future.

## Gaza

Like much of the world, I've been watching the crisis in Palestine unfold over
the last few months with despair and horror. Many others have spoken [eloquently][1] 
and [authoritatively][2] about this, so I will be brief. The Israeli military is 
perpetrating a terrible crime against the people of Gaza. Calling it a war or a military 
operation does a disservice to the facts: [more than 20,000 dead][3], including 
thousands of children. [85 percent of the population displaced.][4] Schools and 
[hospitals][8] under seige or destroyed. [Dozens of journalists killed][5]. 
[Academics][6] [deliberately targeted][7]. Denial of [food][9], water, electricity, 
[internet access][10].

The Hamas attack of October 7 was barbaric; the Israeli response has surpassed
it by an order of magnitude. [It's long past time for a ceasefire](https://www.ceasefiretrack.com).

[1]: https://blog.paulbiggar.com/i-cant-sleep/
[2]: https://unsco.unmissions.org/sites/default/files/sg_remarks_to_the_security_council_-_on_the_situation_in_the_middle_east_including_the_palestinian_question.pdf
[3]: https://www.npr.org/2023/12/22/1220211690/gaza-death-toll-20000-killed-israel
[4]: https://www.hrw.org/news/2023/12/20/most-gazas-population-remains-displaced-and-harms-way
[5]: https://cpj.org/2023/12/journalist-casualties-in-the-israel-gaza-conflict/
[6]: https://en.wikipedia.org/wiki/Refaat_Alareer
[7]: https://euromedmonitor.org/en/article/6014
[8]: https://en.wikipedia.org/wiki/Al-Shifa_Hospital_siege
[9]: https://www.bbc.com/news/world-middle-east-67670679
[10]: https://wikimediafoundation.org/news/2023/12/05/wikimedia-foundation-calls-for-unrestricted-internet-connectivity-and-access-to-knowledge-in-gaza/