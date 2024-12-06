import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../../shared.module";
import { BaseCrop, Crop, FruitPlant, FruitTree } from "@ci/data-types";

@Component({
    selector: 'app-crop',
    imports: [CommonModule, SharedModule],
    templateUrl: './crop.component.html'
})
export class CropComponent {
    @Input({required: true}) item!: BaseCrop | Crop | FruitPlant | FruitTree;
}
