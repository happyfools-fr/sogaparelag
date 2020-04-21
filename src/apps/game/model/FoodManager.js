import shuffle from 'shuffle-array'

export class FoodManager 
{
    constructor() 
    {
        this._foods = [1, 1, 1, 2, 2, 3]
        this._inventory = 0
    }

    get inventory()
    {
        return this._inventory
    }
    set inventory(value)
    {
        this._inventory = value
    }

    collect() 
    {
        shuffle(this._foods)
        this._inventory = this._foods[0]
    }

    eat(playersCount)
    {
        this.inventory -= playersCount
    }

    authorizeLeaving(playersCount)
    {
        return this.inventory >= 2 * playersCount;
    }
}
