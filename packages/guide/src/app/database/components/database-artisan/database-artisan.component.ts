import { Component, ViewEncapsulation } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";

@Component({
    selector: 'app-database-artisan',
    templateUrl: './database-artisan.component.html',
    styleUrls: ['./database-artisan.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DatabaseArtisanComponent extends BaseDatabaseDetailPartComponent {

}
