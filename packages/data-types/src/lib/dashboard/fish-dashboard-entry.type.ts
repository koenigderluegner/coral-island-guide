import { Fish } from '../interfaces/fish.interface';
import { Season } from '../types/season.type';
import { Weather } from '../types/weather.type';

export type FishDashboardEntry = {
    id: string,
    iconName: string | null,
    seasons: Season[],
    weathers: Weather[],
    dateRanges: Fish['spawnSettings'][0]['dateRangeList']
}
