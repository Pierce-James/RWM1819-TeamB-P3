class MainMenuScene {
    constructor(){

        var buttonIMG = new Image(2000, 230);
        buttonIMG.src = "ASSETS/SPRITES/Menu_buttons.png";

        this.menuButtons = new Sprite(0, 200, 500, 230, buttonIMG, window.innerWidth, window.innerHeight, false, 4);
        this.buttonIndex = 1;
        this.menuButtons.setFrame(this.buttonIndex);

        var titleIMG = new Image(2000, 230);
        titleIMG.src = "ASSETS/SPRITES/Menu_Title_72.png";
        
        this.title = new Sprite(280, -50, 500, 230, titleIMG, 500*2, 230*2, false);


        //Input variables
        this.keyPressed = false;

        this.enterPressed = false;
        this.wasEnterPressed = false;
        this.changeSceneStr = "this.mManager.setCurrentScene('Game Scene')";
        document.addEventListener("keydown", this.keyDown.bind(this));
        document.addEventListener("keyup", this.keyUp.bind(this));
        
        this.flashSpeed = .2;
        this.timeTillFlash = .2;
        this.drawIndicator = false;
        this.isActive = false;
    }

    start(){
      this.isActive = true;
    }

    stop(){
        this.isActive = false;
    }

    update(dt)
    {/*
      //Add to our time to flash
      this.timeTillFlash += dt;
  
      //If its time to flash, flip our bool
      if(this.timeTillFlash >= this.flashSpeed)
      {
        this.timeTillFlash = 0;
        this.drawIndicator = !this.drawIndicator; //Flip the bool
      }*/
    }

    //Input handle
    handleInput(input)
    { 
        if(this.isActive === true)
        {
            if(this.enterPressed)
            {
                this.enterPressed = false;
                switch(this.buttonIndex){
                    case 1:
                        return "this.mManager.setCurrentScene('Game Scene')";
                    case 2:
                        return "this.mManager.setCurrentScene('Options')";
                    case 3:
                        console.log("scoreboard?");
                        return "this.mManager.setCurrentScene('Scoreboard')";
                }
            }  
        }
    }

  keyDown(e)
  {
    if(this.isActive === true)
    {
        if(this.keyPressed === false)
        {
        switch(e.code){
            case 'ArrowUp':
                this.buttonIndex--;
                if(this.buttonIndex <= 0)
                    this.buttonIndex = 3;
                this.keyPressed = true;
                break;
            case 'ArrowDown' :
                this.buttonIndex++;
                if(this.buttonIndex>=4)
                    this.buttonIndex = 1;
                this.keyPressed = true;
                break;
            case 'Enter' :
                this.enterPressed = false;
                this.keyPressed = true;
        }  
    
        }
    }
  }

  keyUp(e)
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
            case 'Enter' :
                this.enterPressed = true;
                this.keyPressed = false;
                break;
        } 
    }
    //this.wasEnterPressed = this.enterPressed; //Set previous*/
  }
  

  draw(ctx)
  {
    ctx.save(); //Save the ctx
    ctx.fillstyle = "#000000";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    this.menuButtons.setFrame(this.buttonIndex);
    this.menuButtons.draw();
    this.title.draw();


    ctx.restore(); //Restore it
  }

}