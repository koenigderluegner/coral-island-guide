import { Component, inject } from '@angular/core';
import { BaseSelectableContainerComponent } from "../../../shared/components/base-selectable-container/base-selectable-container.component";
import { Enemy } from "@ci/data-types";
import { DatabaseService } from "../../../shared/services/database.service";

@Component({
    selector: 'app-bestiary',
    templateUrl: './bestiary.component.html',
    standalone: false
})
export class BestiaryComponent extends BaseSelectableContainerComponent<Enemy> {

    bestiary$ = inject(DatabaseService).fetchBestiary$()

}
