import { BaseGenerator } from "./base-generator.class";
import { Datatable } from "../interfaces/datatable.interface";
import { readAsset } from "../util/functions";
import { RawAnimalShopData } from "../interfaces/raw-data-interfaces/raw-animal-shop-data.interface";
import { AnimalShopData } from "@ci/data-types";
import { StringTable } from "../util/string-table.class";

export class AnimalShopDataGenerator extends BaseGenerator<RawAnimalShopData, AnimalShopData> {
    datatable: Datatable<RawAnimalShopData>[] = readAsset(`ProjectCoral/Content/ProjectCoral/Core/Data/Shops/DT_AnimalShop.json`);


    handleEntry(itemKey: string, dbItem: RawAnimalShopData): AnimalShopData | undefined {


        return {
            key: itemKey,
            animalKey: dbItem.animal.RowName === 'None' ? null : dbItem.animal.RowName,
            amountOnPurchase: dbItem.amountOnPurchase,
            description: StringTable.getString(dbItem.description),
            readableCategory: StringTable.getString(dbItem.readableCategory),
            readableRequirement: StringTable.getString(dbItem.readableRequirement),
            readableName: StringTable.getString(dbItem.readableName),
            isAdult: dbItem.isAdult,
            itemLimit: dbItem.isLimitedItem ? dbItem.itemLimit : -1,
            price: dbItem.price,
            sellPrice: dbItem.SellPrice,
            townRank: dbItem.townRank,
            requirements: this.getRequirements(itemKey)
        };
    }

}
