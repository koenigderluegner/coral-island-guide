import { Component, ViewEncapsulation } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";

@Component({
    selector: 'app-database-animal-products',
    templateUrl: './database-animal-products.component.html',
    styleUrls: ['./database-animal-products.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DatabaseAnimalProductsComponent extends BaseDatabaseDetailPartComponent {

}
