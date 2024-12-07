import { Component, computed, inject, input } from '@angular/core';
import { PetShopAdoptions, UiIcon } from "@ci/data-types";
import { DatabaseService } from "../../../shared/services/database.service";

@Component({
    selector: 'app-pet-adoption-details',
    templateUrl: './pet-adoption-details.component.html',
    standalone: false
})
export class PetAdoptionDetailsComponent {

    readonly adoption = input.required<PetShopAdoptions>();
    protected readonly UiIcon = UiIcon;
    private _database: DatabaseService = inject(DatabaseService)
    petNPC = computed(() => this._database.getNPCs().find(npc => npc.key === this.adoption().npcData.npcId));

}
