import { Component, input } from '@angular/core';
import { BaseCrop, Crop, FruitPlant, FruitTree } from "@ci/data-types";
import { ItemIconComponent } from "../../item-icon/item-icon.component";
import { IsBaseCropPipe } from "../../../pipes/is-base-crop.pipe";
import { MoneyComponent } from "../../money/money.component";
import { IsCropPipe } from "../../../pipes/is-crop.pipe";
import { MaxPipe } from "../../../pipes/max.pipe";

@Component({
    selector: 'app-crop',
    imports: [ItemIconComponent, IsBaseCropPipe, MoneyComponent, IsCropPipe, MaxPipe],
    templateUrl: './crop.component.html'
})
export class CropComponent {

    readonly item = input.required<BaseCrop | Crop | FruitPlant | FruitTree>();
}
