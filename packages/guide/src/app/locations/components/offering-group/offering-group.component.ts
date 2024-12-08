import { Component, inject, input, output, signal } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { MinimalItem, MinimalTagBasedItem, Offering, OfferingAltar, Offerings } from "@ci/data-types";
import { SettingsService } from "../../../shared/services/settings.service";
import { ToDo } from "../../../core/types/to-do.type";
import { DataFilterComponent } from "../../../shared/components/data-filter/data-filter.component";
import { OfferingsTableComponent } from "../tables/offerings-table/offerings-table.component";
import { ItemIconComponent } from "../../../shared/components/item-icon/item-icon.component";
import { EntityKeyPipe } from "../../../shared/pipes/entity-key.pipe";

@Component({
    selector: 'app-offering-group',
    imports: [
        NgOptimizedImage,
        DataFilterComponent,
        OfferingsTableComponent,
        ItemIconComponent,
        EntityKeyPipe
    ],
    templateUrl: './offering-group.component.html'
})
export class OfferingGroupComponent {
    readonly offeringAltar = input.required<OfferingAltar>()
    readonly selectedEntity = input.required<MinimalItem | MinimalTagBasedItem | undefined>()
    readonly selected = output<MinimalItem | MinimalTagBasedItem | undefined>();
    showTable = false;
    protected activeOffering?: Offerings;
    protected readonly useBeta = inject(SettingsService).getSettings().useBeta;
    protected readonly bundleAssetPath = signal(`assets/${this.useBeta ? 'beta' : 'live'}/items/icons/`);
    protected entryForToDo?: ToDo;

    showDetails(selectedEntry?: Offering | MinimalItem | MinimalTagBasedItem) {
        if (selectedEntry) {
            this.entryForToDo = 'item' in selectedEntry ? {
                itemEntry: selectedEntry.item,
                amount: selectedEntry.amount,
                quality: selectedEntry.quality
            } : {
                itemEntry: (selectedEntry)
            };
        } else {
            this.entryForToDo = undefined;
        }

        if (selectedEntry && 'amount' in selectedEntry) {
            this.selected.emit(selectedEntry.item);
        } else {
            this.selected.emit(selectedEntry);
        }

    }
}
