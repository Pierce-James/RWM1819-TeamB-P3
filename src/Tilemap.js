

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

            for (var i = 0; i < 31; i++)
                {
                    for (var j = 0; j < 28; j++)
                    {
                        if (element[i][j] == 1)
                        {
                            this.tiles.push(new Tile(j * 32, i * 32, 32, 32, true));
                        }
                        else if (element[i][j] == 0)
                        {
                            this.tiles.push(new Tile(j * 32, i * 32, 32, 32, false));
                        }
                    }
                }
        });
    }

    render(ctx)
    {
        if (this.isLoaded)
        {
            // for (let i = 0; i < Object.keys(this.tiles).length; i++)
            // {
            //     this.tiles[i].render();
            // }

            this.tiles.forEach(element => {
                element.render(ctx);
            });
        }
    }
}
