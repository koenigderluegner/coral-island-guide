import { booleanAttribute, Component, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { UiIcon } from '../../enums/ui-icon.enum';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-module-sidebar-item',
    templateUrl: './module-sidebar-item.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ModuleSidebarItemComponent {
    @ViewChild('innerTemplate') public innerTemplate: TemplateRef<any> | null = null;
    @Input() uiIcon?: UiIcon;
    @Input() routerLink: RouterLink['routerLink'];
    @Input({transform: booleanAttribute}) exact?: boolean;
    @Input({transform: booleanAttribute}) active = false
}
