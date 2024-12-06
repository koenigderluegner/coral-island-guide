import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NPC, PetShopAdoptions, UiIcon } from "@ci/data-types";
import { DatabaseService } from "../../../shared/services/database.service";

@Component({
    selector: 'app-pet-adoption-details',
    templateUrl: './pet-adoption-details.component.html',
    standalone: false
})
export class PetAdoptionDetailsComponent implements OnInit, OnChanges {

    @Input({required: true}) adoption!: PetShopAdoptions;

    npc?: NPC;
    protected readonly UiIcon = UiIcon;
    private _database: DatabaseService = inject(DatabaseService)

    ngOnInit(): void {
        this.npc = this._database.getNPCs().find(npc => npc.key === this.adoption.npcData.npcId);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['adoption'] && !changes['adoption'].isFirstChange()) {
            this.npc = this._database.getNPCs().find(npc => npc.key === changes['adoption'].currentValue.npcData.npcId);
        }
    }
}
