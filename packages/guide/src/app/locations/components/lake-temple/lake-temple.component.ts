import { Component } from '@angular/core';
import { MinimalItem, Offering, OfferingAltar, Offerings } from "@ci/data-types";
import { Observable, tap } from "rxjs";
import { BaseTabbedSelectableContainerComponent } from "../../../shared/components/base-tabbed-selectable-container/base-tabbed-selectable-container.component";
import { ChecklistService } from "../../../core/services/checklist.service";
import { ChecklistCategory } from "../../../core/enums/checklist-category.enum";

@Component({
    selector: 'app-lake-temple',
    templateUrl: './lake-temple.component.html',
})
export class LakeTempleComponent extends BaseTabbedSelectableContainerComponent<MinimalItem> {
    protected activeOffering?: Offerings;
    protected offerings$: Observable<OfferingAltar[]>;

    constructor(private readonly _checklist: ChecklistService) {
        super()
        this.offerings$ = this._database.fetchOfferings$().pipe(
            tap((records) => {
                    const altarNames = records.map(altar => altar.offeringGroupTitle);
                    this.activateTabFromRoute(altarNames);
                }
            )
        );


    }

    override showDetails(selectedEntry?: Offering | MinimalItem) {
        if (selectedEntry && 'amount' in selectedEntry) {
            this._checklist.add(ChecklistCategory.OFFERINGS, selectedEntry);
            super.showDetails(selectedEntry.item);
        } else {
            super.showDetails(selectedEntry);
        }

    }


}
