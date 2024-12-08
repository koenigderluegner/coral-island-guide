import { Component } from '@angular/core';
import { UiIcon } from "@ci/data-types";
import { SidebarContainerComponent } from "../shared/components/sidebar-container/sidebar-container.component";
import { ModuleSidebarItemComponent } from "../shared/components/module-sidebar-item/module-sidebar-item.component";
import { RouterOutlet } from "@angular/router";
import { ModuleSidebarComponent } from "../shared/components/module-sidebar/module-sidebar.component";

@Component({
    selector: 'app-my-coral-guide',
    templateUrl: './my-coral-guide.component.html',

    imports: [
        SidebarContainerComponent,
        ModuleSidebarComponent,
        ModuleSidebarItemComponent,
        RouterOutlet
    ]
})
export class MyCoralGuideComponent {

    protected uiIcon = UiIcon

}
