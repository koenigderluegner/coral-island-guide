import { booleanAttribute, Component, Input } from '@angular/core';

@Component({
    selector: 'app-expandable',
    templateUrl: './expandable.component.html',
    styles: [':host{display: block}'],
    standalone: false
})
export class ExpandableComponent {

    @Input({transform: booleanAttribute}) open = false;

    toggle(): void {
        this.open = !this.open;
    }


}
