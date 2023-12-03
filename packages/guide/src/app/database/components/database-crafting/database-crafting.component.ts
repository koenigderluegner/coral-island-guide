import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { CraftingRecipe, Item } from "@ci/data-types";

@Component({
    selector: 'app-database-crafting',
    templateUrl: './database-crafting.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DatabaseCraftingComponent extends BaseDatabaseDetailPartComponent {}
