import { Festival, FestivalShopItemData } from "@ci/data-types";

export interface FestivalData {
    festival: Festival;
    shops: {
        title: string;
        shop: FestivalShopItemData[]
    }[]
}
