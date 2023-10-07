import { Component, inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DatabaseService } from "../../../shared/services/database.service";
import { HeartEvent, NPC } from "@ci/data-types";
import { UiIcon } from "../../../shared/enums/ui-icon.enum";
import { combineLatest } from "rxjs";

@Component({
    selector: 'app-npc',
    templateUrl: './npc.component.html',
    styleUrls: ['./npc.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NpcComponent implements OnInit {

    @Input() npcKey!: string;
    protected npc?: NPC;
    protected heartEvents: HeartEvent[] = []
    protected readonly UiIcon = UiIcon;
    private _database: DatabaseService = inject(DatabaseService);

    ngOnInit(): void {
        combineLatest([this._database.fetchNPCs$(), this._database.fetchHeartEvents$()]).subscribe({
            next: ([npcs, heartEvents]) => {
                this.npc = npcs.find(npc => npc.key.toLowerCase() === this.npcKey.toLowerCase())
                this.heartEvents = heartEvents[this.npcKey.toLowerCase()] ?? []
            }
        })
    }
}
