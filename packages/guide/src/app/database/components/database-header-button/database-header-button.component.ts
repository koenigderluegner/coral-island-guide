import { Component, input } from '@angular/core';
import { ExpandableComponent } from "../../../shared/components/expandable/expandable.component";

@Component({
    selector: 'app-database-header-button',
    templateUrl: './database-header-button.component.html',

})
export class DatabaseHeaderButtonComponent {

    readonly templateRef = input.required<ExpandableComponent>();
}
