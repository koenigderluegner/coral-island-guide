import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { ChancePerItem } from "@ci/data-types";
import { ItemIconComponent } from "../item-icon/item-icon.component";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
    selector: 'app-chance-per-item-table-list',
    templateUrl: './chance-per-item-table-list.component.html',

    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        ItemIconComponent,
        TranslatePipe
    ]
})
export class ChancePerItemTableListComponent {

    readonly chances = input.required<ChancePerItem[]>();
}
