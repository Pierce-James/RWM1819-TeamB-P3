class Player {

    constructor(x, y)
    {
        this.x = 200;
        this.y = 200;
        this.image = new Image();
        this.width = 32;
        this.height = 32;

        this.load();

        this.frameIndex = 0;

        this.loop = true;

        this.speed = 5;
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
            this.y -= this.speed;
        }
        if(input.isButtonPressed("ArrowDown"))
        {
            this.y += this.speed;
        }
        if(input.isButtonPressed("ArrowLeft"))
        {
            this.x -= this.speed;
        }
        if(input.isButtonPressed("ArrowRight"))
        {
            this.x += this.speed;
        }
    }

    update(dt)
    {

    }
}

if (typeof module !== "undefined") {
    module.exports = Player;
}
