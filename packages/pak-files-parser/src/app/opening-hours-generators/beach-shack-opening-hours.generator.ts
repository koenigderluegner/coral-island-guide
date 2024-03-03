import { OpeningHours } from "@ci/data-types";
import { OpeningHoursGenerator } from "./opening-hours.generator";

export class BeachShackOpeningHoursGenerator {

    serviceHours: OpeningHours = new OpeningHoursGenerator('ProjectCoral/Content/ProjectCoral/Data/OpeningHours/BeachShackHours.json').generate();
    buildingHours: OpeningHours = new OpeningHoursGenerator('ProjectCoral/Content/ProjectCoral/Data/OpeningHours/BeachShackDoorHours.json').generate();

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
