import { Component, OnInit } from '@angular/core';
import { CraftingRecipe } from '@ci/data-types';
import { DatabaseService } from '../../../shared/services/database.service';
import { combineLatest, map, Observable } from 'rxjs';

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
    selectedEntity?: CraftingRecipe;

    recipes$: Observable<CraftingRecipe[]>;

    constructor(private readonly _database: DatabaseService) {
        this.recipes$ = combineLatest([
            _database.fetchCraftingRecipes$(),
            _database.fetchItems$(),
            _database.fetchTagBasedItems$()
        ]).pipe(
            map(([recipes, items, tagBasedItems]) => {
                recipes.forEach(recipe => {
                    recipe.item = items.find(item => item.id === recipe.key.toLowerCase());
                    recipe.genericIngredients.forEach(gi => gi.genericItem = tagBasedItems.find(item => item.key === gi.key));
                });

                return recipes;
            })
        );
    }

    ngOnInit(): void {
    }
}
