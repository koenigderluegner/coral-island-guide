import { Critter, CritterDashboardEntry, Season, Weather } from "@ci/data-types";

export function DbItemToCritter(fish: Critter): CritterDashboardEntry {

    const item = fish.item

    const seasons: Season[] = [];

    if (fish.spawnSeason.spring)
        seasons.push("Spring")
    if (fish.spawnSeason.summer)
        seasons.push("Summer")
    if (fish.spawnSeason.fall)
        seasons.push("Fall")
    if (fish.spawnSeason.winter)
        seasons.push("Winter")

    const weather: Weather[] = [];


    if (fish.spawnWeather.sunny)
        weather.push("Sunny")
    if (fish.spawnWeather.snow)
        weather.push("Snow")
    if (fish.spawnWeather.rain)
        weather.push("Rain")
    if (fish.spawnWeather.windy)
        weather.push("Windy")
    if (fish.spawnWeather.blizzard)
        weather.push("Blizzard")
    if (fish.spawnWeather.storm)
        weather.push("Storm")


    return {
        id: item.id,
        iconName: item.iconName,
        seasons: seasons,
        weathers: weather,
    } satisfies  CritterDashboardEntry
}
