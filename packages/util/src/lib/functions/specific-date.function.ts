import { Season, SpecificDate } from "@ci/data-types";
import { seasonMap } from "@ci/util";

export function addDays(date: SpecificDate, days: number): SpecificDate {

    let dateAsNumber = specificDateToNumber(date);

    dateAsNumber += days;

    return numberToSpecificDate(dateAsNumber);
}

export function specificDateToNumber(date: SpecificDate): number {
    return date.day + (((seasonMap.get(date.season)) ?? 0) - 1) * 28 + (date.year - 1) * 112
}

export function numberToSpecificDate(days: number): SpecificDate {

    const year = Math.floor((days - 1) / 112) + 1;
    const day = ((days - 1) % 28) + 1
    const seasonValue = Math.floor(((days - 1) % 112) / 28) + 1

    const season: Season = seasonValue === 1
        ? 'Spring'
        : seasonValue === 2
            ? "Summer"
            : seasonValue === 3
                ? "Fall"
                : "Winter"

    return {day, season, year}
}
