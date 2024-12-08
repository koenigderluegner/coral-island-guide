import { booleanAttribute, Component, input, TemplateRef, viewChild, ViewEncapsulation } from '@angular/core';
import { UiIcon } from '@ci/data-types';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-module-sidebar-item',
    templateUrl: './module-sidebar-item.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class ModuleSidebarItemComponent {
    readonly innerTemplate = viewChild.required<TemplateRef<any>>('innerTemplate');
    readonly uiIcon = input<UiIcon>();
    readonly routerLink = input<RouterLink['routerLink']>();
    readonly exact = input<boolean, unknown>(undefined, {transform: booleanAttribute});
    readonly active = input(false, {transform: booleanAttribute});
}
