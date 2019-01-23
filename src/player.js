class Player {

    constructor(x, y)
    {
        this.x = 32 * 16;
        this.y = 32 * 6;
        this.image = new Image();
        this.width = 32;
        this.height = 32;
        this.position = new Vector2(this.x,this.y);
        //Create circle collider
        this.collider = new CollisionCircle(this.position.x, this.position.y, this.width / 2);
        this.load();

        this.frameIndex = 0;

        this.loop = true;
        this.live = 5;
        //Power up state
        this.isPoweredUp = false;
        this.moveDistance = 32;
        this.moveDirection = new Vector2(0,0);
        this.speed = .4;
        this.halt = 0;

        this.p = new Projectile("bullet", "simple");
        this.p.setPosition(this.position.x, this.position.y);
        this.p.setSpeed(5);
        this.p.setAngle(90);
        this.p.setVelocity(2, 2);

        this.pm = new ProjectileManager();
        this.pm.addProjectile(this.p);

        var image = new Image(256,32);
        image.src = "./ASSETS/SPRITES/Pacman72.png"
        this.pS = new Sprite(this.position.x, this.position.y, 32, 32, image, 32,32, true, 8)

        this.gridPosition = new Vector2(this.position.x / 32, this.position.y / 32);
    }

    load()
    {
        this.image.src = "ASSETS/SPRITES/Pacman72.png"
    }

    render(ctx)
    {
        this.pS.draw(this.position.x, this.position.y);
        this.collider.draw(ctx);

       // this.pm.render();
    }

    handleInput(input)
    {
        this.collider.setPosition(this.position.x, this.position.y);
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

        if (input.isButtonPressed("Space"))
        {
            console.log("Fire!");
            this.pm.fireProjectiles();
        }
    }

    update(dt)
    {
        this.halt += dt;

        //Set collider position every frame

    }
}

if (typeof module !== "undefined") {
    module.exports = Player;
}
