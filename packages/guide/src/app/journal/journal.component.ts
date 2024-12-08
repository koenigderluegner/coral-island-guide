import { Component } from '@angular/core';
import { UiIcon } from '@ci/data-types';

@Component({
    selector: 'app-journal',
    templateUrl: './journal.component.html',
    standalone: false
})
export class JournalComponent {

    UI_ICONS = UiIcon;
}
