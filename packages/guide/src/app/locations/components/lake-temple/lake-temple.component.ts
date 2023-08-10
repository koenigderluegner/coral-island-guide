import { Component } from '@angular/core';
import { MinimalItem, Offering, OfferingAltar, Offerings } from "@ci/data-types";
import { Observable, tap } from "rxjs";
import { BaseTabbedSelectableContainerComponent } from "../../../shared/components/base-tabbed-selectable-container/base-tabbed-selectable-container.component";
import { ChecklistCategory } from "../../../core/enums/checklist-category.enum";

@Component({
    selector: 'app-lake-temple',
    templateUrl: './lake-temple.component.html',
})
export class LakeTempleComponent extends BaseTabbedSelectableContainerComponent<MinimalItem> {
    protected activeOffering?: Offerings;
    protected offerings$: Observable<OfferingAltar[]>;
    protected entryForChecklist?: Offering | MinimalItem;
    protected checklistCategory = ChecklistCategory;


    constructor() {
        super()
        this.offerings$ = this._database.fetchOfferings$().pipe(
            tap((records) => {
                    const altarNames = records.map(altar => altar.offeringGroupTitle);
                    this.activateTabFromRoute(altarNames);
                }
            )
        );

    }

    override registerToChecklist(entry: MinimalItem | Offering) {
        if ('item' in entry) {
            this._checklist.add(ChecklistCategory.OFFERINGS, entry)
        }
    }

    override showDetails(selectedEntry?: Offering | MinimalItem) {
        this.entryForChecklist = selectedEntry;

        if (selectedEntry && 'amount' in selectedEntry) {
            super.showDetails(selectedEntry.item);
        } else {
            super.showDetails(selectedEntry);
        }

    }


}
