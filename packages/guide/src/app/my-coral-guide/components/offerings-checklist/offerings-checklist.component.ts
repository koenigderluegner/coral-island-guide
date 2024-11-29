import { Component, inject, signal } from '@angular/core';
import { BaseTabbedSelectableContainerComponent } from "../../../shared/components/base-tabbed-selectable-container/base-tabbed-selectable-container.component";
import { MinimalItem, MinimalTagBasedItem, Offering, OfferingAltar, Offerings } from "@ci/data-types";
import { map, Observable } from "rxjs";
import { OfferingChecklistService } from "../../../core/services/checklists/offering-checklist.service";
import { FormControl, FormRecord } from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { entityKey } from "@ci/util";
import { SettingsService } from "../../../shared/services/settings.service";

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
    protected useBeta = inject(SettingsService).getSettings().useBeta;
    protected bundleAssetPath = signal(`assets/${this.useBeta ? 'beta' : 'live'}/items/icons/`);
    private _altars: OfferingAltar[] = [];

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
            map((record) => {

                    const records = record.filter(r => r.offeringType !== 'Diving');
                    const altarNames = records.map(altar => altar.urlPath);

                    this._altars = records;
                    records.forEach(checklist => {

                        checklist.offerings.forEach(key => {
                            key.requiredItems.forEach(item => {
                                const key = entityKey(item.item);
                                this.checklistForm.addControl(key, new FormControl<boolean>(this.checklistService.isChecked(key), {nonNullable: true}), {emitEvent: false})
                            });
                        })
                    })
                    this.activateTabFromRoute(altarNames);
                    return records;
                }
            )
        );

    }

    // override registerToToDo(entry: MinimalItem | Offering | MinimalTagBasedItem) {
    //     const itemEntry: ToDo = 'item' in entry ? {
    //         itemEntry: entry.item,
    //         amount: entry.amount,
    //         quality: entry.quality
    //     } : {
    //         itemEntry: (entry)
    //     }
    //     this._todo.add({...itemEntry, context: "offerings"})
    // }

    override showDetails(selectedEntry?: Offering | MinimalItem | MinimalTagBasedItem) {
        this.entryForToDo = selectedEntry;

        if (selectedEntry && 'amount' in selectedEntry) {
            super.showDetails(selectedEntry.item);
        } else {
            super.showDetails(selectedEntry);
        }

    }

    override urlPathFromLabel = (label: string) => {

        const sanitizedLabel = label.toLowerCase().replaceAll(' ', '');
        const offeringAltar = this._altars.find(altar => altar.offeringGroupTitle.toLowerCase().replaceAll(' ', '') === sanitizedLabel);

        if (offeringAltar) {
            return offeringAltar.urlPath
        }

        return label.toLowerCase().replaceAll(' ', '')
    }


}
