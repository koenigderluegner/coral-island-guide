import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { UiIcon } from '../../enums/ui-icon.enum';

@Component({
    selector: 'app-module-sidebar-item',
    templateUrl: './module-sidebar-item.component.html',
    styleUrls: ['./module-sidebar-item.component.scss'],
})
export class ModuleSidebarItemComponent {
    @ViewChild('innerTemplate') public innerTemplate: TemplateRef<any> | null = null;
    @Input() uiIcon?: UiIcon;
}
