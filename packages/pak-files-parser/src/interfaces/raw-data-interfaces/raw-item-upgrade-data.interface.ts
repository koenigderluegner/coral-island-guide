import { BaseRawItemUpgradeData } from "./base-raw-item-upgrade-data.interface";

export interface RawItemUpgradeData extends BaseRawItemUpgradeData {
    "isCurrentlyOutOfStock": boolean,
}
