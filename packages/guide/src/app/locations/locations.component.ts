import { Component } from '@angular/core';
import { UiIcon } from "../shared/enums/ui-icon.enum";

@Component({
    selector: 'app-locations',
    templateUrl: './locations.component.html',
})
export class LocationsComponent {
    protected uiIcon = UiIcon;
}
