import { Component, Input } from '@angular/core';
import { DatabaseItem } from "@ci/data-types";
import { SharedModule } from "../../../shared.module";

@Component({
    selector: 'app-inventory-crafting',
    standalone: true,
    imports: [
        SharedModule
    ],
    templateUrl: './inventory-crafting.component.html'
})
export class InventoryCraftingComponent {
    @Input({required: true}) details!: DatabaseItem
}
