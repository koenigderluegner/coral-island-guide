import { Component, ViewEncapsulation } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";

@Component({
    selector: 'app-database-sea-critters',
    templateUrl: './database-sea-critters.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DatabaseSeaCrittersComponent extends BaseDatabaseDetailPartComponent {
}
