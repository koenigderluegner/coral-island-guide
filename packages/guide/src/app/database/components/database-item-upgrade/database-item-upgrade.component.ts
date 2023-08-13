import { Component, OnInit } from '@angular/core';
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { ItemUpgradeData, ShopDisplayNames, ShopNames } from "@ci/data-types";
import { nonNullable } from "@ci/util";

type ItemUpgradeDataWithShop = ItemUpgradeData & {
    shop: {
        url: string;
        displayName: string
    }
};

@Component({
    selector: 'app-database-item-upgrade',
    templateUrl: './database-item-upgrade.component.html',
})
export class DatabaseItemUpgradeComponent extends BaseDatabaseDetailPartComponent implements OnInit {
    protected isTheResult: ItemUpgradeDataWithShop[] = [];
    protected isRequirement: ItemUpgradeDataWithShop[] = []

    ngOnInit(): void {
        if (!this.item) return;
        const recipes = ShopNames.map(shopName => {
            return this.database.getItemUpgradeData(shopName).map<ItemUpgradeDataWithShop>(sd => {
                return {
                    ...sd,
                    shop: {
                        url: shopName,
                        displayName: ShopDisplayNames[shopName]
                    }
                }
            })
        }).flat();

        this.isTheResult = recipes.filter(sd => sd.item.id === this.item?.id).filter(nonNullable);

        this.isRequirement = recipes.filter(sd => sd.requirements.some(req => req.item.id === this.item?.id))


    }
}
