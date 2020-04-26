import { isTSExpressionWithTypeArguments } from "@babel/types";

export class WaterManager
{
    constructor(value)
    {
        this.inventory = value ? value : 0;
        this._weathers = []
    }

    get currentWeather()
    {
        return this._weathers[0]
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
          waterSupply: this.inventory
        };
    }
}
