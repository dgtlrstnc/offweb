CAMERA_OFF_X = 0;
CAMERA_OFF_Y = 0;

class Entity {
  constructor(o = {}) {
    this._animate = this._animate.bind(this);
    this.p = { x: 0, y: 0, z:0, r: 0, s: 1, o: 1, v: 1 };
    this.cacheStates();
    this.cacheAnimations();
    this.setStateI(o.s);
  }

    beginRender(ctx) {
    ctx.resetTransform();
    ctx.globalAlpha = (this.p.v) ? this.p.o : 0; // TODO
    ctx.translate(unitsToPx(this.p.x+1)+CAMERA_OFF_X, unitsToPx(this.p.y+H/W)+V_OFFSET+CAMERA_OFF_Y);
    ctx.scale(this.p.s, this.p.s);
  }

  endRender(ctx) {
    ctx.globalAlpha = 1;
    ctx.resetTransform();
  }

  states() { return {}; }
  animations() { return {}; }

  cacheStates() {
    this._states = this.states();
  }

  cacheAnimations() {
    var as = this.animations();
    this._animations = {};
    var ks = keys(as);
    var vs = values(as);
    ks.forEach((k, i)=> {
      var from = k.split('→')[0];
      var to = k.split('→')[1];
      var fromCache = this._animations[from];
      if (!fromCache) fromCache = this._animations[from] = {};
      fromCache[to] = vs[i];
    });
  }

  getState(s) {
    return this._states[s];
  }

  getAnimation(f, t) {
    var a = null;
    if (this._animations[f]) a = this._animations[f][t];
    return a;
  }

  setStateI(state) {
    var s = this.getState(state);
    extend(this.p, s);
    this._state = state;
  }

  setState(state) {
    if (state === this._state) return;
    this.setStateI(this._state);
    this._a = null;
    TICKER.remove(this._animate);
    var s = this.getState(state);
    var a = this.getAnimation(this._state, state);
    if (!a) return this.setStateI(state);
    this._state = state;
    this.animateTo(s, a);
  }

  animateTo(s, a) {
    this._a = { p: 0, d: a._d, from: this.p, to: s, e: a._e };
    TICKER.add(this._animate);
  }

  _animate(dt, ms) {
    this._a.p += 10;
    var p = this._a.p/this._a.d;
    if (p > 1) {
      TICKER.remove(this._animate);
      this._a = null;
      return;
    }
    p = clamp(p);
    var tks = keys(this._a.to);
    var tvs = values(this._a.to);
    tvs.forEach((tv, i)=> {
      var tk = tks[i];
      var fv = this._a.from[tk];
      this.p[tk] = modulate(
        (this._a.e==='out') ? easeOut(p) : easeIn(p)
        , fv, tv
      );
    });
  }
}
