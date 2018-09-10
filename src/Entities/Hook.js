HOOK_SW = 120; // Sprite Width

glyphsImg = document.getElementById('sprite');

class Hook extends Entity {
  constructor(options = {}) {
    super(options || {s: 'hidden'});
  }

  render(ctx, dt, ms) {
    this.beginRender(ctx);
    if (this.p.special) ctx.rotate(ms/200);
    ctx.beginPath();
    if (this.p.bad) {
      ctx.scale(0.2, 0.2);
      ctx.drawImage(spriteImg,
        1020, 430, HOOK_SW, HOOK_SW,
        -HOOK_SW/2, -HOOK_SW/2, HOOK_SW, HOOK_SW
      );
      ctx.scale(1/0.25, 1/0.25);
    } else if (this.p.special) {
      ctx.scale(0.25, 0.25);
      ctx.drawImage(spriteImg,
        900, 430, HOOK_SW, HOOK_SW,
        -HOOK_SW/2, -HOOK_SW/2, HOOK_SW, HOOK_SW
      );
      ctx.scale(1/0.25, 1/0.25);
    } else {
      ctx.fillStyle = COLOR_PURPLE;
      ctx.arc(0, 0, HOOK_RADIUS, 0, PI2);
      ctx.fill();
    }
    if (this.p.bad) ctx.rotate(-ms/200);
    this.endRender(ctx);
  }

  states() {
    return {
      hidden: {s: 0, c: 0.5},
      visible: {s: 1, c: 0.5},
      used: {s: 1, c: 1},
      small: {s: 0.25}
    };
  }

  animations() {
    return {
      'hidden→visible': {_d: 500, _e: 'out'},
      'visible→used':   {_d: 500, _e: 'out'}
    };
  }
}
