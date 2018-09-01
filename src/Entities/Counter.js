COUNTER_GH = 160; // glyph height
glyphWidths = [138, 87, 156, 171, 183, 147, 123, 142, 199, 128];
glyphsImg = document.getElementById('sprite');

class Counter extends Entity {
  constructor() {
    super({s: 'normal'});
    this.p.n = 0;
  }

  render(ctx, dt, ms) {
    this.beginRender(ctx);
    var n = floor(this.p.n);
    // var n = 129;
    n = n.toString().split('');
    var size = [
      n.reduce((memo, d)=> {return memo + glyphWidths[~~d]}, 0),
      COUNTER_GH
    ];
    n.forEach((d, i)=> {
      var gW = glyphWidths[~~d];
      // source
      var sx = glyphWidths.slice(0, ~~d).reduce((memo, w)=>{return memo+w}, 0);
      // destination
      var dx = -size[0]/2+n.slice(0, i).reduce((memo, d)=> {return memo + glyphWidths[~~d]}, 0);

      if (this.p.c === 1) ctx.globalCompositeOperation = 'xor';
      ctx.drawImage(glyphsImg,
        sx, 0, gW, COUNTER_GH,
        dx, -COUNTER_GH/2, gW, COUNTER_GH
      );
      ctx.globalCompositeOperation = 'source-over';
    });
    this.endRender(ctx);
  }

  setNumber(n) {
    if (this.p.n !== n) {
      this.animateTo({n}, {_d: 1500});
    }
  }

  states() {
    return {
      normal: {s: 0.25},
      focus:  {s: 0.6},
      hidden: {s: 0}
    };
  }

  animations() {
    return {
      'normal→focus': {_d: 2000, s: [0, 1, 'in']},
      'focus→normal': {_d: 2000, s: [0, 1, 'in']},
      'hidden→focus': {_d: 2000, s: [0, 1, 'in']}
    };
  }
}
