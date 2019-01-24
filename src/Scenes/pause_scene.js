class PauseScene{

    constructor() 
    {
        const font = new FontFace("Joystix", "url(src/ASSETS/Joystix.ttf)");
        document.fonts.add(font);
        document.body.classList.add("Joystix");

        this.pause = [];
        this.pause.push("Continue");
        this.pause.push("Exit");
        
        this.buttonIndex = 0;
        this.keyPressed = false;
        this.exitPressed = false;
        this.wasExitPressed = false;
        this.changeSceneStr = "this.mManager.setCurrentScene('GameScene')";
        document.addEventListener("keydown", this.keyDown.bind(this));
        document.addEventListener("keyup", this.keyUp.bind(this));
        this.isActive = false;
    }

    start() {
        this.isActive = true;
    }

    stop() {
        this.isActive = false;
    }

    handleInput(input)
    {
        if(this.isActive === true)
        {
            if(this.exitPressed)
            {
                this.exitPressed = false;
                switch(this.buttonIndex)
                {
                    case 2:
                        return "this.mManager.setCurrentScene('Main Menu')";
                }
            }
        }
    }


    keyDown() 
    {

        if(this.isActive === true)
        {
            if(this.keyPressed === false)
            {
          switch(e.code){
                case 'ArrowUp':
                    this.pause[this.buttonIndex] = this.pause[this.buttonIndex].substr(2)
                    this.buttonIndex--;
                    if(this.buttonIndex < 0)
                        this.buttonIndex = 2;
                    this.pause[this.buttonIndex] = '> ' + this.pause[this.buttonIndex];
                    this.keyPressed = true;
                    break;
                case 'ArrowDown' :
                    this.pause[this.buttonIndex] = this.pause[this.buttonIndex].substr(2)
                    this.buttonIndex++;
                    if(this.buttonIndex>=3)
                        this.buttonIndex = 0;
                    this.pause[this.buttonIndex] = '> ' + this.pause[this.buttonIndex];
                    this.keyPressed = true;
                    break;
                }
            }
        }
    }

    keyUp() 
    {
        if(this.isActive === true)
        {
            if(this.isActive === true)
            {        
                switch(e.code){
                case 'ArrowUp':
                    this.keyPressed = false;
                    break;
                case 'ArrowDown' :
                    this.keyPressed = false;
                    break;
                  //  this.enterPressed = true;
                  //  this.keyPressed = false;
                   
                } 
            }
        }   
    }




    update() 
    {

    }

    draw(ctx)
    {
        ctx.save(); //Save the ctx
      ctx.fillstyle = "#000000";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      ctx.textAlign = "center"; //Align text to draw from its centre
      ctx.fillStyle = "#FFFFFF"; //Set to blue text
      ctx.font = "60px Joystix";
  
      ctx.fillText("Pause", 1280 / 2, 50);

      ctx.font = "30px Joystix";

      ctx.fillText(this.pause[0], 1280 / 2, 500);

      ctx.fillText(this.pause[1], 1280 / 2, 600);
  
      ctx.restore(); //Restore it
    }


    
}