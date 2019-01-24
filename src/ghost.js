class Ghost
{
  constructor(ghostType, x, y, grid, scatterTile){
    this.moveDistance = 32; //32 pixels per move
    this.moveSpeed = .4; //Moves a cell every .3 seconds
    this.timeTillMove = 0; //Time till the ghost can move cell

    this.collider = new CollisionCircle(x, y, 16); //Create collider
    this.moveDirection = new Vector2(0,0);
    this.position = new Vector2(x, y);
    this.spawnPosition = new Vector2(x, y);
    this.spawnGridPosition = new Vector2(x / 32, y / 32);
    this.targetPos = new Vector2(x, y);
    this.gridPosition = new Vector2(x / 32, y / 32);

    this.gridRef = grid;
    this.scatterTile = scatterTile; //Ste the scatter tile
    this.scatterTime = .2;
    this.timeTillScatter = 0;

    this.seekPath = []; //Our seek path

    //Setting the image of the ghost
    var img = new Image(256, 32);

    if(ghostType === "Blinky")
      img.src = "ASSETS/SPRITES/Red_ghost_72.png";
    else if(ghostType === "Pinky")
      img.src = "ASSETS/SPRITES/Lavande_ghost_72.png";
    else if(ghostType === "Clyde")
      img.src = "ASSETS/SPRITES/Orange_ghost_72.png";
    else if(ghostType === "Inky")
      img.src = "ASSETS/SPRITES/Blue_ghost_72.png";
    this.spr = new Sprite(this.position.x, this.position.y, 32, 32, img, 32, 32, true, 4);
    var eyeImg = new Image(256, 32);
    eyeImg.src = "ASSETS/SPRITES/Eyes_72.png";
    this.eyes = new Sprite(this.position.x, this.position.y, 32, 32, eyeImg, 32, 32, false, 4);

    this.ghostType = ghostType;
    this.state = "Scatter"; //Start with scatter state, as the update swaps them immedaitely

    this.alive = true;
    this.eyesSpeed = 224; //Move 224 pixels a second
    this.eyesVelocity = new Vector2(0,0); //The velocity of the eyes
    this.timesMoved = 0; //Temp

    this.canMove = true;
    this.playersPosition = new Vector2(0,0);
    this.player = undefined;

    //Not to be used by any other ghosts
    this.blinkyRef; //This is used by inky
  }

  update(dt, player){
    if(this.alive && this.canMove) //If alive, do movement and set ghost eyes
    {
      this.player = player; //Set the player
      this.playersPosition = player.gridPosition; //Set the players position

      this.checkIfGhostMoved(dt); //Check if the ghost has moved
      this.setGhostEyes(); //Set the ghost eyes sprite

      //Do different updates based on the ghost
      if(this.ghostType === "Blinky"){
        this.blinkyUpdate(dt, this.playersPosition);
      }
      else if(this.ghostType === "Pinky"){
        this.pinkyUpdate(dt, this.playersPosition);
      }
      else if(this.ghostType === "Clyde"){
        this.clydeUpdate(dt, this.playersPosition);
      }
      else if(this.ghostType === "Inky"){
        this.inkyUpdate(dt, this.playersPosition);
      }
    }
    else //Else move our ghost eyes to the start position
    {
      this.deadUpdate(dt);
    } 
  }

  clydeUpdate(dt, playersPosition)
  {
    if(this.state === "Chase")
    {
      if(this.gridPosition.distance(playersPosition) < 4)
      {
        this.timeTillScatter = this.scatterTime;
      }

      if(this.checkToSwapBehaviour(dt, "Scatter", 5))
      {
        this.blinkySeek(this.scatterTile);
      }
    }
    else if(this.state === "Scatter")
    {
      if(this.checkToSwapBehaviour(dt, "Chase", 8))
      {
        this.blinkySeek(playersPosition);
      }
    }
  }
  inkyUpdate(dt, playersPosition)
  {
    //If we are chasing the player
    if(this.state === "Chase")
    {
      if(this.checkToSwapBehaviour(dt, "Scatter", 2))
      {
        this.blinkySeek(this.scatterTile);
      }
    }
    else if(this.state === "Scatter")
    {
      if(this.checkToSwapBehaviour(dt, "Chase", 8))
      {
        this.inkySeek(playersPosition);
      }
    }
  }

  pinkyUpdate(dt, playersPosition)
  {
    //If we are chasing the player
    if(this.state === "Chase")
    {
      if(this.checkToSwapBehaviour(dt, "Scatter", 2))
      {
        this.blinkySeek(this.scatterTile);
      }
    }
    else if(this.state === "Scatter")
    {
      if(this.checkToSwapBehaviour(dt, "Chase", 8))
      {
        this.pinkySeek(playersPosition);
      }
    }
  }

  blinkyUpdate(dt, playersPosition)
  {
    if(this.state === "Chase") //If our state is chasing
    {
      if(this.checkToSwapBehaviour(dt, "Scatter", 2))
      {
        this.blinkySeek(this.scatterTile);
      }

    }
    else if(this.state === "Scatter") //If our state is scattering
    {
      //If the time to swap behaviour or the distance to the scatter position is there
      if(this.checkToSwapBehaviour(dt, "Chase", 8) || this.targetPos.distance(this.position) <= 8)
      {
        this.blinkySeek(playersPosition);
      }
    }
  }

  blinkySeek(targetPos)
  {
    //If our seek path is not populated, populate it
    this.seekPath = this.gridRef.BFS(this.gridPosition, targetPos, 0, false);
    this.targetPos =  this.seekPath.length === 0 ? new Vector2(this.gridPosition.x, this.gridPosition.y) : this.seekPath.shift(); //Get the first element in the array, and remove it from the path
    this.moveDirection = new Vector2(0,0);

    if(this.targetPos.x > this.gridPosition.x) {this.moveDirection = new Vector2(1, 0);}
    else if(this.targetPos.x < this.gridPosition.x) {this.moveDirection = new Vector2(-1, 0);}
    else if(this.targetPos.y > this.gridPosition.y) {this.moveDirection = new Vector2(0, 1);}
    else if(this.targetPos.y < this.gridPosition.y) {this.moveDirection = new Vector2(0, -1);}
    else {this.moveDirection = new Vector2(0, 0);}
  }

  inkySeek(targetPos)
  {
    let aheadPos = new Vector2(targetPos.x, targetPos.y);
    let foundTile = true;

    //Loop 2 times
    for(let i = 1; i < 3; i++)
    {
      let dummyGridPos = this.player.moveDirection.multiply(i).plus(this.playersPosition);

      //If the position is in the grid, then check if it is a wall
      if(dummyGridPos.x < 28 && dummyGridPos.x >= 0 && dummyGridPos.y >= 0 && dummyGridPos.y < 31)
      {
        if(this.gridRef.tiles[dummyGridPos].isCollidable === false)
        {
          aheadPos = new Vector2(dummyGridPos.x, dummyGridPos.y); //Get the non grid position of the tile
          //console.log("Moving ahead of player");
        }
        else
        {
          foundTile = false;
          break;
        }
      }
    }

    if(foundTile) //If we foud 2 tiles infront of the player
    {
      //Distance to 2 tiles infront of player from blinky
      let dfptb = this.blinkyRef.gridPosition.distance(aheadPos);
      let diff = this.blinkyRef.gridPosition.minus(aheadPos);
      let normalised = diff.normalise().multiply(dfptb * 2); //Get two times the distance from blinky to the the tile
      let gPos = new Vector2(parseInt(normalised.x), parseInt(normalised.y)); //Get grid position of the line from blinky to two times the distance to the tile

      //If gPos is in the grid
      if(gPos.x < 28 && gPos.x >= 0 && gPos.y >= 0 && gPos.y < 31)
      {
        if(this.gridRef.tiles[gPos].isCollidable === false)
        {
          //console.log("Position is in the grid and isnt a wall");
          aheadPos = new Vector2(gPos.x, gPos.y);
        }
        else
        {
          aheadPos = new Vector2(targetPos.x, targetPos.y);
        }

      }

    }
    else
    {
      aheadPos = new Vector2(targetPos.x, targetPos.y);
    }

    console.log(aheadPos);

    //If our seek path is not populated, populate it
    this.seekPath = this.gridRef.BFS(this.gridPosition, aheadPos, 0, false);
    this.targetPos =  this.seekPath.length === 0 ? new Vector2(this.gridPosition.x, this.gridPosition.y) : this.seekPath.shift(); //Get the first element in the array, and remove it from the path

    if(this.targetPos.x > this.gridPosition.x) {this.moveDirection = new Vector2(1, 0);}
    else if(this.targetPos.x < this.gridPosition.x) {this.moveDirection = new Vector2(-1, 0);}
    else if(this.targetPos.y > this.gridPosition.y) {this.moveDirection = new Vector2(0, 1);}
    else if(this.targetPos.y < this.gridPosition.y) {this.moveDirection = new Vector2(0, -1);}

  }

  pinkySeek(targetPos)
  {
    let aheadGrid = new Vector2(targetPos.x, targetPos.y);
    // if(this.gridPosition.distance(this.playersPosition) > 4)
    // {
      //Loop 4 times
      for(let i = 1; i < 5; i++)
      {
        let dummyGridPos = this.player.moveDirection.multiply(i).plus(this.playersPosition);

        //If the position is in the grid, then check if it is a wall
        if(dummyGridPos.x < 28 && dummyGridPos.x >= 0 && dummyGridPos.y >= 0 && dummyGridPos.y < 31)
        {
          if(this.gridRef.tiles[dummyGridPos].isCollidable === false)
          {
            aheadGrid = dummyGridPos;
          }
          else
          {
            break;
          }
        }
      }


      //If our seek path is not populated, populate it
      this.seekPath = this.gridRef.BFS(this.gridPosition, aheadGrid, 0, false);
      this.targetPos =  this.seekPath.length === 0 ? new Vector2(this.gridPosition.x, this.gridPosition.y) : this.seekPath.shift(); //Get the first element in the array, and remove it from the path

      if(this.targetPos.x > this.gridPosition.x) {this.moveDirection = new Vector2(1, 0);}
      else if(this.targetPos.x < this.gridPosition.x) {this.moveDirection = new Vector2(-1, 0);}
      else if(this.targetPos.y > this.gridPosition.y) {this.moveDirection = new Vector2(0, 1);}
      else if(this.targetPos.y < this.gridPosition.y) {this.moveDirection = new Vector2(0, -1);}
      else {this.moveDirection = new Vector2(0, 0);}
    // }
    //  else
    //  {
    //    this.blinkySeek(this.playersPosition);
    // }    
  }

  checkToSwapBehaviour(dt, theState, newScatterTime)
  {
    this.timeTillScatter += dt; //Add to scatter

    if(this.timeTillScatter >= this.scatterTime) //If its time to switch from scatter, return to chase mode
    {
      this.scatterTime = newScatterTime;
      this.seekPath = [];
      this.timeTillScatter = 0;
      this.state = theState;
      this.moveDirection = new Vector2(0,0);
      return true;
    }

    return false;
  }

  deadUpdate(dt)
  {
    if(this.position.distance(this.spawnPosition) <= 8){ //If our eyes are now back at our spawn position, reset the ghost
      this.position = new Vector2(this.spawnPosition.x, this.spawnPosition.y); //Set our position
      this.gridPosition = new Vector2(this.spawnGridPosition.x, this.spawnGridPosition.y); //Set our grid position
      this.collider.position = new Vector2(this.spawnPosition.x, this.spawnPosition.y);
      this.alive = true;
      console.log("Eyes back at spawn");
    }
    else{
      this.position.plusEquals(this.eyesVelocity.multiply(dt)); //Add the eyes velocity to the position of the ghost
    }
  }

  checkIfGhostMoved(dt){
    this.timeTillMove += dt;

    if(this.timeTillMove >= this.moveSpeed)
    {
      let canMove = false;
      if((this.moveDirection.x === 1 && this.canMoveRight()) 
      || (this.moveDirection.x === -1 && this.canMoveLeft())
      || (this.moveDirection.y === 1 && this.canMoveDown())
      || (this.moveDirection.y === -1 && this.canMoveUp()))
      {
        canMove = true;
      }

      if(canMove)
      {
        this.timeTillMove = 0;
        //Add our movement to the ghost
        this.position.plusEquals(this.moveDirection.multiply(this.moveDistance));
        this.collider.position = new Vector2(this.position.x, this.position.y);
        this.gridPosition.plusEquals(this.moveDirection);

        this.timesMoved++; //Add to our times moved
        if(this.timesMoved >= 10)
        {
          //this.die();
          this.timesMoved = 0;
        } 
      }
      
      if(this.ghostType === "Blinky")
      {
        this.blinkySeek(this.state === "Chase" ? this.playersPosition : this.scatterTile);
      }
      else if(this.ghostType === "Pinky")
      {
        this.pinkySeek(this.state === "Chase" ? this.playersPosition : this.scatterTile);
      }
      else if(this.ghostType === "Clyde")
      {
        this.blinkySeek(this.state === "Chase" ? this.playersPosition : this.scatterTile);
      }
      else if(this.ghostType === "Inky")
      {
        if(this.state === "Chase"){
          this.inkySeek(this.playersPosition);
        }
        else{
          this.blinkySeek(this.scatterTile);
        }
      }
    }
  }

  removeElement(array, element)
  {
    const index = array.indexOf(element);
    array.splice(index, 1);
  }

  //Kills the ghost, and sets the ghost to move back to its spawn location
  die()
  {
    this.alive = false;
    this.targetPos = new Vector2(this.spawnGridPosition.x * 32, this.spawnGridPosition.y * 32); //Set our target position to the spawn location
    this.eyesVelocity = this.targetPos.minus(this.position).normalise().multiply(this.eyesSpeed);

    this.timeTillMove = 0;
  }

  canMoveUp()
  {
    if(this.gridPosition.y - 1 >= 0)
    {
      if(this.gridRef.tiles[new Vector2(this.gridPosition.x, this.gridPosition.y - 1)].isCollidable === false)
      {
        return true;
      }
    }

    return false;
  }

  canMoveDown()
  {
    if(this.gridPosition.y + 1 < 31)
    {
      if(this.gridRef.tiles[new Vector2(this.gridPosition.x, this.gridPosition.y + 1)].isCollidable === false)
      {
        return true;
      }
    }

    return false;
  }

  canMoveLeft()
  {
    if(this.gridPosition.x - 1 >= 0)
    {
      if(this.gridRef.tiles[new Vector2(this.gridPosition.x - 1, this.gridPosition.y)].isCollidable === false)
      {
        return true;
      }
    }

    return false;
  }

  canMoveRight()
  {
    if(this.gridPosition.x + 1 < 28)
    {
      if(this.gridRef.tiles[new Vector2(this.gridPosition.x + 1, this.gridPosition.y)].isCollidable === false)
      {
        return true;
      }
    }

    return false;
  }

  // //Checks if the ghost must turn if their next cell is now a wall
  // mustTurn()
  // {

  //   if(this.moveDirection.x === 1){
  //     if(this.canMoveRight() === false){
  //       return true;
  //     }
  //   }
  //   else if(this.moveDirection.x === -1){
  //     if(this.canMoveLeft() === false){
  //       return true;
  //     }
  //   }
  //   else if(this.moveDirection.y === -1){
  //     if(this.canMoveUp() === false){
  //       return true;
  //     }
  //   }
  //   else if(this.moveDirection.y === 1){
  //     if(this.canMoveDown() === false){
  //       return true;
  //     }
  //   }

  //   return false;
  // }

  //Sets the ghosts eyes depending on the direction they are going
  setGhostEyes()
  {
    if(this.moveDirection.x === -1)
    {
        this.eyes.setFrame(0);
    }
    if(this.moveDirection.y === 1)
    {
        this.eyes.setFrame(1);
    }
    if(this.moveDirection.y === -1)
    {
        this.eyes.setFrame(2);
    }
    if(this.moveDirection.x === 1)
    {
        this.eyes.setFrame(3);
    }
  }


  draw(ctx){
    if(this.alive) //If not dead, draw the ghosts body
    {
      this.spr.draw(this.position.x, this.position.y);
    }
    this.eyes.draw(this.position.x, this.position.y); //Always draw the eyes
  }
}
