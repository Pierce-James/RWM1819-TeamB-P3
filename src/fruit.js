class Fruit
{
    constructor(X, Y){
        this.x = X;
        this.y = Y;
        this.gridPosition = new Vector2(X / 32, Y / 32);
        this.value = 100;

        this.pickedUp = false;

        //Temp variable, not needed after ocnstructor
        this.fruits = new Map();
        this.tempFruits = [["Cherry", 100], ["Strawberry",300], ["Orange",500], 
        ["Apple",700], ["Melon",1000], ["Galaxian_Boss", 2000], ["Bell", 3000], ["Key",5000]];

        for(let ind of this.tempFruits)
        {
            this.fruits.set(ind[0], ind[1]);
        }

        this.fruitImgs = new Map();

        for(let fruit of this.tempFruits)
        {
            let image = new Image(32, 32);
            image.src = "ASSETS/SPRITES/" + fruit[0] + "_72.png";
            this.fruitImgs.set(fruit[0], image); //Add the key and image to the list
        }
    
        //Set the sprite to be a cherry
        this.spr = new Sprite(this.x, this.y, 32, 32, this.fruitImgs.get("Cherry"), 32, 32);
        this.value = 100;
        this.currentFruit = 0; //The current index of fruit
    }

    pickUp()
    {
        this.pickedUp = true;
    }

    reset()
    {
        this.pickedUp = false;
    }

    //Set when a game scene is restart
    restart()
    {
        this.value = this.fruits.get("Cherry");
        this.spr.src = this.fruitImgs.get("Cherry");
    }

    increase()
    {
        this.currentFruit++;
        if(this.currentFruit > 7){
            this.currentFruit = 7;
        }
        this.value = this.fruits.get(this.tempFruits[this.currentFruit][0]);
        this.spr.src = this.fruitImgs.get(this.tempFruits[this.currentFruit][0]);
    }

    switchFruit(fruitType)
    {
        this.value = this.fruits.get(fruitType);
        this.spr.src = this.fruitImgs.get(fruitType);
    }

    draw(x = this.x, y = this.y, canvas = document.getElementById("mycanvas"))
    {
        if(this.pickedUp === false)
        {
            this.spr.draw(x, y, canvas);
        }
    }

    uiDraw(x = this.x, y = this.y, canvas = document.getElementById("mycanvas"))
    {
        this.spr.draw(x, y, canvas);
    }
}