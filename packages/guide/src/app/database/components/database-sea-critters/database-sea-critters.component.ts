import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Critter } from "@ci/data-types";
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";

@Component({
    selector: 'app-database-sea-critters',
    templateUrl: './database-sea-critters.component.html',
    styleUrls: ['./database-sea-critters.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DatabaseSeaCrittersComponent extends BaseDatabaseDetailPartComponent implements OnInit {
    protected critter?: Critter;

    ngOnInit(): void {
        if (!this.item) return;

        this.critter = this.database.getOceanCritters().find(critter => critter.item.id === this.item?.id);
    }


}
