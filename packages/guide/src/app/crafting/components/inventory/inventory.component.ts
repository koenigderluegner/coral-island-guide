import { Component } from '@angular/core';
import { CraftingRecipe } from '@ci/data-types';
import { Observable } from 'rxjs';
import { BaseSelectableContainerComponent } from "../../../shared/components/base-selectable-container/base-selectable-container.component";
import { InventoryTableComponent } from "../tables/inventory-table/inventory-table.component";
import { ItemIconComponent } from "../../../shared/components/item-icon/item-icon.component";
import { AsyncPipe } from "@angular/common";
import { DataFilterComponent } from "../../../shared/components/data-filter/data-filter.component";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { InventoryDetailsComponent } from "../inventory-details/inventory-details.component";
import { ListDetailContainerComponent } from "../../../shared/components/list-detail-container/list-detail-container.component";

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',

    imports: [
        InventoryTableComponent,
        ItemIconComponent,
        AsyncPipe,
        DataFilterComponent,
        MatTab,
        MatTabGroup,
        InventoryDetailsComponent,
        ListDetailContainerComponent
    ]
})
export class InventoryComponent extends BaseSelectableContainerComponent<CraftingRecipe> {

    recipes$: Observable<CraftingRecipe[]>;

    constructor() {
        super();
        this.recipes$ = this._database.fetchCraftingRecipes$();
    }
}
