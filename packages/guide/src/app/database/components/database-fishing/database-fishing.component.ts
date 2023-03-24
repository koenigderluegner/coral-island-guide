import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { Fish } from "@ci/data-types";

@Component({
    selector: 'app-database-fishing',
    templateUrl: './database-fishing.component.html',
    styleUrls: ['./database-fishing.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DatabaseFishingComponent extends BaseDatabaseDetailPartComponent implements OnInit {

    protected fish?: Fish;

    ngOnInit(): void {
        if (!this.item) return;

        this.fish = this.database.getFish().find(fish => fish.item.id === this.item?.id);
    }


}
