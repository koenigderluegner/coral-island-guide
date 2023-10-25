import { Component, inject } from '@angular/core';
import { BaseTabbedSelectableContainerComponent } from "../../../shared/components/base-tabbed-selectable-container/base-tabbed-selectable-container.component";
import { MinimalItem, MinimalTagBasedItem, Offering, OfferingAltar, Offerings } from "@ci/data-types";
import { Observable, tap } from "rxjs";
import { ToDoCategory } from "../../../core/enums/todo-category.enum";
import { OfferingChecklistService } from "../../../core/services/checklists/offering-checklist.service";
import { FormControl, FormRecord } from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { entityKey } from "@ci/util";

@Component({
    selector: 'app-offerings-checklist',
    templateUrl: './offerings-checklist.component.html',
})
export class OfferingsChecklistComponent extends BaseTabbedSelectableContainerComponent<MinimalItem | MinimalTagBasedItem> {
    checklistService = inject(OfferingChecklistService);
    checklistForm: FormRecord<FormControl<boolean>> = new FormRecord<FormControl<boolean>>({})
    protected activeOffering?: Offerings;
    protected offerings$: Observable<OfferingAltar[]>;
    protected entryForToDo?: Offering | MinimalItem | MinimalTagBasedItem;
    protected toDoCategory = ToDoCategory;

    constructor() {
        super()
        this.checklistForm.valueChanges.pipe(
            takeUntilDestroyed()
        ).subscribe({
            next: value => {
                const checkedItems: string[] = [];

                Object.keys(value).forEach(key => {
                    if (value[key]) checkedItems.push(key)
                })

                this.checklistService.set(checkedItems);
            }
        })
        this.offerings$ = this._database.fetchOfferings$().pipe(
            tap((records) => {
                    const altarNames = records.map(altar => altar.offeringGroupTitle);

                    records.forEach(checklist => {
                        const keys = Object.keys(checklist);
                        checklist.offerings.forEach(key => {
                            key.requiredItems.forEach(item => {
                                const key = entityKey(item.item);
                                this.checklistForm.addControl(key, new FormControl<boolean>(this.checklistService.isChecked(key), {nonNullable: true}), {emitEvent: false})
                            });
                        })
                    })
                    this.activateTabFromRoute(altarNames);
                }
            )
        );

    }

    override registerToToDo(entry: MinimalItem | Offering | MinimalTagBasedItem) {
        if ('item' in entry) {
            this._todo.add(ToDoCategory.OFFERINGS, entry)
        }
    }

    override showDetails(selectedEntry?: Offering | MinimalItem | MinimalTagBasedItem) {
        this.entryForToDo = selectedEntry;

        if (selectedEntry && 'amount' in selectedEntry) {
            super.showDetails(selectedEntry.item);
        } else {
            super.showDetails(selectedEntry);
        }

    }


}
