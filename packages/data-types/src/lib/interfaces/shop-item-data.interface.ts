import { CustomEntry } from './custom-entry.interface';
import { Effect } from '../types/effects/effect.type';
import { Item } from './item.interface';
import { MinimalItem } from '../types/minimal-item.type';
import { RequirementEntry } from '../types/requirement-entry.type';
import { SpecificDate } from './specific-date.interface';
import { Time } from './time.interface';


export type ShopItemData = {
    allowedSeasons: string[],
    forbiddenSeasons: string[],
    allowedDays: string[],
    forbiddenDays: string[],
    allowedWeather: string[],
    forbiddenWeather: string[],
    townRank: number;
    item: (CustomEntry | MinimalItem) & Pick<Item, 'price' | 'sellPrice'>;
    priority: number,
    enabled: boolean,
    priceOverride: number,
    tag: string[]
    availableSinceDate: boolean,
    sinceDate?: SpecificDate,
    availableTillDate: boolean,
    tillDate?: SpecificDate,
    availableDuringTime: boolean,
    timeRange?: { fromTime: Time, toTime: Time };
    effects?: Effect[],
    requirements?: RequirementEntry
}
