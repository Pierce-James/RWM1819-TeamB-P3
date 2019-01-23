class ScoreboardScene
{
  constructor()
  {
    this.scoreboard = [];
    this.sortedScoreboard = [];
    this.mousePos = new Vector2(0,0);

    this.textPositions = [];
    for(var i = 0; i < 10; i++)
    {
      this.textPositions.push(new Vector2(1280 / 2 - 320 / 2, 200 + (i * 50)));
    }

    this.pointerPosition = new Vector2(1280/ 2 - 100, 800);

    //Initialise the board and dont clear the existing one
    this.initBoard(false);

    this.defaultScore = ["---", 0];

    //Loading the font for the game
    const font = new FontFace("Joystix", "url(src/ASSETS/Joystix.ttf)");
    document.fonts.add(font);
    document.body.classList.add("Joystix");

    //Input variables
    this.escapedPressed = false;
    this.wasEscapedPressed = false;
    this.changeSceneStr = "this.mManager.setCurrentScene('Game Scene')";
    document.addEventListener("keydown", this.keyDown.bind(this));
    document.addEventListener("keyup", this.keyUp.bind(this));

    this.flashSpeed = .2;
    this.timeTillFlash = .2;
    this.drawIndicator = false;
  }

  initBoard(deleteExistingBoard)
  {
    //If the scoreboard doesnt exist, create it
    if(localStorage.getItem("Scoreboard") === null){
      localStorage.setItem("Scoreboard", JSON.stringify(this.scoreboard));
    }
    //Else if it does exist, and the bool is true, delete it
    else if(deleteExistingBoard) {
      localStorage.removeItem("Scoreboard");
    }

    //Assign this.scoreboard the loaded scoreboard from storage
    this.scoreboard = JSON.parse(localStorage.getItem("Scoreboard"));

    //Update the scoreboard
    this.sortScoreboard();
  }

  update(dt)
  {
    //Add to our time to flash
    this.timeTillFlash += dt;

    //If its time to flash, flip our bool
    if(this.timeTillFlash >= this.flashSpeed)
    {
      this.timeTillFlash = 0;
      this.drawIndicator = !this.drawIndicator; //Flip the bool
    }
  }

  //Input handle
  handleInput(input)
  { 
    //If escaped was pressed, return to main menu (game scene for now)
    if(this.escapedPressed && !this.wasEscapedPressed)
    {
      this.escapedPressed = false;
      this.wasEscapedPressed = false;
      return this.changeSceneStr;
    }
  }

  keyDown(e)
  {
    this.wasEscapedPressed = this.escapedPressed; //Set previous

    //If enter is pressed, set the bool to true
    if(e.code === "Enter")
    {
      this.escapedPressed = true;
    }
  }

  keyUp(e)
  {
    //If enter is pressed, set the bool to true
    if(e.code === "Enter")
    {
      this.escapedPressed = false;
    }

    this.wasEscapedPressed = this.escapedPressed; //Set previous
  }

  draw(ctx)
  {
    ctx.save(); //Save the ctx
    ctx.fillstyle = "#000000";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.textAlign = "center"; //Allign text to draw from its centre
    ctx.fillStyle = "#3b71c6"; //Set to blue text
    ctx.font = "30px Joystix";


    ctx.fillText("scoreboard", 1280 / 2, 50);
    ctx.fillText("Rank/Name", 1280 / 2 - 340 / 2, 125);
    ctx.fillText("Score", 1280 / 2 + 320 / 2, 125);


    //If there are values in the scoreboard, display them
    if(this.sortedScoreboard.length > 0)
    {
      for(var i = 0; i < 10; i++)
      {
        if(this.sortedScoreboard.length > i)
        {
          ctx.fillText((i + 1).toString() + ":", this.textPositions[i].x - 70, this.textPositions[i].y);

          ctx.fillText(this.sortedScoreboard[i][1]["name"], this.textPositions[i].x, this.textPositions[i].y);
          var scorePadded = this.sortedScoreboard[i][1]["score"].toString().padStart(5, "0"); //Pad the score with 0's
          ctx.fillText(scorePadded, this.textPositions[i].x + 320, this.textPositions[i].y);
        }
      }
    }
    //Else if the scoreboard isnt populated yet, display a defualt text
    else {
      ctx.fillText(this.defaultScore[0], this.textPositions[0].x, this.textPositions[0].y);
      var scorePadded = this.defaultScore[1].toString().padStart(5, "0"); //Pad the score with 0's
      ctx.fillText(scorePadded, this.textPositions[0].x + 320, this.textPositions[0].y);
    }

    //Draw the return string
    ctx.fillText("return", 1280/ 2, this.pointerPosition.y);

    if(this.drawIndicator){
          ctx.fillText(">", this.pointerPosition.x, this.pointerPosition.y);
    }


    ctx.restore(); //Restore it
  }

  //Updates the score board by reading the values in the scoreboard
  // and sorting them by highest to lowest
  sortScoreboard()
  {
    var sortable = [];

    for(var key in this.scoreboard){
      if(this.scoreboard.hasOwnProperty(key))
      {
        sortable.push([key, this.scoreboard[key]]);
      }
    }

    sortable.sort(function(a,b){
      return b[1]["score"] - a[1]["score"];
    });

    this.sortedScoreboard = sortable;
  }


  //Adds a score to the scoreboard and prompts the player for their name
  addToScoreBoard(score)
  {
    //The players name
    var playerName = "";

    //While the players name is empty or null or its length is not 3
    while (playerName === "" || playerName == null || playerName.length !== 3)
    {
        playerName = prompt ("Please enter your name, it must be 3 characters in length","");
    }

    //Create the object for the the players score
    var obj = {
      "name":playerName,
      "score":score
    };

    this.scoreboard.push(obj);

    localStorage.setItem("Scoreboard", JSON.stringify(this.scoreboard));

    //Sort the scoreboard
    this.sortScoreboard();
  }
}
