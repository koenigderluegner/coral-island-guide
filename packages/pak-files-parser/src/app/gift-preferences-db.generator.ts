import { BaseGenerator } from './base-generator.class';
import { RawGiftPreferenceInterface } from '../interfaces/raw-gift-preference.interface';
import { GiftPreference, GiftPreferences, Item } from '@ci/data-types';
import { Datatable } from '../interfaces/datatable.interface';
import { minifyItem, notEmpty, readAsset } from '../util/functions';

export class GiftPreferencesDbGenerator extends BaseGenerator<RawGiftPreferenceInterface, Record<string, GiftPreferences>> {
    datatable: Datatable<RawGiftPreferenceInterface>[] = readAsset('ProjectCoral/Content/ProjectCoral/Core/Data/AI/DT_GiftPreferences.json');

    constructor(protected itemMap: Map<string, Item>) {
        super();
        this.transform = this.transform.bind(this);
    }

    handleEntry(itemKey: string, dbItem: RawGiftPreferenceInterface): Record<string, GiftPreferences> {
        console.log(itemKey);
        const rec: Record<string, GiftPreferences> = {};
        rec[itemKey] = {
            favoritePreferences: dbItem.favoritePreferences.map(this.transform).filter(notEmpty),
            lovePreferences: dbItem.lovePreferences.map(this.transform).filter(notEmpty),
            likePreferences: dbItem.likePreferences.map(this.transform).filter(notEmpty),
            neutralPreferences: dbItem.neutralPreferences.map(this.transform).filter(notEmpty),
            dislikePreferences: dbItem.dislikePreferences.map(this.transform).filter(notEmpty),
            hatePreferences: dbItem.hatePreferences.map(this.transform).filter(notEmpty),
        };

        return rec;
    }

    transform(data: RawGiftPreferenceInterface['dislikePreferences'][0]): GiftPreference | null {

        let giftPreference: GiftPreference = {type: 'category', categoryName: 'Unknown'};

        if (data.data.category.data.RowName !== 'None') {
            giftPreference = {type: 'category', categoryName: data.data.category.data.RowName};
        } else if (data.data.item.itemID !== 'None') {
            let item = this.itemMap.get(data.data.item.itemID);
            if (!item) return null;
            giftPreference = {type: 'item', item: minifyItem(item!)};
        } else if (data.data.tags.length) {
            // giftPreference = {type: 'tags', tags: data.data.tags};
            // They're only 2 entries with tags which also have entries for categories containing all tags
            return null;
        }

        return giftPreference;


    }

}