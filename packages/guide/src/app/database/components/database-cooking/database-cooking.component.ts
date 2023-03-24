import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { CookingRecipe, Item } from "@ci/data-types";

@Component({
    selector: 'app-database-cooking',
    templateUrl: './database-cooking.component.html',
    styleUrls: ['./database-cooking.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DatabaseCookingComponent extends BaseDatabaseDetailPartComponent implements OnInit {
    protected craftedFrom: CookingRecipe[] = []
    protected usedIn: CookingRecipe[] = [];

    ngOnInit(): void {
        if (!this.item) return;
        const recipes = this.database.getCookingRecipes();

        const craftedFrom: CookingRecipe[] = [];
        const usedIn: CookingRecipe[] = [];

        Object.keys(recipes).forEach(utensil => {
            craftedFrom.push(...recipes[utensil].filter(recipe => recipe.item?.id === this.item?.id));
            usedIn.push(...recipes[utensil].filter(recipe => this.item && this.isIngredient(this.item, recipe)));
        })

        this.usedIn = usedIn;
        this.craftedFrom = craftedFrom;

    }

    isIngredient(item: Item, recipe: CookingRecipe): boolean {
        const tags = this.getGenericItems(item);

        return recipe.ingredients.some(ingredient => ingredient.item?.id === item?.id) || recipe.genericIngredients.some(genericIngredient => tags.find(tag => tag.key === genericIngredient.key))
    }
}
