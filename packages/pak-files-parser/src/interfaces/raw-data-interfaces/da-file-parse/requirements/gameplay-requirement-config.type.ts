import { DaRequirements } from "./da-requirements.type";
import { AssetMap } from "../../../../types/asset-map.type";

export type GameplayRequirementsConfig = {
    "Type": "C_GameplayRequirementsConfig",
    "Name": string;
    "Properties"?: {
        "map": GameplayRequirementsConfigMap | GameplayRequirementsConfigMap[]
    }
}

export type GameplayRequirementsConfigMap = AssetMap<{
    "type": string;
    "requirements": [
        {
            "ObjectName": string
            "ObjectPath": string
        }
    ]
}>

export type GameplayRequirementsConfigEntry = GameplayRequirementsConfig | DaRequirements;
