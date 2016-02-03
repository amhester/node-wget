#!/usr/bin/env node

"use strict";

const program = require('commander');
const request = require('request');
const path = require('path');
const fs = require('fs');

program
    .version('0.1.0')
    .option('-u --url [url]', 'The url used to fetch.')
    .option('-d --destination [dest]', 'The directory to output the file to.')
    .parse(process.argv);

if(program.url) {
    let p;

    if(program.destination) {
        p = path.join(program.destination, path.parse(program.url).base);
    } else {
        p = path.parse(program.url).base;
    }

    request(program.url).pipe(fs.createWriteStream(p));

} else {
    console.log('Url is required for wget. See --help for more info.');
}