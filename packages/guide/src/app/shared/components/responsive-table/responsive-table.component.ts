import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-responsive-table',
    templateUrl: './responsive-table.component.html',
    styleUrls: ['./responsive-table.component.scss'],
    encapsulation: ViewEncapsulation.None,

    host: {
        'class': 'app-responsive-table'
    }
})
export class ResponsiveTableComponent {
}
