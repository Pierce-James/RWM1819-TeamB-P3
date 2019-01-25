
class GameScene {
  constructor() {
    //Add game objects here, player, ghosts etc.
    this.tileMap = new Tilemap("src/tilemap.json");

    this.player = new Player(448, 640, this.tileMap);
    this.isActive = false;
    this.blinkyGhost = new Ghost("Blinky", 416, 480, this.tileMap, new Vector2(26,1)); //Scatters to top right
    this.pinkyGhost = new Ghost("Pinky", 448, 480, this.tileMap, new Vector2(1,1)); //Scatters to top left
    this.clydeGhost = new Ghost("Clyde", 416, 416, this.tileMap, new Vector2(1,29)); //Scatters to bottom left
    this.inkyGhost = new Ghost("Inky", 448, 416, this.tileMap, new Vector2(26,29)); //Scatters to bottom right
    this.inkyGhost.blinkyRef = this.blinkyGhost; //Set the reference to the blinky ghost
    this.ghosts = [this.blinkyGhost, this.clydeGhost, this.inkyGhost, this.pinkyGhost];

    this.topBar = new topUI();
    this.botBar = new bottomUI();

    var canv = document.getElementById("mycanvas");
    this.ctx = canv.getContext("2d");

    this.cameraSystem = new CameraSystem(canv, this.topBar.UICanvas);
    this.cameraSystem.setFocus(this.player.position, 185);
    this.fruitSound = new AudioManager();
    this.fruitSound.init();
    this.ghostDeathSound = new AudioManager();
    this.ghostDeathSound.init();
    this.DeathSound = new AudioManager();
    this.DeathSound.init();

    audioOptions.manager.loadSoundFile('gameSceneMusic', "ASSETS/AUDIO/Waka.mp3");
    this.fruitSound.loadSoundFile('eatFruit', "ASSETS/AUDIO/Fruit.mp3");
    this.ghostDeathSound.loadSoundFile('killGhost', "ASSETS/AUDIO/GhostDeath.mp3");
    this.DeathSound.loadSoundFile('killPacMan', "ASSETS/AUDIO/Death.mp3");

    this.startPlayTimer = false;
    this.playerHitTimer = 1.5;
    this.playerHit = false;
  }
  

  start(){
    this.isActive = true;
    audioOptions.manager.playAudio('gameSceneMusic', true, audioOptions.volume/100);
    var top = document.getElementById("Top of UI");
    top.style.display = "block";
    var bottom = document.getElementById("Bottom of UI");
    bottom.style.display = "block";
    this.ctx.save();
    if(retro === false)
    {
      this.cameraSystem.Zoom(2);
      var canv = document.getElementById("mycanvas");
      var canvCentre = new Vector2(canv.width/2, canv.height/2);
      var offset = new Vector2(this.player.position.x-canvCentre.x, this.player.position.y-canvCentre.y);
      this.cameraSystem.Pan(offset.x, -offset.y);

    }
  }
  
  stop(){
    this.isActive = false;
    audioOptions.manager.stopAudio();
    var top = document.getElementById("Top of UI");
    top.style.display = "none";
    var bottom = document.getElementById("Bottom of UI");
    bottom.style.display = "none";
    this.ctx.restore();
  }

  beginDelay(dt)
  {
    if(this.player.resetingAfterDeath && this.playerHit === false)
    {
      this.playerHitTimer -= dt;

      return true;
    }
    return false;
  }

  update(dt) {
    
    //Checks if the beginDelay is not currently happening
    if(this.beginDelay(dt))
    {
      //If the delay timer has reached 0, resume the game
      if(this.playerHitTimer <= 0)
      {
        this.startPlayTimer = false;
        this.player.resetingAfterDeath = false;
        this.player.pS.animating = true;
      }
    }

    else if(this.tileMap.isLoaded) //Only update if the tilemap is ready
    {
      //Only update the ghosts if the player has no lives left
      if(this.player.lives > 0 && this.player.alive)
      {
        for(let ghost of this.ghosts)
        {
          ghost.update(dt, this.player);
        }
      }
      
      this.player.update(dt);



      //Only check for collisions if the player has lives
      if(this.player.lives > 0 && this.player.alive)
      {
        for(let ghost of this.ghosts)
        {
          if (Collision.CircleVsCircle(this.player.collider, ghost.collider))
          {
            if (this.player.isPoweredUp)
            {
              this.topBar.score += this.player.eatGhost();
              ghost.die();
              this.ghostDeathSound.playAudio('killGhost', false, audioOptions.volume/100);
            }
            else if(this.playerHit === false)
            {
              this.DeathSound.playAudio('killPacMan', false, audioOptions.volume/100);
              this.player.lives--;
              this.player.spawnPlayer();
              this.player.pS.setFrame(0);
              this.botBar.lives--;
              this.playerHitTimer = 1.5;
              this.player.pS.animating = false;
              this.playerHit = true;
            }
          }

          if (this.player.checkProjectile(ghost.collider))
          {
            this.topBar.score += this.player.eatGhost();
            ghost.die();
            this.ghostDeathSound.playAudio('killGhost', false, audioOptions.volume/100);
            this.player.projectileActive = false;
            this.player.pm.clearProjectiles();
          }
        }
      }

      //If the player was hit, reset the ghosts
      if(this.playerHit && this.player.alive)
      {
          for(let ghost of this.ghosts)
          {
            ghost.spawn();
          }
          this.startPlayTimer = true;
          this.playerHit = false;
      }
    }
  }

  handleInput(input)
  {
    if(this.player.lives <= 0)
    {
      return "this.mManager.setCurrentScene('Scoreboard')";
    }
    this.player.handleInput(input);
  }

  draw(ctx) {
    //Draw using ctx
    if(retro === false)
    {
      this.cameraSystem.draw();
    }
    this.tileMap.render(ctx);
    for(let ghost of this.ghosts)
    {
      ghost.draw(ctx);
    }

    this.player.render(ctx);

    this.topBar.draw();
    this.botBar.draw();
  }
}
