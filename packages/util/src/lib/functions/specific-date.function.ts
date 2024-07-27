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

export function dateInRanges(date: SpecificDate, range: { from: SpecificDate, to: SpecificDate } | {
    from: SpecificDate,
    to: SpecificDate
}[], ignoreYear = false): boolean {

    const rangeAsList = [range].flat();

    if (!rangeAsList.length) return false;

    let dateValue = specificDateToNumber(date);

    if (ignoreYear) {
        dateValue = Math.floor(dateValue - 1) % 112;
    }

    return rangeAsList.some(r => {
        let start = specificDateToNumber(r.from);

        if (ignoreYear) {
            start = Math.floor(start - 1) % 112;
        }


        let end = specificDateToNumber(r.to);


        if (ignoreYear) {
            end = Math.floor(end - 1) % 112;
        }

        return start <= dateValue && end >= dateValue;

    })


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
