import { SourceString } from '../../types/source-string.type';
import { DatatableRef } from '../../types/datatable-ref.type';
import { AssetPath } from '../../types/asset-path.type';
import { ItemDatatableRef } from '../../types/item-datatable-ref';

export interface BaseRawItemUpgradeData {
    price: number;
    daysDelay: number;
    unlockRequirements: {
        item: ItemDatatableRef;
        amount: number;
    }[];
    requirements: {
        item: ItemDatatableRef;
        amount: number;
    }[];
    hardnessLevel: string;
    toolType: string;
    imagePreview: null;
    enable: boolean;
    townRank: number;
    item: ItemDatatableRef;
    useCustomName: boolean;
    shopItemName: SourceString;
    useCustomIcon: boolean;
    customIcon: AssetPath;
    useCustomCategory: boolean;
    customCategory: SourceString;
    useCustomDescription: boolean;
    customDescription: SourceString;
    useCategory: boolean;
    category: string;
    priority: number;
    priceOverride: number;
    tag: string[];
    isCurrentlyOutOfStock: boolean;
}
