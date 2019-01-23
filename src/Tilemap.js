

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
