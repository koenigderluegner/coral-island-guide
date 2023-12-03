import { Component, Input } from '@angular/core';
import { UiIcon } from '@ci/data-types';
import { MappedAnimalShopData } from "../../types/mapped-animal-shop-data.type";

@Component({
    selector: 'app-animal-details',
    templateUrl: './animal-details.component.html',
})
export class AnimalDetailsComponent {
    @Input({required: true}) mappedAnimalShopData!: MappedAnimalShopData;

    protected readonly UiIcon = UiIcon;


    protected keyValueNoOrder(): number {
        return 0
    }

}
