import { Component, inject, input, OnInit, ViewEncapsulation } from '@angular/core';
import { DatabaseItem, Item } from "@ci/data-types";
import { DatabaseService } from "../../../shared/services/database.service";
import { Observable } from "rxjs";
import { DatabaseBestiaryComponent } from "../database-bestiary/database-bestiary.component";
import { DatabaseItemUpgradeComponent } from "../database-item-upgrade/database-item-upgrade.component";
import { DatabaseGiftsComponent } from "../database-gifts/database-gifts.component";
import { DatabaseFestivalShopDataComponent } from "../database-festival-shop-data/database-festival-shop-data.component";
import { DatabaseCraftingComponent } from "../database-crafting/database-crafting.component";
import { DatabaseMixingComponent } from "../database-mixing/database-mixing.component";
import { DatabaseCookingComponent } from "../database-cooking/database-cooking.component";
import { DatabaseArtisanComponent } from "../database-artisan/database-artisan.component";
import { DatabaseSeaCrittersComponent } from "../database-sea-critters/database-sea-critters.component";
import { DatabaseInsectsComponent } from "../database-insects/database-insects.component";
import { DatabaseFishingComponent } from "../database-fishing/database-fishing.component";
import { DatabaseCropsComponent } from "../database-crops/database-crops.component";
import { DatabaseOfferingsComponent } from "../database-offerings/database-offerings.component";
import { DatabaseShopDataComponent } from "../database-shop-data/database-shop-data.component";
import { DatabaseShopItemProcessComponent } from "../database-shop-item-process/database-shop-item-process.component";
import { QualityGridComponent } from "../../../shared/components/quality-grid/quality-grid.component";
import { ToDoToggleComponent } from "../../../shared/components/to-do-toggle/to-do-toggle.component";
import { ItemIconComponent } from "../../../shared/components/item-icon/item-icon.component";
import { CardComponent } from "../../../shared/components/card/card.component";
import { AsyncPipe } from "@angular/common";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
    selector: 'app-database-details',
    templateUrl: './database-details.component.html',
    styleUrls: ['./database-details.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [
        DatabaseBestiaryComponent,
        DatabaseItemUpgradeComponent,
        DatabaseGiftsComponent,
        DatabaseFestivalShopDataComponent,
        DatabaseCraftingComponent,
        DatabaseMixingComponent,
        DatabaseCookingComponent,
        DatabaseArtisanComponent,
        DatabaseSeaCrittersComponent,
        DatabaseInsectsComponent,
        DatabaseFishingComponent,
        DatabaseCropsComponent,
        DatabaseOfferingsComponent,
        DatabaseShopDataComponent,
        DatabaseShopItemProcessComponent,
        QualityGridComponent,
        ToDoToggleComponent,
        ItemIconComponent,
        CardComponent,
        AsyncPipe,
        MatProgressSpinner
    ],

    host: {
        'class': 'col-span-full database-details'
    }
})
export class DatabaseDetailsComponent implements OnInit {
    readonly item = input.required<Item>();

    protected databaseItem$?: Observable<DatabaseItem>;
    readonly #databaseService = inject(DatabaseService);

    ngOnInit(): void {
        this.databaseItem$ = this.#databaseService.fetchDatabaseItem$(this.item().id)
    }
}
