import { Component, inject, input } from '@angular/core';
import { UiIcon } from '@ci/data-types';
import { MappedAnimalShopData } from "../../types/mapped-animal-shop-data.type";
import { ListDetailService } from "../../../shared/components/list-detail-container/list-detail.service";

@Component({
    selector: 'app-animal-details',
    templateUrl: './animal-details.component.html',
    standalone: false
})
export class AnimalDetailsComponent {
    mappedAnimalShopData = input.required<MappedAnimalShopData>();
    listDetails = inject(ListDetailService);
    protected readonly UiIcon = UiIcon;
    protected readonly uiIcon = UiIcon;

    protected keyValueNoOrder(): number {
        return 0
    }
}
