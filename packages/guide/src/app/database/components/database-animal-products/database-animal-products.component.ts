import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Item } from "@ci/data-types";

@Component({
    selector: 'app-database-animal-products',
    templateUrl: './database-animal-products.component.html',
    styleUrls: ['./database-animal-products.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DatabaseAnimalProductsComponent {

    @Input() item?: Item;

}
