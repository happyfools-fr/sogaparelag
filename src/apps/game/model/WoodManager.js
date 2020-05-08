import shuffle from 'shuffle-array'
import Utils from "./Utils";

export const SERDE_KEYS = ['woodSupply'];

export class WoodManager {
    constructor()
    {
        this._woods = [false, true, true, true, true, true]
        this.inventory = 0
    }

    tryCollect(additionalRequest)
    {
        if (additionalRequest > this._woods.length) {
            throw RangeError();
        }

        let collectedWood;

        if (additionalRequest === 0)
        {
            collectedWood = 1
        } else {
            shuffle(this._woods)
            const triedToCollectMore = WoodManager._collect(this._woods, additionalRequest)
            collectedWood = (triedToCollectMore) ? 1 + triedToCollectMore : 0
        }

        this.inventory += collectedWood;
        return collectedWood;
    }

    static _collect(shuffledWoods, additionalRequest)
    {
        for (let i = 0; i < additionalRequest; i++)
        {
            if (shuffledWoods[i])
                continue
            return 0
        }

        return additionalRequest;
    }

    authorizeLeaving(playersCount)
    {
        return this.inventory >= 6 * playersCount;
    }

    toDoc()
    {
        return {
          woodSupply: this.inventory
        }
    }

    static fromDoc(doc)
    {
      let woodManager;
      if(doc && Utils.checker(SERDE_KEYS, Object.keys(doc)))
      {
        woodManager = new WoodManager();
        woodManager.inventory = doc['woodSupply'];
      }
      return woodManager;
    }
}
