import * as cheerio from 'cheerio';

/**
 * Use Cheerio to perform some transformations on the rendered output
 * of each page to make it suitable for inclusion in an RSS feed.
 *
 * @param htmlString
 * @return string|null
 */
export default function formatPageContentForRSS( htmlString: string, hostname: string ) : string | null {
    const $ = cheerio.load( htmlString );
    const images = $( 'figure img' );
    images.each( function() {
        const current = $( this ).attr( 'src' );
        $( this ).attr( 'src', `${hostname}${current}` );
    } );

    return $( 'main' ).html();
}