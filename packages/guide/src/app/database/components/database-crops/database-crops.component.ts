import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { BaseCrop, Item } from "@ci/data-types";

@Component({
    selector: 'app-database-crops',
    templateUrl: './database-crops.component.html',
    styleUrls: ['./database-crops.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DatabaseCropsComponent extends BaseDatabaseDetailPartComponent implements OnInit {

    protected isSeedFor: BaseCrop[] = []
    protected comesFromSeed: BaseCrop[] = [];

    ngOnInit(): void {
        if (!this.item) return;
        const recipes = [...this.database.getCrops(), ...this.database.getFruitTrees(), ...this.database.getFruitPlants()]

        this.isSeedFor = recipes.filter(recipe => this.item && this.isIngredient(this.item, recipe));
        this.comesFromSeed = recipes.filter(recipe => recipe.item?.id === this.item?.id);


    }

    isIngredient(item: Item, recipe: BaseCrop): boolean {
        return recipe.dropData.some(ingredient => ingredient.item?.id === item?.id);
    }

}
