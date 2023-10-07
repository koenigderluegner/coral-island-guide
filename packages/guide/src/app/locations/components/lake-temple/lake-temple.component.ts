import { Component } from '@angular/core';
import { MinimalItem, Offering, OfferingAltar, Offerings } from "@ci/data-types";
import { Observable, tap } from "rxjs";
import { BaseTabbedSelectableContainerComponent } from "../../../shared/components/base-tabbed-selectable-container/base-tabbed-selectable-container.component";
import { ToDoCategory } from "../../../core/enums/todo-category.enum";

@Component({
    selector: 'app-lake-temple',
    templateUrl: './lake-temple.component.html',
})
export class LakeTempleComponent extends BaseTabbedSelectableContainerComponent<MinimalItem> {
    protected activeOffering?: Offerings;
    protected offerings$: Observable<OfferingAltar[]>;
    protected entryForToDo?: Offering | MinimalItem;
    protected toDoCategory = ToDoCategory;


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

    override registerToToDo(entry: MinimalItem | Offering) {
        if ('item' in entry) {
            this._todo.add(ToDoCategory.OFFERINGS, entry)
        }
    }

    override showDetails(selectedEntry?: Offering | MinimalItem) {
        this.entryForToDo = selectedEntry;

        if (selectedEntry && 'amount' in selectedEntry) {
            super.showDetails(selectedEntry.item);
        } else {
            super.showDetails(selectedEntry);
        }

    }


}
