import { Component, ViewEncapsulation } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";

@Component({
    selector: 'app-database-crafting',
    templateUrl: './database-crafting.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class DatabaseCraftingComponent extends BaseDatabaseDetailPartComponent {
}
