import { Component, OnInit } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { Enemy } from "@ci/data-types";

@Component({
    selector: 'app-database-bestiary',
    templateUrl: './database-bestiary.component.html',
})
export class DatabaseBestiaryComponent extends BaseDatabaseDetailPartComponent implements OnInit {
    protected enemiesDroppingItem: Enemy[] = [];


    ngOnInit(): void {
        const item = this.item;
        if (!item) return;
        this.enemiesDroppingItem = this.database.getBestiary().map(sd => ({
            ...sd,
            dropRates: sd.dropRates.filter(dr => dr.item.id === item.id)
        })).filter(sd => sd.dropRates.length)


    }
}
