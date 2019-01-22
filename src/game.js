
class Game {
  constructor() {
    this.prevDt = Date.now();
    this.canvas = document.createElement("canvas");
    this.canvas.id = 'mycanvas';
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);
    document.body.style.backgroundColor = "#000000";
    //Creating the Menu Manager
    //this.mManager = new MenuManager();
    //this.mManager.addScene("Game Scene", new GameScene());
    this.map = new Map("src/tilemap.json");
    //Need to add a scene to the menu manager to stop the error
  }

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
    //this.mManager.update(dt);
  }

  render() {
    //Call draw on the menu manager and pass the context over as canvas is not needed?
   // this.mManager.draw(this.ctx);
   this.map.render();
  }

  calculateDt() {
    const now = Date.now();
    const dt = now - this.prevDt;
    this.prevDt = now;
    return dt;
  }
}
