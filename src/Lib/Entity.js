class Entity {
  constructor(o = {}) {
    this._animate = this._animate.bind(this);
    this.p = { x: 0, y: 0, r: 0, s: 1 };
    this.cacheStates();
    this.cacheAnimations();
    this.setStateI(o.s);
  }

  beginRender(ctx) {
    ctx.resetTransform();
    ctx.translate(unitsToPx(this.p.x+1), unitsToPx(this.p.y+H/W));
    ctx.scale(this.p.s, this.p.s);
  }

  endRender(ctx) {
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
    var s = this.getState(state);
    var a = this.getAnimation(this._state, state);
    if (!a) return this.setStateI(state);
    this._state = state;
    this.animateTo(s, a);
  }

  animateTo(s, a) {
    this._a = { p: 0, d: a._d, from: this.p, to: s };
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
    var tks = keys(this._a.to);
    var tvs = values(this._a.to);
    tvs.forEach((tv, i)=> {
      var tk = tks[i];
      var fv = this._a.from[tk];
      this.p[tk] = modulate(easeOut(p), fv, tv);
    });
  }
}
