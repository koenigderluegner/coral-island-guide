import { Component } from '@angular/core';
import { CraftingRecipe } from '@ci/data-types';
import { DatabaseService } from '../../../shared/services/database.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent {
    openDrawer = false;

    selectedEntity?: CraftingRecipe;

    recipes$: Observable<CraftingRecipe[]>;

    constructor(private readonly _database: DatabaseService) {
        this.recipes$ = _database.fetchCraftingRecipes$();
    }

    showDetails(fishEntry?: CraftingRecipe) {
        this.selectedEntity = fishEntry;
        this.openDrawer = true;
    }
}
