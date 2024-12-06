import { Component, inject, input, ViewEncapsulation } from '@angular/core';
import { Enemy, UiIcon } from "@ci/data-types";
import { ListDetailService } from "../../../shared/components/list-detail-container/list-detail.service";

@Component({
    selector: 'app-bestiary-details',
    templateUrl: './bestiary-details.component.html',
    encapsulation: ViewEncapsulation.Emulated,
    standalone: false
})
export class BestiaryDetailsComponent {
    enemy = input.required<Enemy>()
    listDetails = inject(ListDetailService)
    protected readonly uiIcon = UiIcon;
}
