import { Component } from '@angular/core';
import { UiIcon } from '../shared/enums/ui-icon.enum';

@Component({
    selector: 'app-journal',
    templateUrl: './journal.component.html',
    styleUrls: ['./journal.component.css'],
})
export class JournalComponent {

    UI_ICONS = UiIcon;
}
