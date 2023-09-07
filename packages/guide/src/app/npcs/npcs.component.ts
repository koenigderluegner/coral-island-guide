import { Component } from '@angular/core';
import { UiIcon } from '../shared/enums/ui-icon.enum';

@Component({
    selector: 'app-people',
    templateUrl: './npcs.component.html',
})
export class NPCsComponent {
    uiIcons = UiIcon;
}
