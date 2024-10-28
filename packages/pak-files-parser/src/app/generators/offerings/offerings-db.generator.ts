import { BaseGenerator } from "../_base/base-generator.class";
import { CookingRecipe, Item, OfferingAltar, Offerings, TagBasedItem } from "@ci/data-types";
import { Datatable } from "../../../interfaces/datatable.interface";
import { readAsset } from "../../../util/functions";
import { RawOfferingAltar } from "../../../interfaces/raw-data-interfaces/raw-offering-altar.interface";
import { OfferingDetailsDbGenerator } from "./offering-details-db.generator";
import { nonNullable } from "@ci/util";
import { StringTable } from "../../../util/string-table.class";
import { RawOffering } from "../../../interfaces/raw-data-interfaces/raw-offering.interface";
import { environment } from "../../../environments/environment";

export class OfferingsDbGenerator extends BaseGenerator<RawOfferingAltar, OfferingAltar> {

    datatable: Datatable<RawOfferingAltar>[] = readAsset<Datatable<RawOfferingAltar>[]>('ProjectCoral/Content/ProjectCoral/Data/Offering/DT_OfferingGroupRegistry.json');
    private offeringDetails: Map<string, Offerings>;

    constructor(protected itemMap: Map<string, Item>, protected cookingMap: Map<string, Record<string, CookingRecipe[]>>, protected tagBasedItemsMap: Map<string, TagBasedItem>,) {
        super();
        const offeringDetailsGenerator = new OfferingDetailsDbGenerator(itemMap, cookingMap, tagBasedItemsMap);

        this.offeringDetails = offeringDetailsGenerator.generate();

        if (!environment.isBeta)
            this.datatable[0].Rows['CustomDiving'] = {
                offeringId: Object.keys(readAsset<Datatable<RawOffering>[]>('ProjectCoral/Content/ProjectCoral/Data/Offering/DT_DivingOfferingRegistry.json')[0].Rows),
                offeringGroupTitle: {CultureInvariantString: null},
                customType: "diving",
                isHeritageOffering: false,
                offeringGroupRewardText: {CultureInvariantString: null}
            }

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

        let customType: Pick<OfferingAltar, 'customType'> = {}
        if ('customType' in dbItem) {
            customType.customType = dbItem.customType
        }

        return {
            key: itemKey,
            offeringGroupTitle: StringTable.getString(dbItem.offeringGroupTitle) ?? '',
            urlPath: (StringTable.getString(dbItem.offeringGroupTitle, "en") ?? '').toLowerCase().replaceAll(' ', ''),
            offeringGroupRewardText: StringTable.getString(dbItem.offeringGroupRewardText) ?? '',
            offerings,
            isHeritageOffering: dbItem.isHeritageOffering,
            ...customType

        };

    }


}
