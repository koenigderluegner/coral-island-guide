import { OpeningHours } from "@ci/data-types";
import { OpeningHoursGenerator } from "./opening-hours.generator";

export class BlacksmithOpeningHoursGenerator {

    serviceHours: OpeningHours;
    buildingHours: OpeningHours

    constructor() {

        this.buildingHours = new OpeningHoursGenerator('ProjectCoral/Content/ProjectCoral/Data/OpeningHours/BlacksmithDoorHours.json').generate();
        this.serviceHours = new OpeningHoursGenerator('ProjectCoral/Content/ProjectCoral/Data/OpeningHours/BlacksmithHours.json').generate();


    }

    generate(): Map<string, Record<string, OpeningHours>> {
        return new Map<string, Record<string, OpeningHours>>([
                ['unused', {
                    'Building': this.buildingHours,
                    'Service': this.serviceHours
                },
                ]
            ]
        )
    }

}
