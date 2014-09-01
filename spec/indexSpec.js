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

    var expected = '!function(){function e(e,n){for(var r=document.getElement' +
      'sByClassName("obfuscemail"),t=0;t<r.length;t++){var a=r[t],c=document.' +
      'createElement("a");c.href="mailto:"+e,c.innerHTML=n,a.parentNode.repla' +
      'ceChild(c,a)}}function n(e){return e.replace(/[a-zA-Z]/g,function(e){r' +
      'eturn String.fromCharCode(("Z">=e?90:122)>=(e=e.charCodeAt(0)+13)?e:e-' +
      '26)})}var r="grfg@rknzcyr.pbz",t="contact me";e(n(r),t)}();';

    expect(script).toEqual(expected);
  });
});
