import { Component } from '@angular/core';
import { Consumable, CookingRecipe, Quality } from "@ci/data-types";
import { combineLatest, map, Observable, take, tap } from "rxjs";
import { BaseTabbedSelectableContainerComponent } from "../../../shared/components/base-tabbed-selectable-container/base-tabbed-selectable-container.component";
import { CookingTableComponent } from "../tables/cooking-table/cooking-table.component";
import { ItemIconComponent } from "../../../shared/components/item-icon/item-icon.component";
import { DataFilterComponent } from "../../../shared/components/data-filter/data-filter.component";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { ConsumableComponent } from "../../../shared/components/database-item-details/consumable/consumable.component";
import { CookingRecipeComponent } from "../../../shared/components/database-item-details/cooking-recipe/cooking-recipe.component";
import { DatabaseItemDetailsComponent } from "../../../shared/components/database-item-details/database-item-details.component";
import { DatabaseItemDetailsDirective } from "../../../shared/directives/database-item-details.directive";
import { ListDetailContainerComponent } from "../../../shared/components/list-detail-container/list-detail-container.component";
import { AddSpacesToPascalCasePipe } from "../../../shared/pipes/add-spaces-to-pascal-case.pipe";
import { AsyncPipe, TitleCasePipe } from "@angular/common";

@Component({
    selector: 'app-cooking',
    templateUrl: './cooking.component.html',

    imports: [
        CookingTableComponent,
        ItemIconComponent,
        DataFilterComponent,
        MatTab,
        MatTabGroup,
        ConsumableComponent,
        CookingRecipeComponent,
        DatabaseItemDetailsComponent,
        DatabaseItemDetailsDirective,
        ListDetailContainerComponent,
        AddSpacesToPascalCasePipe,
        TitleCasePipe,
        AsyncPipe
    ]
})
export class CookingComponent extends BaseTabbedSelectableContainerComponent<CookingRecipe> {

    utensilNames: string[] = [];
    protected quality = Quality;
    protected selectedEntityConsumable: Consumable | undefined;
    protected cookingUtensilMapping = this._database.getCookingUtensilMapping()
    private _consumables: Consumable[] = [];

    constructor() {
        super();

        combineLatest([
            this._database.fetchCookingRecipes$(),
            this._database.fetchConsumables$()
        ]).pipe(take(1)).subscribe({
            next: ([records, consumables]) => {
                this._consumables = consumables;
                this.utensilNames = Object.keys(records);
                this.activateTabFromRoute(this.utensilNames)


            }
        });

    }


    filteredData$(maschineName: string): Observable<CookingRecipe[]> {
        return this._database.fetchCookingRecipes$().pipe(
            map(records => {
                return records[maschineName];
            }),
            tap(items => {
                this.reusedImages = this.getMultipleIconNames(items.map(i => i.item?.iconName ?? ''));
            })
        );
    }

    override urlPathFromLabel = (label: string) => {

        const foundKey = Object.keys(this.cookingUtensilMapping).find(key => this.cookingUtensilMapping[key].displayName === label);
        if (foundKey) {
            return foundKey
        }

        return label.toLowerCase().replaceAll(' ', '')
    }

    override showDetails(selectedEntry?: CookingRecipe) {
        super.showDetails(selectedEntry);
        this.selectedEntityConsumable = this._consumables.find(consumable => consumable.key === selectedEntry?.item?.id)
    }

}
