import { DaEffects } from "../interfaces/raw-data-interfaces/da-file-parse/effects/da-effects.type";
import { AssetMap } from "./asset-map.type";


export type GameplayEffectsConfig = {
    "Type": "C_GameplayEffectsConfig",
    "Name": string;
    "Properties": {
        "map": GameplayEffectsConfigMap | GameplayEffectsConfigMap[]
    }
}

export type GameplayEffectsConfigMap = AssetMap<{
    "effects": {
        "ObjectName": string;
        "ObjectPath": string;
    }[]
}>

export type GameplayEffectsConfigEntry = GameplayEffectsConfig | DaEffects
