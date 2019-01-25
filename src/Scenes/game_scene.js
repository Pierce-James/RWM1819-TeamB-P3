
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

    this.pickupsLeft = 285; //280 pellets, 4 super pellets, 1 fruit!
    this.leveledUp = false;

    this.gameOver = false;
    this.gameEnding = false;
    this.gamePaused = false;
    document.addEventListener("keyup", this.keyUp.bind(this));
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
      this.offset = new Vector2(this.player.position.x-canvCentre.x, this.player.position.y-canvCentre.y);
      this.cameraSystem.Pan(this.offset.x, -this.offset.y);

    }
  }

  restartGameScene()
  {
    this.player.resetPlayer(); //Reset the player
    this.cameraSystem.setFocus(this.player.position, 185);
    this.botBar.fruits = []; //Reset the UI fruits
    //Reset the fruit to be a cherry again
    this.tileMap.fruit.currentFruit = -1;
    this.tileMap.fruit.reset(); //Reset the fruits bool to draw
    this.tileMap.fruit.increase();

    //Respawn the ghosts
    for(let g of this.ghosts)
    {
      g.spawn();
    }

    this.topBar.score = 0;
    this.botBar.lives = 3;
    //Reset the normal pellets
    for(let pel of this.tileMap.pellets){
      pel.reset();
    }
    //Reset the super pellets
    for(let pel of this.tileMap.superPellets){
      pel.reset();
    }

    this.startPlayTimer = false; //Reset the start game timer
    this.playerHitTimer = 1.5; //Set the timer to be 1.5 seconds
    this.playerHit = false; //Playe rhit is false

    this.pickupsLeft = 285; //280 pellets, 4 super pellets, 1 fruit!
    this.leveledUp = false; //Set this as leveled up to false
    this.gameOver = false;
    this.gameEnding = false;
  }

  //This method is called when the player clears all of the pellets
  levelUp()
  {
    this.player.spawnPlayer(); //Set this to true to start the delay
    this.leveledUp = true;
    this.playerHitTimer = 1.5; //Delay timer
    this.player.pS.animating = false;
  }
  
  stop(){
    this.isActive = false;
    audioOptions.manager.stopAudio();
    var top = document.getElementById("Top of UI");
    top.style.display = "none";
    var bottom = document.getElementById("Bottom of UI");
    bottom.style.display = "none";
    this.cameraSystem.Zoom(1);
    this.ctx.restore();
  }

  beginDelay(dt)
  {
    if((this.player.resetingAfterDeath && this.playerHit === false) || this.leveledUp || this.gameEnding)
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
        if(this.player.lives <= 0)
        {
          this.gameOver = true;
        }

        //Called if the player eats all the pellets
        if(this.leveledUp)
        {
          this.leveledUp = false;

          //Respawn the ghosts
          for(let g of this.ghosts){
            g.spawn();
          }

          for(let pel of this.tileMap.superPellets){
            pel.reset();
          }

          this.tileMap.fruit.reset();
          this.tileMap.fruit.increase();
          
          for(let pel of this.tileMap.pellets){
            pel.reset();
          }

          this.pickupsLeft = 285; //Reset the pickups left
          this.player.lives = 3; //Reset the players lives
          this.botBar.lives = 3;
        }
      }
    }
    

    else if(this.tileMap.isLoaded) //Only update if the tilemap is ready
    {
      //Only update the ghosts if the player has no lives left
      if(this.player.lives > 0 && this.player.alive && this.pickupsLeft > 0)
      {
        for(let ghost of this.ghosts)
        {
          ghost.update(dt, this.player);
        }
      }
      
      this.player.update(dt);

      //Only check for collisions if the player has lives
      if(this.player.lives > 0 && this.player.alive && this.pickupsLeft > 0)
      {
        for(let ghost of this.ghosts)
        {
          if (Collision.CircleVsCircle(this.player.collider, ghost.collider))
          {
            if (this.player.isPoweredUp && ghost.alive)
            {
              this.topBar.score += this.player.eatGhost();
              ghost.die();
              this.ghostDeathSound.playAudio('killGhost', false, audioOptions.volume/100);
            }
            else if(this.playerHit === false && ghost.alive)
            {
              this.DeathSound.playAudio('killPacMan', false, audioOptions.volume/100);
              this.player.lives--;

              if(this.player.lives <= 0)
              {
                this.gameEnding = true;
              }
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
            this.player.projectileActive = false;
            ghost.die();
            this.topBar.score += this.player.eatGhost();
            audioOptions.manager.playAudio('killGhost', false, audioOptions.volume/100);
            this.ghostDeathSound.playAudio('killGhost', false, audioOptions.volume/100);
            this.player.projectileActive = false;
            this.player.pm.clearProjectiles();
            break;
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
    if(this.pickupsLeft > 0)
      this.checkForPickup();
  }

  checkForPickup()
  {
    //Checks if player is on the super pellets grid position, if so, pick it up
    for(let pel of this.tileMap.superPellets)
    {
      //If the pellet isnt already picked up, pick it up
      if(pel.pickedUp === false && 
        this.player.gridPosition.x === pel.gridPosition.x &&
        this.player.gridPosition.y === pel.gridPosition.y)
      {
        pel.pickUp();
        this.player.powerUp(); //Set the player as powered up

        for(let g of this.ghosts)
        {
          g.setBlueGhost();
        }
        this.pickupsLeft--; //Take away from pickups left
        this.topBar.score += pel.value; //Add the value of the pellet to the score
        break;
      }
    }

    for(let pel of this.tileMap.pellets)
    {
      //If the pellet isnt already picked up, pick it up
      if(pel.pickedUp === false && 
        this.player.gridPosition.x === pel.gridPosition.x &&
        this.player.gridPosition.y === pel.gridPosition.y)
      {
        pel.pickUp();
        this.pickupsLeft--; //Take away from pickups
        this.topBar.score += pel.value;
        break;
      }
    }

    if(this.tileMap.fruit.pickedUp === false &&
      this.player.gridPosition.x === this.tileMap.fruit.gridPosition.x &&
      this.player.gridPosition.y === this.tileMap.fruit.gridPosition.y)
    {
      this.tileMap.fruit.pickUp();
      let newFruit = new Fruit(0, 0);
      newFruit.currentFruit = this.tileMap.fruit.currentFruit - 1;
      newFruit.increase();
      if(this.botBar.fruits.length < 8)
      {
        this.botBar.fruits.push(newFruit);
      }
      this.pickupsLeft--; //Take away from pickups
      this.topBar.score += this.tileMap.fruit.value;
      this.fruitSound.playAudio('eatFruit', false, audioOptions.volume/100);
    }

    //If there are no pickups left, reset the level by resetting the player and ghosts
    if(this.pickupsLeft <= 0)
    {
      this.levelUp();
    }
  }

  handleInput(input)
  {
    if(this.isActive)
    {
      if(this.gameOver)
      {
        return "this.mManager.setCurrentScene('Scoreboard')";
      }
      else if(this.gamePaused)
      {
        this.gamePaused = false;
        return "this.mManager.setCurrentScene('Pause Scene')"
      }
      this.player.handleInput(input);
    }
  }

  keyUp(e)
  { 
    if(this.isActive)
    {
      this.gamePaused = e.code === "Escape" ? true : false;
    }
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
