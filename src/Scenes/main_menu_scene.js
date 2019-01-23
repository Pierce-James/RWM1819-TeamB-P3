class MainMenuScene {
    constructor(){
        //Loading the font for the game
        /*const font = new FontFace("Joystix", "url(src/ASSETS/Joystix.ttf)");
        document.fonts.add(font);
        document.body.classList.add("Joystix");

        this.pointerPosition = new Vector2(1280/ 2 - 100, 500);
        this.textButtons = {
            'Start':new Vector2(1280 / 2, 500), 
            'Options':new Vector2(1280 / 2 - 340 / 2, 550),
            'ScoreBoard':new Vector2(1280 / 2 + 320 / 2, 600)
        }*/

        var buttonIMG = new Image(2000, 230);
        buttonIMG.src = "ASSETS/SPRITES/Menu_buttons.png";

        this.menuButtons = new Sprite(0, 0, 500, 230, buttonIMG, window.innerWidth, window.innerHeight, false, 4);
        this.buttonIndex = 1;
        this.menuButtons.setFrame(this.buttonIndex);


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
    if(this.enterPressed)
    {
        switch(this.buttonIndex){
            case 1:
                return "this.mManager.setCurrentScene('Game Scene')";
            case 2:
                return "this.mManager.setCurrentScene('Game Scene')";
            case 3:
                console.log("scoreboard?");
                return "this.mManager.setCurrentScene('Scoreboard')";
        }
    }  
  }

  keyDown(e)
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

    /*
    this.wasEscapedPrwasEnterPressedessed = this.enterPressed; //Set previous

    //If enter is pressed, set the bool to true
    if(e.code === "Enter")
    {
      this.enterPressed = true;
    }*/
  }

  keyUp(e)
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
    //this.wasEnterPressed = this.enterPressed; //Set previous*/
  }
  

  draw(ctx)
  {
    ctx.save(); //Save the ctx
    ctx.fillstyle = "#000000";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    this.menuButtons.setFrame(this.buttonIndex);
    this.menuButtons.draw();


    ctx.restore(); //Restore it
  }

}