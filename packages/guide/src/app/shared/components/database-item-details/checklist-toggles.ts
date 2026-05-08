import { Component, computed, inject, input, ViewEncapsulation } from "@angular/core";
import { BoughtChecklistService } from "../../../core/services/checklists/bought-checklist.service";
import { CookingRecipesChecklistService } from "../../../core/services/checklists/cooking-recipes-checklist.service";
import { OfferingChecklistService } from "../../../core/services/checklists/offering-checklist.service";
import { OrchestraZonesChecklistService } from "../../../core/services/checklists/orchestra-zones-checklist.service";
import { MuseumChecklistService } from "../../../core/services/checklists/museum-checklist.service";
import { type Checklist, type DatabaseItem, UiIcon } from "@ci/data-types";
import type { BaseChecklistService } from "../../../core/services/checklists/base-checklist.service";
import { UiIconComponent } from "../ui-icon/ui-icon.component";

@Component({
    selector: 'app-checklist-toggles',
    templateUrl: './checklist-toggles.html',
    imports: [
        UiIconComponent
    ],
    host: {
        class: 'flex flex-col border border-2 border-[#EDE6DB] rounded-lg overflow-hidden *:flex *:justify-end *:gap-2 *:items-center *:pl-2 *:min-w-[130px]'
    },
    encapsulation: ViewEncapsulation.None
})
export class ChecklistToggles {

    databaseItem = input.required<DatabaseItem>();

    UiIcon = UiIcon

    isInMusuemChecklist = computed(() => this.databaseItem().partOfChecklists.includes('museum'));
    isInBoughtChecklist = computed(() => this.databaseItem().partOfChecklists.includes('bought'));
    isInCookingRecipesChecklist = computed(() => this.databaseItem().partOfChecklists.includes('cooking-recipes'));
    isInOfferingsChecklist = computed(() => this.databaseItem().partOfChecklists.includes('offerings'));
    isInOrchestraZonesChecklist = computed(() => this.databaseItem().partOfChecklists.includes('orchestra-zones'));

     readonly checklistServices: Partial<Record<Checklist, BaseChecklistService>> = {
        museum: inject(MuseumChecklistService),
        "cooking-recipes": inject(CookingRecipesChecklistService),
        offerings: inject(OfferingChecklistService),
        "orchestra-zones": inject(OrchestraZonesChecklistService),
        bought: inject(BoughtChecklistService)
    }

    toggle(checklist: Checklist) {
        const foundChecklist = this.checklistServices[checklist];
        if (foundChecklist) {
            const itemId = this.databaseItem().item.id;
            foundChecklist.isChecked(itemId) ? foundChecklist.remove(itemId) : foundChecklist.add(itemId);
        }
    }
    isActive(checklist: Checklist) {
        const foundChecklist = this.checklistServices[checklist];
        if (foundChecklist) {
            const itemId = this.databaseItem().item.id;
           return  foundChecklist.isChecked(itemId)
        }
        return false;
    }
}
