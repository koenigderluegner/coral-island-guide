import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { CraftingRecipe, Critter, Fish, Item } from '@ci/data-types';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    private readonly _BASE_PATH = 'assets/database';
    private _ITEMS$?: Observable<Item[]>;
    private _FISH$?: Observable<Fish[]>;
    private _CRAFTING_RECIPE$?: Observable<CraftingRecipe[]>;
    private _OCEAN_CRITTERS?: Observable<Critter[]>;
    private _BUGS_AND_INSECTS?: Observable<Critter[]>;

    constructor(private readonly _http: HttpClient) {
    }


    fetchItems$(): Observable<Item[]> {
        if (!this._ITEMS$) {
            this._ITEMS$ = this._http.get<Item[]>(`${this._BASE_PATH}/items.json`)
                .pipe(
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


}
