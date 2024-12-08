import { Component } from '@angular/core';
import { CraftingRecipe } from '@ci/data-types';
import { Observable } from 'rxjs';
import { BaseSelectableContainerComponent } from "../../../shared/components/base-selectable-container/base-selectable-container.component";

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
    standalone: false
})
export class InventoryComponent extends BaseSelectableContainerComponent<CraftingRecipe> {

    recipes$: Observable<CraftingRecipe[]>;

    constructor() {
        super();
        this.recipes$ = this._database.fetchCraftingRecipes$();
    }
}
