import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangelogComponent } from '../changelog/changelog.component';
import { SharedModule } from '../shared/shared.module';

@Component({
    selector: 'app-start',
    standalone: true,
    imports: [CommonModule, ChangelogComponent, SharedModule],
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class StartComponent {

    @HostBinding('class.app-start') private _setClass = true;

}
