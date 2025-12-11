import { BaseGenerator } from "../_base/base-generator.class";
import { Attraction, Item, MinimalNPC, NPC } from "@ci/data-types";
import { Datatable } from "../../../interfaces/datatable.interface";
import { AssetPathNameToIcon, minifyItem, minifyNPC, readAsset } from "../../../util/functions";
import { RawAttractionReward } from "./raw-attraction-reward";
import { RawAttractionShopData } from "./raw-attraction-shop-data";
import { StringTable } from "../../../util/string-table.class";
import { RawTownRankPoints } from "../../../interfaces/raw-data-interfaces/raw-town-rank-points";
import { Logger } from "../../../util/logger.class";
import { RawContractor } from "./raw-contractor";

export class AttractionsGenerator extends BaseGenerator<RawAttractionShopData, Attraction> {
    datatable: Datatable<RawAttractionShopData>[] = readAsset(`ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_TownAttractionShopData.json`);
    rewards = readAsset<Datatable<RawAttractionReward>[]>(`ProjectCoral/Content/ProjectCoral/Data/Attraction/DT_TownAttractionRewardTable.json`)[0].Rows;
    contractors = readAsset<Datatable<RawContractor>[]>(`ProjectCoral/Content/ProjectCoral/Data/TownProject/DT_TownProjectContractorData.json`)[0].Rows;
    townRank = readAsset<Datatable<RawTownRankPoints>[]>(`ProjectCoral/Content/ProjectCoral/Data/TownRank/DT_TownRankPoints.json`)[0].Rows;


    constructor(protected itemMap: Map<string, Item>, protected npcMap: Map<string, NPC>) {
        super();

    }

    handleEntry(itemKey: string, dbItem: RawAttractionShopData): Attraction | undefined {

        const npcs = this.rewards[itemKey].heartPointsRewardNpcRowHandle.map(r => r.RowName);
        const townRankKey = this.rewards[itemKey].townRankPointsDataRowHandle.RowName;
        const townRankElement = this.townRank[townRankKey];
        const contractorData = this.contractors[dbItem.contractorData.RowName];
        const contracorData = {
            contractor: StringTable.getString(contractorData.contractorName),
            npcs: contractorData.contractorNpcList.map(npc => {
                const mappedNpc = this.npcMap.get(npc.RowName);
                if (!mappedNpc) {
                    Logger.error(`Cant find npc ${npc} while looping rewards for ${itemKey}`);
                    return
                }
                return minifyNPC(mappedNpc)
            }).filter((x): x is MinimalNPC => x !== undefined),
            npcImages: contractorData.contractorNpcTextureList.map(n => AssetPathNameToIcon(n))
        };

        const mappedNPCs = npcs.map(npc => {
            const mappedNpc = this.npcMap.get(npc);
            if (!mappedNpc) {
                Logger.error(`Cant find npc ${npc} while looping rewards for ${itemKey}`);
                return
            }
            return minifyNPC(mappedNpc)
        }).filter((x): x is MinimalNPC => x !== undefined)

        return {
            key: itemKey,
            projectImage: AssetPathNameToIcon(dbItem.projectImage),
            projectIcon: AssetPathNameToIcon(dbItem.projectIcon),
            requirements: dbItem.requirements.map(req => ({
                item: minifyItem(this.itemMap.get(req.item.itemID)!),
                amount: req.amount,
            })),
            daysToComplete: dbItem.daysToComplete,
            perkData: dbItem.perkData.map(perk => ({
                description: StringTable.getString(perk.perkDescription),
                icon: AssetPathNameToIcon(perk.perkIcon),
            })),
            rewards: {
                townRank: {...townRankElement, description: StringTable.getString(townRankElement.description)},
                heartPoints: mappedNPCs
            },
            contractors: contracorData,
            townRank: dbItem.townRank,
            item: this.itemMap.get(dbItem.item.itemID),
            name: StringTable.getString(dbItem.shopItemName),
            category: StringTable.getString(dbItem.customCategory),
            description: StringTable.getString(dbItem.customDescription),
            order: dbItem.priority,
            price: dbItem.priceOverride
        };
    }

}
