import { Component, OnInit } from '@angular/core';
import { FestivalDisplayNames, FestivalNames, FestivalShopItemData } from "@ci/data-types";
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";

@Component({
    selector: 'app-database-festival-shop-data',
    templateUrl: './database-festival-shop-data.component.html',
})
export class DatabaseFestivalShopDataComponent extends BaseDatabaseDetailPartComponent {}
