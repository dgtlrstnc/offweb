TICKER = new Ticker();
PHYS = new ParticleSystem(PHYS_GRAVITY, PHYS_DRAG);

// Entities
E = {};

// Game instance
G = new Game({
  canvas: 'game',
  setup: ()=> {
    E.bg = new Bg();
    E.title = new Sprite();
    E.title.p.id = 'title';
    extend(E.title.p, {y: -1.1, x: 0, s: 0.28});
    E.squares = new Squares();
    extend(E.squares.p, {y: 1.1, x: -0.73});
    E.logos = new Logos();
    extend(E.logos.p, {y: 1.25, x: 0.8});
    E.startBtn = new Btn();
    E.continueBtn = new BtnOutline();
    extend(E.continueBtn.p, {y: 0.8});

    E.introText = new TextBox();
    extend(E.introText.p, {y: -0.6, t: INTRO_TEXT_1});
    E.introText2 = new TextBox();
    extend(E.introText2.p, {y: -0.1, t: INTRO_TEXT_2});

    E.tutorialText1 = new TextBox();
    extend(E.tutorialText1.p, {y: -0.7, t: TUTORIAL_TEXT_1});
    E.tutorialText2 = new TextBox();
    extend(E.tutorialText2.p, {y: -0.2, t: TUTORIAL_TEXT_2});
    E.tutorialText3 = new TextBox();
    extend(E.tutorialText3.p, {y: 0.25, t: TUTORIAL_TEXT_3});
    // GOOD
    E.tutorialHook1 = new Hook({s: 'visible'});
    extend(E.tutorialHook1.p, {y: -0.55, x: -0.3});
    E.tutorialHook2 = new Hook({s: 'visible'});
    extend(E.tutorialHook2.p, {y: -0.55, x: 0});
    E.tutorialHook3 = new Hook({s: 'visible'});
    extend(E.tutorialHook3.p, {y: -0.55, x: 0.3});
    E.tutorialCables = new TutorialCables();
    E.tutorialCables.p.y = -0.6;
    // BAD
    E.tutorialBad1 = new Hook({s: 'visible'});
    extend(E.tutorialBad1.p, {bad: true, y: -0.05, x: -0.15});
    E.tutorialBad2 = new Hook({s: 'visible'});
    extend(E.tutorialBad2.p, {bad: true, y: -0.05, x: 0.15});
    // SPECIAL
    E.tutorialSpecial = new Hook({s: 'visible'});
    extend(E.tutorialSpecial.p, {special: true, y: 0.4});

    // E.mask = new Mask();
    // E.timeCounter = new Counter();
    E.alert = new Alert();
    E.bigE = new Sprite();
    E.bigE.p.id = 'bigE';

    E.pointsCounter = new Counter();
    extend(E.pointsCounter.p, {x: 0, y: -1.2, s: 0.55});
    E.countDownCounter = new Counter();
    extend(E.countDownCounter.p, {y: -0.05, c: 1});
    E.timer = new Timer();
    extend(E.timer.p, {y: -1.45});
    // E.guides = new Guides();
    E.hooks = new Pool(Hook, HOOKS_AMOUNT);
    E.cables = new Pool(Cable, HOOKS_AMOUNT);
    E.radial = new Radial();
    E.pointer = new Pointer();
    E.highscore = new TextBox();
    extend(E.highscore.p, { y: -0.85 });
    // E.glitchPass = new GlitchPass();
  },
  states: {
    start: StartState,
    intro: IntroState,
    tutorial: TutorialState,
    game: GameState,
    gameover: GameoverState
  }
});

G.setState('game');
G.start();
