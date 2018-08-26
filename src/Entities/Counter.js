var glyphSize = [80, 160];
var glyphsImg = document.getElementById('font');

class Counter extends Entity {
  constructor() {
    super({s: 'normal'});
    this.p.n = 0;
  }

  render(ctx, dt, ms) {
    this.beginRender(ctx);
    var n = floor(this.p.n);
    n = n.toString().split('');
    var size = [n.length*glyphSize[0], glyphSize[1]];
    n.forEach((d, i)=> {
      var sx = ~~d*glyphSize[0];
      var dx = modulate(i, -size[0]/2, size[0]/2, 0, n.length);
      ctx.drawImage(glyphsImg,
        sx, 0, glyphSize[0], glyphSize[1],
        dx, -glyphSize[1]/2, glyphSize[0], glyphSize[1]
      );
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
