import { Component } from '@angular/core';
import { CookingRecipe, Quality } from "@ci/data-types";
import { combineLatest, map, Observable, take, tap } from "rxjs";
import { BaseTabbedSelectableContainerComponent } from "../../../shared/components/base-tabbed-selectable-container/base-tabbed-selectable-container.component";

@Component({
    selector: 'app-cooking',
    templateUrl: './cooking.component.html',
})
export class CookingComponent extends BaseTabbedSelectableContainerComponent<CookingRecipe> {

    quality = Quality;
    utensilNames: string[] = [];

    constructor() {
        super();

        combineLatest([
            this._database.fetchCookingRecipes$()
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


    filteredData$(maschineName: string): Observable<CookingRecipe[]> {
        return this._database.fetchCookingRecipes$().pipe(
            map(records => {
                return records[maschineName];
            }),
            tap(items => {
                this.reusedImages = this._getMultipleIconNames(items.map(i => i.item?.iconName ?? ''));
            })
        );
    }

}
