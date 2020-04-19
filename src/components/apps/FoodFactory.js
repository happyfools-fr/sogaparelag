import shuffle from '../../../node_modules/shuffle-array'

export class FoodFactory {
    constructor() {
        this._foods = [1, 1, 1, 2, 2, 3];
    }

     collect() {
        shuffle(this._foods)
        return this._foods[0];
    }
}

