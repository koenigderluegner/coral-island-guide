import { Component, ViewEncapsulation } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";

@Component({
    selector: 'app-database-crops',
    templateUrl: './database-crops.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class DatabaseCropsComponent extends BaseDatabaseDetailPartComponent {
}
