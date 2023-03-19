import { Component } from '@angular/core';
import { CookingRecipe, GenericEntry, Quality } from "@ci/data-types";
import { ActivatedRoute, Router } from "@angular/router";
import { DatabaseService } from "../../../shared/services/database.service";
import { combineLatest, map, Observable, take, tap } from "rxjs";
import { ItemListComponent } from "../../../shared/components/item-list/item-list.component";
import { MatTabChangeEvent } from "@angular/material/tabs";

@Component({
    selector: 'app-cooking',
    templateUrl: './cooking.component.html',
})
export class CookingComponent {


    openDrawer = false;

    selectedEntity?: CookingRecipe;
    reusedImages: string[] = [];

    selectedTabIndex = -1;

    quality = Quality;
    utensilNames: string[] = [];

    constructor(
        private readonly _route: ActivatedRoute,
        private readonly _router: Router,
        private readonly _databaseService: DatabaseService
    ) {

        combineLatest([
            _databaseService.fetchCookingRecipes$()
        ]).pipe(take(1)).subscribe({
            next: ([records]) => {
                this.utensilNames = Object.keys(records);
                this._route.paramMap.pipe(
                    tap(params => {

                        const utensil = params.get('utensil');

                        if (utensil)
                            this.selectedTabIndex = this.utensilNames.map(s => s.toLowerCase()).indexOf(utensil);
                    })
                ).subscribe();


            }
        });


    }

    getItemList(item: CookingRecipe): ItemListComponent['itemList'] {

        const items: ItemListComponent['itemList'] = [...item.ingredients];

        if (item.genericIngredients.length) {

            item.genericIngredients.forEach(genericIngredient => {
                const genericInput: GenericEntry = {
                    shouldBeSameItem: false,
                    amount: genericIngredient.amount,
                    genericItem: genericIngredient.genericItem
                }

                items.push(genericInput)
            });
        }

        return items;
    }

    private _getMultipleIconNames(iconNames: string[]): string[] {
        const filtered = iconNames.filter((v, i) => iconNames.indexOf(v) !== i);
        return [...new Set(filtered)];
    }

    filteredData$(maschineName: string): Observable<CookingRecipe[]> {
        return this._databaseService.fetchCookingRecipes$().pipe(
            map(records => {
                return records[maschineName];
            }),
            tap(items => {
                this.reusedImages = this._getMultipleIconNames(items.map(i => i.item?.iconName ?? ''));
            })
        );
    }

    updateUrl($event: MatTabChangeEvent) {
        let tab = $event.tab.textLabel.toLowerCase();
        this._router.navigate(['..', tab], {relativeTo: this._route});
    }

    showDetails(entry?: CookingRecipe) {
        this.selectedEntity = entry;
        this.openDrawer = true;
    }

}
