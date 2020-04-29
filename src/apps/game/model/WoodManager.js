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
        if (additionalRequest === 0)
        {
            this.inventory += 1
            return true
        }

        if (additionalRequest > this._woods.length)
            throw RangeError();

        shuffle(this._woods)
        let collectedWood = WoodManager._collectSumary(this._woods, additionalRequest)
        let sick = collectedWood == null
        if (!sick)
            this.inventory += 1 + collectedWood.value
        return !sick
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

    toDoc() {
        return {woodSupply: this.inventory}
    }

    static fromDoc(doc) {
      let woodManager;
      if(doc && Utils.checker(SERDE_KEYS, Object.keys(doc))){
        woodManager = new WoodManager();
        woodManager.inventory = doc['woodSupply'];
      }
      return woodManager;
    }
}
