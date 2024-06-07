import { DatabaseItem, FishDashboardEntry, Season, Weather } from "@ci/data-types";
import { generateJson } from "../../util/functions";
import path from "path";

export function createFishDashboardFile(dbItems: DatabaseItem[]) {

    const dashboardList: FishDashboardEntry[] = []

    dbItems
        .filter((item => !!item.fish))
        .forEach(item => {
            const fish = item.fish!;

            const seasons: Season[] = [
                ...new Set(fish.spawnSettings.map(s => s.spawnSeason).map(s => {
                    const seasons: Season[] = [];

                    if (s.spring)
                        seasons.push("Spring")
                    if (s.summer)
                        seasons.push("Summer")
                    if (s.fall)
                        seasons.push("Fall")
                    if (s.winter)
                        seasons.push("Winter")

                    return seasons;
                }).flat())
            ];
            const weather = [
                ...new Set(fish.spawnSettings.map(s => s.spawnWeather).map(s => {
                    const seasons: Weather[] = [];

                    if (s.sunny)
                        seasons.push("Sunny")
                    if (s.snow)
                        seasons.push("Snow")
                    if (s.rain)
                        seasons.push("Rain")
                    if (s.windy)
                        seasons.push("Windy")
                    if (s.blizzard)
                        seasons.push("Blizzard")
                    if (s.storm)
                        seasons.push("Storm")

                    return seasons;
                }).flat())
            ];
            const entry: FishDashboardEntry = {
                id: item.item.id,
                iconName: item.item.iconName,
                seasons: seasons,
                weathers: weather,
                dateRanges: fish.spawnSettings.map(f => f.dateRangeList)
                    .filter(Boolean)
                    .flat()
            }
            dashboardList.push(entry)
        });

    generateJson(path.join('dashboards', `museum-fish.json`), dashboardList, true, 'none');


}
