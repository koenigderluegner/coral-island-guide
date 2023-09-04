import { NPC, PetShopAdoptions } from "@ci/data-types";
import { BaseGenerator } from "./base-generator.class";
import { RawPetShopData } from "../interfaces/raw-data-interfaces/raw-pet-shop-data.interface";
import { Datatable } from "../interfaces/datatable.interface";
import { readAsset } from "../util/functions";

export class PetShopAdoptionsGenerator extends BaseGenerator<RawPetShopData, PetShopAdoptions> {

    datatable: Datatable<RawPetShopData>[] = readAsset('ProjectCoral/Content/ProjectCoral/AdoptablePets/Shop/DT_PetShopData.json')

    constructor(protected npcMap: Map<string, NPC>) {
        super();
    }


    handleEntry(itemKey: string, dbItem: RawPetShopData): PetShopAdoptions | undefined {
        return {
            price: dbItem.price,
            iconName: this.npcMap.get(dbItem.petData.npcData.RowName)?.iconName ?? '',
            description: dbItem.description.LocalizedString ?? dbItem.description.SourceString,
            npcData: {
                npcId: dbItem.petData.npcData.RowName,
                nickname: dbItem.petData.nickname
            }
        };
    }

}
