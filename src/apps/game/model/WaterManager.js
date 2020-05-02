// import { isTSExpressionWithTypeArguments } from "@babel/types";
import Utils from "./Utils";
import {Weather} from './Weather'
import shuffle from 'shuffle-array'

export const SERDE_KEYS = ['waterSupply', '_weathers'];

export class WaterManager
{
    constructor(value, weathers = null)
    {
        this.inventory = value ? value : 0;
        this._weathers = (weathers != null) ? weathers : this._initWeather()
    }

    _initWeather()
    {
        let weathers =
        [
            Weather.Drought, Weather.Drought, Weather.Drought,
            Weather.Drizzle, Weather.Drizzle, Weather.Drizzle,
            Weather.Rain, Weather.Rain, Weather.Rain,
            Weather.Thunderstorm, Weather.Thunderstorm
        ]
        shuffle(weathers)
        let indexOfFlood = Math.floor(Math.random() * 5);
        weathers.splice(6 + indexOfFlood, 0, Weather.Flood);
        return weathers;
    }

    get currentWeather()
    {
        return this._weathers.length > 0 ? this._weathers[0] : Weather.None;
    }

    collect()
    {
        this.inventory += Weather.getWaterFromWeather(this.currentWeather);
    }

    drink(playersCount)
    {
        this.inventory -= playersCount
    }

    onRoundEnded()
    {
        this._weathers.splice(0, 1)
    }

    mustLeave()
    {
        return this.currentWeather === Weather.Flood
    }

    authorizeLeaving(playersCount)
    {
        return this.inventory >=  playersCount;
    }

    toDoc()
    {
        return {
            waterSupply: this.inventory,
            _weathers: this._weathers
        }
    }

    static fromDoc(doc)
    {
        let waterManager;
        if (doc && Utils.checker(SERDE_KEYS, Object.keys(doc)))
        {
            waterManager = new WaterManager(doc['waterSupply'], doc['_weathers'])
        }
        return waterManager;
    }
}
