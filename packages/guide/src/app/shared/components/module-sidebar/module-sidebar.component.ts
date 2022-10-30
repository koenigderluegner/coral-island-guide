import { Component, ContentChildren, HostBinding, QueryList, ViewEncapsulation } from '@angular/core';
import { ModuleSidebarItemComponent } from '../module-sidebar-item/module-sidebar-item.component';

@Component({
    selector: 'app-module-sidebar',
    templateUrl: './module-sidebar.component.html',
    styleUrls: ['./module-sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ModuleSidebarComponent {
    @HostBinding('class.app-module-sidebar') private _setClass = true;

    @ContentChildren(ModuleSidebarItemComponent) viewChildren?: QueryList<ModuleSidebarItemComponent>;
    showMenu = false;


    toggleMenu($event: MouseEvent) {
        $event.preventDefault();
        $event.stopPropagation();

        this.showMenu = !this.showMenu;
    }
}
