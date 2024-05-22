import { Injectable } from '@angular/core';
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
    TornPageData
} from '@ci/data-types';
import { AvailableJournalOrders } from '../types/available-journal-orders.type';
import { MapKeyed } from '../types/map-keyed.type';
import { flatObjectMap } from "@ci/util";
import { BaseDbService } from "./base-db.service";

@Injectable({
    providedIn: 'root'
})
export class DatabaseService extends BaseDbService {

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


    private _SHOP_ITEMS: Map<string, ShopItemData[]> = new Map<string, ShopItemData[]>();
    private _FESTIVAL_DATA: Map<string, FestivalData> = new Map<string, FestivalData>();
    private _SHOP_PROCESS_ITEMS: Map<string, ItemProcessShopData[]> = new Map<string, ItemProcessShopData[]>();
    private _OPENING_HOURS: Map<string, Record<string, OpeningHours>> = new Map<string, Record<string, OpeningHours>>();
    private _ITEM_UPGRADE: Map<string, ItemUpgradeData[]> = new Map<string, ItemUpgradeData[]>();
    private _PET_SHOP_ADOPTIONS$?: Observable<PetShopAdoptions[]>;
    private _PET_SHOP_ADOPTIONS: PetShopAdoptions[] = [];
    private _NPCS: NPC[] = [];
    private _NPCS$?: Observable<NPC[]>;
    private _ACHHIEVEMENTS$?: Observable<Achievement[]>;
    private _MERIT_EXCHANGE_SHOP_DATA$?: Observable<MeritExchangeShopData[]>;

    private _HEART_EVENTS: Record<string, HeartEvent[]> = {};
    private _HEART_EVENTS$?: Observable<Record<string, HeartEvent[]>>;

    private _PROCESSOR_MAPPING: Record<string, MinimalItem> = {};
    private _PROCESSOR_MAPPING$?: Observable<Record<string, MinimalItem>>;
    private _COOKING_UTENSIL_MAPPING: Record<string, MinimalItem> = {};
    private _COOKING_UTENSIL_MAPPING$?: Observable<Record<string, MinimalItem>>;

    private _MUSEUM_CHECKLIST: Record<string, MinimalItem[]> = {};
    private _MUSEUM_CHECKLIST$?: Observable<Record<string, MinimalItem[]>>;

    private _COOKING_RECIPES_CHECKLIST: Record<string, MinimalItem[]> = {};
    private _COOKING_RECIPES_CHECKLIST$?: Observable<Record<string, MinimalItem[]>>;

    private _MAIL_DATA: MailData[] = [];
    private _MAIL_DATA$?: Observable<MailData[]>;

    private _TORN_PAGES_DATA: TornPageData[] = [];
    private _TORN_PAGES_DATA$?: Observable<TornPageData[]>;

    private _BESTIARY: Enemy[] = [];
    private _BESTIARY$?: Observable<Enemy[]>;


    private _ANIMAL_SHOP_DATA: Map<string, AnimalShopData[]> = new Map<string, AnimalShopData[]>();
    private _ANIMAL_DATA$?: Observable<AnimalData[]>;
    private _ANIMAL_MOOD_DATA$?: Observable<ProductSizeByMood[]>;
    private _ANIMAL_SHOP_DATA$?: Observable<AnimalShopData[]>;

    private _DATABASE_ITEMS: Map<string, DatabaseItem> = new Map<string, DatabaseItem>();


    fetchDatabaseItem$(id: string): Observable<DatabaseItem> {
        if (!this._DATABASE_ITEMS.has(id)) {
            return this.http.get<DatabaseItem>(`${this.BASE_PATH}/items/${id}.json`)
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
            this._ITEMS$ = this.http.get<Item[]>(`${this.BASE_PATH}/items.json`)
                .pipe(
                    tap(items => this._ITEMS = items),
                    shareReplay(1)
                );
        }
        return this._ITEMS$;
    }

    fetchMailData$(): Observable<MailData[]> {
        if (!this._MAIL_DATA$) {
            this._MAIL_DATA$ = this.http.get<MailData[]>(`${this.BASE_PATH}/mail-data.json`)
                .pipe(
                    tap(items => this._MAIL_DATA = items),
                    shareReplay(1)
                );
        }
        return this._MAIL_DATA$;
    }

    getBestiary(): Enemy[] {
        return this._BESTIARY
    }

    fetchBestiary$(): Observable<Enemy[]> {
        if (!this._BESTIARY$) {
            this._BESTIARY$ = this.http.get<Enemy[]>(`${this.BASE_PATH}/bestiary.json`)
                .pipe(
                    tap(items => this._BESTIARY = items),
                    shareReplay(1)
                );
        }
        return this._BESTIARY$;
    }

    fetchAnimals$(): Observable<AnimalData[]> {
        if (!this._ANIMAL_DATA$) {
            this._ANIMAL_DATA$ = this.http.get<AnimalData[]>(`${this.BASE_PATH}/animal-data.json`)
                .pipe(
                    shareReplay(1)
                );
        }
        return this._ANIMAL_DATA$;
    }

    fetchAnimalMoodData$(): Observable<ProductSizeByMood[]> {
        if (!this._ANIMAL_MOOD_DATA$) {
            this._ANIMAL_MOOD_DATA$ = this.http.get<ProductSizeByMood[]>(`${this.BASE_PATH}/animal-mood-size.json`)
                .pipe(
                    shareReplay(1)
                );
        }
        return this._ANIMAL_MOOD_DATA$;
    }



    fetchAnimalShopData$(shopName: ShopName): Observable<AnimalShopData[]> {
        if (!this._ANIMAL_SHOP_DATA.has(shopName)) {
            return this.http.get<AnimalShopData[]>(`${this.BASE_PATH}/${shopName}-animal-shop-data.json`)
                .pipe(
                    tap(items => this._ANIMAL_SHOP_DATA.set(shopName, items)),
                    shareReplay(1)
                );
        } else {
            return of(this._ANIMAL_SHOP_DATA.get(shopName)!)
        }

    }



    fetchTornPagesData$(): Observable<TornPageData[]> {
        if (!this._TORN_PAGES_DATA$) {
            this._TORN_PAGES_DATA$ = this.http.get<TornPageData[]>(`${this.BASE_PATH}/torn-pages.json`)
                .pipe(
                    tap(items => this._TORN_PAGES_DATA = items),
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
            this._COOKING_UTENSIL_MAPPING$ = this.http.get<Record<string, MinimalItem>[]>(`${this.BASE_PATH}/cooking-utensil-mapping.json`)
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
            this._PROCESSOR_MAPPING$ = this.http.get<Record<string, MinimalItem>[]>(`${this.BASE_PATH}/processor-mapping.json`)
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
            this._NPCS$ = this.http.get<NPC[]>(`${this.BASE_PATH}/npcs.json`)
                .pipe(
                    tap(items => this._NPCS = items),
                    shareReplay(1)
                );
        }
        return this._NPCS$;
    }


    getHeartEvents(): Record<string, HeartEvent[]> {
        return this._HEART_EVENTS;
    }


    fetchHeartEvents$(): Observable<Record<string, HeartEvent[]>> {
        if (!this._HEART_EVENTS$) {
            this._HEART_EVENTS$ = this.http.get<Record<string, HeartEvent[]>[]>(`${this.BASE_PATH}/heart-events.json`)
                .pipe(
                    map(events => events[0]),
                    tap(items => this._HEART_EVENTS = items),
                    shareReplay(1)
                );
        }
        return this._HEART_EVENTS$;
    }


    getMuseumChecklist(): Record<string, MinimalItem[]> {
        return this._MUSEUM_CHECKLIST;
    }


    fetchMuseumChecklist$(): Observable<Record<string, MinimalItem[]>> {
        if (!this._MUSEUM_CHECKLIST$) {
            this._MUSEUM_CHECKLIST$ = this.http.get<Record<string, MinimalItem[]>[]>(`${this.BASE_PATH}/museum-checklist.json`)
                .pipe(
                    map(events => events[0]),
                    tap(items => this._MUSEUM_CHECKLIST = items),
                    shareReplay(1)
                );
        }
        return this._MUSEUM_CHECKLIST$;
    }

    fetchCookingRecipesChecklist$(): Observable<Record<string, MinimalItem[]>> {
        if (!this._COOKING_RECIPES_CHECKLIST$) {
            this._COOKING_RECIPES_CHECKLIST$ = this.http.get<Record<string, MinimalItem[]>[]>(`${this.BASE_PATH}/cooking-recipes-checklist.json`)
                .pipe(
                    map(events => events[0]),
                    tap(items => this._COOKING_RECIPES_CHECKLIST = items),
                    shareReplay(1)
                );
        }
        return this._COOKING_RECIPES_CHECKLIST$;
    }


    fetchAchievements$(): Observable<Achievement[]> {
        if (!this._ACHHIEVEMENTS$) {
            this._ACHHIEVEMENTS$ = this.http.get<Achievement[]>(`${this.BASE_PATH}/achievements.json`)
                .pipe(
                    shareReplay(1)
                );
        }
        return this._ACHHIEVEMENTS$;
    }


    getOfferings(): OfferingAltar[] {
        return this._OFFERINGS;
    }


    fetchOfferings$(): Observable<OfferingAltar[]> {
        if (!this._OFFERINGS$) {
            this._OFFERINGS$ = this.http.get<OfferingAltar[]>(`${this.BASE_PATH}/offerings.json`)
                .pipe(
                    tap(items => this._OFFERINGS = items),
                    shareReplay(1)
                );
        }
        return this._OFFERINGS$;
    }

    fetchConsumables$(): Observable<Consumable[]> {
        if (!this._CONSUMABLES$) {
            this._CONSUMABLES$ = this.http.get<Consumable[]>(`${this.BASE_PATH}/consumables.json`)
                .pipe(
                    tap(items => this._CONSUMABLES = items),
                    shareReplay(1)
                );
        }
        return this._CONSUMABLES$;
    }

    fetchFish$(): Observable<Fish[]> {
        if (!this._FISH$) {
            this._FISH$ = this.http.get<Fish[]>(`${this.BASE_PATH}/fish.json`)
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
                this.http.get<CraftingRecipe[]>(`${this.BASE_PATH}/crafting-recipes.json`),
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
                this.http.get<Record<string, ItemProcessing[]>[]>(`${this.BASE_PATH}/item-processing.json`),
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
            this._COOKING_RECIPE$ = this.http.get<Record<string, CookingRecipe[]>[]>(`${this.BASE_PATH}/cooking-recipes.json`)
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
            this._TAG_BASED_ITEMS$ = this.http.get<TagBasedItem[]>(`${this.BASE_PATH}/tag-based-items.json`)
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
            this._OCEAN_CRITTERS$ = this.http.get<Critter[]>(`${this.BASE_PATH}/ocean-critters.json`)
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
            this._BUGS_AND_INSECTS$ = this.http.get<Critter[]>(`${this.BASE_PATH}/bugs-and-insects.json`)
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
            this._CROPS$ = this.http.get<Crop[]>(`${this.BASE_PATH}/crops.json`)
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
            this._FRUIT_TREES$ = this.http.get<Crop[]>(`${this.BASE_PATH}/fruit-trees.json`)
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
            this._FRUIT_PLANTS$ = this.http.get<Crop[]>(`${this.BASE_PATH}/fruit-plants.json`)
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
            this._JOURNAL_ORDERS.set(listName, this.http.get<JournalOrder[]>(`${this.BASE_PATH}/${listName}.json`)
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
            }[]>(`${this.BASE_PATH}/gift-preferences.json`)
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
            this._PET_SHOP_ADOPTIONS$ = this.http.get<PetShopAdoptions[]>(`${this.BASE_PATH}/pet-shop-adoptions.json`)
                .pipe(
                    tap(prefs => this._PET_SHOP_ADOPTIONS = prefs),
                    shareReplay(1)
                );
        }
        return this._PET_SHOP_ADOPTIONS$;
    }

    fetchShopProcessItems$(shopName: ShopName): Observable<ItemProcessShopData[]> {
        if (!this._SHOP_PROCESS_ITEMS.has(shopName)) {
            return this.http.get<ItemProcessShopData[]>(`${this.BASE_PATH}/${shopName}-shop-process-items.json`)
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
            return this.http.get<ItemUpgradeData[]>(`${this.BASE_PATH}/${shopName}-item-upgrade.json`)
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
            return this.http.get<Record<string, OpeningHours>[]>(`${this.BASE_PATH}/${shopName}-opening-hours.json`)
                .pipe(
                    map(items => items[0]),
                    tap(items => this._OPENING_HOURS.set(shopName, items)),
                    shareReplay(1)
                );
        } else {
            return of(this._OPENING_HOURS.get(shopName)!)
        }

    }

    getShopProcessItems(shopName: ShopName): ItemProcessShopData[] {
        return this._SHOP_PROCESS_ITEMS.get(shopName) ?? [];
    }

    getShopData(shopName: ShopName): ShopItemData[] {
        return this._SHOP_ITEMS.get(shopName) ?? [];
    }

    getFestivalData(shopName: FestivalName): FestivalData | null {
        return this._FESTIVAL_DATA.get(shopName) ?? null;
    }

    getItemUpgradeData(shopName: ShopName): ItemUpgradeData[] {
        return this._ITEM_UPGRADE.get(shopName) ?? [];
    }

    getOpeningHours(shopName: ShopName): Record<string, OpeningHours> {
        return this._OPENING_HOURS.get(shopName) ?? {};
    }

    fetchShopItemData$(shopName: ShopName): Observable<ShopItemData[]> {
        if (!this._SHOP_ITEMS.has(shopName)) {
            return this.http.get<ShopItemData[]>(`${this.BASE_PATH}/${shopName}-shop-items.json`)
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
            return this.http.get<FestivalData[]>(`${this.BASE_PATH}/${festivalName}-festival-data.json`)
                .pipe(
                    map(data => data[0]),
                    tap(items => this._FESTIVAL_DATA.set(festivalName, items)),
                    shareReplay(1)
                );
        } else {
            return of(this._FESTIVAL_DATA.get(festivalName)!)
        }

    }

    fetchMeritExchangeShopData$(): Observable<MeritExchangeShopData[]> {
        if (!this._MERIT_EXCHANGE_SHOP_DATA$) {
            this._MERIT_EXCHANGE_SHOP_DATA$ = this.http.get<MeritExchangeShopData[]>(`${this.BASE_PATH}/merit-exchange-shop-items.json`)
                .pipe(
                    shareReplay(1)
                );
        }

        return this._MERIT_EXCHANGE_SHOP_DATA$


    }


}
