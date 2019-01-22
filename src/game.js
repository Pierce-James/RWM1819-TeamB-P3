
class Game {
  constructor() {
    this.prevDt = Date.now();
    this.canvas = document.createElement("canvas");
    this.canvas.id = 'mycanvas';
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);
    this.ctx.imageSmoothingEnabled = false;
    //Creating the Menu Manager
    this.mManager = new MenuManager();
    this.mManager.addScene("Game Scene", new GameScene());
    //Need to add a scene to the menu manager to stop the error
    var img = new Image(18166, 3509);
    img.src = "ASSETS/SPRITES/Pacmanfix.png";

    this.spr = new Sprite(50, 50, 3475, 3509, img, true, 5);
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
    this.mManager.update(dt);
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //Call draw on the menu manager and pass the context over as canvas is not needed?
    var c = document.getElementById("mycanvas")
    c.getContext("2d").clearRect(0,0, c.width, c.height);
   
    this.mManager.draw(this.ctx);
    this.spr.draw();
  }

  calculateDt() {
    const now = Date.now();
    const dt = (now - this.prevDt) / 1000;
    this.prevDt = now;
    return dt;
  }
}