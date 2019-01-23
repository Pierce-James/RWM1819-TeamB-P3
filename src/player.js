class Player {

    constructor(x, y)
    {
        this.x = 32;
        this.y = 32;
        this.image = new Image();
        this.width = 32;
        this.height = 32;

        //Create circle collider
        this.collider = new CollisionCircle(this.x, this.y, this.width);
        this.load();

        this.frameIndex = 0;

        this.loop = true;

        this.moveDistance = 32;
        this.moveDirection = new Vector2(0,0);
        this.speed = .4;
        this.halt = 0;
        this.position = new Vector2(this.x,this.y);
        var image = new Image(256,32);
        image.src = "./ASSETS/SPRITES/Pacman72.png"
        this.pS = new Sprite(this.position.x, this.position.y, 32, 32, image, 32,32, true, 8)

        this.gridPosition = new Vector2(this.position.x/ 32, this.position.y /32);
    }

    load()
    {
<<<<<<< HEAD
        this.image.src = "./ASSETS/SPRITES/Pacman72.png"

=======
        this.image.src = "ASSETS/SPRITES/Pacman72.png"
>>>>>>> collisions
    }

    render(ctx)
    {
<<<<<<< HEAD
        this.pS.draw(this.position.x, this.position.y);
      //ctx.drawImage(this.image, 0,0,32,32, this.position.x, this.position.y, this.width, this.height, true, 5);
=======
      ctx.drawImage(this.image, 0,0,32, 32, this.x, this.y, this.width, this.height);
>>>>>>> collisions
    }

    handleInput(input)
    {
        if(input.isButtonPressed("ArrowUp"))
        {
            if(this.halt>= this.speed)
            {
                this.halt = 0;
                this.moveDirction = new Vector2(0,-1);
                this.position.plusEquals(this.moveDirction.multiply(this.moveDistance));
                this.gridPosition.plusEquals(this.moveDirction);
            }
        }
        else if(input.isButtonPressed("ArrowDown"))
        {
            if(this.halt>= this.speed)
            {
                this.halt = 0;
                this.moveDirction = new Vector2(0,1);
                this.position.plusEquals(this.moveDirction.multiply(this.moveDistance));  
                this.gridPosition.plusEquals(this.moveDirction);  
            }
        }
        
        else if(input.isButtonPressed("ArrowLeft"))
        {
            if(this.halt>= this.speed)
            {
                this.halt = 0;
                this.moveDirction = new Vector2(-1,0);
                this.position.plusEquals(this.moveDirction.multiply(this.moveDistance));
                this.gridPosition.plusEquals(this.moveDirction);
            }  
        }
        else if(input.isButtonPressed("ArrowRight"))
        {
            if(this.halt>= this.speed)
            {
                this.halt = 0;
                this.moveDirction = new Vector2(1,0);
                this.position.plusEquals(this.moveDirction.multiply(this.moveDistance));
                this.gridPosition.plusEquals(this.moveDirction);
            }
        }
    }

    update(dt)
    {
        this.halt += dt;

        
      

        if(this.moveD === true)
        {
            this.position.y += this.speed;
        }


        if(this.moveL === true)
        {
            this.position.x -= this.speed;
        }


        if(this.moveR === true)
        {
            this.position.x += this.speed;
        }

        //Set collider position every frame
        this.collider.setPosition(this.x, this.y);
    }
}

if (typeof module !== "undefined") {
    module.exports = Player;
}
