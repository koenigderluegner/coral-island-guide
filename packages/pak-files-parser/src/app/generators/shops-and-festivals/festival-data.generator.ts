import { GeneratorOptions } from "../_base/base-generator.class";
import { Festival, FestivalData, FestivalShopItemData } from "@ci/data-types";
import { Datatable } from "../../../interfaces/datatable.interface";
import { readAsset } from "../../../util/functions";
import { RawFestival } from "../../../interfaces/raw-data-interfaces/raw-festival.interface";

export class FestivalDataGenerator {
    datatable: Datatable<RawFestival>[] = readAsset(`ProjectCoral/Content/ProjectCoral/Data/Calendar/DT_Events.json`);


    constructor(protected festival: Festival, protected shops?: {
        title: string;
        shop: Map<string, FestivalShopItemData>
    }[]) {

    }

    generate(options?: GeneratorOptions): Map<string, FestivalData> {
        const res: Map<string, FestivalData> = new Map<string, FestivalData>()

        res.set('unused', {
            festival: this.festival,
            shops: this.shops?.map(s => {
                return {
                    title: s.title,
                    shop: [...s.shop.values()]
                }
            }) ?? []
        })


        return res;
    }

}
