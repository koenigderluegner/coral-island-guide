import { Component, computed, inject, input } from '@angular/core';
import { PetShopAdoptions, UiIcon } from "@ci/data-types";
import { DatabaseService } from "../../../shared/services/database.service";
import { MoneyComponent } from "../../../shared/components/money/money.component";
import { NpcPortraitComponent } from "../../../shared/components/npc-portrait/npc-portrait.component";
import { CardComponent } from "../../../shared/components/card/card.component";

@Component({
    selector: 'app-pet-adoption-details',
    templateUrl: './pet-adoption-details.component.html',

    imports: [
        MoneyComponent,
        NpcPortraitComponent,
        CardComponent
    ]
})
export class PetAdoptionDetailsComponent {

    readonly adoption = input.required<PetShopAdoptions>();
    protected readonly UiIcon = UiIcon;
    private _database: DatabaseService = inject(DatabaseService)
    petNPC = computed(() => this._database.getNPCs().find(npc => npc.key === this.adoption().npcData.npcId));

}
