import { Component, computed, inject, input, ViewEncapsulation } from "@angular/core";
import { BoughtChecklistService } from "../../../core/services/checklists/bought-checklist.service";
import { CookingRecipesChecklistService } from "../../../core/services/checklists/cooking-recipes-checklist.service";
import { OfferingChecklistService } from "../../../core/services/checklists/offering-checklist.service";
import { OrchestraZonesChecklistService } from "../../../core/services/checklists/orchestra-zones-checklist.service";
import { MuseumChecklistService } from "../../../core/services/checklists/museum-checklist.service";
import { CraftedChecklistService } from "../../../core/services/checklists/crafted-checklist.service";
import { ShippedChecklistService } from "../../../core/services/checklists/shipped-checklist.service";
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
        class: 'flex flex-col border border-2 border-[#EDE6DB] rounded-lg overflow-hidden *:flex *:justify-end *:items-stretch *:min-w-[130px] [&_span]:border-y-2 [&_span]:flex [&_span]:items-center [&_span]:border-t-[#EDE6DB] [&_span]:border-b-transparent [&_span]:h-10 [&_span]:px-2 [&_span]:grow [&>button:first-child>span]:border-t-transparent'
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
    isInShippedZonesChecklist = computed(() => this.databaseItem().partOfChecklists.includes('shipped'));
    isInCraftedZonesChecklist = computed(() => this.databaseItem().partOfChecklists.includes('crafted'));

    readonly checklistServices: Partial<Record<Checklist, BaseChecklistService>> = {
        museum: inject(MuseumChecklistService),
        "cooking-recipes": inject(CookingRecipesChecklistService),
        offerings: inject(OfferingChecklistService),
        "orchestra-zones": inject(OrchestraZonesChecklistService),
        bought: inject(BoughtChecklistService),
        crafted: inject(CraftedChecklistService),
        shipped: inject(ShippedChecklistService),
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
            return foundChecklist.isChecked(itemId)
        }
        return false;
    }
}
