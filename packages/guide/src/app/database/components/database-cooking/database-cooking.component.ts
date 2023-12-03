import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { CookingRecipe, Item } from "@ci/data-types";

@Component({
    selector: 'app-database-cooking',
    templateUrl: './database-cooking.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DatabaseCookingComponent extends BaseDatabaseDetailPartComponent {}
