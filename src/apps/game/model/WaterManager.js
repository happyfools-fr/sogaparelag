import { isTSExpressionWithTypeArguments } from "@babel/types";
import Utils from "./Utils";

export const SERDE_KEYS = ['waterSupply', '_weathers'];

export class WaterManager
{
    constructor(value)
    {
        this.inventory = value ? value : 0;
        this._weathers = []
    }

    get currentWeather()
    {
        //todo init WaterManager._weathers ??
        return this._weathers.length > 0 ? this._weathers[0] : 0;
    }

    collect()
    {
        this.inventory += this.currentWeather
    }

    drink(playersCount)
    {
        this.inventory -= playersCount
    }

    onRoundEnded()
    {
        //TODO
        //pop at element 0
    }

    mustLeave()
    {
        //TODO
        //this.currentWeather === Weather.Deluge
        return this.currentWeather === 3
    }

    authorizeLeaving(playersCount)
    {
        return this.inventory >= 2 * playersCount;
    }

    toDoc() {
        return {
          waterSupply: this.inventory,
          _weathers: this._weathers,
        };
    }
    
    fromDoc(doc) {
      if(doc && Utils.checker(SERDE_KEYS, Object.keys(doc))){
         this.inventory = doc['waterSupply'];
         this._weathers = doc['_weathers'];
       }
    }
}
