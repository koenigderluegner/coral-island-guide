import { DaEffects } from "../interfaces/raw-data-interfaces/da-file-parse/effects/da-effects.type";


export type GameplayEffectsConfig = {
    "Type": "C_GameplayEffectsConfig",
    "Name": string;
    "Properties": {
        "map": GameplayEffectsConfigMap | GameplayEffectsConfigMap[]
    }
}

export type GameplayEffectsConfigMap = Record<string, {
    "effects": {
        "ObjectName": string;
        "ObjectPath": string;
    }            []
}>

export type GameplayEffectsConfigEntry = GameplayEffectsConfig | DaEffects
