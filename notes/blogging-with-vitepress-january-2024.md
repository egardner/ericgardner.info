---
title: Blogging with Vitepress
date: 2024-01-02T19:41:00Z
prev:
  text: Recently
  link: /notes/recently-december-2023
next:
  text: Recently
  link: /notes/recently-february-2024
---

Happy new year!

In my [most recent update post](./recently-december-2023.md), I mentioned that I
had migrated this blog over to [Vitepress](https://vitepress.dev), a promising
but relatively new static site generator powered by [Vue.js](https://vuejs.org)
and [Vite](https://vitejs.dev). I'm already familiar with these tools (we use
all of them in [Codex](https://doc.wikimedia.org/codex/main/)), so it made sense
to try using the same setup here.

### Tuning the Default Theme

I've used a lot of static-site generator tools over the years. One of my common
struggles with these tools is designing a custom theme from scratch – I guess I
am a design snob, because I was never happy with the out-of-the-box results from
Jekyll, Hugo, etc.

Crafting a responsive, elegant website layout that works well for all possible
devices and viewport sizes is actually a daunting task. CSS is far more capable
than it used to be, but there are also a lot more use-cases you have to consider
and work around (don't even get me started on the frustrating way that Mobile
Safari interacts with full-height elemenents as its toolbars appear and
disappear).

To my surprise, the default theme that Vitepress ships with is actually quite
nice.  Even better, 
[it is very customizable](https://vitepress.dev/guide/extending-default-theme). 
A lot of things like navigation elements and sidebars can be switched off in the
config file.

```js
export default {
    title: 'My Blog',
    description: 'My Personal Website',

    themeConfig: {
        logo: '/logo.svg',
        nav: [...],
        outline: false,
        sidebar: false
    }
}
```

You can see the full list of theme configuration options 
[here](https://vitepress.dev/reference/default-theme-config).

### Layout Slots

The default theme's `<Layout/>` component accepts a 
[variety of slots](https://vitepress.dev/guide/extending-default-theme#layout-slots) 
that can be used to inject arbitrary content. In my case, I wanted to include a
custom `<PageHeader/>` component at the top of every blog post. I was able to
use the `#doc-before` slot to achieve this.

```vue
<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import PageHeader from '../components/PageHeader.vue';
const { Layout } = DefaultTheme
</script>

<template>
    <Layout>
        <template #doc-before> // [!code highlight]
            <PageHeader /> // [!code highlight]
        </template> // [!code highlight]
    </Layout>
</template>
```

To figure out how content would appear in various slots, I created a dummy
`<TestComponent/>` which drew a border around itself and tried dropping it in a
few different places.

```vue
<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import PageHeader from '../components/PageHeader.vue';
import TestComponent from '../components/TestComponent.vue';
const { Layout } = DefaultTheme
</script>

<template>
    <Layout>
        <template #doc-before>
            <PageHeader />
        </template>

        <template #layout-bottom> // [!code highlight]
            <TestComponent name="Layout bottom" /> // [!code highlight]
        </template> // [!code highlight]
    </Layout>
</template>
```

### RSS Feed Generation

Vitepress does not ship with the ability to generate an RSS feed automatically.
However, the docs do include some hints on how to implement such a feature.
Vitepress exposes a method called `createContentLoader` that can take a
directory full of markdown files and return an array of `ContentData` objects.
Non-markdown files are ignored. I'm using this feature to generate the index of
blog posts on the [Notes](../notes.md) page of my site. You can read more about
[createContentLoader](https://vitepress.dev/guide/data-loading#createcontentloader)
here.

Vitepress also exposes some 
[build hooks](https://vitepress.dev/reference/site-config#build-hooks) which 
you can access in your site config. The `buildEnd` hook is the relevant one for 
writing an RSS feed (I'm using the excellent [Feed](https://www.npmjs.com/package/feed)
library to help with this).

As an RSS maximalist, I want to include the full text of every post in my feed.
I also want to include images, but I'm using some custom Vue components to
display them.  The `ContentData` objects returned by `createContentLoader`
include the HTML output of plain markdown files, but vue components are not
rendered.

I needed to use a second build hook - `transformHtml`, to get the rendered HTML
output for each page, stash the parts I cared about, and then look up the
content for each page when `buildEnd` is fired to add that content to the feed.

```ts{7-9,14-30,43-52,56-59,66}
import path from 'path';
import { writeFileSync } from 'fs';
import { Feed } from 'feed';
import { defineConfig, createContentLoader, type SiteConfig } from 'vitepress';
import formatPageContentForRSS from './theme/utils/formatPageContentForRSS';

// Create a record object to stash fully-rendered page content from the
// transformHTML hook so that it can be accessed during the build end hook
const formattedPagesForRSS: Record<string, string> = {};

export default defineConfig( {
    // ...general config settings

    // transformHTML gets called for each page in the site, receiving a
    // `ContentData` object for that page as an argument
    transformHtml(_code, _id, { content, pageData } ) {
        const { filePath } = pageData;
        const dirname = path.dirname( filePath );
        const basename = path.basename( filePath, '.md' );

        if ( dirname === 'notes' ) {
            // custom helper method for formatting
            const html = formatPageContentForRSS( content, hostName );

            // stash the rendered page content into the record
            if ( html ) {
                formattedPagesForRSS[ `/${dirname}/${basename}` ] = html;
            }
        }
    },

    buildEnd: async ( config ) => {
        // set up a new Feed object with metadata
        const feed = new Feed( {
            title: siteTitle,
            description: siteDescription,
            id: hostName,
            link: hostName,
            copyright: siteCopyright,
            language: 'en',
        } );

        // Load data from all the blog markdown files, sorted by date
        const posts = await createContentLoader( `/notes/*.md`, {
            render: true,
            includeSrc: true,
            transform ( rawData ) {
                return rawData.sort( ( a, b ) => {
                    return +new Date( b.frontmatter.date ).getTime() - +new Date( a.frontmatter.date ).getTime()
                } );
            }
        } ).load();

        // Add items to the feed in order
        for ( const { url, excerpt, frontmatter, html } of posts ) {
            // Grab the full rendered page markup that we stashed earlier and use that instead of the
            // markdown-only HTML; this insures that any embedded Vue components are fully rendered.
            // Fall back on the markdown output if the full markup is not available for somre reason.
            const improvedHtml = formattedPagesForRSS[ url ];

            feed.addItem( {
                title: frontmatter.title,
                id: `${hostName}${url}`,
                link: `${hostName}${url}`,
                description: excerpt,
                content: improvedHtml || html,
                author: [
                    {
                        name: 'Eric Gardner',
                        email: 'gardner.ec@gmail.com',
                        link: 'https://ericgardner.info/about'
                    }
                ],
                date: frontmatter.date
            } );
        }

        // Write the RSS feed to disk
        writeFileSync( path.join( config.outDir, 'feed.rss' ), feed.rss2() );
    }

} );
```

You can see the full code for this
[here][def3]

### Custom Components

Vitepress's output is basically a Vue SPA with server-side rendering. 
Since everything is already part of a Vue application, adding your own custom
components is very simple. I created custom `<Gallery/>` and `<Figure/>`
components to display image content inside of my posts (mostly to save me the
effort of having to write out all the necessary markup by hand over and over
again). I also created a custom layout for the home page called `<StartLayout/>`.

In all of these cases I found it helpful to register the components globally in
`.vitepress/theme/index.ts`. For custom layout components this is necessary (I
registered my `<StartLayout/>` as `start` so that I could set `layout: start` in
YAML frontmatter).

```ts{12-16}
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
    enhanceApp({ app, _router, _siteData }) {
        app.component( 'start', StartLayout );
        app.component( 'Gallery', Gallery );
        app.component( 'Figure', Figure );
    }
} satisfies Theme
```

### Quality-of-life improvements

Some static site generators include handy little scripts to do things like
scaffold a new blog post with some frontmatter fields (title, date, etc)
pre-populated. Vitepress doesn't include anything like this, but it was easy
enough to use the Node.js filesystem API to write one. Just make sure to prepend
your file with `#!/usr/bin/env node` and add it to the [bin][def] property in `package.json`.

This allows me to start a new blog post by running `npm exec "Hello World"`; this
will create a new file called `notes/hello-world-january-2024.md` with some YAML
frontmatter predefined.

You can see the full code for this script [here][def2].


### Final thoughts

Vitepress is primarily designed for documentation websites, but with a little
bit of tweaking I'm finding that it works well for a personal blog too. I'm
pleased with the current setup that I've been able to achieve here so far. Most
importantly, I'm confident that I'll be able to continue to customize things
in order to suit my needs as I build out this site over the next few months.


[def]: https://docs.npmjs.com/cli/v10/configuring-npm/package-json#bin
[def2]: https://github.com/egardner/ericgardner.info/blob/main/.bin/new.js
[def3]: https://github.com/egardner/ericgardner.info/blob/main/.vitepress/config.ts