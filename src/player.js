class Player {

    constructor(x, y)
    {
        this.x = 200;
        this.y = 200;
        this.image = new Image();
        this.width = 32;
        this.height = 32;

        //Create circle collider
        this.collider = new CollisionCircle(this.x, this.y, this.width);
        this.load();

        this.frameIndex = 0;

        this.loop = true;

        this.speed = 5;
        this.moveU = false;
        this.moveD = false;
        this.moveL = false;
        this.moveR = false;
    }

    load()
    {
        this.image.src = "ASSETS/SPRITES/Pacman72.png"
    }

    render(ctx)
    {
      ctx.drawImage(this.image, 0,0,32, 32, this.x, this.y, this.width, this.height);
    }


    handleInput(input)
    {
        if(input.isButtonPressed("ArrowUp"))
        {
            this.moveD = false;
            this.moveL = false;
            this.moveR = false;
            this.moveU = true;
           
        }
        else if(input.isButtonPressed("ArrowDown"))
        {
            this.moveD = true;
            this.moveL = false;
            this.moveR = false;
            this.moveU = false;

            
        }
        
        else if(input.isButtonPressed("ArrowLeft"))
        {
            this.moveD = false;
            this.moveL = true;
            this.moveR = false;
            this.moveU = false;
           
        }
        else if(input.isButtonPressed("ArrowRight"))
        {
            this.moveD = false;
            this.moveL = false;
            this.moveR = true;
            this.moveU = false;
           
        }
    }

    update(dt)
    {
        if(this.moveU === true)
        {
            this.y -= this.speed;
        }
      

        if(this.moveD === true)
        {
            this.y += this.speed;
        }


        if(this.moveL === true)
        {
            this.x -= this.speed;
        }


        if(this.moveR === true)
        {
            this.x += this.speed;
        }

        //Set collider position every frame
        this.collider.setPosition(this.x, this.y);
    }
}

if (typeof module !== "undefined") {
    module.exports = Player;
}
