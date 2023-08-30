import { Component, inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DatabaseService } from "../../../shared/services/database.service";
import { NPC } from "@ci/data-types";
import { UiIcon } from "../../../shared/enums/ui-icon.enum";

@Component({
    selector: 'app-npc',
    templateUrl: './npc.component.html',
    styleUrls: ['./npc.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NpcComponent implements OnInit {

    @Input() npcKey!: string
    protected npc?: NPC;
    protected readonly UiIcon = UiIcon;
    private _database: DatabaseService = inject(DatabaseService);

    ngOnInit(): void {
        this._database.fetchNPCs$().subscribe({
            next: value => {
                this.npc = value.find(npc => npc.key.toLowerCase() === this.npcKey.toLowerCase())
            }
        })
    }
}
