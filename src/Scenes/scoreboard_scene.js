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
      this.textPositions.push(new Vector2(1280 / 2 - 320 / 2, 150 + (i * 50)));
    }

    //Initialise the board and dont clear the existing one
    this.initBoard(false);

    this.defaultScore = ["---", 0];

    addEventListener("mousemove", this.mouseMove.bind(this));
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

  }

  mouseMove(e)
  {
    this.mousePos = new Vector2(e.clientX, e.clientY);
  }

  draw(ctx)
  {
    ctx.save(); //Save the ctx
    ctx.textAlign = "center"; //Allign text to draw from its centre
    ctx.fillStyle = "#3b71c6"; //Set to blue text
    ctx.font = "30px Arial";

    //If there are values in the scoreboard, display them
    if(this.sortedScoreboard.length > 0)
    {
      for(var i = 0; i < 10; i++)
      {
        if(this.sortedScoreboard.length > i)
        {
          ctx.fillText(this.sortedScoreboard[i][1]["name"], this.textPositions[i].x, this.textPositions[i].y);
          var scorePadded = this.sortedScoreboard[i][1]["score"].toString().padStart(5, "0"); //Pad the score with 0's
          ctx.fillText(scorePadded, this.textPositions[i].x + 320, this.textPositions[i].y);
        }
      }
    }
    //Else if the scoreboard isnt populate dyet, display a defualt text
    else {
      ctx.fillText(this.defaultScore[0], this.textPositions[0].x, this.textPositions[0].y);
      var scorePadded = this.defaultScore[1].toString().padStart(5, "0"); //Pad the score with 0's
      ctx.fillText(scorePadded, this.textPositions[0].x + 320, this.textPositions[0].y);
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
