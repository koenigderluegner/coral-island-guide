import { Component, OnInit } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { ShopItemData } from "@ci/data-types";


type ShopItemDataWithShop = ShopItemData & {
    shop: { url: string; displayName: string }
};

@Component({
    selector: 'app-database-shop-data',
    templateUrl: './database-shop-data.component.html',
})
export class DatabaseShopDataComponent extends BaseDatabaseDetailPartComponent implements OnInit {
    protected toBuyAt: ShopItemDataWithShop[] = []

    ngOnInit(): void {
        if (!this.item) return;
        const recipes = this.database.getShopItemDataBlacksmith();

        this.toBuyAt = recipes.map<ShopItemDataWithShop>(sd => {
            return {
                ...sd,
                shop: {
                    url: 'blacksmith',
                    displayName: 'Blacksmith'
                }
            }
        }).filter(altar => {
            return this.item?.id === altar.item.id

        });


    }

}
