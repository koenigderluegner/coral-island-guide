import { Component } from '@angular/core';
import { MinimalItem, MinimalTagBasedItem, OfferingAltar } from "@ci/data-types";
import { map, Observable } from "rxjs";
import { BaseTabbedSelectableContainerComponent } from "../../../shared/components/base-tabbed-selectable-container/base-tabbed-selectable-container.component";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { ItemCardSwitchComponent } from "../../../shared/components/item-card-switch/item-card-switch.component";
import { SharedModule } from "../../../shared/shared.module";
import { OfferingComponent } from "../../../shared/components/database-item-details/offering/offering.component";
import { OfferingGroupComponent } from "../offering-group/offering-group.component";
import { AddSpacesToPascalCasePipe } from "../../../shared/pipes/add-spaces-to-pascal-case.pipe";
import { DatabaseItemDetailsDirective } from "../../../shared/directives/database-item-details.directive";
import { AsyncPipe } from "@angular/common";

@Component({
    selector: 'app-lake-temple',
    templateUrl: './lake-temple.component.html',
    standalone: true,
    imports: [
        MatTabGroup,
        ItemCardSwitchComponent,
        SharedModule,
        OfferingComponent,
        OfferingGroupComponent,
        MatTab,
        AddSpacesToPascalCasePipe,
        DatabaseItemDetailsDirective,
        AsyncPipe
    ]
})
export class LakeTempleComponent extends BaseTabbedSelectableContainerComponent<MinimalItem | MinimalTagBasedItem> {

    protected offerings$: Observable<OfferingAltar[]>;
    #altars: OfferingAltar[] = [];

    constructor() {
        super()
        this.offerings$ = this._database.fetchOfferings$().pipe(
            map((records) => {
                    const altars = records.filter(r => !r.customType);
                    const altarNames = altars.map(altar => altar.urlPath);
                    this.activateTabFromRoute(altarNames);

                    return altars
                }
            )
        );

    }

    override urlPathFromLabel = (label: string) => {

        const sanitizedLabel = label.toLowerCase().replaceAll(' ', '');
        const offeringAltar = this.#altars.find(altar => altar.offeringGroupTitle.toLowerCase().replaceAll(' ', '') === sanitizedLabel);

        if (offeringAltar) {
            return offeringAltar.urlPath
        }

        return label.toLowerCase().replaceAll(' ', '')
    }


}
