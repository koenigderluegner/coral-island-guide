import { Component } from '@angular/core';
import { BaseTabbedSelectableContainerComponent } from "../../../shared/components/base-tabbed-selectable-container/base-tabbed-selectable-container.component";
import { MinimalItem, MinimalTagBasedItem, OfferingAltar } from "@ci/data-types";
import { map, Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { DatabaseItemDetailsDirective } from "../../../shared/directives/database-item-details.directive";
import { ItemCardSwitchComponent } from "../../../shared/components/item-card-switch/item-card-switch.component";
import { LocationsModule } from "../../locations.module";
import { OfferingComponent } from "../../../shared/components/database-item-details/offering/offering.component";
import { SharedModule } from "../../../shared/shared.module";
import { OfferingGroupComponent } from "../offering-group/offering-group.component";

@Component({
    selector: 'app-orchestra-zones',
    imports: [
        AsyncPipe,
        DatabaseItemDetailsDirective,
        ItemCardSwitchComponent,
        LocationsModule,
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
                    return records.find(r => r.offeringType === "Diving")
                }
            )
        );
    }
}
