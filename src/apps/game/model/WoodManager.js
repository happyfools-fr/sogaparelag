import shuffle from 'shuffle-array'

export class WoodManager {
    constructor() 
    {
        this._woods = [false, true, true, true, true, true]
        this._inventory = 0
    }

    get inventory()
    {
        return this._inventory
    }

    tryCollect(additionalRequest) 
    {
        if (additionalRequest === 0)
            return 0;

        if (additionalRequest > this._woods.length)
            throw RangeError();

        shuffle(this._woods)
        let collectedWood = WoodManager._collectSumary(this._woods, additionalRequest)
        let sick = collectedWood === null

        if (!sick)
            this._inventory += collectedWood.value
        return sick
    }
    
    static _collectSumary(shuffledWoods, additionalRequest)
    {
        for (let i = 0; i < additionalRequest; i++) 
        {
            if (shuffledWoods[i])
                continue
            return null
        }
        
        return additionalRequest;
    }

    authorizeLeaving(playersCount)
    {
        return this.inventory >= 6 * playersCount;
    }
}

