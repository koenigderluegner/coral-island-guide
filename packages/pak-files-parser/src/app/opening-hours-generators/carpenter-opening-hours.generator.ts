import { OpeningHours } from "@ci/data-types";
import { OpeningHoursGenerator } from "./opening-hours.generator";

export class CarpenterOpeningHoursGenerator {

    buildingHours: OpeningHours

    constructor() {

        this.buildingHours = new OpeningHoursGenerator('ProjectCoral/Content/ProjectCoral/Data/OpeningHours/CarpenterShops.json').generate();


    }

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
