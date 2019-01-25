/*var keyMaps = {
  'UP':'ArrowUp', 
  'LEFT':'ArrowLeft', 
  'DOWN':'ArrowDown', 
  'RIGHT':'ArrowRight',
  'SHOOT':'Space'
}*/
var audioOptions = {'volume':75};
var retro = true;

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

    audioOptions.manager = new AudioManager();
    audioOptions.manager.init();

    //Creating the Menu Manager
    this.mManager = new MenuManager();
    this.mManager.addScene("Main Menu", new MainMenuScene());
    this.mManager.addScene("Game Scene", new GameScene());
    this.mManager.addScene("Scoreboard", new ScoreboardScene());
    this.mManager.addScene("Options", new OptionsScene());
    this.mManager.addScene("Pause Scene", new PauseScene());
    this.mManager.setCurrentScene("Main Menu");
    document.body.style.backgroundColor = "#000000";
    this.mManager.current.value.start();

    this.keyboard = new Keyboard();   
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
    this.mManager.update(dt) ;
  }

  handleInput()
  {
    var returned = this.mManager.current.value.handleInput(this.keyboard);

    if(returned !== undefined)
    {
      console.log(returned);
      this.mManager.current.value.stop();
      if(returned === "this.mManager.setCurrentScene('Scoreboard')" && this.mManager.current.key === "Game Scene")
      {
        var scoreVal = this.mManager.current.value.topBar.score;
  
        this.mManager.scenes.get("Scoreboard").addToScoreBoard(scoreVal);
      }

      //If we are in the main menu and we are going to the game scene, then call restart
      else if(returned === "this.mManager.setCurrentScene('Game Scene')" && this.mManager.current.key === "Main Menu")
      {
        this.mManager.scenes.get("Game Scene").restartGameScene();
      }
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
