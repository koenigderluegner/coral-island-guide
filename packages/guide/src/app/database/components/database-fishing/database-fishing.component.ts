import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { Fish } from "@ci/data-types";

@Component({
    selector: 'app-database-fishing',
    templateUrl: './database-fishing.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class DatabaseFishingComponent extends BaseDatabaseDetailPartComponent implements OnInit {
    protected fish?: Fish;

    ngOnInit(): void {
        const fish = this.databaseItem().fish;
        if (fish)
            this.fish = {...fish, item: this.databaseItem().item}
    }
}
