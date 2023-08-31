import { Component } from '@angular/core';
import { UiIcon } from '../shared/enums/ui-icon.enum';
import { SettingsService } from "../shared/services/settings.service";

@Component({
    selector: 'app-people',
    templateUrl: './npcs.component.html',
})
export class NPCsComponent {
    uiIcons = UiIcon;

    constructor(protected settings: SettingsService) {
    }
}
