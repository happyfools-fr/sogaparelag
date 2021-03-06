import shuffle from 'shuffle-array'
import Utils from './Utils'

export const SERDE_KEYS = ['foodSupply'];

export class FoodManager
{
    constructor(value)
    {
        this._foods = [1, 1, 1, 2, 2, 3];
        this.inventory = value ? value : 0;
    }

    collect()
    {
        shuffle(this._foods);
        const collected = this._foods[0];
        this.inventory += collected;
        return collected;
    }

    eat(playersCount)
    {
        this.inventory -= playersCount
    }

    authorizeLeaving(playersCount)
    {
        return this.inventory >= playersCount;
    }

    toDoc()
    {
        return {
          foodSupply: this.inventory
        };
    }

    static fromDoc(doc)
    {
      let foodManager;
      if(doc && Utils.checker(SERDE_KEYS, Object.keys(doc)))
      {
        foodManager = new FoodManager(doc['foodSupply']);
      }
      return foodManager;
    }
}
