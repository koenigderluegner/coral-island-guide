import { BaseGenerator } from "./base-generator.class";
import { Datatable } from "../../interfaces/datatable.interface";
import { AssetPathNameToIcon, minifyItem, minifyTagBasedItem, readAsset } from "../../util/functions";
import { RawOffering } from "../../interfaces/raw-data-interfaces/raw-offering.interface";
import { CookingRecipe, Item, Offerings, TagBasedItem } from "@ci/data-types";
import { getQuality, nonNullable, removeQualityFlag } from "@ci/util";
import { OfferingRewardsDbGenerator } from "./offering-rewards-db.generator";
import { OfferingMatch } from "../../interfaces/offering-match.interface";
import { StringTable } from "../../util/string-table.class";
import { Logger } from "../../util/logger.class";
import { environment } from "../../environments/environment";

export class OfferingDetailsDbGenerator extends BaseGenerator<RawOffering, Offerings> {

    datatable: Datatable<RawOffering>[] = [
        readAsset<Datatable<RawOffering>[]>('ProjectCoral/Content/ProjectCoral/Data/Offering/DT_OfferingRegistry.json'),
        (environment.isBeta ? readAsset<Datatable<RawOffering>[]>('ProjectCoral/Content/ProjectCoral/Data/Offering/DT_DivingOfferingRegistry.json') : [])
    ].reduce((previousValue, currentValue) => {
        Object.assign(previousValue[0]?.Rows ?? {}, (currentValue)[0]?.Rows ?? {});
        return previousValue
    }).flat();
    private offeringMatches: OfferingMatch[];


    constructor(protected itemMap: Map<string, Item>, protected cookingMap: Map<string, Record<string, CookingRecipe[]>>, protected tagBasedItems: Map<string, TagBasedItem>) {
        super();
        const offeringRewardsDbGenerator = new OfferingRewardsDbGenerator(itemMap, cookingMap);
        this.offeringMatches = [...offeringRewardsDbGenerator.generate().values()];
    }

    handleEntry(itemKey: string, dbItem: RawOffering): Offerings {

        let offeringMatch = this.offeringMatches.find(ab => ab.offeringId === itemKey);

        if (!offeringMatch) {
            offeringMatch = this.offeringMatches.find(ab => ab.key === itemKey);
        }

        const title = StringTable.getString(dbItem.offeringTitleText);
        return {
            title: title ?? '',
            imageName: AssetPathNameToIcon(dbItem.offeringImage.AssetPathName),
            numOfItemRequired: dbItem.numOfItemRequired,
            rewards: offeringMatch?.rewards ?? {
                items: [],
                recipes: []
            },
            requiredItems: dbItem.requiredItems
                .map(requiredItem => {

                    if (requiredItem.useGenericItem) {
                        const tagBasedItemKey = requiredItem.genericItem.genericItem.RowName;
                        const tagBasedItem = this.tagBasedItems.get(tagBasedItemKey);
                        if (!tagBasedItem) {
                            Logger.error(`Can't find tag based item ${tagBasedItemKey} for offering ${title}`)
                            return;
                        }
                        return {
                            item: minifyTagBasedItem(tagBasedItem),
                            amount: requiredItem.genericItem.amount
                        }
                    } else {

                        const itemKey = requiredItem.itemData.itemID;
                        const item = this.itemMap.get(removeQualityFlag(itemKey));
                        if (!item) {
                            Logger.error(`Can't find  item ${itemKey} for offering ${title}`)
                            return;
                        }
                        const quality = getQuality(itemKey);
                        return {
                            item: minifyItem(item),
                            amount: requiredItem.itemQuantity,
                            quality
                        }
                    }
                })
                .filter(nonNullable),


        };

    }


}
