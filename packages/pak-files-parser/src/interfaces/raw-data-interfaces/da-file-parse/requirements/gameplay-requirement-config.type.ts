import { DaRequirements } from "./da-requirements.type";

export type GameplayRequirementsConfig = {
    "Type": "C_GameplayRequirementsConfig",
    "Name": string;
    "Properties": {
        "map": GameplayRequirementsConfigMap | GameplayRequirementsConfigMap[]
    }
}

export type GameplayRequirementsConfigMap = Record<string, {
    "type": string;
    "requirements": [
        {
            "ObjectName": string
            "ObjectPath": string
        }
    ]
}>

export type GameplayRequirementsConfigEntry = GameplayRequirementsConfig | DaRequirements;
