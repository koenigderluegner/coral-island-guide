import { Component, input } from '@angular/core';
import { FestivalShopItemData } from "@ci/data-types";
import { RequirementsComponent } from "../../../shared/components/requirements/requirements.component";
import { EffectComponent } from "../../../shared/components/effect/effect.component";
import { IngameDatePipe } from "../../../shared/pipes/ingame-date.pipe";
import { DecimalPipe, PercentPipe } from "@angular/common";
import { TownrankPipe } from "../../../shared/pipes/townrank.pipe";
import { MoneyComponent } from "../../../shared/components/money/money.component";
import { BaseItemCardComponent } from "../../../shared/components/base-item-card/base-item-card.component";

@Component({
    selector: 'app-festival-shop-item-details',
    templateUrl: './festival-shop-item-details.component.html',

    imports: [
        RequirementsComponent,
        EffectComponent,
        IngameDatePipe,
        DecimalPipe,
        TownrankPipe,
        PercentPipe,
        MoneyComponent,
        BaseItemCardComponent
    ]
})
export class FestivalShopItemDetailsComponent {

    festivalShopItemData = input.required<FestivalShopItemData>();


}
