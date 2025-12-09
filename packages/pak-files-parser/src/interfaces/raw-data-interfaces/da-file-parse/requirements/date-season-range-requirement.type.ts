import { RawRequirementWithMeta } from "./raw-requirement-with-meta";

export type RawDateSeasonRangeRequirement = RawRequirementWithMeta<'DateSeasonRange', {
        "expectedDateSeason": {
            "from": {
                "season": string
                "day": number
            },
            "to": {
                "season": string
                "day": number
            }
        },
        "invertResult": boolean
    }
>
