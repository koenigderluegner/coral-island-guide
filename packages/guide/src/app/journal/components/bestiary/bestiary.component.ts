import { Component, inject } from '@angular/core';
import { BaseSelectableContainerComponent } from "../../../shared/components/base-selectable-container/base-selectable-container.component";
import { Enemy } from "@ci/data-types";
import { DatabaseService } from "../../../shared/services/database.service";
import { BestiaryDetailsComponent } from "../bestiary-details/bestiary-details.component";
import { ListDetailContainerComponent } from "../../../shared/components/list-detail-container/list-detail-container.component";
import { AsyncPipe } from "@angular/common";
import { DataFilterComponent } from "../../../shared/components/data-filter/data-filter.component";
import { ItemIconComponent } from "../../../shared/components/item-icon/item-icon.component";
import { BestiaryTableComponent } from "../tables/bestiary-table/bestiary-table.component";

@Component({
    selector: 'app-bestiary',
    templateUrl: './bestiary.component.html',

    imports: [
        BestiaryDetailsComponent,
        ListDetailContainerComponent,
        AsyncPipe,
        DataFilterComponent,
        ItemIconComponent,
        BestiaryTableComponent
    ]
})
export class BestiaryComponent extends BaseSelectableContainerComponent<Enemy> {

    bestiary$ = inject(DatabaseService).fetchBestiary$()

}
