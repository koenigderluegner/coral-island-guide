import { Component, OnInit } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { ItemUpgradeData, ShopDisplayNames, ShopNames } from "@ci/data-types";
import { nonNullable } from "@ci/util";
import { data } from "autoprefixer";

@Component({
    selector: 'app-database-item-upgrade',
    templateUrl: './database-item-upgrade.component.html',
})
export class DatabaseItemUpgradeComponent extends BaseDatabaseDetailPartComponent {}
