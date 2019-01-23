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

        this.moveDistance = 32;
        this.moveDirection = new Vector2(1,0);
        this.speed = .4;
        this.halt = 0;
        this.position = new Vector2(this.x,this.y);
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
      ctx.drawImage(this.image, 0,0,3633.2, 3509, this.position.x, this.position.y, this.width, this.height);
    }

  
    handleInput(input)
    {
        if(input.isButtonPressed("ArrowUp"))
        {
          //  this.moveD = false;
          //  this.moveL = false;
          //  this.moveR = false;
          //  this.moveU = true;

          //  if(this.moveU === true)
       // {
            if(this.halt>= this.speed)
            {
                this.halt = 0;
                this.position.plusEquals(this.moveDirection.multiply(this.moveDistance));
            }
           
            //this.y -= this.speed;
       // }
           
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
    }
}

if (typeof module !== "undefined") {
    module.exports = Player;
}