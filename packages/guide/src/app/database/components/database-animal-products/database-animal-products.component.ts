import { Component, ViewEncapsulation } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";

@Component({
    selector: 'app-database-animal-products',
    templateUrl: './database-animal-products.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class DatabaseAnimalProductsComponent extends BaseDatabaseDetailPartComponent {

}
