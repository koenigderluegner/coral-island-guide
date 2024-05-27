import { Component, inject, input } from '@angular/core';
import { TornPageData, UiIcon } from "@ci/data-types";
import { ListDetailService } from "../../../shared/components/list-detail-container/list-detail.service";

@Component({
    selector: 'app-torn-page-details',
    templateUrl: './torn-page-details.component.html',
})
export class TornPageDetailsComponent {
    tornPage = input.required<TornPageData>()
    listDetails = inject(ListDetailService)
    protected readonly uiIcon = UiIcon;
}
