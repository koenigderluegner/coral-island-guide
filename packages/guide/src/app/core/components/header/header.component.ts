import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { UiIcon } from '../../../shared/enums/ui-icon.enum';
import { RouterLink } from '@angular/router';

type NaviLinks = {
    path: RouterLink['routerLink'];
    uiIcon: UiIcon;
    text: string;
}[];

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {

    @HostBinding('class.app-header') private _setClass = true;

    naviLinks: NaviLinks = [
        {
            text: 'Journal',
            uiIcon: UiIcon.JOURNAL,
            path: 'journal'
        }, {
            text: 'Crafting',
            uiIcon: UiIcon.CRAFTING,
            path: 'crafting'
        }, {
            text: 'People',
            uiIcon: UiIcon.PEOPLE,
            path: 'people'
        },
    ];

}
