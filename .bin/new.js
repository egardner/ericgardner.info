#!/usr/bin/env node

/**
 * @file new.js
 * @example npm exec new "My Blog Post Title"
 * 
 * A simple node.js script to scaffold a new blog post in the "notes" directory.
 * Expects a single human-readable post title as its argument( "My Post Title").
 * This generates a new markdown file in the notes directory using the provided
 * title (in camelcase) as the filename, with month name and year appended. This
 * file will contain some basic YAML frontmatter with the original title and 
 * a standardized version of today's date.
 */

import { writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { Buffer } from 'node:buffer';
import chalk from 'chalk';
import path from "node:path";
const { log, error } = console;

// Get today's date and stash a dumb array of month names
const today = new Date();
const months = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
];

// Get the title of the post based on the provided input
const title = process.argv[ 2 ];
let kebabTitle = '';
if ( title ) {
    kebabTitle = title
        .replace( ' ', '-' )
        .toLowerCase()
        .concat( '-', months[ today.getMonth() ] )
        .concat( '-', today.getFullYear() )
        .concat( '.md' )
} else {
    error( chalk.red.bold( 'Error: ') + 'Please provide a title for the post.' );
    process.exit( 1 );
}


// Set up the frontmatter for the file
const template = `---
title: ${title}
date: ${today.toISOString()}
---

Hello world!
`
// Write the file to disk (after testing to ensure a file of the same name does
// not already exist)
const blogDir = path.resolve( '.', 'notes' );
if ( existsSync( path.join( blogDir, kebabTitle ) ) ) {
    error( chalk.red.bold('Error: ') + 'Please use a unique name for the blog post' );
    process.exit( 1 );
}

try {
    const data = new Uint8Array( Buffer.from( template ) );
    const promise = writeFile( path.join( blogDir, kebabTitle ), data );
    await promise;
} catch ( err ) {
    console.error( err );
}

log( 'Created: ' + chalk.green( kebabTitle ) + ' in ' + chalk.green( path.relative( process.cwd(), blogDir ) ) );
