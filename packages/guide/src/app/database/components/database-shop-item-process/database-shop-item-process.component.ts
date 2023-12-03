import { Component, OnInit } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { ItemProcessShopData, ShopDisplayNames, ShopNames } from "@ci/data-types";
import { nonNullable } from "@ci/util";

@Component({
    selector: 'app-database-shop-item-process',
    templateUrl: './database-shop-item-process.component.html',
})
export class DatabaseShopItemProcessComponent extends BaseDatabaseDetailPartComponent  {}
