RadialCache = {};

RADIAL_SMALL_R = 0.45;
RADIAL_NB      = 7;  // amount Big
RADIAL_DB      = 10; // divisioRADIAL_NS Big
RADIAL_TB      = 32; // thickness Big
RADIAL_NS      = 10; // amount Small
RADIAL_TS      = RADIAL_SMALL_R/RADIAL_NS;
RADIAL_DS      = 8;

class Radial extends Entity {
  constructor() {
    super();
    this.p.m = 1;
    this.p.fx = 0;
  }

  states() {
    return {
      intro:    {m: 0, s: 1},
      out:      {m: 1, s: 2.1},
      normal:   {m: 0.99, s: 1}
    };
  }

  animations() {
    return {
      'intro→out': {_d: 1500, _e: 'in'},
    };
  }

  render(ctx, dt, ms) {
    this.beginRender(ctx);
    if (this.p.m < 1) this.drawSmall(ctx, ms);
    this.drawBig(ctx, ms);
    if (this.p.fx) this.drawFx(ctx);
    this.endRender(ctx);
  }

  drawFx(ctx) {
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = '#DEC72D';
    ctx.beginPath();
    ctx.rect(-(W*1.3)/2, -H*0.7, W*1.2, H*1.4);
    ctx.arc(0, 0, W*0.52*ARENA_RADIUS, 0, -PI2, true);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  }

  drawSmall(ctx, ms) {
    var totalN = RADIAL_NS+2;
    times(RADIAL_NS, (i)=> {
      this.renderCircle(
        ctx,
        this.p.m*i*0.4+ms/10000+i*0.1+i*0.1*ms/4000,
        W*RADIAL_TS*i,
        W*RADIAL_TS+2,
        RADIAL_DS,
        '#1A1A1A',
        '#818181',
        true,
        (modulate(this.p.m, 0, 1, i/totalN, (i+1)/totalN))
      );
    });
    times(1, (i)=> {
      i+= RADIAL_NS;
      this.renderCircle(
        ctx,
        (this.p.m>0) ? this.p.m*2.5 : 0,
        +W*RADIAL_SMALL_R-9,
        RADIAL_TB+2,
        RADIAL_DB,
        COLOR_LIGHTGRAY,
        '#838488',
        true,
        (modulate(this.p.m, 0, 1, i/totalN, (i+1)/totalN))
      );
    });
  }
  drawBig(ctx, ms) {
    if (!RadialCache.big) {
      var cached = document.createElement('canvas');
      let offCtx = cached.getContext('2d');
      extend(offCtx.canvas, {
        width: W*1.2,
        height: H*1.2
      });
      offCtx.translate((W*1.2)/2, (H*1.2)/2);
      times(RADIAL_NB-1, (i)=> {
        i++;
        this.renderCircle(
          offCtx,
          i*0.2+(i+1)*0.1*ms/5000,
          +W*RADIAL_SMALL_R+RADIAL_TB*i-9,
          RADIAL_TB+2,
          RADIAL_DB,
          COLOR_LIGHTGRAY,
          '#838488'
        );
      });
      RadialCache.big = cached;
    }
    ctx.drawImage(RadialCache.big, -(W*1.2)/2, -(H*1.2)/2);
  }
  // offset angle, radius, thickness, divisioRADIAL_NS, color start, color end
  renderCircle(ctx, a, r, t, d, s, e, cache, p = 0) {
    const cacheKey = [r, t, d].map(round).join('-'); // hope s and e don't affect!
    if (p >= 1) return;
    let cached = RadialCache[cacheKey];
    if (!cache || !cached) {
      cached = document.createElement('canvas');
      let offCtx = cache ? cached.getContext('2d') : ctx;
      if (cache) {
        extend(offCtx.canvas, {
          width: (r+t)*2,
          height: (r+t)*2
        });
        offCtx.translate(r+t, r+t);
      }
      times(d, (i)=> {
        this.renderArc(offCtx, r, t+2, (cache?0:a)+i*PI2/d, 0.01+PI2/d, s, e);
      });
      RadialCache[cacheKey] = cached = {cached, s: (r+t)*2 };
    }
    if (cache) {
      if (p>0.5) ctx.globalCompositeOperation = 'xor';
      ctx.rotate(a);
      ctx.drawImage(cached.cached, -cached.s/2, -cached.s/2, cached.s, cached.s);
      ctx.rotate(-a);
      ctx.globalCompositeOperation = 'source-over';
    }
  }
  // radius, thickness, start angle, lenght, color start, color end
  renderArc(ctx, r, t, a, l, s, e) {
    ctx.strokeStyle = this.createGradient(ctx, r, a, l, s, e);
    ctx.lineWidth = t;
    ctx.beginPath();
    ctx.arc(0, 0, r, a, a+l);
    ctx.stroke();
  }

  // radius, start angle, lenght, start color, end color
  createGradient(ctx, r, a, l, s, e) {
    var xStart = r*cos(a),
        xEnd = r*cos(a+l),
        yStart = r*sin(a),
        yEnd = r*sin(a+l),
        g = ctx.createLinearGradient(xStart, yStart, xEnd, yEnd);
    g.addColorStop(0, s);
    g.addColorStop(0.4, s);
    g.addColorStop(1, e);
    return g;
  }
}
