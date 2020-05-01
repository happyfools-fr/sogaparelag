export class Weather
{
    static Drought = '0';
    static Drizzle = '1';
    static Rain = '2';
    static Thunderstorm = '3';
    static Flood = '4';
    static None = '5';

    static getWaterFromWeather(weather)
    {
        switch (weather)
        {
            case this.Drought:
                return 0;
            case this.Drizzle:
                return 1;
            case this.Rain:
                return 2;
            case this.Thunderstorm:
                return 3;
            case this.Flood:
                return 2;
            case this.None:
                return 0;
            default:
                return 0;
        }
    }
}
