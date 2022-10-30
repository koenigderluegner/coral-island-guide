import { Component } from '@angular/core';
import { UiIcon } from '../shared/enums/ui-icon.enum';

@Component({
    selector: 'app-people',
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.css'],
})
export class PeopleComponent {
    uiIcons = UiIcon;
}
