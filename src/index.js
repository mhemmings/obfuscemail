var uglify = require('uglify-js');

/**
 * Generates an immediately-invoked function expression to be placed inside
 * <script> tags.
 * @param  {String} email
 * @param  {String} text
 * @return {String}
 */
module.exports.generate = function (email, text) {
  /* rot13 encode the email address */
  email = rot13(email);

  /* rot13 encode the text (it may contain email) */
  text = rot13(text);

  /* Start building the js string. */
  /* Assign the rot13 email to a var */
  var js = 'var email = \'' + email + '\';';

  /* Assign the link text to a var */
  js += 'var text = \'' + text + '\';';

  /* Call the swapTags function */
  js += 'swapTags(rot13(email), rot13(text));';

  /* Include the swapTags function */
  js += swapTags.toString();

  /* Include the rot13 function */
  js += rot13.toString();

  /* Wrap everything in an immediately-invoked function expression */
  js = '(function(){' + js + '})();';

  /* Minify */
  js = uglify.minify(js, {fromString: true});

  /* Return minified code */
  return js.code;
};

/**
 * Performs rot13 encoding/decoding
 * @param  {String} str
 * @return {String}
 */
function rot13(str) {
  return str.replace(/[a-zA-Z]/g , function(c) {
    return String.fromCharCode(
      (c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13 ) ? c : c - 26);
  });
}

/**
 * Swaps all tags with a class of "obfuscemail" with an <a> mailto link
 * @param  {String} email
 * @param  {String} text
 */
function swapTags(email, text) {
  var elems = document.getElementsByClassName('obfuscemail');
  for (var i = 0; i < elems.length; i++) {
    var a = elems[i];
    var newA = document.createElement('a');
    newA.href = 'mailto:' + email;
    newA.innerHTML = text;
    a.parentNode.replaceChild(newA, a);
  }
}

/* Expose functions to Node.js require(). Also helps with testing. */
module.exports.rot13 = rot13;
module.exports.swapTags = swapTags;
