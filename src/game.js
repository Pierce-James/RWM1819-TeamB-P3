/*var keyMaps = {
  'UP':'ArrowUp', 
  'LEFT':'ArrowLeft', 
  'DOWN':'ArrowDown', 
  'RIGHT':'ArrowRight',
  'SHOOT':'Space'
}*/
var volume = 100;

class Game {
  constructor() {
    this.prevDt = Date.now();
    this.canvas = document.createElement("canvas");
    this.canvas.id = 'mycanvas';
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight+25;
    this.canvas.style.position  ='absolute';
    this.canvas.style.top = '10%';
    this.canvas.style.height = '80%';
    this.canvas.style.width = '80%';
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);
    this.ctx.imageSmoothingEnabled = false;
    //Creating the Menu Manager
    this.mManager = new MenuManager();
    this.mManager.addScene("Game Scene", new GameScene());
    this.mManager.addScene("Scoreboard", new ScoreboardScene());
    this.mManager.addScene("Options", new OptionsScene());
    this.mManager.addScene("Main Menu", new MainMenuScene());

    this.mManager.setCurrentScene("Main Menu");
    this.mManager.current.value.start();
    document.body.style.backgroundColor = "#000000";

    this.keyboard = new Keyboard();
   
    this.pellet = new Pellet();
    this.pellet = [];
    
    var img = new Image(256, 32);
    img.src = "ASSETS/SPRITES/Pacman72.png";
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

    this.handleInput(); //Handle input in the current scenes

    //Update the menu manager and pass in dt for any time related functions
    this.mManager.update(dt);
  }

  handleInput()
  {
    var returned = this.mManager.current.value.handleInput(this.keyboard);

    if(returned !== undefined)
    {
      this.mManager.current.value.stop();
      eval(returned);
      this.mManager.current.value.start();
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
   // this.pellet.draw();

    this.mManager.draw(this.ctx);
    //Call draw on the menu manager and pass the context over as canvas is not needed?
   // this.mManager.draw(this.ctx);
 
  }

  calculateDt() {
    const now = Date.now();
    const dt = (now - this.prevDt) / 1000;
    this.prevDt = now;
    return dt;
  }
}
