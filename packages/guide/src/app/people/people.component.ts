import { Component } from '@angular/core';
import { UiIcon } from '../shared/enums/ui-icon.enum';

@Component({
    selector: 'app-people',
    templateUrl: './people.component.html',
})
export class PeopleComponent {
    uiIcons = UiIcon;
}
