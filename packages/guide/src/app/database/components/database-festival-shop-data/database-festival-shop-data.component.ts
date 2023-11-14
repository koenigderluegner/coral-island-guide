import { Component, OnInit } from '@angular/core';
import { FestivalDisplayNames, FestivalNames, FestivalShopItemData } from "@ci/data-types";
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";

type ShopItemDataWithShop = FestivalShopItemData & {
    festival: { url: string; displayName: string }
};

@Component({
    selector: 'app-database-festival-shop-data',
    templateUrl: './database-festival-shop-data.component.html',
})
export class DatabaseFestivalShopDataComponent extends BaseDatabaseDetailPartComponent implements OnInit {
    protected toBuyAt: ShopItemDataWithShop[] = []

    ngOnInit(): void {
        if (!this.item) return;


        this.toBuyAt = FestivalNames.map(shopName => {
            return (
                this.database.getFestivalData(shopName)?.shops
                    .map(s => s.shop)
                    .flat() ?? []
            )
                .map<ShopItemDataWithShop>(sd => {
                    return {
                        ...sd,
                        festival: {
                            url: shopName,
                            displayName: FestivalDisplayNames[shopName]
                        }
                    }
                })
        }).flat().filter(altar => {
            return this.item?.id === altar.item.id

        });


    }

}
