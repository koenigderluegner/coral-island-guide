import { Component, ContentChildren, HostBinding, QueryList, ViewEncapsulation } from '@angular/core';
import { ModuleSidebarItemComponent } from '../module-sidebar-item/module-sidebar-item.component';

@Component({
    selector: 'app-module-sidebar',
    templateUrl: './module-sidebar.component.html',
    styleUrls: ['./module-sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class ModuleSidebarComponent {
    @ContentChildren(ModuleSidebarItemComponent) viewChildren?: QueryList<ModuleSidebarItemComponent>;
    showMenu = false;
    @HostBinding('class.app-module-sidebar') private _setClass = true;

    toggleMenu($event: MouseEvent) {
        $event.preventDefault();
        $event.stopPropagation();

        this.showMenu = !this.showMenu;
    }
}
