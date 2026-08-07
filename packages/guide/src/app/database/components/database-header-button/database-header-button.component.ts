import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { ExpandableComponent } from "../../../shared/components/expandable/expandable.component";

@Component({
    selector: 'app-database-header-button',
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './database-header-button.component.html',

})
export class DatabaseHeaderButtonComponent {

    readonly templateRef = input.required<ExpandableComponent>();
}
