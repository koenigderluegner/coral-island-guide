import { Component, ViewEncapsulation } from '@angular/core';
import { DatabaseService } from "../../../shared/services/database.service";
import { Observable } from "rxjs";
import { NPC } from "@ci/data-types";

@Component({
    selector: 'app-npc-list',
    templateUrl: './npc-list.component.html',
    styleUrls: ['./npc-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NpcListComponent {

    protected npcs$: Observable<NPC[]>;

    constructor(private _database: DatabaseService) {
        this.npcs$ = this._database.fetchNPCs$()
    }


}
