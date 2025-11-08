import { Component, input } from '@angular/core';
import { ChancePerItem } from "@ci/data-types";
import { ItemIconComponent } from "../item-icon/item-icon.component";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
    selector: 'app-chance-per-item-list',
    templateUrl: './chance-per-item-list.component.html',

    imports: [
        ItemIconComponent,
        TranslatePipe
    ]
})
export class ChancePerItemListComponent {

    readonly chances = input.required<ChancePerItem[]>();

}
