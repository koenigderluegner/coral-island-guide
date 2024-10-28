import { Season } from "@ci/data-types";

export type RawDateSeasonRequirement = {
    "Type": "C_DateSeasonRequirement",
    "Name": string;
    "Outer": string;
    "Class": "UScriptClass'C_DateSeasonRequirement'",
    "Properties": {
        "expectedDateSeason": {
            "season": `EC_Season::${Season}`;
            "day": number;

        }
    }
}
