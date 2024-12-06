import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-responsive-table',
    templateUrl: './responsive-table.component.html',
    styleUrls: ['./responsive-table.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class ResponsiveTableComponent {
    @HostBinding('class.app-responsive-table') private _setClass = true;
}
