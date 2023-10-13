import { Component, inject } from '@angular/core';
import { BaseTabbedSelectableContainerComponent } from "../../../shared/components/base-tabbed-selectable-container/base-tabbed-selectable-container.component";
import { MinimalItem, Offering, OfferingAltar, Offerings } from "@ci/data-types";
import { Observable, tap } from "rxjs";
import { ToDoCategory } from "../../../core/enums/todo-category.enum";
import { OfferingChecklistService } from "../../../core/services/checklists/offering-checklist.service";
import { FormControl, FormRecord } from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-offerings-checklist',
    templateUrl: './offerings-checklist.component.html',
})
export class OfferingsChecklistComponent extends BaseTabbedSelectableContainerComponent<MinimalItem> {
    checklistService = inject(OfferingChecklistService);
    checklistForm: FormRecord<FormControl<boolean>> = new FormRecord<FormControl<boolean>>({})
    protected activeOffering?: Offerings;
    protected offerings$: Observable<OfferingAltar[]>;
    protected entryForToDo?: Offering | MinimalItem;
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
                                this.checklistForm.addControl(item.item.id, new FormControl<boolean>(this.checklistService.isChecked(item.item.id), {nonNullable: true}), {emitEvent: false})
                            });
                        })
                    })
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
