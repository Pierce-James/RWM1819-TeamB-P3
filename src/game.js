
class Game {
  constructor() {
    this.prevDt = Date.now();
    this.canvas = new Canvas("main-canvas", 1920, 1080);

    //Creating the Menu Manager
    this.mManager = new MenuManager();

  run() {
    this.loop();
  }

  loop() {
    this.update();
    this.render();

    /** Use bind function to keep the 'this' context throughout loop usage */
    window.requestAnimationFrame(this.loop.bind(this));
  }

  update() {
    const dt = this.calculateDt();

    //Update the menu manager and pass in dt for any time related functions
    this.mManager.update(dt);
  }

  render() {
    this.canvas.context2D.drawImage(this.bgImg, 0, 0);

    //Call draw on the menu manager and pass the context over as canvas is not needed?
    this.mManager.draw(this.canvas.context2D);
  }

  calculateDt() {
    const now = Date.now();
    const dt = now - this.prevDt;
    this.prevDt = now;
    return dt;
  }
}
