import { Component, OnInit } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { ShopDisplayNames, ShopItemData, ShopNames } from "@ci/data-types";


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


        this.toBuyAt = ShopNames.map(shopName => {
            return this.database.getShopData(shopName).map<ShopItemDataWithShop>(sd => {
                return {
                    ...sd,
                    shop: {
                        url: shopName,
                        displayName: ShopDisplayNames[shopName]
                    }
                }
            })
        }).flat().filter(altar => {
            return this.item?.id === altar.item.id

        });


    }

}
