import { Season } from '../types/season.type';
import { Weather } from '../types/weather.type';

export type CritterDashboardEntry = {
    id: string,
    iconName: string | null,
    seasons: Season[],
    weathers: Weather[]
}
