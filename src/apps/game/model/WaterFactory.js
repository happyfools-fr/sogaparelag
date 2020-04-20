export class WaterFactory
{
    constructor(value)
    {
        this._value = value;
    }

    set value(newValue)
    {
        this._value = newValue;
    }

    collect()
    {
        return this._value;
    }
}