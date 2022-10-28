import { Component } from '@angular/core';
import { UiIcon } from '../shared/enums/ui-icon.enum';

@Component({
    selector: 'app-crafting',
    templateUrl: './crafting.component.html',
    styleUrls: ['./crafting.component.css'],
})
export class CraftingComponent {
    UI_ICONS = UiIcon;
}
