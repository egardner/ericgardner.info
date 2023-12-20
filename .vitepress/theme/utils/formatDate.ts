export default function ( date: Date ) {
    return date.toLocaleDateString( 'EN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    } );
}
