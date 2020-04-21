import { isTSExpressionWithTypeArguments } from "@babel/types";

export class WaterManager
{
    constructor(value)
    {
        this._inventory = 0
        this._value = value;
    }

    get inventory()
    {
        return this._inventory
    }
    set inventory(value)
    {
        this._inventory = value
    }

    set value(newValue)
    {
        this._value = newValue;
    }

    collect()
    {
        this._inventory += this._value;
    }
}