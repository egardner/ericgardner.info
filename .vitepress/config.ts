import path from 'path';
import { writeFileSync } from 'fs';
import { Feed } from 'feed';
import { defineConfig, createContentLoader, type SiteConfig } from 'vitepress';
import { imagetools } from 'vite-imagetools';
import formatPageContentForRSS from './theme/utils/formatPageContentForRSS';

const hostName: string = 'https://ericgardner.info';
const siteTitle = 'Eric Gardner';
const siteDescription = 'My personal website';
const siteCopyright = 'Copyright © 2020-present Eric Gardner';

// This is the only directory we care about including in our RSS feed for now
const blogDir = 'notes';
const formattedPagesForRSS: Record<string, string> = {};

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: siteTitle,
    description: siteDescription,
    cleanUrls: true,
    vite: { plugins: [ imagetools() ] },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Notes', link: '/notes' },
            // { text: 'Photography', link: '/photos' },
            { text: 'About', link: '/about' }
        ],
        outline: false,
        aside: false,
        socialLinks: [
            { icon: 'instagram', link: 'https://www.instagram.com/ec_gardner/' },
            { icon: 'github', link: 'https://github.com/egardner' },

        ],
        footer: {
            message: 'All views expressed are my own',
            copyright: siteCopyright
        }
    },

    transformHtml(_code, _id, { content, pageData } ) {
        const { filePath } = pageData;
        const dirname = path.dirname( filePath );
        const basename = path.basename( filePath, '.md' );

        if ( dirname === blogDir ) {
            const html = formatPageContentForRSS( content, hostName );
            if ( html ) {
                formattedPagesForRSS[ `/${dirname}/${basename}` ] = html;
            }
        }
    },

    buildEnd: async ( config ) => {
        const feed = new Feed( {
            title: siteTitle,
            description: siteDescription,
            id: hostName,
            link: hostName,
            copyright: siteCopyright,
            language: 'en',
        } );

        const posts = await createContentLoader( `/${blogDir}/*.md`, {
            render: true,
            includeSrc: true,
            transform ( rawData ) {
                return rawData.sort( ( a, b ) => {
                    return +new Date( b.frontmatter.date ).getTime() - +new Date( a.frontmatter.date ).getTime()
                } );
            }
        } ).load();

        for ( const { url, excerpt, frontmatter, html } of posts ) {
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

        writeFileSync( path.join( config.outDir, 'feed.rss' ), feed.rss2() );
    }
});
