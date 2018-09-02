RadialCache = {};

RADIAL_SMALL_R = 0.45;
RADIAL_NB      = 6;  // amount Big
RADIAL_DB      = 10; // divisioRADIAL_NS Big
RADIAL_TB      = 32; // thickness Big
RADIAL_NS      = 10; // amount Small
RADIAL_TS      = RADIAL_SMALL_R/RADIAL_NS;
RADIAL_DS      = 8;

class Radial extends Entity {
  render(ctx, dt, ms) {
    this.beginRender(ctx);
    if (this._state === 'start') this.drawSmall(ctx, ms);
    this.drawBig(ctx, ms);
    this.endRender(ctx);
  }

  drawSmall(ctx, ms) {
    times(RADIAL_NS, (i)=> {
      this.renderCircle(
        ctx,
        ms/10000+i*0.1+i*0.1*ms/4000,
        W*RADIAL_TS*i,
        W*RADIAL_TS+2,
        RADIAL_DS,
        '#1A1A1A',
        '#818181',
        true
      );
    });
    times(1, (i)=> {
      this.renderCircle(
        ctx,
        // ms/10000+(i+RADIAL_NS)*0.1+(i+RADIAL_NS)*0.1*ms/4000,
        0,
        +W*RADIAL_SMALL_R+RADIAL_TB*i-7,
        RADIAL_TB+2,
        RADIAL_DB,
        COLOR_LIGHTGRAY,
        '#838488',
        true
      );
    });
  }
  drawBig(ctx, ms) {
    if (!RadialCache.big) {
      var cached = document.createElement('canvas');
      let offCtx = cached.getContext('2d');
      extend(offCtx.canvas, {
        width: W,
        height: H*1.2
      });
      offCtx.translate(W/2, (H*1.2)/2);
      times(RADIAL_NB-1, (i)=> {
        i++;
        this.renderCircle(
          offCtx,
          i*0.2+(i+1)*0.1*ms/5000,
          +W*RADIAL_SMALL_R+RADIAL_TB*i-7,
          RADIAL_TB+2,
          RADIAL_DB,
          COLOR_LIGHTGRAY,
          '#838488'
        );
      });
      RadialCache.big = cached;
    }
    ctx.drawImage(RadialCache.big, -W/2, -(H*1.2)/2);
  }
  // offset angle, radius, thickness, divisioRADIAL_NS, color start, color end
  renderCircle(ctx, a, r, t, d, s, e, cache) {
    const cacheKey = [r, t, d].map(round).join('-'); // hope s and e don't affect!
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
      ctx.rotate(a);
      ctx.drawImage(cached.cached, -cached.s/2, -cached.s/2, cached.s, cached.s);
      ctx.rotate(-a);
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
