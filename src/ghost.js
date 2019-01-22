class Ghost
{
  constructor(ghostType){
    this.moveSpeed = 50; //50 pixels per second
    this.velocity = new Vector2(0,0);
    this.moveDirection = new Vector2(-1,0);
    this.position = new Vector2(1280 / 2, 720 / 2);

    var img = new Image(256, 32);
    img.src = "ASSETS/SPRITES/Red_ghost_72.png";
    this.spr = new Sprite(this.position.x, this.position.y, 32, 32, img, 32, 32, true, 4);
    var eyeImg = new Image(256, 32);
    eyeImg.src = "ASSETS/SPRITES/Eyes_72.png";
    this.eyes = new Sprite(this.position.x, this.position.y, 32, 32, eyeImg, 32, 32, false, 4);

    this.ghostType = ghostType;
  }

  update(dt){
    //If distance to playe ris greater than 64? then pathfind to him

    //Pathfind to player and set our working direction
    if(this.ghostType === "Follow")
    {
      //Pathfind to player and move to his grid position
    }

    //Else move directly to player

    //Set the direction we move in and multiply by dt
    this.setMoveVelocity(dt);
    //this.spr.setFrame() to whatever direction you are moving 1-4

    //Add velocity to the ghosts position and reset their velocity (we dont want drag)
    this.position.plusEquals(this.velocity);
    this.velocity = new Vector2(0,0);
  }

  setMoveVelocity(dt)
  {
    //Add our move direction to the velocity
    this.velocity.plusEquals(this.moveDirection);

    //Multiply the velocity by the ghosts moveSpeed
    this.velocity.multiplyEquals(this.moveSpeed);

    //Multiply velocity by time so we by time rather than by how many updates
    this.velocity.multiplyEquals(dt) ;
  }

  draw(ctx){
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, 16, 0, 2* Math.PI);
    ctx.stroke();
    this.spr.draw(this.position.x, this.position.y);
    this.eyes.draw(this.position.x, this.position.y);
  }
}
