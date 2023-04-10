import { BaseGenerator } from "./base-generator.class";
import { CookingRecipe, Item, OfferingAltar, Offerings } from "@ci/data-types";
import { Datatable } from "../interfaces/datatable.interface";
import { readAsset } from "../util/functions";
import { RawOfferingAltar } from "../interfaces/raw-offering-altar.interface";
import { OfferingDetailsDbGenerator } from "./offering-details-db.generator";
import { nonNullable } from "@ci/util";

export class OfferingsDbGenerator extends BaseGenerator<RawOfferingAltar, OfferingAltar> {

    datatable: Datatable<RawOfferingAltar>[] = readAsset<Datatable<RawOfferingAltar>[]>('ProjectCoral/Content/ProjectCoral/Data/Offering/DT_OfferingGroupRegistry.json');
    private offeringDetails: Map<string, Offerings>;


    constructor(protected itemMap: Map<string, Item>, protected cookingMap: Map<string, Record<string, CookingRecipe[]>>) {
        super();
        const offeringDetailsGenerator = new OfferingDetailsDbGenerator(itemMap, cookingMap)
        this.offeringDetails = offeringDetailsGenerator.generate();
    }

    handleEntry(itemKey: string, dbItem: RawOfferingAltar): OfferingAltar {

        const offerings = dbItem.offeringId
            .map(offeringKey => {
                const rawData = this.offeringDetails.get(offeringKey);

                if (!rawData) {
                    console.warn(`cant find data for ${offeringKey} altar`)
                    return;
                }

                return rawData
            })
            .filter(nonNullable)


        return {
            key: itemKey,
            offeringGroupTitle: dbItem.offeringGroupTitle.SourceString,
            offeringGroupRewardText: dbItem.offeringGroupRewardText.SourceString,
            offerings

        };

    }


}
