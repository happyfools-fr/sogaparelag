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
            case Drought:
                return 0;
            case Drizzle:
                return 1;
            case Rain:
                return 2;
            case Thunderstorm:
                return 3;
            case Flood:
                return 2;
            case None:
                return 0;
            default:
                return 0;
        }
    }
}
