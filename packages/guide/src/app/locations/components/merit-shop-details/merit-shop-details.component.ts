import { Component, input } from '@angular/core';
import { MeritExchangeShopData } from "@ci/data-types";
import { MeritPointsComponent } from "../../../shared/components/merit-points/merit-points.component";
import { BaseItemCardComponent } from "../../../shared/components/base-item-card/base-item-card.component";
import { TownrankPipe } from "../../../shared/pipes/townrank.pipe";
import { EffectComponent } from "../../../shared/components/effect/effect.component";
import { RequirementsComponent } from "../../../shared/components/requirements/requirements.component";

@Component({
    selector: 'app-merit-shop-details',
    templateUrl: './merit-shop-details.component.html',

    imports: [
        MeritPointsComponent,
        BaseItemCardComponent,
        TownrankPipe,
        EffectComponent,
        RequirementsComponent
    ]
})
export class MeritShopDetailsComponent {

    meritExchangeData = input.required<MeritExchangeShopData>();

}
