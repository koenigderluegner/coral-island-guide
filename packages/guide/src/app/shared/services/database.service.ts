import { inject, Injectable, Injector } from '@angular/core';
import { combineLatest, map, Observable, of, shareReplay, tap } from 'rxjs';
import {
    Achievement,
    AnimalData,
    AnimalShopData,
    Consumable,
    CookingRecipe,
    CraftingRecipe,
    Critter,
    Crop,
    DatabaseItem,
    Enemy,
    FestivalData,
    FestivalName,
    Fish,
    FruitPlant,
    FruitTree,
    GiftPreferences,
    HeartEvent,
    Item,
    ItemMixingRecipeData,
    ItemProcessing,
    ItemProcessShopData,
    ItemUpgradeData,
    JournalOrder,
    MailData,
    MeritExchangeShopData,
    MinimalItem,
    NPC,
    OfferingAltar,
    OpeningHours,
    PetShopAdoptions,
    ProductSizeByMood,
    ShopItemData,
    ShopName,
    TagBasedItem,
    TornPageData,
    TreasureHunt
} from '@ci/data-types';
import { AvailableJournalOrders } from '../types/available-journal-orders.type';
import { MapKeyed } from '../types/map-keyed.type';
import { flatObjectMap } from "@ci/util";
import { BaseDbService } from "./base-db.service";
import { httpResource, HttpResourceOptions, HttpResourceRef } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class DatabaseService extends BaseDbService {

    #injector = inject(Injector)

    private _ITEMS$?: Observable<Item[]>;
    private _ITEMS: Item[] = [];
    private _FISH$?: Observable<Fish[]>;
    private _CRAFTING_RECIPE$?: Observable<CraftingRecipe[]>;
    private _OCEAN_CRITTERS$?: Observable<Critter[]>;
    private _BUGS_AND_INSECTS$?: Observable<Critter[]>;

    private _JOURNAL_ORDERS: Map<string, Observable<JournalOrder[]>> = new Map<string, Observable<JournalOrder[]>>();
    private _CROPS$?: Observable<Crop[]>;
    private _FRUIT_TREES$?: Observable<FruitTree[]>;
    private _FRUIT_PLANTS$?: Observable<FruitPlant[]>;
    private _TAG_BASED_ITEMS$?: Observable<TagBasedItem[]>;
    private _TAG_BASED_ITEMS: TagBasedItem[] = [];
    private _TREASURE_HUNTS$?: Observable<TreasureHunt[]>;

    private _ITEM_PROCESSING_RECIPE$?: Observable<Record<string, ItemProcessing[]>>;
    private _COOKING_RECIPE$?: Observable<Record<string, CookingRecipe[]>>;
    private _CONSUMABLES$?: Observable<Consumable[]>;

    private _GIFT_PREFERENCES$?: Observable<MapKeyed<GiftPreferences>[]>;
    private _GIFT_PREFERENCES: MapKeyed<GiftPreferences>[] = [];


    private _OFFERINGS$?: Observable<OfferingAltar[]>;


    private _SHOP_ITEMS: Map<string, ShopItemData[]> = new Map<string, ShopItemData[]>();
    private _FESTIVAL_DATA: Map<string, FestivalData> = new Map<string, FestivalData>();
    private _SHOP_PROCESS_ITEMS: Map<string, ItemProcessShopData[]> = new Map<string, ItemProcessShopData[]>();
    private _OPENING_HOURS: Map<string, Record<string, OpeningHours>> = new Map<string, Record<string, OpeningHours>>();
    private _ITEM_UPGRADE: Map<string, ItemUpgradeData[]> = new Map<string, ItemUpgradeData[]>();
    private _PET_SHOP_ADOPTIONS$?: Observable<PetShopAdoptions[]>;
    private _NPCS: NPC[] = [];
    private _NPCS$?: Observable<NPC[]>;
    private _MERIT_EXCHANGE_SHOP_DATA$?: Observable<MeritExchangeShopData[]>;

    private _HEART_EVENTS$?: Observable<Record<string, HeartEvent[]>>;

    private _PROCESSOR_MAPPING: Record<string, MinimalItem> = {};
    private _PROCESSOR_MAPPING$?: Observable<Record<string, MinimalItem>>;
    private _COOKING_UTENSIL_MAPPING: Record<string, MinimalItem> = {};
    private _COOKING_UTENSIL_MAPPING$?: Observable<Record<string, MinimalItem>>;

    private _MUSEUM_CHECKLIST$?: Observable<Record<string, MinimalItem[]>>;

    private _COOKING_RECIPES_CHECKLIST$?: Observable<Record<string, MinimalItem[]>>;

    private _MAIL_DATA$?: Observable<MailData[]>;

    private _TORN_PAGES_DATA$?: Observable<TornPageData[]>;

    private _BESTIARY$?: Observable<Enemy[]>;


    private _ANIMAL_MOOD_DATA$?: Observable<ProductSizeByMood[]>;

    private _DATABASE_ITEMS: Map<string, DatabaseItem> = new Map<string, DatabaseItem>();

    #resources: Map<string, HttpResourceRef<any>> = new Map<string, HttpResourceRef<any>>()


    fetchDatabaseItem$(id: string): Observable<DatabaseItem> {
        if (!this._DATABASE_ITEMS.has(id)) {
            return this.http.get<DatabaseItem>(`${this.BASE_PATH_WITH_LANG}/items/${id}.json`)
                .pipe(
                    tap(items => this._DATABASE_ITEMS.set(id, items)),
                    shareReplay(1)
                );
        } else {
            return of(this._DATABASE_ITEMS.get(id)!)
        }
    }


    getItems(): Item[] {
        return this._ITEMS;
    }


    fetchItems$(): Observable<Item[]> {
        if (!this._ITEMS$) {
            this._ITEMS$ = this.http.get<Item[]>(`${this.BASE_PATH_WITH_LANG}/items.json`)
                .pipe(
                    tap(items => this._ITEMS = items),
                    shareReplay(1)
                );
        }
        return this._ITEMS$;
    }

    fetchMailData$(): Observable<MailData[]> {
        if (!this._MAIL_DATA$) {
            this._MAIL_DATA$ = this.http.get<MailData[]>(`${this.BASE_PATH_WITH_LANG}/mail-data.json`)
                .pipe(
                    shareReplay(1)
                );
        }
        return this._MAIL_DATA$;
    }

    fetchBestiary$(): Observable<Enemy[]> {
        if (!this._BESTIARY$) {
            this._BESTIARY$ = this.http.get<Enemy[]>(`${this.BASE_PATH_WITH_LANG}/bestiary.json`)
                .pipe(
                    shareReplay(1)
                );
        }
        return this._BESTIARY$;
    }

    fetchAnimals(){
        return this.#getResource<AnimalData[]>(`${this.BASE_PATH_WITH_LANG}/animal-data.json`);
    }

    fetchAnimalMoodData$(): Observable<ProductSizeByMood[]> {
        if (!this._ANIMAL_MOOD_DATA$) {
            this._ANIMAL_MOOD_DATA$ = this.http.get<ProductSizeByMood[]>(`${this.BASE_PATH_WITH_LANG}/animal-mood-size.json`)
                .pipe(
                    shareReplay(1)
                );
        }
        return this._ANIMAL_MOOD_DATA$;
    }

    fetchAnimalShopData(shopName: ShopName){
        return this.#getResource<AnimalShopData[]>(`${this.BASE_PATH_WITH_LANG}/${shopName}-animal-shop-data.json`);
    }



    fetchTornPagesData$(): Observable<TornPageData[]> {
        if (!this._TORN_PAGES_DATA$) {
            this._TORN_PAGES_DATA$ = this.http.get<TornPageData[]>(`${this.BASE_PATH_WITH_LANG}/torn-pages.json`)
                .pipe(
                    shareReplay(1)
                );
        }
        return this._TORN_PAGES_DATA$;
    }

    getCookingUtensilMapping(): Record<string, MinimalItem> {
        return this._COOKING_UTENSIL_MAPPING;
    }


    fetchCookingUtensilMapping$(): Observable<Record<string, MinimalItem>> {
        if (!this._COOKING_UTENSIL_MAPPING$) {
            this._COOKING_UTENSIL_MAPPING$ = this.http.get<Record<string, MinimalItem>[]>(`${this.BASE_PATH_WITH_LANG}/cooking-utensil-mapping.json`)
                .pipe(
                    map(s => s[0]),
                    tap(items => this._COOKING_UTENSIL_MAPPING = items),
                    shareReplay(1)
                );
        }
        return this._COOKING_UTENSIL_MAPPING$;
    }

    getProcessorMapping(): Record<string, MinimalItem> {
        return this._PROCESSOR_MAPPING;
    }


    fetchProcessorMapping$(): Observable<Record<string, MinimalItem>> {
        if (!this._PROCESSOR_MAPPING$) {
            this._PROCESSOR_MAPPING$ = this.http.get<Record<string, MinimalItem>[]>(`${this.BASE_PATH_WITH_LANG}/processor-mapping.json`)
                .pipe(
                    map(s => s[0]),
                    tap(items => this._PROCESSOR_MAPPING = items),
                    shareReplay(1)
                );
        }
        return this._PROCESSOR_MAPPING$;
    }

    getNPCs(): NPC[] {
        return this._NPCS;
    }


    fetchNPCs$(): Observable<NPC[]> {
        if (!this._NPCS$) {
            this._NPCS$ = this.http.get<NPC[]>(`${this.BASE_PATH_WITH_LANG}/npcs.json`)
                .pipe(
                    tap(items => this._NPCS = items),
                    shareReplay(1)
                );
        }
        return this._NPCS$;
    }


    fetchHeartEvents$(): Observable<Record<string, HeartEvent[]>> {
        if (!this._HEART_EVENTS$) {
            this._HEART_EVENTS$ = this.http.get<Record<string, HeartEvent[]>[]>(`${this.BASE_PATH_WITH_LANG}/heart-events.json`)
                .pipe(
                    map(events => events[0]),
                    shareReplay(1)
                );
        }
        return this._HEART_EVENTS$;
    }


    fetchMuseumChecklist$(): Observable<Record<string, MinimalItem[]>> {
        if (!this._MUSEUM_CHECKLIST$) {
            this._MUSEUM_CHECKLIST$ = this.http.get<Record<string, MinimalItem[]>[]>(`${this.BASE_PATH_WITH_LANG}/museum-checklist.json`)
                .pipe(
                    map(events => events[0]),
                    shareReplay(1)
                );
        }
        return this._MUSEUM_CHECKLIST$;
    }

    fetchCookingRecipesChecklist$(): Observable<Record<string, MinimalItem[]>> {
        if (!this._COOKING_RECIPES_CHECKLIST$) {
            this._COOKING_RECIPES_CHECKLIST$ = this.http.get<Record<string, MinimalItem[]>[]>(`${this.BASE_PATH_WITH_LANG}/cooking-recipes-checklist.json`)
                .pipe(
                    map(events => events[0]),
                    shareReplay(1)
                );
        }
        return this._COOKING_RECIPES_CHECKLIST$;
    }


    fetchAchievements() {
        return this.#getResource<Achievement[]>(`${this.BASE_PATH_WITH_LANG}/achievements.json`)
    }

    fetchOfferings$(): Observable<OfferingAltar[]> {
        if (!this._OFFERINGS$) {
            this._OFFERINGS$ = this.http.get<OfferingAltar[]>(`${this.BASE_PATH_WITH_LANG}/offerings.json`)
                .pipe(
                    shareReplay(1)
                );
        }
        return this._OFFERINGS$;
    }

    fetchConsumables$(): Observable<Consumable[]> {
        if (!this._CONSUMABLES$) {
            this._CONSUMABLES$ = this.http.get<Consumable[]>(`${this.BASE_PATH_WITH_LANG}/consumables.json`)
                .pipe(
                    shareReplay(1)
                );
        }
        return this._CONSUMABLES$;
    }

    fetchItemMixingRecipeData() {
        return this.#getResource<ItemMixingRecipeData[]>(`${this.BASE_PATH_WITH_LANG}/underwater-seeds-item-mixing-data.json`)
    }

    fetchFish$(): Observable<Fish[]> {
        if (!this._FISH$) {
            this._FISH$ = this.http.get<Fish[]>(`${this.BASE_PATH_WITH_LANG}/fish.json`)
                .pipe(
                    shareReplay(1)
                );
        }
        return this._FISH$;
    }

    fetchCraftingRecipes$(): Observable<CraftingRecipe[]> {
        if (!this._CRAFTING_RECIPE$) {
            this._CRAFTING_RECIPE$ = combineLatest([
                this.http.get<CraftingRecipe[]>(`${this.BASE_PATH_WITH_LANG}/crafting-recipes.json`),
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
                    shareReplay(1)
                );
        }
        return this._CRAFTING_RECIPE$;
    }

    fetchItemProcessingRecipes$(): Observable<Record<string, ItemProcessing[]>> {
        if (!this._ITEM_PROCESSING_RECIPE$) {
            this._ITEM_PROCESSING_RECIPE$ = combineLatest([
                this.http.get<Record<string, ItemProcessing[]>[]>(`${this.BASE_PATH_WITH_LANG}/item-processing.json`),
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
                    shareReplay(1)
                );
        }
        return this._ITEM_PROCESSING_RECIPE$;
    }

    fetchCookingRecipes$(): Observable<Record<string, CookingRecipe[]>> {
        if (!this._COOKING_RECIPE$) {
            this._COOKING_RECIPE$ = this.http.get<Record<string, CookingRecipe[]>[]>(`${this.BASE_PATH_WITH_LANG}/cooking-recipes.json`)
                .pipe(
                    map(cooking => cooking[0]),
                    shareReplay(1)
                );
        }
        return this._COOKING_RECIPE$;
    }

    fetchTreasureHunts$(): Observable<TreasureHunt[]> {
        if (!this._TREASURE_HUNTS$) {
            this._TREASURE_HUNTS$ = this.http.get<TreasureHunt[]>(`${this.BASE_PATH_WITH_LANG}/treasure-hunt-maps.json`)
                .pipe(
                    shareReplay(1)
                );
        }
        return this._TREASURE_HUNTS$;
    }

    fetchTagBasedItems$(): Observable<TagBasedItem[]> {
        if (!this._TAG_BASED_ITEMS$) {
            this._TAG_BASED_ITEMS$ = this.http.get<TagBasedItem[]>(`${this.BASE_PATH_WITH_LANG}/tag-based-items.json`)
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
            this._OCEAN_CRITTERS$ = this.http.get<Critter[]>(`${this.BASE_PATH_WITH_LANG}/ocean-critters.json`)
                .pipe(
                    shareReplay(1)
                );
        }
        return this._OCEAN_CRITTERS$;
    }

    fetchBugsAndInsects$(): Observable<Critter[]> {
        if (!this._BUGS_AND_INSECTS$) {
            this._BUGS_AND_INSECTS$ = this.http.get<Critter[]>(`${this.BASE_PATH_WITH_LANG}/bugs-and-insects.json`)
                .pipe(
                    shareReplay(1)
                );
        }
        return this._BUGS_AND_INSECTS$;
    }

    fetchCrops$(): Observable<Crop[]> {
        if (!this._CROPS$) {
            this._CROPS$ = this.http.get<Crop[]>(`${this.BASE_PATH_WITH_LANG}/crops.json`)
                .pipe(
                    shareReplay(1)
                );
        }
        return this._CROPS$;
    }

    fetchFruitTrees$(): Observable<FruitTree[]> {
        if (!this._FRUIT_TREES$) {
            this._FRUIT_TREES$ = this.http.get<Crop[]>(`${this.BASE_PATH_WITH_LANG}/fruit-trees.json`)
                .pipe(
                    shareReplay(1)
                );
        }
        return this._FRUIT_TREES$;
    }


    fetchFruitPlants$(): Observable<FruitPlant[]> {
        if (!this._FRUIT_PLANTS$) {
            this._FRUIT_PLANTS$ = this.http.get<Crop[]>(`${this.BASE_PATH_WITH_LANG}/fruit-plants.json`)
                .pipe(
                    shareReplay(1)
                );
        }
        return this._FRUIT_PLANTS$;
    }


    fetchJournalOrder$(listName: AvailableJournalOrders): Observable<JournalOrder[]> {
        if (!this._JOURNAL_ORDERS.get(listName)) {
            this._JOURNAL_ORDERS.set(listName, this.http.get<JournalOrder[]>(`${this.BASE_PATH_WITH_LANG}/${listName}.json`)
                .pipe(
                    shareReplay(1)
                )
            );
        }
        return this._JOURNAL_ORDERS.get(listName)!;
    }

    fetchGiftingPreferences$(): Observable<MapKeyed<GiftPreferences>[]> {
        if (!this._GIFT_PREFERENCES$) {
            this._GIFT_PREFERENCES$ = this.http.get<{
                [person: string]: GiftPreferences
            }[]>(`${this.BASE_PATH_WITH_LANG}/gift-preferences.json`)
                .pipe(
                    map(prefs => flatObjectMap(prefs)),
                    tap(prefs => this._GIFT_PREFERENCES = prefs),
                    shareReplay(1)
                );
        }
        return this._GIFT_PREFERENCES$;
    }

    getGiftingPreferences(): MapKeyed<GiftPreferences>[] {
        return this._GIFT_PREFERENCES;
    }


    fetchPetShopAdoptions$(): Observable<PetShopAdoptions[]> {
        if (!this._PET_SHOP_ADOPTIONS$) {
            this._PET_SHOP_ADOPTIONS$ = this.http.get<PetShopAdoptions[]>(`${this.BASE_PATH_WITH_LANG}/pet-shop-adoptions.json`)
                .pipe(
                    shareReplay(1)
                );
        }
        return this._PET_SHOP_ADOPTIONS$;
    }

    fetchShopProcessItems$(shopName: ShopName): Observable<ItemProcessShopData[]> {
        if (!this._SHOP_PROCESS_ITEMS.has(shopName)) {
            return this.http.get<ItemProcessShopData[]>(`${this.BASE_PATH_WITH_LANG}/${shopName}-shop-process-items.json`)
                .pipe(
                    tap(items => this._SHOP_PROCESS_ITEMS.set(shopName, items)),
                    shareReplay(1)
                );
        } else {
            return of(this._SHOP_PROCESS_ITEMS.get(shopName)!)
        }

    }

    fetchItemUpgradeData$(shopName: ShopName): Observable<ItemUpgradeData[]> {
        if (!this._ITEM_UPGRADE.has(shopName)) {
            return this.http.get<ItemUpgradeData[]>(`${this.BASE_PATH_WITH_LANG}/${shopName}-item-upgrade.json`)
                .pipe(
                    tap(items => this._ITEM_UPGRADE.set(shopName, items)),
                    shareReplay(1)
                );
        } else {
            return of(this._ITEM_UPGRADE.get(shopName)!)
        }

    }

    fetchOpeningHours$(shopName: ShopName): Observable<Record<string, OpeningHours>> {
        if (!this._OPENING_HOURS.has(shopName)) {
            return this.http.get<Record<string, OpeningHours>[]>(`${this.BASE_PATH_WITH_LANG}/${shopName}-opening-hours.json`)
                .pipe(
                    map(items => items[0]),
                    tap(items => this._OPENING_HOURS.set(shopName, items)),
                    shareReplay(1)
                );
        } else {
            return of(this._OPENING_HOURS.get(shopName)!)
        }

    }

    fetchShopItemData$(shopName: ShopName): Observable<ShopItemData[]> {
        if (!this._SHOP_ITEMS.has(shopName)) {
            return this.http.get<ShopItemData[]>(`${this.BASE_PATH_WITH_LANG}/${shopName}-shop-items.json`)
                .pipe(
                    tap(items => this._SHOP_ITEMS.set(shopName, items)),
                    shareReplay(1)
                );
        } else {
            return of(this._SHOP_ITEMS.get(shopName)!)
        }

    }

    fetchFestivalData$(festivalName: FestivalName): Observable<FestivalData> {
        if (!this._FESTIVAL_DATA.has(festivalName)) {
            return this.http.get<FestivalData[]>(`${this.BASE_PATH_WITH_LANG}/${festivalName}-festival-data.json`)
                .pipe(
                    map(data => data[0]),
                    tap(items => this._FESTIVAL_DATA.set(festivalName, items)),
                    shareReplay(1)
                );
        } else {
            return of(this._FESTIVAL_DATA.get(festivalName)!)
        }

    }

    fetchFestivalOpeningHours$(festivalName: FestivalName): Observable<Record<string, OpeningHours>> {
        const key = 'festival_' + festivalName as ShopName
        if (!this._OPENING_HOURS.has(key)) {
            return this.http.get<Record<string, OpeningHours>[]>(`${this.BASE_PATH_WITH_LANG}/${festivalName}-festival-opening-hours.json`)
                .pipe(
                    map(items => items[0]),
                    tap(items => this._OPENING_HOURS.set(key, items)),
                    shareReplay(1)
                );
        } else {
            return of(this._OPENING_HOURS.get(key)!)
        }

    }

    fetchMeritExchangeShopData$(): Observable<MeritExchangeShopData[]> {
        if (!this._MERIT_EXCHANGE_SHOP_DATA$) {
            this._MERIT_EXCHANGE_SHOP_DATA$ = this.http.get<MeritExchangeShopData[]>(`${this.BASE_PATH_WITH_LANG}/merit-exchange-shop-items.json`)
                .pipe(
                    shareReplay(1)
                );
        }

        return this._MERIT_EXCHANGE_SHOP_DATA$


    }

    #getResource<TResult = unknown>(url: string | (() => string | undefined), options?: Exclude<HttpResourceOptions<TResult, unknown>, 'injector'>): HttpResourceRef<TResult | undefined> {
        const cacheKey = typeof url === 'string' ? url : url();

        if (!cacheKey) throw new Error('Missing URL');

        let res = this.#resources.get(cacheKey);

        if (!res) {
            res = httpResource<TResult>(url, {...options, injector: this.#injector});
            this.#resources.set(cacheKey, res);
        }

        return res;

    }


}
