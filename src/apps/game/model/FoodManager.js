import shuffle from 'shuffle-array'

export class FoodManager
{
    constructor()
    {
        this._foods = [1, 1, 1, 2, 2, 3]
        this.inventory = 0
    }

    collect()
    {
        shuffle(this._foods)
        this.inventory += this._foods[0]
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
