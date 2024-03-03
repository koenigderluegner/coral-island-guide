export type RawDateSeasonRangeRequirement = {
    "Type": "C_DateSeasonRangeRequirement",
    "Name": string
    "Outer": string
    "Class": "UScriptClass'C_DateSeasonRangeRequirement'",
    "Properties": {
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
}
