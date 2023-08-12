import { Component, OnInit } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { ItemProcessShopData } from "@ci/data-types";
import { nonNullable } from "@ci/util";
import { ShopDisplayNames, ShopNames } from "../../../shared/types/shop-names.type";

type ItemProcessShopDataWithShop = ItemProcessShopData & {
    shop: {
        url: string;
        displayName: string
    }
};

@Component({
    selector: 'app-database-shop-item-process',
    templateUrl: './database-shop-item-process.component.html',
})
export class DatabaseShopItemProcessComponent extends BaseDatabaseDetailPartComponent implements OnInit {
    protected chancetoBeProcessedFrom: ItemProcessShopDataWithShop[] = [];
    protected canBeProcessed: ItemProcessShopDataWithShop[] = []

    ngOnInit(): void {
        if (!this.item) return;
        const recipes = ShopNames.map(shopName => {
            return this.database.getShopProcessItems(shopName).map<ItemProcessShopDataWithShop>(sd => {
                return {
                    ...sd,
                    shop: {
                        url: shopName,
                        displayName: ShopDisplayNames[shopName]
                    }
                }
            })
        }).flat();

        this.chancetoBeProcessedFrom = recipes.map<ItemProcessShopDataWithShop | undefined>(sd => {
            const foundItemWithChance = sd.outputChanges.find(output => output.item.id === this.item?.id)
            if (!foundItemWithChance) return undefined;
            return {
                ...sd,
                outputChanges: [foundItemWithChance],

            }
        }).filter(nonNullable);

        this.canBeProcessed = recipes.filter(sd => sd.input.id === this.item?.id)


    }
}
