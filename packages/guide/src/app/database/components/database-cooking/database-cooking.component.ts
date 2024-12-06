import { Component, ViewEncapsulation } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";

@Component({
    selector: 'app-database-cooking',
    templateUrl: './database-cooking.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class DatabaseCookingComponent extends BaseDatabaseDetailPartComponent {
}
