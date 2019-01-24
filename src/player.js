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
        this.lives = 3;
        this.projectileTimer = 0;
        //Power up state
        this.isPoweredUp = false;
        this.moveDistance = 32;
        this.moveDirection = new Vector2(-1,0);
        this.speed = .185;
        this.halt = .2;
        this.projectileActive = false;

        this.pm = new ProjectileManager();
        
        var image = new Image(256,32);
        image.src = "./ASSETS/SPRITES/Pacman72.png"
        this.pS = new Sprite(this.position.x, this.position.y, 32, 32, image, 32,32, false, 8, 50)

        var img = new Image(320, 32);
        img.src = "./ASSETS/SPRITES/Pacman_death_72.png";
        this.deathSprite = new Sprite(this.position.x, this.position.y, 32, 32, img, 32, 32, false, 10, 200);

        this.gridPosition = new Vector2(this.position.x / 32, this.position.y /32);
        this.gridRef = grid;
        
        //Daryl's stuff, dont delete
        this.spawnGridPosition = new Vector2(this.position.x / 32, this.position.y /32);
        this.spawnPosition = new Vector2(this.position.x, this.position.y);
        this.poweredUpTime = 6; // Powered up for 6 seconds
        this.ghostEatenPoints = 100; //This is double when a ghost is eaten, it will reward 200 for the first one

        this.wrapAroundPositions = [new Vector2(0, 14), new Vector2(0, 19), new Vector2(27, 14), new Vector2(27,19)];
        //Set which positions we wrap around to
        this.wrapMap = new Map();
        this.wrapMap.set(this.wrapAroundPositions[0].toString(), this.wrapAroundPositions[2]);
        this.wrapMap.set(this.wrapAroundPositions[1].toString(), this.wrapAroundPositions[3]);
        this.wrapMap.set(this.wrapAroundPositions[2].toString(), this.wrapAroundPositions[0]);
        this.wrapMap.set(this.wrapAroundPositions[3].toString(), this.wrapAroundPositions[1]);
        this.alive = true;
        this.resetingAfterDeath = true;
    }

    ifInWrapPosition()
    {
        for(let pos of this.wrapAroundPositions)
        {
            if(pos.equals(this.gridPosition))
            {
                return true;
            }
        }

        return false;
    }

    //Call this when the player dies
    spawnPlayer()
    {
        this.alive = false;
        this.deathSprite.animating = true;
        this.pS.animating = false;
        this.deathSprite.animationPlayedOnce = false;
    }

    checkProjectile(c2)
    {
        for (let p of this.pm.projectiles)
        {
            let c1 = new CollisionCircle(p.x, p.y, p.width / 2);
            if (Collision.CircleVsCircle(c1, c2))
            {
                return true;
            }
        }
        return false;
    }

    powerUp()
    {
        this.isPoweredUp = true;
        this.poweredUpTime = 6; //Ste our time to be powered up to 6
    }

    eatGhost()
    {
        this.ghostEatenPoints *= 2; //Double the points for consective ghosts
        return this.ghostEatenPoints; //Return the doubled points
    }

    endPowerUp()
    {
        this.ghostEatenPoints = 100;
    }

    render(ctx, input)
    {
        ctx.save();

        //Draw pac man rotated depending on the direction he is moving in
        if(this.moveDirection.y === 1){ this.drawRotated(90, ctx); }
        else if(this.moveDirection.x === -1){ this.drawRotated(180, ctx); }
        else if(this.moveDirection.x === 1){ this.drawRotated(0, ctx); }
        else if(this.moveDirection.y === -1){ this.drawRotated(270, ctx); }

        //Draw pacman sprite if alive
        if(this.alive)
        {
            this.pS.draw(this.position.x, this.position.y);
        }
        //Draw pacman death sprite if dead
        else
        {
            if(this.deathSprite.animationPlayedOnce === false)
            {
                this.deathSprite.draw(this.position.x, this.position.y);
            }
            else if(this.lives > 0)
            {
                this.resetingAfterDeath = true;
                this.alive = true;
                this.deathSprite.animating = false;
                this.position.x = this.spawnPosition.x;
                this.position.y = this.spawnPosition.y;

                this.gridPosition = new Vector2(this.spawnGridPosition.x, this.spawnGridPosition.y);
                this.collider.setPosition(this.position.x, this.position.y);
                this.moveDirection = new Vector2(-1, 0);
            }

        }
        ctx.restore();
        if (this.projectileActive)
        {
            this.pm.render();
        }
    }

    drawRotated(angle, ctx)
    {
        ctx.translate(this.position.x + 16, this.position.y + 16);
        ctx.rotate((this.alive === false ? angle + 90 : angle) * Math.PI /180);
        ctx.translate((this.position.x + 16) * -1, (this.position.y + 16) * -1);
    }

    //Spawns a projectile
    spawnProjectile(direction)
    {
        if (!this.projectileActive)
        {
            let p = new Projectile("bullet", "simple");
            p.setPosition(this.position.x + 16, this.position.y + 16);
            p.setSpeed(3);
            p.setVelocity(direction.x, direction.y);
            p.setTimeToLive(1);
            this.pm.addProjectile(p);
        }
        this.pm.fireProjectiles();
        this.projectileActive = true;
    }

    handleInput(input)
    {
        if(this.alive)
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
    }

    update(dt)
    {
        if(this.alive)
        {
            this.halt += dt;
            
            //Handle powerup
            if(this.isPoweredUp)
            {
                this.poweredUpTime -= dt;

                if(this.poweredUpTime <= 0)
                {
                    this.endPowerUp();
                }
            }
            if (this.projectileActive)
            {
                this.projectileTimer += 1 / 60;
            }


            for (let p of this.pm.projectiles)
            {
                if (this.projectileActive)
                {
                    if (this.projectileTimer > p.ttl)
                    {
                        this.pm.clearProjectiles();
                        this.projectileTimer = 0;
                        this.projectileActive = false;
                    }
                }
            }

            if(this.halt >= this.speed)
            {
                let canMove = false;

                //If we can move in the direction we have set to move in, then set the bool as true
                if((this.moveDirection.x === 1 && this.canMoveRight())
                || (this.moveDirection.y === -1 && this.canMoveUp())
                || (this.moveDirection.y === 1 && this.canMoveDown())
                || this.moveDirection.x === -1 && this.canMoveLeft()
                || this.ifInWrapPosition()) //If our position is in the wrap around positions
                {
                    canMove = true;
                }
                
                //If we can move, move
                if(canMove)
                {
                    this.halt = 0; //Reset move timer

                    if(this.ifInWrapPosition())
                    {
                        if((this.moveDirection.x === 1 && this.gridPosition.equals(new Vector2(27, 14)))
                        || (this.moveDirection.x === 1 && this.gridPosition.equals(new Vector2(27, 19)))
                        || (this.moveDirection.x === -1 && this.gridPosition.equals(new Vector2(0, 14)))
                        || (this.moveDirection.x === -1 && this.gridPosition.equals(new Vector2(0, 19))))
                        {
                            let wrapPos = this.wrapMap.get(this.gridPosition.toString());
                            this.gridPosition = new Vector2(wrapPos.x, wrapPos.y);
                            this.position.x = this.gridPosition.x * 32;
                            this.position.y = this.gridPosition.y * 32;
                        }
                        else
                        {
                            this.position.plusEquals(this.moveDirection.multiply(this.moveDistance)); //Add to the position
                            this.gridPosition.plusEquals(this.moveDirection); //Update grid position
                        }
                    }
                    else
                    {
                        this.position.plusEquals(this.moveDirection.multiply(this.moveDistance)); //Add to the position
                        this.gridPosition.plusEquals(this.moveDirection); //Update grid position
                    }
                    this.collider.setPosition(this.position.x, this.position.y); //Update collider position
                }
            }
            //Update the projectile manager
            this.pm.update();
        }
        else{
            this.pm.clearProjectiles();
            this.pm.projectileActive = false;
        }
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
        if(this.gridPosition.x - 1 >= 0)
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
        if(this.gridPosition.x + 1 < 28)
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