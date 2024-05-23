import { Item, TreasureHunt } from "@ci/data-types";
import { convertToIconName, readAsset } from "../../util/functions";
import { RawTreasureHunt } from "../../interfaces/raw-data-interfaces/raw-treasure-hunt.type";
import { RawTreasureReward } from "../../interfaces/raw-data-interfaces/raw-treasure-reward.type";

type TreasureHuntDA = {
    "Type": "C_TreasureHuntSubsystemConfig",
    "Name": "DA_TreasureHuntSubsystemConfig",
    "Class": "UScriptClass'C_TreasureHuntSubsystemConfig'",
    "Properties": {
        "treasureMappingData": RawTreasureHunt[],
        treasureRewards: RawTreasureReward[]
    }
}[]

export class TreasureHuntGenerator {
    private treasureHunts = readAsset<TreasureHuntDA>('ProjectCoral/Content/ProjectCoral/Data/TreasureHunt/DA_TreasureHuntSubsystemConfig.json')[0].Properties

    constructor(protected itemMap: Map<string, Item>) {
    }

    generate(): Map<string, TreasureHunt> {
        const map: Map<string, TreasureHunt> = new Map<string, TreasureHunt>();

        this.treasureHunts.treasureMappingData.forEach(rawTreasureHunt => {
            const treasureHunt: TreasureHunt = {
                treasureId: rawTreasureHunt.treasureId,
                mapImage: convertToIconName(rawTreasureHunt.treasureLocationImage.AssetPathName.split('.').pop() ?? '').replace('.png', ''),
                iconName: this.itemMap.get(rawTreasureHunt.mapItemData.itemID)!.iconName!
            }

            map.set('' + rawTreasureHunt.treasureId, treasureHunt)
        })

        return map;
    }
}
