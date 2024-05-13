import { Component, inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DatabaseService } from "../../../shared/services/database.service";
import { GiftPreferences, HeartEvent, NPC, UiIcon } from "@ci/data-types";
import { combineLatest } from "rxjs";
import { MapKeyed } from "../../../shared/types/map-keyed.type";

@Component({
    selector: 'app-npc',
    templateUrl: './npc.component.html',
    styleUrls: ['./npc.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NpcComponent implements OnInit {

    @Input() npcKey!: string;
    protected npc?: NPC | null = null;
    protected heartEvents: HeartEvent[] = []
    protected readonly UiIcon = UiIcon;
    protected giftingPreferences?: MapKeyed<GiftPreferences>;
    protected readonly uiIcon = UiIcon;
    private _database: DatabaseService = inject(DatabaseService);

    ngOnInit(): void {
        combineLatest([this._database.fetchNPCs$(), this._database.fetchHeartEvents$(), this._database.fetchGiftingPreferences$()]).subscribe({
            next: ([npcs, heartEvents, giftingPreferences]) => {
                this.npc = npcs.find(npc => npc.key.toLowerCase() === this.npcKey.toLowerCase())
                this.heartEvents = heartEvents[this.npcKey.toLowerCase()] ?? []
                this.giftingPreferences = giftingPreferences.find(g => g.mapKey.toLowerCase() === this.npc?.key.toLowerCase())
            }
        })
    }
}
