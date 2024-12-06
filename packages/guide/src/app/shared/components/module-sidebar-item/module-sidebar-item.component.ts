import { booleanAttribute, Component, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { UiIcon } from '@ci/data-types';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-module-sidebar-item',
    templateUrl: './module-sidebar-item.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class ModuleSidebarItemComponent {
    @ViewChild('innerTemplate') public innerTemplate: TemplateRef<any> | null = null;
    @Input() uiIcon?: UiIcon;
    @Input() routerLink: RouterLink['routerLink'];
    @Input({transform: booleanAttribute}) exact?: boolean;
    @Input({transform: booleanAttribute}) active = false
}
