import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { Item, ItemProcessing } from "@ci/data-types";

@Component({
    selector: 'app-database-artisan',
    templateUrl: './database-artisan.component.html',
    styleUrls: ['./database-artisan.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DatabaseArtisanComponent extends BaseDatabaseDetailPartComponent implements OnInit {
    protected craftedFrom: ItemProcessing[] = []
    protected usedIn: ItemProcessing[] = [];

    ngOnInit(): void {
        if (!this.item) return;
        const recipes = this.database.getItemProcessingRecipes();

        const craftedFrom: ItemProcessing[] = [];
        const usedIn: ItemProcessing[] = [];

        Object.keys(recipes).forEach(utensil => {
            craftedFrom.push(...recipes[utensil].filter(recipe => recipe.output.item.id === this.item?.id));
            usedIn.push(...recipes[utensil].filter(recipe => this.item && this.isIngredient(this.item, recipe)));
        })

        this.usedIn = usedIn;
        this.craftedFrom = craftedFrom;

    }

    isIngredient(item: Item, recipe: ItemProcessing): boolean {
        const tags = this.getGenericItems(item);

        return recipe.input.item.id === item?.id || recipe.additionalInput.some(input => input.item.id === item.id) || !!tags.find(tag => tag.key === recipe.genericInput?.genericItem?.key)
    }
}
