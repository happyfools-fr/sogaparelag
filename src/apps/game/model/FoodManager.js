import shuffle from '../../../../node_modules/shuffle-array'

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
}
