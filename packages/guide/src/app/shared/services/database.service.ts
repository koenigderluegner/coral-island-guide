import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay, tap } from 'rxjs';
import {
    CraftingRecipe,
    Critter,
    Crop,
    Fish,
    GiftPreferences,
    Item,
    ItemProcessing,
    JournalOrder,
    TagBasedItem
} from '@ci/data-types';
import { AvailableJournalOrders } from '../types/available-journal-orders.type';
import { MapKeyed } from '../types/map-keyed.type';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    private readonly _BASE_PATH = 'assets/database';
    private _ITEMS$?: Observable<Item[]>;
    private _ITEMS: Item[] = [];
    private _FISH$?: Observable<Fish[]>;
    private _CRAFTING_RECIPE$?: Observable<CraftingRecipe[]>;
    private _OCEAN_CRITTERS?: Observable<Critter[]>;
    private _BUGS_AND_INSECTS?: Observable<Critter[]>;

    private _JOURNAL_ORDERS: Map<string, Observable<JournalOrder[]>> = new Map<string, Observable<JournalOrder[]>>();
    private _CROPS$?: Observable<Crop[]>;
    private _TAG_BASED_ITEMS$?: Observable<TagBasedItem[]>;
    private _ITEM_PROCESSING_RECIPE$?: Observable<Record<string, ItemProcessing[]>>;
    private _GIFT_PREFERENCES$?: Observable<MapKeyed<GiftPreferences>[]>;

    constructor(private readonly _http: HttpClient) {
    }

    getItems(): Item[] {
        return this._ITEMS;
    }


    fetchItems$(): Observable<Item[]> {
        if (!this._ITEMS$) {
            this._ITEMS$ = this._http.get<Item[]>(`${this._BASE_PATH}/items.json`)
                .pipe(
                    tap(items => this._ITEMS = items),
                    shareReplay(1)
                );
        }
        return this._ITEMS$;
    }

    fetchFish$(): Observable<Fish[]> {
        if (!this._FISH$) {
            this._FISH$ = this._http.get<Fish[]>(`${this._BASE_PATH}/fish.json`)
                .pipe(
                    shareReplay(1)
                );
        }
        return this._FISH$;
    }

    fetchCraftingRecipes$(): Observable<CraftingRecipe[]> {
        if (!this._CRAFTING_RECIPE$) {
            this._CRAFTING_RECIPE$ = this._http.get<CraftingRecipe[]>(`${this._BASE_PATH}/crafting-recipes.json`)
                .pipe(
                    shareReplay(1)
                );
        }
        return this._CRAFTING_RECIPE$;
    }

    fetchItemProcessingRecipes$(): Observable<Record<string, ItemProcessing[]>> {
        if (!this._ITEM_PROCESSING_RECIPE$) {
            this._ITEM_PROCESSING_RECIPE$ = this._http.get<Record<string, ItemProcessing[]>[]>(`${this._BASE_PATH}/item-processing.json`)
                .pipe(
                    map(ipa => ipa[0]),
                    shareReplay(1)
                );
        }
        return this._ITEM_PROCESSING_RECIPE$;
    }

    fetchTagBasedItems$(): Observable<TagBasedItem[]> {
        if (!this._TAG_BASED_ITEMS$) {
            this._TAG_BASED_ITEMS$ = this._http.get<TagBasedItem[]>(`${this._BASE_PATH}/tag-based-items.json`)
                .pipe(
                    shareReplay(1)
                );
        }
        return this._TAG_BASED_ITEMS$;
    }

    fetchOceanCritters$(): Observable<Critter[]> {
        if (!this._OCEAN_CRITTERS) {
            this._OCEAN_CRITTERS = this._http.get<Critter[]>(`${this._BASE_PATH}/ocean-critters.json`)
                .pipe(
                    shareReplay(1)
                );
        }
        return this._OCEAN_CRITTERS;
    }

    fetchBugsAndInsects$(): Observable<Critter[]> {
        if (!this._BUGS_AND_INSECTS) {
            this._BUGS_AND_INSECTS = this._http.get<Critter[]>(`${this._BASE_PATH}/bugs-and-insects.json`)
                .pipe(
                    shareReplay(1)
                );
        }
        return this._BUGS_AND_INSECTS;
    }

    fetchCrops$(): Observable<Crop[]> {
        if (!this._CROPS$) {
            this._CROPS$ = this._http.get<Crop[]>(`${this._BASE_PATH}/crops.json`)
                .pipe(
                    shareReplay(1)
                );
        }
        return this._CROPS$;
    }

    fetchJournalOrder$(listName: AvailableJournalOrders): Observable<JournalOrder[]> {
        if (!this._JOURNAL_ORDERS.get(listName)) {
            this._JOURNAL_ORDERS.set(listName, this._http.get<JournalOrder[]>(`${this._BASE_PATH}/${listName}.json`)
                .pipe(
                    shareReplay(1)
                )
            );
        }
        return this._JOURNAL_ORDERS.get(listName)!;
    }

    fetchGiftingPreferences$(): Observable<MapKeyed<GiftPreferences>[]> {
        if (!this._GIFT_PREFERENCES$) {
            this._GIFT_PREFERENCES$ = this._http.get<{ [person: string]: GiftPreferences }[]>(`${this._BASE_PATH}/gift-preferences.json`)
                .pipe(
                    map(prefs => this.flatObjectMap(prefs)),
                    shareReplay(1)
                );
        }
        return this._GIFT_PREFERENCES$;
    }

    flatObjectMap<T>(objectMap: { [key: string]: T }[]): (T & { mapKey: string })[] {

        return objectMap.map(entry => {
            const mapKey = Object.keys(entry)[0];

            return {...entry[mapKey], mapKey};
        });


    }


}
