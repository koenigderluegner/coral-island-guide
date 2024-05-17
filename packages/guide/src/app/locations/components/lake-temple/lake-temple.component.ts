import { Component } from '@angular/core';
import { MinimalItem, MinimalTagBasedItem, Offering, OfferingAltar, Offerings } from "@ci/data-types";
import { Observable, tap } from "rxjs";
import { BaseTabbedSelectableContainerComponent } from "../../../shared/components/base-tabbed-selectable-container/base-tabbed-selectable-container.component";
import { ToDo } from "../../../core/types/to-do.type";

@Component({
    selector: 'app-lake-temple',
    templateUrl: './lake-temple.component.html',
})
export class LakeTempleComponent extends BaseTabbedSelectableContainerComponent<MinimalItem | MinimalTagBasedItem> {
    protected activeOffering?: Offerings;
    protected offerings$: Observable<OfferingAltar[]>;
    protected entryForToDo?: Offering | MinimalItem | MinimalTagBasedItem;
    private _altars: OfferingAltar[] = [];


    constructor() {
        super()
        this.offerings$ = this._database.fetchOfferings$().pipe(
            tap((records) => {
                    this._altars = records;
                    const altarNames = records.map(altar => altar.urlPath);
                    this.activateTabFromRoute(altarNames);
                }
            )
        );

    }

    override registerToToDo(entry: MinimalItem | Offering | MinimalTagBasedItem) {
        const itemEntry: ToDo = 'item' in entry ? {
            itemEntry: entry.item,
            amount: entry.amount,
            quality: entry.quality
        } : {
            itemEntry: (entry)
        }
        this._todo.add({...itemEntry, context: "offerings"})

    }

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
