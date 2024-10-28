import { Season } from "../season.type";

export type DateSeasonRequirement = {
    type: 'DateSeason',
    meta: {
        season: Season;
        day: number;
    }
}
