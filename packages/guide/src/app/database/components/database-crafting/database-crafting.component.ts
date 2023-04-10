import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { CraftingRecipe, Item } from "@ci/data-types";

@Component({
    selector: 'app-database-crafting',
    templateUrl: './database-crafting.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DatabaseCraftingComponent extends BaseDatabaseDetailPartComponent implements OnInit {

    protected craftedFrom: CraftingRecipe[] = []
    protected usedIn: CraftingRecipe[] = [];

    ngOnInit(): void {
        if (!this.item) return;
        const recipes = this.database.getCraftingRecipes();

        this.craftedFrom = recipes.filter(recipe => recipe.item?.id === this.item?.id);
        this.usedIn = recipes.filter(recipe => this.item && this.isIngredient(this.item, recipe));

    }

    isIngredient(item: Item, recipe: CraftingRecipe): boolean {
        const tags = this.getGenericItems(item);

        return recipe.ingredients.some(ingredient => ingredient.item?.id === item?.id) || recipe.genericIngredients.some(genericIngredient => tags.find(tag => tag.key === genericIngredient.key))
    }

}
