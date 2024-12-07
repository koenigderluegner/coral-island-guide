import { Component, inject, input, signal, output } from '@angular/core';
import { LocationsModule } from "../../locations.module";
import { NgOptimizedImage } from "@angular/common";
import { SharedModule } from "../../../shared/shared.module";
import { MinimalItem, MinimalTagBasedItem, Offering, OfferingAltar, Offerings } from "@ci/data-types";
import { SettingsService } from "../../../shared/services/settings.service";
import { ToDo } from "../../../core/types/to-do.type";

@Component({
    selector: 'app-offering-group',
    imports: [
        LocationsModule,
        NgOptimizedImage,
        SharedModule
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
