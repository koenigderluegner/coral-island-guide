import { booleanAttribute, Component, Input } from '@angular/core';

@Component({
    selector: 'app-expandable',
    templateUrl: './expandable.component.html',
    styles: [':host{display: block}']
})
export class ExpandableComponent {

    @Input({transform: booleanAttribute}) open = false;

    toggle(): void {
        this.open = !this.open;
    }


}
