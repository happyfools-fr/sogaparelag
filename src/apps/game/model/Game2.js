import Player from "./Player";

class Game2
{
    constructor(loggedInUsers) 
    {
        this._id = uuidv1();
        this.players = []
        this._createPlayers(loggedInUsers)

        this._waterManager = new WaterManager()
        this._foodManager = new FoodManager()
        this._woodManager = new WoodManager()
    }

    _createPlayers(loggedInUsers)
    {
        for (loggedInUser in loggedInUsers)
        {
            this.players.push(new Player(loggedInUser.id, false, false, null))
        }
    }
    
}