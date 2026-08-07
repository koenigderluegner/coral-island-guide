import { booleanAttribute, Component, input, linkedSignal, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-expandable',
    templateUrl: './expandable.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styles: [':host{display: block}'],

})
export class ExpandableComponent {
    readonly open = input(false, {transform: booleanAttribute});
    readonly isOpen = linkedSignal(() => this.open())

    toggle(): void {
        this.isOpen.update(o => !o);
    }


}
