import { Component } from '@angular/core';
import { CookingRecipe, Quality } from "@ci/data-types";
import { ActivatedRoute, Router } from "@angular/router";
import { DatabaseService } from "../../../shared/services/database.service";
import { combineLatest, map, Observable, take, tap } from "rxjs";
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
        let tab = $event.tab.textLabel.toLowerCase().replace(' ', '');
        this._router.navigate(['..', tab], {relativeTo: this._route});
    }

    showDetails(entry?: CookingRecipe) {
        this.selectedEntity = entry;
        this.openDrawer = true;
    }

}
