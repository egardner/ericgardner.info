#!/usr/bin/env node

/**
 * @file resize-images.js
 * @example npm run resize
 * @example node .bin/resize-images.js images/photo.jpg images/other.jpg
 *
 * Resizes images so the longest edge is at most 3000px. Idempotent: images
 * already within the limit are skipped (no re-encoding, no quality loss).
 *
 * When called with file path arguments, processes only those files.
 * When called with no arguments, scans the images/ directory recursively.
 */

import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const MAX_DIMENSION = 3000;
const JPEG_QUALITY = 85;
const IMAGE_EXTENSIONS = new Set( ['.jpg', '.jpeg', '.png'] );

async function findImages( dir ) {
    const entries = await readdir( dir, { withFileTypes: true, recursive: true } );
    return entries
        .filter( e => e.isFile() && IMAGE_EXTENSIONS.has( path.extname( e.name ).toLowerCase() ) )
        .map( e => path.join( e.parentPath, e.name ) );
}

function formatSize( bytes ) {
    if ( bytes >= 1024 * 1024 ) {
        return ( bytes / ( 1024 * 1024 ) ).toFixed( 1 ) + 'MB';
    }
    return ( bytes / 1024 ).toFixed( 0 ) + 'KB';
}

async function resizeImage( filePath ) {
    const meta = await sharp( filePath ).metadata();
    const longest = Math.max( meta.width, meta.height );

    if ( longest <= MAX_DIMENSION ) {
        return false;
    }

    const sizeBefore = ( await stat( filePath ) ).size;

    const resized = sharp( filePath )
        .rotate() // auto-orient from EXIF before stripping metadata
        .resize( {
            width: meta.width >= meta.height ? MAX_DIMENSION : undefined,
            height: meta.height > meta.width ? MAX_DIMENSION : undefined,
            withoutEnlargement: true
        } );

    const ext = path.extname( filePath ).toLowerCase();
    if ( ext === '.png' ) {
        resized.png();
    } else {
        resized.jpeg( { quality: JPEG_QUALITY } );
    }

    const buffer = await resized.toBuffer();
    const { writeFile } = await import( 'node:fs/promises' );
    await writeFile( filePath, buffer );

    const sizeAfter = buffer.length;
    const newMeta = await sharp( filePath ).metadata();

    console.log(
        `  ${path.relative( process.cwd(), filePath )}: ` +
        `${meta.width}×${meta.height} (${formatSize( sizeBefore )}) → ` +
        `${newMeta.width}×${newMeta.height} (${formatSize( sizeAfter )})`
    );

    return true;
}

// Main
const files = process.argv.slice( 2 );
let imagePaths;

if ( files.length > 0 ) {
    imagePaths = files.filter( f => IMAGE_EXTENSIONS.has( path.extname( f ).toLowerCase() ) );
} else {
    const imagesDir = path.resolve( process.cwd(), 'images' );
    imagePaths = await findImages( imagesDir );
}

let resizedCount = 0;

for ( const filePath of imagePaths ) {
    const absPath = path.isAbsolute( filePath ) ? filePath : path.resolve( process.cwd(), filePath );
    try {
        const didResize = await resizeImage( absPath );
        if ( didResize ) resizedCount++;
    } catch ( err ) {
        console.error( `  Error processing ${filePath}: ${err.message}` );
    }
}

if ( resizedCount > 0 ) {
    console.log( `\nResized ${resizedCount} image${resizedCount === 1 ? '' : 's'}.` );
}
