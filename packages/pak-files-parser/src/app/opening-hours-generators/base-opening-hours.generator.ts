import { OpeningHours } from "@ci/data-types";
import { OpeningHoursGenerator } from "./opening-hours.generator";

export class BaseOpeningHoursGenerator<T extends Record<string, string>> {

    constructor(protected openingHours: T) {

    }

    generate(): Map<string, Record<keyof T, OpeningHours>> {

        // @ts-expect-error we want an empty object to start which is not allowed per type
        const res: Record<keyof T, OpeningHours> = {};

        Array.from<keyof T>(Object.keys(this.openingHours)).forEach(key =>
            res[key] = new OpeningHoursGenerator(this.openingHours[key]).generate())

        return new Map<string, Record<keyof T, OpeningHours>>([['unused', res,]]
        )
    }
}
