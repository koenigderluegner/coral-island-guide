import { Component, ViewEncapsulation } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";

@Component({
    selector: 'app-database-mixing',
    templateUrl: './database-mixing.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DatabaseMixingComponent extends BaseDatabaseDetailPartComponent {
}
