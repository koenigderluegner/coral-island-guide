import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Critter } from "@ci/data-types";
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";

@Component({
    selector: 'app-database-insects',
    templateUrl: './database-insects.component.html',
    styleUrls: ['./database-insects.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DatabaseInsectsComponent extends BaseDatabaseDetailPartComponent implements OnInit {

    protected critter?: Critter;

    ngOnInit(): void {
        if (!this.item) return;

        this.critter = this.database.getBugsAndInsects().find(critter => critter.item.id === this.item?.id);
    }


}
