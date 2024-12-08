import { Component, contentChildren, signal, ViewEncapsulation } from '@angular/core';
import { ModuleSidebarItemComponent } from '../module-sidebar-item/module-sidebar-item.component';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { NgTemplateOutlet } from "@angular/common";
import { UiIconComponent } from "../ui-icon/ui-icon.component";

@Component({
    selector: 'app-module-sidebar',
    templateUrl: './module-sidebar.component.html',
    styleUrls: ['./module-sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [
        RouterLink,
        RouterLinkActive,
        NgTemplateOutlet,
        UiIconComponent
    ],

    host: {
        'class': 'app-module-sidebar'
    }
})
export class ModuleSidebarComponent {
    readonly viewChildren = contentChildren(ModuleSidebarItemComponent);
    readonly showMenu = signal(false);

    toggleMenu($event: MouseEvent) {
        $event.preventDefault();
        $event.stopPropagation();

        this.showMenu.update(o => !o);
    }
}
