class Ghost
{
  constructor(){
    this.moveSpeed = 50; //50 pixels per second
    this.velocity = new Vector2(0,0);
    this.moveDirection = new Vector2(0,1);
    this.position = new Vector2(1280 / 2, 720 / 2);
  }

  update(dt){
    this.setMoveVelocity(dt);

    //Add velocity to the ghosts position and reset their velocity (we dont want drag)
    this.position.plusEquals(this.velocity);
    this.velocity = new Vector2(0,0);
  }

  setMoveVelocity(dt)
  {
    //Update move direction based on seek path
    if(this.moveDirection.x === -1) // if moving left
    {
      this.velocity.x = -this.moveSpeed;
    }

    if(this.moveDirection.x === 1) // if moving right
    {
      this.velocity.x = this.moveSpeed;
    }

    if(this.moveDirection.y === 1) // if moving down
    {
      this.velocity.y = this.moveSpeed;
    }

    if(this.moveDirection.y === -1) // if moving up
    {
      this.velocity.y = -this.moveSpeed;
    }

    //Multiply velocity by time so we by time rather than by how many updates
    this.velocity.multiplyEquals(dt) ;
  }

  draw(ctx){
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, 16, 0, 2* Math.PI);
    ctx.stroke();
  }
}
