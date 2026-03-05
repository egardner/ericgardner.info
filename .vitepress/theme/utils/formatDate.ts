export default function ( date: string, short = false ) {
    const d = new Date( date );
    const day = d.getDate();
    const month = d.toLocaleString( 'en', { month: short ? 'short' : 'long' } );
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
}
