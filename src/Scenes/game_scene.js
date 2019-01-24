
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

    audioOptions.manager.loadSoundFile('gameSceneMusic', "ASSETS/AUDIO/Waka.mp3");
    audioOptions.manager.loadSoundFile('eatFruit', "ASSETS/AUDIO/Fruit.mp3");
    audioOptions.manager.loadSoundFile('killGhost', "ASSETS/AUDIO/GhostDeath.mp3");
    audioOptions.manager.loadSoundFile('killPacMan', "ASSETS/AUDIO/Death.mp3");

    this.startPlayTimer = false;
    this.playerHitTimer = 1.5;
    this.playerHit = false;
  }
  

  start(){
    this.isActive = true;
    audioOptions.manager.playAudio('gameSceneMusic', true, audioOptions.volume/100);
  }

  
  stop(){
    this.isActive = false;
    audioOptions.manager.stopAudio();
    var top = document.getElementById("Top of UI");
    top.parentNode.removeChild(top);
    var bottom = document.getElementById("Bottom of UI");
    bottom.parentNode.removeChild(bottom);
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
            if (this.player.isPoweredUp && ghost.alive)
            {
              this.topBar.score += this.player.eatGhost();
              ghost.die();
              audioOptions.manager.playAudio('killGhost', false, audioOptions.volume/100);
            }
            else if(this.playerHit === false && ghost.alive)
            {
              audioOptions.manager.playAudio('killPacMan', false, audioOptions.volume/100);
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
            audioOptions.manager.playAudio('killGhost', false, audioOptions.volume/100);
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
        this.topBar.score += pel.value;
        break;
      }
    }

    if(this.tileMap.fruit.pickedUp === false &&
      this.player.gridPosition.x === this.tileMap.fruit.gridPosition.x &&
      this.player.gridPosition.y === this.tileMap.fruit.gridPosition.y)
    {
      this.tileMap.fruit.pickUp();
      this.topBar.score += this.tileMap.fruit.value;
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
