import shuffle from '../../../node_modules/shuffle-array'

export class WoodFactory {
    constructor() {
        this._woods = [false, true, true, true, true, true];
    }

     collect(additionalRequest) {
        if (additionalRequest === 0)
            return 0;
        if (additionalRequest > this._woods.length)
            throw RangeError();
        shuffle(this._woods)
        
        return WoodFactory._collectSumary(this._woods, additionalRequest)
    }
    
    static _collectSumary(shuffledWoods, additionalRequest)
    {
        for (let i = 0; i < additionalRequest; i++) {
            if (shuffledWoods[i])
                continue;
            return null;
        }
        
        return additionalRequest;
    }
}

