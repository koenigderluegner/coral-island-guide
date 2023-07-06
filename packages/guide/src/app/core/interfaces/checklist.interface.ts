import { Critter, Fish, Offering } from "@ci/data-types";

export interface Checklist {
    version: number;
    offerings: Offering[];
    journal: {
        critter: Critter[];
        fish: Fish[]
    }
}
