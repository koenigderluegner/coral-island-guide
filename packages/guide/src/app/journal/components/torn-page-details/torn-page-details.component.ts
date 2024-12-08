import { Component, inject, input } from '@angular/core';
import { TornPageData, UiIcon } from "@ci/data-types";
import { ListDetailService } from "../../../shared/components/list-detail-container/list-detail.service";
import { TornPageComponent } from "../torn-page/torn-page.component";
import { UiIconComponent } from "../../../shared/components/ui-icon/ui-icon.component";
import { CardComponent } from "../../../shared/components/card/card.component";

@Component({
    selector: 'app-torn-page-details',
    templateUrl: './torn-page-details.component.html',

    imports: [
        TornPageComponent,
        UiIconComponent,
        CardComponent
    ]
})
export class TornPageDetailsComponent {
    tornPage = input.required<TornPageData>()
    listDetails = inject(ListDetailService)
    protected readonly uiIcon = UiIcon;
}
