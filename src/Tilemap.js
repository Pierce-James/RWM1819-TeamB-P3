

class Tilemap {
    constructor(filepath){
        this.tileData = {};
        this.tiles = [];
        this.filepath = filepath;
        this.rows = 31;
        this.cols = 28;
        this.isLoaded = false;
        this.GetJSON();
    }

    /**
     * Takes row/col of entity
     * return true if tile above entity
     * is a not a wall.
     * @param {int} row 
     * @param {int} col 
     */
    checkTileAbove(row, col)
    {
        this.tileData["layers"].forEach((element) =>{
            if (element[row - 1][col] === 1)
            {
                return false;
            }
        });
        return true;
    }

    /**
     * Takes row/col of entity
     * returns true if tile below entity
     * is not a wall
     * @param {int} row 
     * @param {int} col 
     */
    checkTileBelow(row, col)
    {
        this.tileData["layers"].forEach((element) =>{
            if (element[row + 1][col] === 1)
            {
                return false;
            }
        });
        return true;
    }

    /**
     * Takes row/col of entity
     * returns true if the tile right of
     * the entity is not a wall
     * @param {int} row 
     * @param {int} col 
     */
    checkTileRight(row, col)
    {
        this.tileData["layers"].forEach((element) =>{
            if (element[row][col + 1] === 1)
            {
                return false;
            }
        });
        return true;
    }

    /**
     * Takes row/col of entity
     * returns true if the tile left of
     * the entity is not a wall
     * @param {int} row 
     * @param {int} col 
     */
    checkTileLeft(row, col)
    {
        this.tileData["layers"].forEach((element) =>{
            if (element[row][col - 1] === 1)
            {
                return false;
            }
        });
        return true;
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
        // this.tileData["layers"].forEach((element) => {

        //     for (var i = 0; i < 31; i++)
        //         {
        //             for (var j = 0; j < 28; j++)
        //             {
        //                 if (element[i][j] == 1)
        //                 {
        //                     this.tiles.push(new Tile(j * 32, i * 32, 32, 32, true));
        //                 }
        //                 else if (element[i][j] == 0)
        //                 {
        //                     this.tiles.push(new Tile(j * 32, i * 32, 32, 32, false));
        //                 }
        //             }
        //         }
        // });

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

    render(ctx)
    {
        if (this.isLoaded)
        {
            this.tiles.forEach(element => {
                element.render(ctx);
            });

            // for (let i = 0; i < Object.keys(this.tiles).length; i++)
            // {
            //     this.tiles[i].render(ctx);
            // }
        }
    }

    IsLoaded()
    {
        return this.isLoaded;
    }
}
