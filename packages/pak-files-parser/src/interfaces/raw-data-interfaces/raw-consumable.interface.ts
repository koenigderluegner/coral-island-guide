export interface RawConsumable {
    "itemName": string;
    "healthDelta": number;
    "staminaDelta": number;
    "itemType": string;
    "buff": string;
    "level": number;
    "duration": number;
    "sideEffects": {
        "statistic": string;
        "delta": number;
        "timeStep": number;
        "isNoDuration": boolean
        "duration": number;
        "timerHandle": Record<string, never>
    }[    ]
}
