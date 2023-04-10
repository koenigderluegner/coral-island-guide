import { Component } from '@angular/core';
import { UiIcon } from '../shared/enums/ui-icon.enum';

@Component({
    selector: 'app-journal',
    templateUrl: './journal.component.html',
})
export class JournalComponent {

    UI_ICONS = UiIcon;
}
