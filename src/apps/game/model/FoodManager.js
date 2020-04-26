import shuffle from 'shuffle-array'

export class FoodManager
{
    constructor(value)
    {
        this._foods = [1, 1, 1, 2, 2, 3]
        this.inventory = value
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

    toDoc() {
        return {foodSupply: this.inventory}
    }
}
