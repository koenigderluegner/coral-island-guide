import { BaseGenerator } from "./base-generator.class";
import { Datatable } from "../interfaces/datatable.interface";
import { getReferencedString, minifyItem, readAsset } from "../util/functions";
import { RawOffering } from "../interfaces/raw-offering.interface";
import { CookingRecipe, Item, Offerings } from "@ci/data-types";
import { getQuality, nonNullable, removeQualityFlag } from "@ci/util";
import { OfferingRewardsDbGenerator } from "./offering-rewards-db.generator";
import { OfferingMatch } from "../interfaces/offering-match.interface";

export class OfferingDetailsDbGenerator extends BaseGenerator<RawOffering, Offerings> {

    datatable: Datatable<RawOffering>[] = readAsset<Datatable<RawOffering>[]>('ProjectCoral/Content/ProjectCoral/Data/Offering/DT_OfferingRegistry.json');
    private offeringMatches: OfferingMatch[];


    constructor(protected itemMap: Map<string, Item>, protected cookingMap: Map<string, Record<string, CookingRecipe[]>>) {
        super();
        const offeringRewardsDbGenerator = new OfferingRewardsDbGenerator(itemMap, cookingMap);
        this.offeringMatches = [...offeringRewardsDbGenerator.generate().values()];
    }

    handleEntry(itemKey: string, dbItem: RawOffering): Offerings {

        let offeringMatch = this.offeringMatches.find(ab => ab.offeringId === itemKey);

        if (!offeringMatch) {
            offeringMatch = this.offeringMatches.find(ab => ab.key === itemKey);
        }

        return {
            title: dbItem.offeringTitleText.SourceString,
            imageName: getReferencedString(dbItem.offeringImage.ObjectName),
            numOfItemRequired: dbItem.numOfItemRequired,
            rewards: offeringMatch?.rewards ?? {
                items: [],
                recipes: []
            },
            requiredItems: dbItem.requiredItems
                .map(requiredItem => {
                    const itemKey = requiredItem.itemData.itemID;
                    const item = this.itemMap.get(removeQualityFlag(itemKey));
                    if (!item) return;
                    const quality = getQuality(itemKey);
                    return {
                        item: minifyItem(item),
                        amount: requiredItem.itemQuantity,
                        quality
                    }
                })
                .filter(nonNullable),


        };

    }


}
