import { OpeningHours } from "@ci/data-types";
import { OpeningHoursGenerator } from "./opening-hours.generator";

export class RanchOpeningHoursGenerator {

    buildingHours: OpeningHours = new OpeningHoursGenerator('ProjectCoral/Content/ProjectCoral/Data/OpeningHours/RanchHours.json').generate();

    generate(): Map<string, Record<string, OpeningHours>> {
        return new Map<string, Record<string, OpeningHours>>([
                ['unused', {
                    'Building': this.buildingHours,
                },
                ]
            ]
        )
    }

}
