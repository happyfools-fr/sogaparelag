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
        
        for (let i = 0; i < additionalRequest; i++) {
            if (this._woods[i])
                continue;
            return null;
        }
        
        return additionalRequest;
    }
}

