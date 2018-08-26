class Mask extends Entity {
  constructor() {
    super({s: 'tiny'});
    this.p.fx = 0;
  }

  render(ctx, dt, ms) {
    this.beginRender(ctx);
    // overlay with circle hole
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.rect(-W/2, -H/2, W, H);
    ctx.arc(0, 0, W/2*ARENA_RADIUS*this.p.rad, 0, -PI2, true);
    ctx.fill();
    // circle border
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1.5;
    ctx.arc(0, 0, W/2*ARENA_RADIUS*this.p.rad, 0, -PI2, true);
    ctx.stroke();
    // fx
    ctx.beginPath();
    if (this.p.fx<1 && this.p.fx>0) {
      ctx.strokeStyle = (this.p.fxc) ? COLOR_BLUE : COLOR_RED;
      ctx.lineWidth = clamp((1-this.p.fx)*200, 0, Infinity);
      ctx.arc(0, 0, this.p.fx*W*0.6, 0, -PI2, true);
      ctx.stroke();
    }
    //
    this.endRender(ctx);
  }

  states() {
    return {
      tiny:     {fx: 0, fxc: 0, rad: 0  },
      normal:   {fx: 0, fxc: 0, rad: 1  },
      bad:      {fx: 1, fxc: 0, rad: 1  },
      special:  {fx: 1, fxc: 1, rad: 1  },
      small:    {fx: 0, fxc: 0, rad: 0.7}
    };
  }

  animations() {
    return {
      'tiny→normal':    {_d: 2000, fx:  [0, 1, 'out']},
      'normal→bad':     {_d: 4000, fx:  [0, 1, 'out']},
      'normal→special': {_d: 4000, fx:  [0, 1, 'out']},
      'normal→small':   {_d: 2000, rad: [0, 1, 'out']},
      'small→normal':   {_d: 2000, rad: [0, 1, 'out']}
    };
  }
}
