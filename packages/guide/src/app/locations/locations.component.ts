import { Component } from '@angular/core';
import { UiIcon } from "../shared/enums/ui-icon.enum";
import { SettingsService } from "../shared/services/settings.service";

@Component({
    selector: 'app-locations',
    templateUrl: './locations.component.html',
})
export class LocationsComponent {
    protected uiIcon = UiIcon;

    constructor(protected settings: SettingsService) {
    }
}
