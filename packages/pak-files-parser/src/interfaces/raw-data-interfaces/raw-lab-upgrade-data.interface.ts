import { BaseRawItemUpgradeData } from "./base-raw-item-upgrade-data.interface";

export interface RawLabUpgradeData extends BaseRawItemUpgradeData {
    "affecting": string,
    "level": number,
}
