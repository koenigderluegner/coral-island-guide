import { Component, inject, input, ViewEncapsulation } from '@angular/core';
import { Enemy, UiIcon } from "@ci/data-types";
import { ListDetailService } from "../../../shared/components/list-detail-container/list-detail.service";
import { FullSizeImageComponent } from "../../../shared/components/full-size-image/full-size-image.component";
import { ItemIconComponent } from "../../../shared/components/item-icon/item-icon.component";
import { UiIconComponent } from "../../../shared/components/ui-icon/ui-icon.component";
import { CardComponent } from "../../../shared/components/card/card.component";
import { ChancePerItemListComponent } from "../../../shared/components/chance-per-item-list/chance-per-item-list.component";
import { MatTooltip } from "@angular/material/tooltip";

@Component({
    selector: 'app-bestiary-details',
    templateUrl: './bestiary-details.component.html',
    encapsulation: ViewEncapsulation.Emulated,

    imports: [
        FullSizeImageComponent,
        ItemIconComponent,
        UiIconComponent,
        CardComponent,
        ChancePerItemListComponent,
        MatTooltip
    ]
})
export class BestiaryDetailsComponent {
    enemy = input.required<Enemy>()
    listDetails = inject(ListDetailService)
    protected readonly uiIcon = UiIcon;
}
