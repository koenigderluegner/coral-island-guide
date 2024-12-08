import { Component, ViewEncapsulation } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";

@Component({
    selector: 'app-database-artisan',
    templateUrl: './database-artisan.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class DatabaseArtisanComponent extends BaseDatabaseDetailPartComponent {
}
