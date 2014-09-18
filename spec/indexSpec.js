var generator = require('../src');

describe('converter', function() {
  it('should encode a string to rot13', function() {
    var str = 'test@exmaple.com';
    var rot13 = generator.rot13(str);

    expect(rot13).toEqual('grfg@rkzncyr.pbz');
  });

  it('should decode a string from rot13', function() {
    var str = 'grfg@rkzncyr.pbz';
    var rot13 = generator.rot13(str);

    expect(rot13).toEqual('test@exmaple.com');
  });
});

describe('script builder', function() {
  it('should not expose an email address', function() {
    var email = 'test@example.com';
    var text = 'contact me';
    var script = generator.generate(email, text);

    var pos = script.indexOf(email);
    expect(pos).toEqual(-1);
  });

  /* TODO: This should test a script execution. Comparing against a previous
   * known good script is not ideal */
  it('should correctly generate a script', function() {
    var email = 'test@example.com';
    var text = 'contact me';
    var script = generator.generate(email, text);
    console.log(script);
    var expected = '!function(){function e(e,r){for(var n=document.getElement' +
      'sByClassName("obfuscemail"),t=0;t<n.length;t++){var a=n[t],o=document.' +
      'createElement("a");o.href="mailto:"+e,o.innerHTML=r,a.parentNode.repla' +
      'ceChild(o,a)}}function r(e){return e.replace(/[a-zA-Z]/g,function(e){r' +
      'eturn String.fromCharCode(("Z">=e?90:122)>=(e=e.charCodeAt(0)+13)?e:e-' +
      '26)})}var n="grfg@rknzcyr.pbz",t="pbagnpg zr";e(r(n),r(t))}();';

    expect(script).toEqual(expected);
  });
});
