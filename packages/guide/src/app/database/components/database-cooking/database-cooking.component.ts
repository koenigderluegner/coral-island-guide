import { Component, ViewEncapsulation } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";

@Component({
    selector: 'app-database-cooking',
    templateUrl: './database-cooking.component.html',
    styleUrls: ['./database-cooking.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DatabaseCookingComponent extends BaseDatabaseDetailPartComponent {

}
