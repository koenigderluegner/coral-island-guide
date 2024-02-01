import { Component, OnInit } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { ShopDisplayNames, ShopItemData, ShopNames } from "@ci/data-types";

@Component({
    selector: 'app-database-shop-data',
    templateUrl: './database-shop-data.component.html',
})
export class DatabaseShopDataComponent extends BaseDatabaseDetailPartComponent{}
