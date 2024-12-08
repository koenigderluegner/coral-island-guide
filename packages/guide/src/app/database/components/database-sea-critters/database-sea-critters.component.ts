import { Component, ViewEncapsulation } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";

@Component({
    selector: 'app-database-sea-critters',
    templateUrl: './database-sea-critters.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class DatabaseSeaCrittersComponent extends BaseDatabaseDetailPartComponent {
}
