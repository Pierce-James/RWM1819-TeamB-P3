class Player {

    constructor(x, y, grid)
    {
        this.image = new Image();

        this.velocity = new Vector2(0,0);
        //Create circle collider
        this.position = new Vector2(x, y);
        this.collider = new CollisionCircle(this.position.x, this.position.y, 16);
        this.frameIndex = 0;
       
        this.loop = true;
        this.live = 5;
        //Power up state
        this.isPoweredUp = false;
        this.moveDistance = 32;
        this.moveDirection = new Vector2(1,0);
        this.speed = .2;
        this.halt = .2;
        
        this.p = new Projectile("bullet", "simple");
        this.p.setPosition(this.position.x, this.position.y);
        this.p.setSpeed(3);
        this.p.setVelocity(2, 0);

        this.pm = new ProjectileManager();
        
        var image = new Image(256,32);
        image.src = "./ASSETS/SPRITES/Pacman72.png"
        this.pS = new Sprite(this.position.x, this.position.y, 32, 32, image, 32,32, true, 8)

        this.gridPosition = new Vector2(this.position.x/ 32, this.position.y /32);
        this.gridRef = grid;
        
        //Daryl's stuff, dont delete
    }

    //Call this when the player dies
    spawnPlayer()
    {
    }

    powerUp()
    {

    }

    render(ctx, input)
    {
        ctx.save();

        //Draw pac man rotated depending on the direction he is moving in
        if(this.moveDirection.y === 1){ this.drawRotated(90, ctx); }
        else if(this.moveDirection.x === -1){ this.drawRotated(180, ctx); }
        else if(this.moveDirection.x === 1){ this.drawRotated(0, ctx); }
        else if(this.moveDirection.y === -1){ this.drawRotated(270, ctx); }

        //Draw pacman sprite
        this.pS.draw(this.position.x, this.position.y);
        ctx.restore();
        this.pm.render();
    }

    drawRotated(angle, ctx)
    {
        ctx.translate(this.position.x + 16, this.position.y + 16);
        ctx.rotate(angle * Math.PI /180);
        ctx.translate((this.position.x + 16) * -1, (this.position.y + 16) * -1);
    }

    //Spawns a projectile
    spawnProjectile(direction)
    {
        let p = new Projectile("bullet", "simple");
        p.setPosition(this.position.x, this.position.y);
        p.setSpeed(3);
        p.setVelocity(direction.x, direction.y);
        this.pm.addProjectile(p);
        this.pm.fireProjectiles();
    }

    handleInput(input)
    {
        if(input.isButtonPressed("ArrowUp") && this.canMoveUp()){this.moveDirection = new Vector2(0,-1);  }
        if(input.isButtonPressed("ArrowDown") && this.canMoveDown()){this.moveDirection = new Vector2(0,1);  }
        if(input.isButtonPressed("ArrowLeft") && this.canMoveLeft()){this.moveDirection = new Vector2(-1,0);  }
        if(input.isButtonPressed("ArrowRight") && this.canMoveRight()){this.moveDirection = new Vector2(1,0);  }

        if (input.isButtonPressed("Space"))
        {
            this.spawnProjectile(this.moveDirection);
        }
    }

        update(dt)
        {
            this.halt += dt;
            
            if(this.halt >= this.speed)
            {
                let canMove = false;

                //If we can move in the direction we have set to move in, then set the bool as true
                if((this.moveDirection.x === 1 && this.canMoveRight())
                || (this.moveDirection.y === -1 && this.canMoveUp())
                || (this.moveDirection.y === 1 && this.canMoveDown())
                || this.moveDirection.x === -1 && this.canMoveLeft())
                {
                    canMove = true;
                }
                
                //If we can move, move
                if(canMove)
                {
                    this.halt = 0; //Reset move timer
                    this.position.plusEquals(this.moveDirection.multiply(this.moveDistance)); //Add to the position
                    this.gridPosition.plusEquals(this.moveDirection); //Update grid position
                    this.collider.setPosition(this.position.x, this.position.y); //Update collider position
                }
            }
            //Update the projectile manager
            this.pm.update();
        }

        canMoveUp()
        {
            if(this.gridPosition.y - 1 >= 0)
            {
                if(this.gridRef.tiles[new Vector2(this.gridPosition.x, this.gridPosition.y -1)].isCollidable === false)
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
                //If it isnt a wall and it isnt the ghost spawn area then we can move down
                if(this.gridRef.tiles[new Vector2(this.gridPosition.x, this.gridPosition.y + 1)].isCollidable === false
                && this.gridRef.tiles[new Vector2(this.gridPosition.x, this.gridPosition.y + 1)].ID !== 98)
                {
                    return true;
                }
            }
            return false;
        }

        canMoveLeft()
        {
            if(this.gridPosition.x - 1 >= -0)
            {
                if(this.gridRef.tiles[new Vector2(this.gridPosition.x -1, this.gridPosition.y)].isCollidable == false)
                {
                    return true;
                }
            }
            return false;
        }

        canMoveRight()
        {
            if(this.gridPosition.x + 1 < 31)
            {
                if(this.gridRef.tiles[new Vector2(this.gridPosition.x +1, this.gridPosition.y)].isCollidable === false)
                {
                    return true;
                }
            }
            return false;
        }
}

if (typeof module !== "undefined") {
    module.exports = Player;
}
