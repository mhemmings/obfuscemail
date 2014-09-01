Obfuscemail
===========

[![Build Status](https://travis-ci.org/mhemmings/obfuscemail.svg?branch=master)]
(https://travis-ci.org/mhemmings/obfuscemail)

Adding contact email to your site is a great idea to allow people to contact
you easily. However, it's also a great way to put your email address on a dish
for spammy web crawlers.

Obfuscemail is a simple command line utility and Node.js module to help with
this issue. It generates javascript which creates nice \<a\> mailto links which
appear and work as normal in a web browser, but are not readable by web crawlers
. The actual email address is hidden by the rot13 cipher.

## Installation

To install the command line utility globally:

    sudo npm install -g obfuscemail

Or to install locally in an npm project:

    npm install obfuscemail --save

## Usage

To use in a HTML page, you must define where you want your mailto links to be
injected by using the `obfuscemail` class (ANY element with this class will be
turned into a mailto link).

Then to generate the javascript to include in this page you need to run:

    obfuscemail -e "<your email>" -t "Anchor Tag Text"

You can also add an optional subject to the mailto link:

    obfuscemail -e "<your email>" -t "Anchor Tag Text" -s "Subject for Email"

Obfuscemail can also be used as a Node.js module (see above for installation):

    var obfuscemail = require('obfuscemail');

	var js = obfuscemail.generate('test@example.com', 'Contact Me');

  	console.log(js);
  	/* This outputs an immediately-invoked function expression, which you
  	 * *could*, if you really wish, eval()...
  	 */

## Example

1. Add `<span class="obfuscemail">No email here!</span>` to a HTML page.
2. Generate the javascript `<script>` tag with `obfuscemail -e test@example.com
-t "Contact Me!"`. Cut and paste it into your HTML.
3. When the browser loads the page, the span element will be replaced with
`<a href=""mailto:test@example.com>Contact Me!</a>`

## FAQs

1. **Why use the rot13 cipher?**  
It adds the main layer of obfuscation. Bots with an email matching regex over
the whole page will be fooled by this.
2. **But if enough people use rot13, bots will be be written to use it too.**  
Yeah, they will. We'll cross that bridge when we get to it.
3. **Eurgh, Node.js command line utilities are horrible!**  
Yeah, they are. But so's your face.
