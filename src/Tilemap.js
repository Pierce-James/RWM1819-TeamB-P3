

class Tilemap {
    constructor(filepath){
        this.tileData = {};
        this.tiles = [];
        this.filepath = filepath;
        this.rows = 30;
        this.cols = 28;
        this.isLoaded = false;
        this.GetJSON();
    }

    GetJSON()
    {
        let req = new XMLHttpRequest();
        req.addEventListener("load", function requestListener(map)
        {
            map.tileData = JSON.parse(this.responseText);
            console.log(map.tileData);
            map.isLoaded = true;
            map.createTiles().bind(map);
        }.bind(req, this));

        req.open("GET", this.filepath);
        req.send();
    }

    createTiles()
    {
        this.tileData["layers"].forEach((element) => {
            for (let i = 0; i < 31; i++)
            {
                for (let j = 0; j < 28; j++)
                {
                    this.tiles[new Vector2(j, i)] = new Tile(j * 32, i * 32, 32, 32, element[i][j] == 1 ? true : false);
                }
            }
        })
    }

    BFS(from, goal, depth, useDepth)
    {
        let currentDepth = 1;
        let foundGoal = goal;

        if(this.tiles[goal].isCollidable)
        {
            throw("Trying to pathfind to a wall");
        }

        Object.keys(this.tiles).forEach(element =>{
            if(this.tiles[element].isCollidable === false){
            this.tiles[element].previous = undefined;
            this.tiles[element].cost = 0;
            this.tiles[element].isVisited = false;
            }
        });

        this.tiles[from].visited = true;

        var queue = [];
        queue.push(this.tiles[from]); //Add from to the queue

        var originalCost = queue[0].cost; //Get the original cost

        while(queue.length !== 0 && queue[0] !== this.tiles[goal])
        {
            if(useDepth)
            {
                currentDepth++; //Add to current Depth

                //If we have reached the 
                if(currentDepth >= depth)
                {
                    foundGoal = queue[0];
                    break;
                }
            }

            var gPos = new Vector2(queue[0].gridPosition.x, queue[0].gridPosition.y);
            var cPos = new Vector2(gPos.x, gPos.y);

            var adj = [
                new Vector2(cPos.x -1, cPos.y), 
                new Vector2(cPos.x + 1, cPos.y),
                new Vector2(cPos.x, cPos.y - 1),
                new Vector2(cPos.x, cPos.y + 1)];

            //Loop through all adjacent tiles
            for(let val of adj)
            {
                if(val.x < 28 && val.x >= 0 && val.y >= 0 && val.y < 31)
                {   
                    //If it is not a wall and it hasnt been visite dyet, visit and set its cost
                     if(!this.tiles[val].isCollidable && !this.tiles[val].isVisited)
                     {
                         this.tiles[val].isVisited = true;
                         this.tiles[val].cost = originalCost + 1;
                         queue.push(this.tiles[val]);
                         this.tiles[val].previous = queue[0];
                     }
                }
            }

            queue.shift(); //Pop off the front
        }

        var path = [];
        var prev = useDepth ? foundGoal : this.tiles[goal];

        path.push(prev.gridPosition);

        prev = prev.previous;

        while(prev !== undefined && prev !== this.tiles[from])
        {
            path.push(prev.gridPosition);
            prev = prev.previous;
        }

        return path.reverse();
    }

    render(ctx)
    {
        if (this.isLoaded)
        {
            Object.keys(this.tiles).forEach(element =>{
                this.tiles[element].render(ctx);
            });
        }
    }

    IsLoaded()
    {
        return this.isLoaded;
    }
}
