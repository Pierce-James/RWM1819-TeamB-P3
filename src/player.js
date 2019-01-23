class Player {

    constructor(x, y) 
    {
        this.x = 200;
        this.y = 200;
        this.image = new Image();
        this.width = 50;
        this.height = 50;
        
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
        this.image.src = "./src/ASSETS/Pacman.png"
        
    }

    render(ctx)
    {
      ctx.drawImage(this.image, 0,0,3633.2, 3509, this.x, this.y, this.width, this.height);
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
    }
}

if (typeof module !== "undefined") {
    module.exports = Player;
}