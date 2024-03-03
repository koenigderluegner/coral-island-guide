import { BaseGenerator } from './base-generator.class';
import { RawGiftPreferenceInterface } from '../interfaces/raw-data-interfaces/raw-gift-preference.interface';
import { GiftingPreferenceKeys, GiftPreference, GiftPreferences, Item, NPC } from '@ci/data-types';
import { Datatable } from '../interfaces/datatable.interface';
import { minifyItem, minifyNPC, notEmpty, readAsset } from '../util/functions';
import { Logger } from "../util/logger.class";

export class GiftPreferencesDbGenerator extends BaseGenerator<RawGiftPreferenceInterface, Record<string, GiftPreferences>> {

    datatable: Datatable<RawGiftPreferenceInterface>[] = readAsset('ProjectCoral/Content/ProjectCoral/Core/Data/AI/DT_GiftPreferences.json');
    universalLikes?: GiftPreferences;


    constructor(protected itemMap: Map<string, Item>, protected npcMap: Map<string, NPC>) {
        super();
        this.transform = this.transform.bind(this);
    }

    handleEntry(itemKey: string, dbItem: RawGiftPreferenceInterface): Record<string, GiftPreferences> | undefined {
        const rec: Record<string, GiftPreferences> = {};
        const npc = this.npcMap.get(itemKey);
        if (itemKey !== 'ci_universal') {

            if (!npc) {
                Logger.error(`Cant find NPC ${itemKey} in gift preferences`);
                return;
            }

            if (!npc.canReceiveGifts) {
                return undefined;
            }
        }

        const keys = GiftingPreferenceKeys;

        const prefs: Record<keyof GiftPreferences, GiftPreference[]> = {};
        keys.forEach(preferenceType => {
            prefs[preferenceType] = dbItem[preferenceType].map(this.transform).filter(notEmpty).filter(rgp => {

                return !this.universalLikes?.[preferenceType].find((t: GiftPreference) => {
                    if (t.type === 'item' && rgp.type === 'item') {
                        return t.item.id === rgp.item.id;
                    } else if (t.type === 'category' && rgp.type === 'category') {
                        return t.categoryName === rgp.categoryName;
                    }
                    return false;
                });

            });
        });

        rec[itemKey] = {...prefs, npc: npc ? minifyNPC(npc) : undefined} as GiftPreferences;
        if (itemKey.includes('universal'))
            this.universalLikes = rec[itemKey];

        return rec;
    }

    transform(data: RawGiftPreferenceInterface['dislikePreferences'][0]): GiftPreference | null {

        let giftPreference: GiftPreference | null = null;

        if (data.data.category.data.RowName !== 'None') {
            giftPreference = {type: 'category', categoryName: data.data.category.data.RowName};
        } else if (data.data.item.itemID !== 'None') {
            let item = this.itemMap.get(data.data.item.itemID);
            if (!item) return null;
            giftPreference = {type: 'item', item: minifyItem(item!)};
        }
        // else if (data.data.tags.length) {
        //     // giftPreference = {type: 'tags', tags: data.data.tags};
        //     // They're only 2 entries with tags which also have entries for categories containing all tags
        //
        // }

        return giftPreference;


    }

}
