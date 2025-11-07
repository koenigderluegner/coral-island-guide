import { Festival } from './festival.interface';
import { FestivalShopItemData } from './festival-shop-item-data.interface';

export interface FestivalData {
    festival: Festival;
    shops: {
        title: string;
        shop: FestivalShopItemData[]
    }[]
}
