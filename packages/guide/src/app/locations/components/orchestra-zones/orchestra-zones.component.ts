import { Component } from '@angular/core';
import { BaseTabbedSelectableContainerComponent } from "../../../shared/components/base-tabbed-selectable-container/base-tabbed-selectable-container.component";
import { MinimalItem, MinimalTagBasedItem, OfferingAltar } from "@ci/data-types";
import { map, Observable } from "rxjs";
import { AddSpacesToPascalCasePipe } from "../../../shared/pipes/add-spaces-to-pascal-case.pipe";
import { AsyncPipe, NgOptimizedImage } from "@angular/common";
import { DatabaseItemDetailsDirective } from "../../../shared/directives/database-item-details.directive";
import { ItemCardSwitchComponent } from "../../../shared/components/item-card-switch/item-card-switch.component";
import { LocationsModule } from "../../locations.module";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { OfferingComponent } from "../../../shared/components/database-item-details/offering/offering.component";
import { SharedModule } from "../../../shared/shared.module";
import { OfferingGroupComponent } from "../offering-group/offering-group.component";

@Component({
    selector: 'app-orchestra-zones',
    standalone: true,
    imports: [
        AddSpacesToPascalCasePipe,
        AsyncPipe,
        DatabaseItemDetailsDirective,
        ItemCardSwitchComponent,
        LocationsModule,
        MatTab,
        MatTabGroup,
        NgOptimizedImage,
        OfferingComponent,
        SharedModule,
        OfferingGroupComponent
    ],
    templateUrl: './orchestra-zones.component.html'
})
export class OrchestraZonesComponent extends BaseTabbedSelectableContainerComponent<MinimalItem | MinimalTagBasedItem> {

    protected offerings$: Observable<OfferingAltar | undefined>;

    constructor() {
        super()

        this.offerings$ = this._database.fetchOfferings$().pipe(
            map((records) => {
                    return records.find(r => r.customType === "diving")
                }
            )
        );
    }
}
