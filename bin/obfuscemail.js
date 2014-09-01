#!/usr/bin/env node

/* Parse arguments */
var args = require('minimist')(process.argv.slice(2));

/* Check for email */
if (!args.e) {
  console.error('No email specified. Please specify with -e <address>');
  process.exit(1);
}
/* Check for text */
else if (!args.t) {
  console.error('No text specified. Please specify with -t <link text>');
  process.exit(1);
}
/* Validate the email address */
else if (!require('validator').isEmail(args.e)) {
  console.error('Invalid email address');
  process.exit(1);
}

var generator = require('../src');

var mailto = args.e;

/* Add a subject if specified */
if (args.s) {
  mailto += '?subject=' + encodeURIComponent(args.s);
}

/* Generate the js */
var js = generator.generate(mailto, args.t);

/* Wrap in script tags */
js = '<script>' + js + '</script>';

/* Print out */
console.log(js);
