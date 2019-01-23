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
        this.image.src = "ASSETS/SPRITES/Pacman72.png"
    }

    render(ctx)
    {
        this.pS.draw(this.position.x, this.position.y);
    }

    handleInput(input)
    {
        if(input.isButtonPressed("ArrowUp"))
        {
            if(this.halt>= this.speed)
            {
                this.halt = 0;
                this.moveDirection = new Vector2(0,-1);
                this.position.plusEquals(this.moveDirection.multiply(this.moveDistance));
                this.gridPosition.plusEquals(this.moveDirection);
            }
        }
        else if(input.isButtonPressed("ArrowDown"))
        {
            if(this.halt>= this.speed)
            {
                this.halt = 0;
                this.moveDirection = new Vector2(0,1);
                this.position.plusEquals(this.moveDirection.multiply(this.moveDistance));  
                this.gridPosition.plusEquals(this.moveDirection);  
            }
        }
        
        else if(input.isButtonPressed("ArrowLeft"))
        {
            if(this.halt>= this.speed)
            {
                this.halt = 0;
                this.moveDirection = new Vector2(-1,0);
                this.position.plusEquals(this.moveDirection.multiply(this.moveDistance));
                this.gridPosition.plusEquals(this.moveDirection);
            }  
        }
        else if(input.isButtonPressed("ArrowRight"))
        {
            if(this.halt>= this.speed)
            {
                this.halt = 0;
                this.moveDirection = new Vector2(1,0);
                this.position.plusEquals(this.moveDirection.multiply(this.moveDistance));
                this.gridPosition.plusEquals(this.moveDirection);
            }
        }
    }

    update(dt)
    {
        this.halt += dt;

        //Set collider position every frame
        this.collider.setPosition(this.x, this.y);
    }
}

if (typeof module !== "undefined") {
    module.exports = Player;
}
