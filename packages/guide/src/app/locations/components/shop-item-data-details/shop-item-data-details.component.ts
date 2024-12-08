import { Component, input } from '@angular/core';
import { ShopItemData } from "@ci/data-types";
import { DecimalPipe } from "@angular/common";
import { TownrankPipe } from "../../../shared/pipes/townrank.pipe";
import { MoneyComponent } from "../../../shared/components/money/money.component";
import { BaseItemCardComponent } from "../../../shared/components/base-item-card/base-item-card.component";
import { IngameDatePipe } from "../../../shared/pipes/ingame-date.pipe";
import { EffectComponent } from "../../../shared/components/effect/effect.component";
import { RequirementsComponent } from "../../../shared/components/requirements/requirements.component";

@Component({
    selector: 'app-shop-item-data-details',
    templateUrl: './shop-item-data-details.component.html',

    imports: [
        DecimalPipe,
        TownrankPipe,
        MoneyComponent,
        BaseItemCardComponent,
        IngameDatePipe,
        EffectComponent,
        RequirementsComponent
    ]
})
export class ShopItemDataDetailsComponent {
    readonly shopItemData = input.required<ShopItemData>();

}
