import { booleanAttribute, Component, input, linkedSignal } from '@angular/core';

@Component({
    selector: 'app-expandable',
    templateUrl: './expandable.component.html',
    styles: [':host{display: block}'],
    standalone: false
})
export class ExpandableComponent {
    readonly open = input(false, {transform: booleanAttribute});
    readonly isOpen = linkedSignal(() => this.open())

    toggle(): void {
        this.isOpen.update(o => !o);
    }


}
