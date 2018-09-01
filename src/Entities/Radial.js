RadialCache = {};

class Radial extends Entity {
  render(ctx, dt, ms) {
    this.beginRender(ctx);
    var smallR = W/2*ARENA_RADIUS;
    var nB = 4;  // amount Big
    var dB = 10; // divisions Big
    var tB = 40; // thickness Big
    var nS = 10; // amount Small
    var tS = smallR/nS;
    var dS = 8;
    times(nS, (i)=> {
      this.renderCircle(ctx, ms/10000+i*0.1+i*0.1*ms/4000, tS*i, tS+2, dS, '#1A1A1A', '#818181');
    });
    times(nB, (i)=> {
      this.renderCircle(ctx, i*0.2+(i+1)*0.1*ms/5000, smallR+tB*i, tB+2, dB, '#A7A8AC', '#838488');
    });
    this.endRender(ctx);
  }
  // offset angle, radius, thickness, divisions, color start, color end
  renderCircle(ctx, a, r, t, d, s, e) {
    const cacheKey = [r, t, d].map(round).join('-'); // hope s and e don't affect!
    let cached = RadialCache[cacheKey];
    if (!cached) {
      cached = document.createElement('canvas');
      let offCtx = cached.getContext('2d');
      extend(offCtx.canvas, {
        width: (r+t)*2,
        height: (r+t)*2
      });
      offCtx.translate(r+t, r+t);
      times(d, (i)=> {
        this.renderArc(offCtx, r, t+2, i*PI2/d, 0.01+PI2/d, s, e);
      });
      RadialCache[cacheKey] = cached = {cached, s: (r+t)*2 };
    }
    ctx.resetTransform();
    ctx.translate(W/2, H/2);
    ctx.rotate(a);
    ctx.drawImage(cached.cached, -cached.s/2, -cached.s/2, cached.s, cached.s);
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
