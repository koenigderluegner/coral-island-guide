import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, map, Observable, shareReplay, tap } from 'rxjs';
import {
    Consumable,
    CookingRecipe,
    CraftingRecipe,
    Critter,
    Crop,
    Fish,
    FruitPlant,
    FruitTree,
    GiftPreferences,
    Item,
    ItemProcessing,
    ItemProcessShopData,
    JournalOrder,
    OfferingAltar,
    OpeningHours,
    ShopItemData,
    TagBasedItem
} from '@ci/data-types';
import { AvailableJournalOrders } from '../types/available-journal-orders.type';
import { MapKeyed } from '../types/map-keyed.type';
import { SettingsService } from "./settings.service";

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    private readonly _BASE_PATH: string;
    private _ITEMS$?: Observable<Item[]>;
    private _ITEMS: Item[] = [];
    private _FISH$?: Observable<Fish[]>;
    private _FISH: Fish[] = [];
    private _CRAFTING_RECIPE$?: Observable<CraftingRecipe[]>;
    private _CRAFTING_RECIPE: CraftingRecipe[] = [];
    private _OCEAN_CRITTERS$?: Observable<Critter[]>;
    private _OCEAN_CRITTERS: Critter[] = [];
    private _BUGS_AND_INSECTS$?: Observable<Critter[]>;
    private _BUGS_AND_INSECTS: Critter[] = [];

    private _JOURNAL_ORDERS: Map<string, Observable<JournalOrder[]>> = new Map<string, Observable<JournalOrder[]>>();
    private _CROPS$?: Observable<Crop[]>;
    private _CROPS: Crop[] = [];
    private _FRUIT_TREES$?: Observable<FruitTree[]>;
    private _FRUIT_TREES: FruitTree[] = [];
    private _FRUIT_PLANTS$?: Observable<FruitPlant[]>;
    private _FRUIT_PLANTS: FruitPlant[] = [];
    private _TAG_BASED_ITEMS$?: Observable<TagBasedItem[]>;
    private _TAG_BASED_ITEMS: TagBasedItem[] = [];
    private _ITEM_PROCESSING_RECIPE$?: Observable<Record<string, ItemProcessing[]>>;
    private _ITEM_PROCESSING_RECIPE: Record<string, ItemProcessing[]> = {};
    private _COOKING_RECIPE$?: Observable<Record<string, CookingRecipe[]>>;
    private _COOKING_RECIPE: Record<string, CookingRecipe[]> = {};
    private _CONSUMABLES$?: Observable<Consumable[]>;
    private _CONSUMABLES: Consumable[] = [];
    private _GIFT_PREFERENCES$?: Observable<MapKeyed<GiftPreferences>[]>;
    private _GIFT_PREFERENCES: MapKeyed<GiftPreferences>[] = [];


    private _OFFERINGS$?: Observable<OfferingAltar[]>;
    private _OFFERINGS: OfferingAltar[] = [];

    private _SHOP_ITEMS_BLACKSMITH$?: Observable<ShopItemData[]>;
    private _SHOP_ITEMS_BLACKSMITH: ShopItemData[] = [];

    private _SHOP_PROCESS_ITEMS_BLACKSMITH$?: Observable<ItemProcessShopData[]>;
    private _SHOP_PROCESS_ITEMS_BLACKSMITH: ItemProcessShopData[] = [];

    private _OPENING_HOURS_BLACKSMITH$?: Observable<Record<string, OpeningHours>>;
    private _OPENING_HOURS_BLACKSMITH: Record<string, OpeningHours> = {};

    constructor(private readonly _http: HttpClient,
                private readonly _settings: SettingsService) {
        const version = this._settings.getSettings().useBeta ? 'beta' : 'live';

        this._BASE_PATH = `assets/${version}/database`;
    }


    getDatabaseDetails(): Observable<unknown> {
        return combineLatest([
            this.fetchFish$(),
            this.fetchCraftingRecipes$(),
            this.fetchItemProcessingRecipes$(),
            this.fetchCookingRecipes$(),
            this.fetchTagBasedItems$(),
            this.fetchOceanCritters$(),
            this.fetchBugsAndInsects$(),
            this.fetchCrops$(),
            this.fetchFruitTrees$(),
            this.fetchFruitPlants$(),
            this.fetchGiftingPreferences$(),
            this.fetchOfferings$(),
            this.fetchShopItemDataBlacksmith$(),
            this.fetchShopProcessItemsBlacksmith$()
        ]);
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


    getOfferings(): OfferingAltar[] {
        return this._OFFERINGS;
    }


    fetchOfferings$(): Observable<OfferingAltar[]> {
        if (!this._OFFERINGS$) {
            this._OFFERINGS$ = this._http.get<OfferingAltar[]>(`${this._BASE_PATH}/offerings.json`)
                .pipe(
                    tap(items => this._OFFERINGS = items),
                    shareReplay(1)
                );
        }
        return this._OFFERINGS$;
    }

    getShopItemDataBlacksmith(): ShopItemData[] {
        return this._SHOP_ITEMS_BLACKSMITH;
    }

    fetchShopItemDataBlacksmith$(): Observable<ShopItemData[]> {
        if (!this._SHOP_ITEMS_BLACKSMITH$) {
            this._SHOP_ITEMS_BLACKSMITH$ = this._http.get<ShopItemData[]>(`${this._BASE_PATH}/blacksmith-shop-items.json`)
                .pipe(
                    tap(items => this._SHOP_ITEMS_BLACKSMITH = items),
                    shareReplay(1)
                );
        }
        return this._SHOP_ITEMS_BLACKSMITH$;
    }

    getShopProcessItemsBlacksmith(): ItemProcessShopData[] {
        return this._SHOP_PROCESS_ITEMS_BLACKSMITH;
    }

    fetchShopProcessItemsBlacksmith$(): Observable<ItemProcessShopData[]> {
        if (!this._SHOP_PROCESS_ITEMS_BLACKSMITH$) {
            this._SHOP_PROCESS_ITEMS_BLACKSMITH$ = this._http.get<ItemProcessShopData[]>(`${this._BASE_PATH}/blacksmith-shop-process-items.json`)
                .pipe(
                    tap(items => this._SHOP_PROCESS_ITEMS_BLACKSMITH = items),
                    shareReplay(1)
                );
        }
        return this._SHOP_PROCESS_ITEMS_BLACKSMITH$;
    }

    fetchOpeningHoursBlacksmith$(): Observable<Record<string, OpeningHours>> {
        if (!this._OPENING_HOURS_BLACKSMITH$) {
            this._OPENING_HOURS_BLACKSMITH$ = this._http.get<Record<string, OpeningHours>[]>(`${this._BASE_PATH}/blacksmith-opening-hours.json`)
                .pipe(
                    map(items => items[0]),
                    tap(items => this._OPENING_HOURS_BLACKSMITH = items),
                    shareReplay(1)
                );
        }
        return this._OPENING_HOURS_BLACKSMITH$;
    }


    getConsumables(): Consumable[] {
        return this._CONSUMABLES;
    }


    fetchConsumables$(): Observable<Consumable[]> {
        if (!this._CONSUMABLES$) {
            this._CONSUMABLES$ = this._http.get<Consumable[]>(`${this._BASE_PATH}/consumables.json`)
                .pipe(
                    tap(items => this._CONSUMABLES = items),
                    shareReplay(1)
                );
        }
        return this._CONSUMABLES$;
    }

    fetchFish$(): Observable<Fish[]> {
        if (!this._FISH$) {
            this._FISH$ = this._http.get<Fish[]>(`${this._BASE_PATH}/fish.json`)
                .pipe(
                    tap(fish => this._FISH = fish),
                    shareReplay(1)
                );
        }
        return this._FISH$;
    }

    getFish(): Fish[] {
        return this._FISH;
    }


    fetchCraftingRecipes$(): Observable<CraftingRecipe[]> {
        if (!this._CRAFTING_RECIPE$) {
            this._CRAFTING_RECIPE$ = combineLatest([
                this._http.get<CraftingRecipe[]>(`${this._BASE_PATH}/crafting-recipes.json`),
                this.fetchItems$(),
                this.fetchTagBasedItems$()
            ]).pipe(
                map(([recipes, items, tagBasedItems]) => {
                    recipes.forEach(recipe => {
                        recipe.item = items.find(item => item.id === recipe.key.toLowerCase());
                        recipe.genericIngredients.forEach(gi => gi.genericItem = tagBasedItems.find(item => item.key === gi.key));
                    });

                    return recipes;
                })
            )
                .pipe(
                    tap(craftingRecipes => this._CRAFTING_RECIPE = craftingRecipes),
                    shareReplay(1)
                );
        }
        return this._CRAFTING_RECIPE$;
    }


    getCraftingRecipes(): CraftingRecipe[] {
        return this._CRAFTING_RECIPE;
    }

    fetchItemProcessingRecipes$(): Observable<Record<string, ItemProcessing[]>> {
        if (!this._ITEM_PROCESSING_RECIPE$) {
            this._ITEM_PROCESSING_RECIPE$ = combineLatest([
                this._http.get<Record<string, ItemProcessing[]>[]>(`${this._BASE_PATH}/item-processing.json`),
                this.fetchTagBasedItems$(),
                this.fetchItems$()
            ])
                .pipe(
                    map(([ipa, tagBasedItems, items]) => {
                        const recipes: Record<string, ItemProcessing[]> = ipa[0];

                        Object.keys(recipes).forEach(maschineName => {
                            recipes[maschineName].forEach(item => {
                                item.machine = maschineName;
                                if (item.genericInput) {
                                    item.genericInput.genericItem = tagBasedItems.find(tbi => tbi.key === item.genericInput?.key)
                                }
                                item.output.item.sellPrice = items.find(i => i.id === item.output.item.id)?.sellPrice
                            })
                        })

                        return recipes
                    }),
                    tap(ipa => this._ITEM_PROCESSING_RECIPE = ipa),
                    shareReplay(1)
                );
        }
        return this._ITEM_PROCESSING_RECIPE$;
    }

    getItemProcessingRecipes(): Record<string, ItemProcessing[]> {
        return this._ITEM_PROCESSING_RECIPE;
    }


    fetchCookingRecipes$(): Observable<Record<string, CookingRecipe[]>> {
        if (!this._COOKING_RECIPE$) {
            this._COOKING_RECIPE$ = this._http.get<Record<string, CookingRecipe[]>[]>(`${this._BASE_PATH}/cooking-recipes.json`)
                .pipe(
                    map(cooking => cooking[0]),
                    tap(cooking => this._COOKING_RECIPE = cooking),
                    shareReplay(1)
                );
        }
        return this._COOKING_RECIPE$;
    }

    getCookingRecipes(): Record<string, CookingRecipe[]> {
        return this._COOKING_RECIPE;
    }

    fetchTagBasedItems$(): Observable<TagBasedItem[]> {
        if (!this._TAG_BASED_ITEMS$) {
            this._TAG_BASED_ITEMS$ = this._http.get<TagBasedItem[]>(`${this._BASE_PATH}/tag-based-items.json`)
                .pipe(
                    tap(tagBasedItems => this._TAG_BASED_ITEMS = tagBasedItems),
                    shareReplay(1)
                );
        }
        return this._TAG_BASED_ITEMS$;
    }

    getTagBasedItems(): TagBasedItem[] {
        return this._TAG_BASED_ITEMS;
    }


    fetchOceanCritters$(): Observable<Critter[]> {
        if (!this._OCEAN_CRITTERS$) {
            this._OCEAN_CRITTERS$ = this._http.get<Critter[]>(`${this._BASE_PATH}/ocean-critters.json`)
                .pipe(
                    tap(oceanCritters => this._OCEAN_CRITTERS = oceanCritters),
                    shareReplay(1)
                );
        }
        return this._OCEAN_CRITTERS$;
    }

    getOceanCritters(): Critter[] {
        return this._OCEAN_CRITTERS;
    }


    fetchBugsAndInsects$(): Observable<Critter[]> {
        if (!this._BUGS_AND_INSECTS$) {
            this._BUGS_AND_INSECTS$ = this._http.get<Critter[]>(`${this._BASE_PATH}/bugs-and-insects.json`)
                .pipe(
                    tap(bugs => this._BUGS_AND_INSECTS = bugs),
                    shareReplay(1)
                );
        }
        return this._BUGS_AND_INSECTS$;
    }


    getBugsAndInsects(): Critter[] {
        return this._BUGS_AND_INSECTS;
    }


    fetchCrops$(): Observable<Crop[]> {
        if (!this._CROPS$) {
            this._CROPS$ = this._http.get<Crop[]>(`${this._BASE_PATH}/crops.json`)
                .pipe(
                    tap(crops => this._CROPS = crops),
                    shareReplay(1)
                );
        }
        return this._CROPS$;
    }

    getCrops(): Crop[] {
        return this._CROPS;
    }


    fetchFruitTrees$(): Observable<FruitTree[]> {
        if (!this._FRUIT_TREES$) {
            this._FRUIT_TREES$ = this._http.get<Crop[]>(`${this._BASE_PATH}/fruit-trees.json`)
                .pipe(
                    tap(fruitTrees => this._FRUIT_TREES = fruitTrees),
                    shareReplay(1)
                );
        }
        return this._FRUIT_TREES$;
    }

    getFruitTrees(): FruitTree[] {
        return this._FRUIT_TREES;
    }


    fetchFruitPlants$(): Observable<FruitPlant[]> {
        if (!this._FRUIT_PLANTS$) {
            this._FRUIT_PLANTS$ = this._http.get<Crop[]>(`${this._BASE_PATH}/fruit-plants.json`)
                .pipe(
                    tap(fruitPlants => this._FRUIT_PLANTS = fruitPlants),
                    shareReplay(1)
                );
        }
        return this._FRUIT_PLANTS$;
    }

    getFruitPlants(): FruitPlant[] {
        return this._FRUIT_PLANTS;
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
            this._GIFT_PREFERENCES$ = this._http.get<{
                [person: string]: GiftPreferences
            }[]>(`${this._BASE_PATH}/gift-preferences.json`)
                .pipe(
                    map(prefs => this.flatObjectMap(prefs)),
                    tap(prefs => this._GIFT_PREFERENCES = prefs),
                    shareReplay(1)
                );
        }
        return this._GIFT_PREFERENCES$;
    }

    getGiftingPreferences(): MapKeyed<GiftPreferences>[] {
        return this._GIFT_PREFERENCES;
    }

    flatObjectMap<T>(objectMap: { [key: string]: T }[]): (T & { mapKey: string })[] {

        return objectMap.map(entry => {
            const mapKey = Object.keys(entry)[0];

            return {...entry[mapKey], mapKey};
        });


    }


}
